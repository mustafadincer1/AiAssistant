import React from 'react';

const QuizQuestion = ({ questions, currentQuestion, nextQuestion, prevQuestion, handleAnswerSelect, selectedAnswers, submitQuiz }) => {
    return (
        <>
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
        </>
    );
};

export default QuizQuestion;
