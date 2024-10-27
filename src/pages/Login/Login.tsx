import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/context/AuthContext";
import { useRef, useState } from "react";

export default function Login() {
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const emailRef = useRef()
  const passwordRef = useRef()
  const navigate = useNavigate()
  const location = useLocation()
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailRef.current?.value || !passwordRef.current?.value) {
      return setError('Fill all the fields');
    }

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      // console.log('Login successful'); // Debugging log

      // Use default '/' if location.state.path is undefined
      const redirectPath = location.state?.path || '/';
      // console.log('Redirecting to:', redirectPath); // Debugging log
      navigate(redirectPath, { replace: true });
    } catch (error) {
      console.error('Login failed:', error); // Debugging log
      setError(error?.message || 'Login failed, please try again.');
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
        <form onSubmit={(e) => handleSubmit(e)} className="bg-[#121E2E] text-white p-10 rounded-r-md w-full max-w-md flex flex-col gap-6">
          <h2 className="text-2xl font-semibold">Account Login</h2>
          {error && <p className="text-red-500 text-center rounded-md p-2">invalid Credentials</p>}
          <label htmlFor="email" className="text-sm">Email Address</label>
          <input
            className="rounded p-3 text-black focus:outline-none"
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            onInput={() => setError('')}
            ref={emailRef}
          />
          <label htmlFor="password" className="text-sm">Password</label>
          <input
            className="rounded p-3 text-black focus:outline-none"
            type="password"
            name="password"
            id="password"
            placeholder="******************"
            onInput={() => setError('')}
            ref={passwordRef}
          />
          <button disabled={loading} className="bg-[#2A73D3] hover:bg-[#0D2D56] rounded p-3 mt-4 transition">
            Log in
          </button>
          <p className="text-sm">
            Forgot Password?{" "}
            <Link to="/forgot-password" className="text-[#2A73D3] hover:underline">
              Click here
            </Link>
          </p>
          <p className="text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#2A73D3] hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}