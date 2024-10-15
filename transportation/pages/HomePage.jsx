import React, { useState } from "react";
import NavBar from "../components/NavBarComponents/NavBar";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    console.log(`Searching for: ${searchTerm}`);
  };

  return (
    <div className="min-h-screen">
      <NavBar />

      <main className="mx-auto max-w-7xl pt-20 pb-6 w-4/5">
        <div className="flex flex-col justify-center items-center space-y-10">
          {/* Search Box */}
          <div className="w-full max-w-md">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Where to go?"
                className="w-full py-3 pl-10 pr-4 border rounded-full shadow-sm focus:outline-none focus:border-orange-400"
              />
              {/* Search icon */}
              <FaSearch
                onClick={handleSearch}
                className="absolute left-3 top-3 text-gray-500 cursor-pointer hover:text-orange-400"
              />
            </div>
          </div>

          {/* Google Map iframe (Map Box) */}
          <div className="w-full max-w-4xl">
            <iframe
              className="w-full h-[400px] rounded-lg"
              src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=126%20Pracha%20Uthit%20Rd.,%20Bang%20Mod,%20Thung%20Khru,%20Bangkok%2010140,%20Thailand+(sit%20integrated%20transport%20project)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              allowFullScreen
            />
          </div>

          {/* Booking Schedule Button */}
          <Link to="/transport/destination">
          <button className="bg-orange-800 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300">
            BOOKING SCHEDULE
          </button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
