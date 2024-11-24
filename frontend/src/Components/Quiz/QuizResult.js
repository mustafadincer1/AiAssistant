import React from 'react';

const QuizResult = ({ score, questions, restartQuiz,createNewQuiz }) => {
    return (
        <>
            <h2 className="text-2xl font-bold mb-4 text-center">Quiz Result</h2>
            <p className="text-lg font-semibold mb-2 text-center">Your Score: {score}/{questions.length}</p>
            <button onClick={restartQuiz} className="bg-red-500 text-white px-4 py-2 rounded-md mt-4">Restart Quiz</button>
            <button onClick={createNewQuiz} className="bg-green-500 text-white px-4 py-2 rounded-md mt-4">New Quiz</button>
        </>
    );
};

export default QuizResult;
