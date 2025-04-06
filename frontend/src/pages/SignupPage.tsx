// import React from "react";

function SignupPage() {
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
        <form className="mt-6 space-y-5">
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
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-green-600
                         focus:ring-0 focus:ring-offset-0"
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I agree to the{" "}
              <a href="#" className="text-green-600 hover:underline">
                terms of service
              </a>{" "}
              and{" "}
              <a href="#" className="text-green-600 hover:underline">
                privacy policy
              </a>
            </label>
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            className="w-full rounded bg-green-600 py-2 text-sm font-medium text-white
                       hover:bg-green-700 focus:outline-none focus:ring-2
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
            className="flex w-1/2 items-center justify-center space-x-2
                       rounded border border-gray-300 py-2 text-sm
                       hover:bg-gray-100 focus:outline-none"
          >
            <span>Google</span>
          </button>
          <button
            type="button"
            className="flex w-1/2 items-center justify-center space-x-2
                       rounded border border-gray-300 py-2 text-sm
                       hover:bg-gray-100 focus:outline-none"
          >
            <span>Facebook</span>
          </button>
        </div>

        {/* Sign In Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="#" className="text-green-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
