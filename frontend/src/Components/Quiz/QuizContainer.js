import React, { useEffect, useState  } from 'react';
import QuizStart from './QuizStart';
import QuizQuestion from './QuizQuestion';
import QuizResult from './QuizResult';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';

const QuizContainer = () => {
    const [step, setStep] = useState(0);
    const [topic, setTopic] = useState("");
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [profileOpen, setProfileOpen] = useState(false);
    const [asideOpen, setAsideOpen] = useState(true);
    const [name, setName] = useState('');
    const [conversations, setConversations] = useState([]);
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(null);
    const [auth, setAuth] = useState(false);
    const message = "Yeni Test Başlat";

    const toggleProfile = () => setProfileOpen(!profileOpen);
    const toggleSidebar = () => setAsideOpen(!asideOpen);
    const navigate = useNavigate();

    const startNewConversation = () => {
        setSelectedConversationIndex(null);
        setQuestions([]);
        setStep(0);
        setTopic("");
    };

    const onSelectConversation = (index) => {
        const selectedConversation = conversations[index];
        setSelectedConversationIndex(index);
        setQuestions(selectedConversation.questions);
        setTopic(selectedConversation.title);
        setStep(1);
        setCurrentQuestion(0);
        setSelectedAnswers({});
        setIsSubmitted(false);
    };

    const startQuiz = () => {
        const token = localStorage.getItem('auth-token');
        if (topic.trim() !== "") {
            fetch(`http://localhost:3000/api/quiz`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token 
                },
                body: JSON.stringify({ topic }),
            })
         
                .then(res => res.json())
                .then(data => {
                    console.log(1);
                    if (data.quiz.questions && data.quiz.questions.length > 0) {
                        const newConversation = { title: topic, questions: data.quiz.questions };
                        setConversations([...conversations, newConversation]);
                        setQuestions(data.quiz.questions);
                        setStep(1);
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

    const handleTopicChange = (e) => {
        setTopic(e.target.value);
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
        let correctCount = 0;
        questions.forEach((question, index) => {
            if (selectedAnswers[index] === question.answer) {
                correctCount++;
            }
        });
        setScore(correctCount);
        setIsSubmitted(true);
    };

    const createNewQuiz = () => {
        setStep(0);
        setTopic("");
        setQuestions([]);
        setCurrentQuestion(0);
        setSelectedAnswers({});
        setIsSubmitted(false);
        setScore(0);
    };

    const restartQuiz = () => {
        setStep(1);
        setCurrentQuestion(0);
        setSelectedAnswers({});
        setIsSubmitted(false);
        setScore(0);
    };

    useEffect(() => {

        const fetchData = async () => {
          try {

            const token = localStorage.getItem('auth-token');
            const response = await fetch('http://127.0.0.1:3000/api/quiz', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'auth-token': token 
              },
              
            });
      
            const data = await response.json();
            console.log(data);
            if (data.Status === "Success") {
              setAuth(true);
            } else {
              console.error("Authentication failed:", data.error);
              setAuth(false);
            }
          } catch (error) {
            console.error("Error during fetch:", error);
            setAuth(false);
          }
        };
      
        fetchData();
      }, []);
      if (!auth) {
        return (
          <div>
            <h1>You are not authenticated. Please log in.</h1>
            <button onClick={() => navigate('/login')}>Go to Login</button>
          </div>
        );
      }

    return (
        <main className="min-h-screen w-full bg-gray-100 text-gray-700">
            <Header
                toggleSidebar={toggleSidebar}
                profileOpen={profileOpen}
                toggleProfile={toggleProfile}
                userName={name}
            />

            <div className="flex">
                <div className={`transition-all duration-300 ${asideOpen ? 'w-64' : 'w-0'} overflow-hidden`}>
                    <Sidebar
                        isOpen={asideOpen}
                        conversations={conversations}
                        startNewConversation={startNewConversation}
                        onSelectConversation={onSelectConversation}
                        message ={message}
                    />
                </div>
                <div className="flex-1 max-w-md mx-auto bg-gray-200 text-gray-700 p-8 rounded-md shadow-md mt-28 mb-auto">
                    {step === 0 && <QuizStart topic={topic} handleTopicChange={handleTopicChange} startQuiz={startQuiz} />}
                    {step === 1 && !isSubmitted && (
                        <QuizQuestion
                            questions={questions}
                            currentQuestion={currentQuestion}
                            nextQuestion={nextQuestion}
                            prevQuestion={prevQuestion}
                            handleAnswerSelect={handleAnswerSelect}
                            selectedAnswers={selectedAnswers}
                            submitQuiz={submitQuiz}
                        />
                    )}
                    {isSubmitted && (
                        <QuizResult
                            score={score}
                            questions={questions}
                            restartQuiz={restartQuiz}
                            createNewQuiz={createNewQuiz}
                        />
                    )}
                </div>
            </div>
        </main>
    );

};

export default QuizContainer;
