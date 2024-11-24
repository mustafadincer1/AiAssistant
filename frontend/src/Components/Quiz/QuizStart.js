import React from 'react';

const QuizStart = ({ topic, handleTopicChange, startQuiz }) => {
    return (
        <>

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
        </>
    );
};

export default QuizStart;
