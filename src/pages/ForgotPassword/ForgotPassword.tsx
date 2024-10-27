import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../lib/context/AuthContext";

export default function ForgotPassword() {
    const { resetPassword } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const emailRef = useRef()
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!emailRef.current?.value) {
            return setError('Fill all the fields');
        }
        try {
            setError('');
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage('Check your inbox for further instructions');
        } catch (error) {
            console.error('Login failed:', error); // Debugging log
            setError('Failed to reset password, please try again.');
            setLoading(false);
        }
    };
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex shadow-lg">
                {/* Left Section */}
                <div className="flex flex-col items-center w-full justify-between bg-[#0D2D56] text-white p-10 max-w-md rounded-l-md">
                    <h1 className="text-4xl font-semibold text-gray-400">Royal Taxi</h1>
                    <p className="text-center text-lg leading-relaxed">
                        Passion drives amateurs. <br />
                        Responsibility drives professionals. <br />
                        Curiosity drives geniuses.
                    </p>
                    <h3 className="text-white mt-4">❤ Ahmed Eid</h3>
                </div>

                {/* Right Section */}
                <form onSubmit={(e) => { handleSubmit(e) }} className="bg-[#121E2E] text-white p-10 rounded-r-md w-full max-w-md flex flex-col gap-6">
                    <h2 className="text-2xl font-semibold">Forgot Password</h2>
                    {error && <p className="text-red-500 text-center rounded-md p-2">{error}</p>}
                    {message && <p className="text-green-500 text-center rounded-md p-2">{message}</p>}
                    <label htmlFor="email" className="text-sm">Email Address</label>
                    <input
                        className="rounded p-3 text-black focus:outline-none"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email Address"
                        ref={emailRef}
                        onInput={() => { setError('') }}
                    />
                    <button disabled={loading} type="submit" className="bg-[#2A73D3] hover:bg-[#0D2D56] rounded p-3 mt-4 transition">
                        Reset Password
                    </button>
                    <p className="mt-4 text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="text-[#2A73D3] hover:underline">
                            Log in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
