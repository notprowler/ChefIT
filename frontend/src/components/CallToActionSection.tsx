import { Link } from "react-router-dom";

const CallToActionSection = () => {
  return (
    <section className="bg-orange-500 py-16 px-6 text-center">
      <div className="max-w-3xl mx-auto flex flex-col items-center space-y-8 text-white">
      <h2 className="text-4xl md:text-4xl font-bold leading-tight">
        Ready to Transform Your Cooking?
    </h2>
        <p className="text-1g md:text-2xl font-semibold max-w-2xl py-2">
          Join thousands of home chefs who have discovered the joy of cooking
          with ingredients they already have.
        </p>
        <div>
        <Link
            to="/signup"
            className="inline-block bg-white hover:bg-gray-100 text-orange-400 text-lg md:text-xl font-bold px-12 py-3 rounded-lg shadow-md transition-colors"
        >
            Get Started for Free
        </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;