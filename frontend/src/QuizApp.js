import React, { useEffect, useState } from 'react';

const Quiz = () => {
    const [step, setStep] = useState(0);
    const [topic, setTopic] = useState("");
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);


    const handleTopicChange = (e) => {
        setTopic(e.target.value);
    };

    const startQuiz = () => {
        if (topic.trim() !== "") {
            fetch(`http://localhost:3000/questions`)
            .then(res => res.json())
            .then(data => {
                if (data.questions && data.questions.length > 0) {
                    setQuestions(data.questions);
                    setStep(1);  // Quiz'i başlatmak için adımı güncelleriz
                } else {
                    alert("No questions found for the selected topic.");
                }
            })
            .catch(err => {
                console.error("Error fetching questions:", err);
                alert("There was an error fetching questions. Please try again.");
            });
        }
    };
    

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const prevQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleAnswerSelect = (answer) => {
        setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: answer });
    };

    const submitQuiz = () => {
        console.log("1231");
        let correctCount = 0;
        console.log(questions);
        console.log(selectedAnswers);
        questions.forEach((question, index) => {
            if (selectedAnswers[index] === question.answer) {
                console.log(1);
                console.log(selectedAnswers[index]);
                correctCount++;
            }
        });
        setScore(correctCount);
        setIsSubmitted(true);
    };

    const restartQuiz = () => {
    setStep(1); 
    setCurrentQuestion(0);  
    setSelectedAnswers({});  
    setIsSubmitted(false);  
    setScore(0);  
    };

    if (step === 0) {
        return (
            <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-green-400 text-center">GeeksforGeeks</h1>
                <h3 className="text-2xl font-bold mb-6 text-center">Start Your Quiz</h3>
                <div className="flex flex-col mb-4">
                    <label className="text-lg text-gray-800 mb-2" htmlFor="topic">
                        Enter the topic of the quiz:
                    </label>
                    <input
                        type="text"
                        id="topic"
                        value={topic}
                        onChange={handleTopicChange}
                        className="border-2 border-gray-300 p-2 rounded-md"
                    />
                </div>
                <button
                    onClick={startQuiz}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                >
                    Start Quiz
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
            {isSubmitted ? (
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-center">Quiz Result</h2>
                    <p className="text-lg font-semibold mb-2 text-center">Your Score: {score}/{questions.length}</p>
                    <button onClick={restartQuiz} className="bg-red-500 text-white px-4 py-2 rounded-md mt-4">Restart Quiz</button>
                </div>
            ) : (
                <div>
                    <h3 className="text-xl font-bold mb-4">{questions[currentQuestion]?.question}</h3>
                    {Object.keys(questions[currentQuestion]?.options).map((key) => (
                        <div className="flex items-center mb-2" key={key}>
                            <input
                                type="radio"
                                id={`${currentQuestion}-${key}`}
                                name={`question-${currentQuestion}`}
                                value={key}
                                checked={selectedAnswers[currentQuestion] === key}
                                onChange={() => handleAnswerSelect(key)}
                                className="mr-2"
                                required
                            />
                            <label htmlFor={`${currentQuestion}-${key}`} className="text-gray-700">
                                {key.toUpperCase()}: {questions[currentQuestion]?.options[key]}
                            </label>
                        </div>
                    ))}
                    <div className="flex justify-between">
                        <button onClick={prevQuestion} className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md">
                            Previous
                        </button>
                        <button onClick={nextQuestion} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md">
                            Next
                        </button>
                    </div>
                    {currentQuestion === questions.length - 1 && (
                        <button onClick={submitQuiz} className="bg-green-500 text-white px-4 py-2 rounded-md mt-4">
                            Submit
                        </button>
                    )}
                </div>
            )}
        </div>
    );
    
};

export default Quiz;
