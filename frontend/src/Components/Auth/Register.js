import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        role:""
    });

    const [error, setError] = useState(""); // Hata mesajını tutacak state
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("daasfsa");
        console.log(values);
        axios.post("http://localhost:3000/api/user/register", values)
            .then(res => {
                if (res.status === 200) {
                    navigate("/login");
                    console.log(res);
                    setError(""); // Başarılı olursa hatayı temizle
                }
            })
            .catch(err => {
                console.log(err.response.data);
                setError(err.response.data); // Hata mesajını state'e kaydet
            });
    };

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-800 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"
                    />
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <div className="max-w-md mx-auto">
                            <h1 className="text-2xl font-semibold">Register</h1>
                            {error && <div className="text-red-500">{error}</div>} {/* Hata mesajı */}
                            <div className="divide-y divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="relative">
                                        <input
                                            autoComplete="off"
                                            id="name"
                                            name="name"
                                            type="text"
                                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                            placeholder="Name"
                                            onChange={handleChange}
                                        />
                                        <label
                                            htmlFor="name"
                                            className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                        >
                                            Name
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            autoComplete="off"
                                            id="email"
                                            name="email"
                                            type="text"
                                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                            placeholder="Email address"
                                            onChange={handleChange}
                                        />
                                        <label
                                            htmlFor="email"
                                            className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                        >
                                            Email Address
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            autoComplete="off"
                                            id="password"
                                            name="password"
                                            type="password"
                                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                            placeholder="Password"
                                            onChange={handleChange}
                                        />
                                        <label
                                            htmlFor="password"
                                            className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                        >
                                            Password
                                        </label>
                                    </div>
                                    <div className="relative">
                                <select
                                    id="role"
                                    name="role"
                                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                    onChange={handleChange}
                                >
                                    <option value="" disabled selected>Select your role</option>
                                    <option value="student">Student</option>
                                    <option value="employer">Employer</option>
                                </select>
                                <label
                                    htmlFor="role"
                                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm transition-all"
                                >
                                    Role
                                </label>
                            </div>
                                    <div className="relative">
                                        <button className="bg-gray-500 text-white rounded-md px-2 py-1">
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Register;
