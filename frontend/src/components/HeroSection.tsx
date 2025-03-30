import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="scroll-mt-20 bg-gradient-to-r from-orange-100 to-orange-200 py-24 px-4"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        <div className="space-y-6">
          <span className="inline-block bg-orange-200 text-orange-600 text-sm font-semibold px-3 py-1 rounded-full">
            Delicious Made Simple
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Cook Amazing Meals<br />
            with What You <span className="text-orange-500">Already Have</span>
          </h1>

          <p className="text-gray-700 text-lg max-w-md">
            Enter your ingredients and discover personalized recipes tailored to what’s in your kitchen right now.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/recipes"
              className="bg-orange-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-orange-600 text-center w-full sm:w-auto"
            >
              Find Recipes
            </Link>
            <Link
              to="/signup"
              className="border border-orange-500 text-orange-500 px-6 py-3 rounded-md font-semibold hover:bg-orange-100 text-center w-full sm:w-auto"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div> {/* ✅ This was missing */}
    </section>
  );
};

export default HeroSection;
