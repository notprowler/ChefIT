import { Link } from "react-router-dom";
import { PiChefHatBold } from "react-icons/pi";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700">
      <div className="max-w-7xl mx-auto py-16 px-12 flex flex-row flex-wrap justify-between gap-8">
        
        {/* Logo and Description */}
        <div className="space-y-4 min-w-[200px]">
          <div className="flex items-center gap-2 text-2xl font-bold text-black-500">
            <PiChefHatBold className="w-8 h-8" />
            ChefIT
          </div>
          <p className="text-sm text-gray-500">
            Turn your ingredients into delicious meals with personalized recipe recommendations.
          </p>
        </div>

        {/* Company Links */}
        <div className="min-w-[100px]">
          <h4 className="font-bold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Help Links */}
        <div className="min-w-[100px]">
          <h4 className="font-bold mb-4">Help</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
            <li><Link to="/support" className="hover:underline">Support</Link></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div className="min-w-[100px]">
          <h4 className="font-bold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacy" className="hover:underline">Privacy</Link></li>
            <li><Link to="/terms" className="hover:underline">Terms</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="text-center py-2 border-t text-sm text-gray-400">
        © 2024 ChefIT. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;