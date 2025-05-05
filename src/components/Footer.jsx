import React from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaGooglePlus,
  FaYoutube
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* ABOUT */}
        <div>
          <h3 className="text-lg font-semibold mb-4">ABOUT</h3>
          <p className="text-sm mb-4">
            Thoovanam Enterprises offers premium textile products. We ensure quality, comfort, and trend in every fabric we deliver.
          </p>
          <div className="flex gap-2 items-center mb-2">
            <img
              src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg"
              alt="PayPal"
              className="w-10 h-6 object-contain"
            />
            <img
              src="https://img.icons8.com/color/48/000000/visa.png"
              alt="Visa"
              className="w-10 h-6 object-contain"
            />
            <img
              src="https://img.icons8.com/color/48/000000/mastercard-logo.png"
              alt="MasterCard"
              className="w-10 h-6 object-contain"
            />
          </div>
          <p className="text-xs text-gray-400">Secure Online Payment</p>
        </div>

        {/* CATEGORIES */}
        <div>
          <h3 className="text-lg font-semibold mb-4">CATEGORIES</h3>
          <ul className="text-sm space-y-2">
            <li className="hover:text-gray-300 cursor-pointer">Mens wear</li>
            <li className="hover:text-gray-300 cursor-pointer">Women wear</li>
            <li className="hover:text-gray-300 cursor-pointer">Kids wear</li>
            <li className="hover:text-gray-300 cursor-pointer">Girls wear</li>
            <li className="hover:text-gray-300 cursor-pointer">Boys wear</li>
          </ul>
        </div>

        {/* INFORMATIONS */}
        <div>
          <h3 className="text-lg font-semibold mb-4">INFORMATIONS</h3>
          <ul className="text-sm space-y-2">
            <li className="hover:text-gray-300 cursor-pointer">About Us</li>
            <li className="hover:text-gray-300 cursor-pointer">Contact Us</li>
            <li className="hover:text-gray-300 cursor-pointer">Terms & Conditions</li>
            <li className="hover:text-gray-300 cursor-pointer">Return & Exchange</li>
            <li className="hover:text-gray-300 cursor-pointer">Shipping & Delivery</li>
            <li className="hover:text-gray-300 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-lg font-semibold mb-4">CONTACT</h3>
          <p className="text-sm mb-2">
            <span className="font-medium">Address:</span> XYZ, KEC, India. Pin-Code: 110005
          </p>
          <p className="text-sm mb-2">
            <span className="font-medium">Phone:</span> +91 123456789
          </p>
          <p className="text-sm mb-4">
            <span className="font-medium">Email:</span> contact@thoovanam.com
          </p>
          <div className="flex gap-4 text-2xl">
            <a
              href="https://www.facebook.com/ThoovanamEnterprises"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Profile"
              className="hover:text-blue-500"
            >
              <FaFacebook />
            </a>
            <a
              href="https://plus.google.com/ThoovanamEnterprises"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Google Plus Profile"
              className="hover:text-red-500"
            >
              <FaGooglePlus />
            </a>
            <a
              href="https://www.instagram.com/thoovanam.enterprises"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
              className="hover:text-pink-500"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.youtube.com/c/ThoovanamEnterprises"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube Channel"
              className="hover:text-red-600"
            >
              <FaYoutube />
            </a>
            <a
              href="https://twitter.com/ThoovanamEnt"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter Profile"
              className="hover:text-blue-400"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.linkedin.com/company/thoovanam-enterprises"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="hover:text-blue-700"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center mt-10 text-sm text-gray-500 border-t border-gray-700 pt-4">
        © Thoovanam Enterprises 2025. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
