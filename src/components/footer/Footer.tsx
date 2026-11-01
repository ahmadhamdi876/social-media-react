 import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-white    ">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-5 py-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold text-xl">
                S
              </div>

              <h2 className="text-xl font-bold">
                Socially
              </h2>
            </div>

            <p className="text-gray-400 text-sm leading-7 max-w-xs">
              Connect with friends, share your moments,
              and discover new people around you.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-5">

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center
                text-gray-400 hover:bg-blue-600 hover:text-white transition duration-300"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center
                text-gray-400 hover:bg-sky-500 hover:text-white transition duration-300"
              >
                <i className="fa-brands fa-twitter"></i>
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center
                text-gray-400 hover:bg-pink-600 hover:text-white transition duration-300"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center
                text-gray-400 hover:bg-red-600 hover:text-white transition duration-300"
              >
                <i className="fa-brands fa-youtube"></i>
              </a>

            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Navigation
            </h3>

            <ul className="space-y-3">

              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Profile
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Login
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Register
                </a>
              </li>

            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Support
            </h3>

            <ul className="space-y-3">

              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Help Center
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Contact Us
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Privacy Policy
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Terms & Conditions
                </a>
              </li>

            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Stay Connected
            </h3>

            <p className="text-gray-400 text-sm leading-6 mb-4">
              Subscribe to get the latest updates and news.
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-gray-800 border border-gray-700
                rounded-l-lg px-4 py-2.5 text-sm text-white
                placeholder-gray-500 outline-none
                focus:border-blue-500"
              />

              <button
                className="bg-blue-600 px-4 rounded-r-lg
                hover:bg-blue-700 transition duration-300"
              >
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">

        <div className="max-w-7xl mx-auto px-5 py-5
          flex flex-col sm:flex-row
          items-center justify-between gap-3"
        >

          <p className="text-gray-500 text-sm">
            © 2026 Socially. All rights reserved.
          </p>

          <p className="text-gray-500 text-sm">
            Made with ❤️ for our community
          </p>

        </div>

      </div>

    </footer>
  );
}