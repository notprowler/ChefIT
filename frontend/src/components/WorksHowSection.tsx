import { FaSearch, FaUtensils } from "react-icons/fa";
import { PiChefHatFill } from "react-icons/pi";

const steps = [
  {
    id: 1,
    title: "Enter Your Ingredients",
    description: "Tell us what you have in your kitchen, and we’ll work our magic.",
    icon: <FaSearch className="text-green-500 w-6 h-6" />,
  },
  {
    id: 2,
    title: "Discover Recipes",
    description: "Browse personalized recipes that match what you have on hand.",
    icon: <PiChefHatFill className="text-green-500 w-6 h-6" />,
  },
  {
    id: 3,
    title: "Cook & Enjoy",
    description: "Follow easy instructions and enjoy your delicious creation.",
    icon: <FaUtensils className="text-green-500 w-6 h-6" />,
  },
];

const WorksHowSection = () => {
  return (
    <section className="bg-green-50 py-24 px-4">
      <div className="max-w-7xl mx-auto text-center space-y-6">
        <span className="inline-block bg-green-200 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
          Simple Process
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How ChefIT Works</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Turn your kitchen ingredients into delicious meals in just three simple steps
        </p>

        {/* Step Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {steps.map((step) => (
            <div
              key={step.id}
              className="relative bg-white p-6 rounded-xl shadow-md border border-green-100"
            >
              <div className="absolute -top-4 -left-4 bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow">
                {step.id}
              </div>
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorksHowSection;
