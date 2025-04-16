// components/Header.js

import React from "react";
import Link from "next/link";

const Header = ({ cityName, searchQuery, handleSearch }) => {
  return (
    <header className="bg-gray-600 text-white p-4  px-6">
      {/* Flex container for header */}
      <div className="flex justify-between items-center">
        {/* Title and Search Box */}
        <div className="flex items-center gap-16 w-[80%]">
          <h1 className="text-3xl font-bold">
            {cityName ? `${cityName} Estate Projects` : "Estate Projects"}
          </h1>

          <input
            type="text"
            placeholder="Search Projects..."
            value={searchQuery}
            onChange={handleSearch}
            className="px-4 py-2 rounded-md border w-[50%] border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Home Button */}
        <Link
          href="/"
          className="text-xl font-bold text-white hover:text-gray-400"
        >
          Home
        </Link>
      </div>
    </header>
  );
};

export default Header;
