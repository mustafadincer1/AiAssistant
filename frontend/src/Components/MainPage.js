import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

function MainPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-gray-800 text-white sticky top-0 z-10">
                <section className="max-w-4xl mx-auto p-4 flex justify-between">
                    <h1 className="text-3xl font-medium">
                        <a href="#hero">ChatBot</a>
                    </h1>
                    <div>
                        <button id="mobile-open-button" className="text-3xl sm:hidden focus:outline-none">
                            &#127828;
                        </button>
                        <nav className="hidden sm:block space-x-8 text-xl" aria-label="main">
                        <Link to="/login" className="text-white hover:text-gray-300 transition text-xl hover:opacity-90 ">Login</Link>
                        <Link to="/register" className="text-white hover:text-gray-300 transition text-xl hover:opacity-90 ">Register</Link>
                            <a href="#contact" className="text-white hover:text-gray-300 transition text-xl hover:opacity-90">Contact Us</a>
                        </nav>
                    </div>
                </section>
            </header>

            <main className="max-w-4xl mx-auto">
                <section id="hero" className="flex flex-col-reverse justify-center sm:flex-row p-6 items-center gap-8 mb-12 scroll-mt-40">
                    <article className="sm:w-1/2">
                        <h2 className="max-w-md text-4xl font-bold text-center sm:text-5xl sm:text-left text-slate-900">
                            We Do Everything <span className="text-indigo-700">Which You Need</span> For You
                        </h2>
                        <p className="max-w-md text-2xl mt-4 text-center sm:text-left text-slate-700">
                            We're helping the AL
                        </p>
                    </article>
                    <img width="400" height="400" src="./img/al2.webp" alt="Rocket Dab" />
                </section>

                <hr className="mx-auto bg-black w-1/2" />

                <section id="services" className="p-6 my-12 -scroll-mt-20">
                    <h2 className="text-4xl font-bold text-center sm:text-5xl text-slate-900">Our Services</h2>
                    <ul className="list-none mx-auto my-12 flex flex-col sm:flex-row items-center gap-8">
                        <li className="w-1/2 sm:w-5/6 flex flex-col items-center border border-solid border-slate-900 py-6 px-2 rounded-3xl shadow-xl">
                            <img width="121" height="121" src="./img/images (3).png" alt="Chat" className="w-1/2" />
                            <h3 className="text-3xl text-center text-slate-900">ChatBot</h3>
                            <p className="hidden sm:block text-3xl text-center mt-2 text-slate-500">$</p>
                        </li>
                        <li className="w-1/2 sm:w-5/6 flex flex-col items-center border border-solid border-slate-900 py-6 px-2 rounded-3xl shadow-xl">
                            <img src="./img/ai-quiz-1024x536.webp" alt="Adventurer" className="w-1/2" />
                            <h3 className="text-3xl text-center text-slate-900">Quiz App</h3>
                            <p className="hidden sm:block text-3xl text-center mt-2 text-slate-500">$$</p>
                        </li>
                    </ul>
                </section>

                <hr className="mx-auto bg-black w-1/2" />

                <section id="contact" className="p-6 my-12">
                    <h2 className="text-4xl font-bold text-center sm:text-5xl text-slate-900">Contact Us</h2>
                    <form className="max-w-4xl mx-auto text-2xl sm:text-3xl flex flex-col items-start gap-4">
                        <label htmlFor="subject">Subject:</label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            required
                            className="w-full text-black text-2xl sm:text-3xl p-3 rounded-xl border border-solid border-slate-900"
                        />
                        <label htmlFor="message">Message:</label>
                        <textarea
                            name="message"
                            id="message"
                            cols="30"
                            rows="10"
                            className="w-full text-black text-2xl sm:text-3xl p-3 rounded-xl border border-solid border-slate-900"
                        ></textarea>
                        <button
                            className="bg-gray-500  text-white p-3 w-48 rounded-xl border border-solid border-slate-900"
                        >
                            Submit
                        </button>
                    </form>
                </section>
            </main>

            <footer className="bg-gray-800 text-white text-xl">
                <section className="max-w-4xl mx-auto p-4 flex flex-col sm:flex-row sm:justify-between">
                    <address>
                        <h2>ChatBot</h2>
                        <br />
                        Email: <a href="mailto:m@outlook.com">m@outlook.com</a>
                        <br />
                        Phone: <a href="tel:5555555555">(555) 555-5555</a>
                    </address>
                    <nav className="hidden md:flex flex-col gap-2" aria-label="footer">
                        <a href="#services" className="hover:opacity-90">Our Services</a>
                        <a href="#contact" className="hover:opacity-90">Contact us</a>
                    </nav>
                </section>
            </footer>
        </div>
    );
}

export default MainPage;
