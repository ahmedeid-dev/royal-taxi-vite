import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/context/AuthContext";

export default function UpdateProfile() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const { updateUserPassword, updateUserEmail } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError('Passwords do not match');
        }
        if (!emailRef.current.value || !passwordRef.current.value || !confirmPasswordRef.current.value) {
            return setError(' Fill all the fields');
        }
        const promises = [];
        setLoading(true);
        setError('');
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateUserEmail(emailRef.current.value));
        }
        if (passwordRef.current.value) {
            promises.push(updateUserPassword(passwordRef.current.value));
        }
        Promise.all(promises)
            .then(() => {
                setMessage('Profile updated successfully');
                navigate('/');
            }).then(() => {
                setError(' Failed to update profile');
            }).finally(() => {
                setLoading(false);
            })
    }
    return <>
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex shadow-lg">
                {/* Left Section */}
                <div className="hidden md:flex flex-col items-center w-full justify-between bg-[#0D2D56] text-white p-10 max-w-md rounded-l-md">
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
                    <h2 className="text-2xl font-semibold">Update Profile</h2>
                    {error && <p className="text-red-500 text-center rounded-md p-2">{error}</p>}
                    {message && <p className="text-green-500 text-center rounded-md p-2">{message}</p>}
                    <label htmlFor="email" className="text-sm">Email Address</label>
                    <input
                        className="rounded p-3 text-black focus:outline-none"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email Address"
                        required
                        defaultValue={currentUser && currentUser.email}
                        ref={emailRef}
                        onInput={() => { setError('') }}
                    />
                    <label htmlFor="password" className="text-sm">Password</label>
                    <input
                        className="rounded p-3 text-black focus:outline-none"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="******************"
                        ref={passwordRef}
                        onInput={() => setError('')}
                    />
                    <label htmlFor="password-confirm" className="text-sm">Confirm Password</label>
                    <input
                        className="rounded p-3 text-black focus:outline-none"
                        type="password"
                        name="password-confirm"
                        id="password-confirm"
                        placeholder="******************"
                        ref={confirmPasswordRef}
                        onInput={() => setError('')}
                    />
                    <button disabled={loading} type="submit" className="bg-[#2A73D3] hover:bg-[#0D2D56] rounded p-3 mt-4 transition">
                        Update
                    </button>

                    <Link to="/" className="bg-red-500 hover:bg-red-700 rounded p-3 text-center mt-4 transition">
                        Cancel
                    </Link>
                </form>
            </div>
        </div>
    </>
}
