import React, { useState } from 'react';
import { FaArrowLeft, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const BookingPage = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const navigate = useNavigate(); // Create a navigate function

  // Function to handle back navigation
  const handleBackClick = () => {
    navigate('/transport/destination'); // Adjust the route as per your setup
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Top colored box with the back button and profile icon */}
      <div className="flex justify-between items-center p-4 text-white bg-gradient-to-r from-[#c2544d] to-[#f09107]">
        {/* Back button */}
        <button className="flex items-center space-x-2 text-lg" onClick={handleBackClick}>
          <FaArrowLeft />
          <span>Back</span>
        </button>

        {/* Profile icon */}
        <div className="text-3xl">
          <FaUserCircle />
        </div>
      </div>

      {/* Main content section */}
      <div className="flex flex-grow justify-center items-center">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Booking</h2>

          {/* Calendar input */}
          <div className="flex flex-col items-center mb-8">
            <input
              type="date"
              className="border border-gray-300 p-3 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={date}
              onChange={handleDateChange}
            />
            <input
              type="time"
              className="mt-4 border border-gray-300 p-3 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={time}
              onChange={handleTimeChange}
            />
          </div>

          {/* Book Now button */}
          <div className="flex justify-center">
            <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-lg">
              Book Now!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
