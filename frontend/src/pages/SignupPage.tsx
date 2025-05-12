import { useState } from "react";
import { signUp } from "@/services/authService";
import { Link, useNavigate } from "react-router-dom";

function SignupPage() {
  const [name, setName] = useState(""); // We'll still collect name (optional for now)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await signUp(email, password);

    if (error) {
      alert(error.message);
    } else {
      alert("Signup successful! Please check your email to verify.");
      navigate("/login");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-md bg-white p-8 shadow">
        <h1 className="text-center text-2xl font-bold">ChefIT</h1>
        <h2 className="mt-2 text-center text-xl font-semibold">
          Create an account
        </h2>
        <p className="mt-1 text-center text-sm text-gray-500">
          Enter your details below to create your account
        </p>

        {/* Form */}
        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            className="w-full rounded bg-orange-400 py-2 text-sm font-medium text-white
                       hover:bg-orange-600 focus:outline-none focus:ring-2
                       focus:ring-green-600 focus:ring-offset-2"
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-gray-300"></div>
          <p className="px-2 text-sm text-gray-500">OR CONTINUE WITH</p>
          <div className="h-px flex-1 bg-gray-300"></div>
        </div>

        {/* Other Sign Up Options */}
        <div className="flex space-x-4">
          <button
            type="button"
            disabled
            className="flex w-1/2 items-center justify-center space-x-2
                       rounded border border-gray-300 py-2 text-sm
                       bg-gray-200 cursor-not-allowed"
          >
            <span>Google</span>
          </button>
          <button
            type="button"
            disabled
            className="flex w-1/2 items-center justify-center space-x-2
                       rounded border border-gray-300 py-2 text-sm
                       bg-gray-200 cursor-not-allowed"
          >
            <span>Facebook</span>
          </button>
        </div>

        {/* Sign In Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login">
            <a href="#" className="text-orange-400 hover:underline">
              Sign in
            </a>
          </Link>
        </p>
        <p className="mt-6 text-center text-sm text-gray-600">
          <Link to="/">
            <a href="#" className="text-orange-400 hover:underline">
              Home
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
