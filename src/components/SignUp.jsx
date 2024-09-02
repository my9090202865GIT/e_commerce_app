import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { doSignUp } from "../redux/features/authSlice";


const Signup = ({ closehandler }) => {
    // State variables for form inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useDispatch();

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate inputs and perform signup logic here
        dispatch(doSignUp({ email, password }))
        closehandler()
        // console.log(email, password, confirmPassword);
    };

    return (
        <div className="flex items-center justify-center min-h-4 bg-gray-100">
            <div className="max-w-md w-full px-6 py-12 bg-white shadow-md rounded-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
                    Create your account
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Email address
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="********"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Confirm password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="********"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                        >
                            Sign up
                        </button>
                    </div>
                    {/* <div className="text-sm text-center text-gray-500">
                        Already have an account?{" "}
                        <Link to="/login" className="text-indigo-600 hover:text-indigo-700">
                            Log in
                        </Link>
                    </div> */}
                </form>
            </div>
        </div>
    );
}

export default Signup;
