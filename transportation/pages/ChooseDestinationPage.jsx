import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaArrowLeft, FaUserCircle, FaStar, FaTrashAlt, FaBus, FaBicycle, FaTruck, FaWalking } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import { MdLocationOn } from 'react-icons/md';
import axios from 'axios'; // For API requests

const ChooseDestinationPage = () => {
  const navigate = useNavigate(); // Create a navigate function

  const [recentTrips, setRecentTrips] = useState([
    { id: 1, location: 'Ratchaburi Campus', isFavorite: false },
    { id: 2, location: 'Bangmod campus', isFavorite: true },
    { id: 3, location: 'Bangkhuntien Campus', isFavorite: false },
    { id: 4, location: 'KMUTT KX', isFavorite: false },
  ]);

  const [destination, setDestination] = useState('');
  const [currentLocation, setCurrentLocation] = useState('Getting current location...');
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [transportMode, setTransportMode] = useState('');

  // Function to navigate back to the HomePage when back button is clicked
  const handleBackClick = () => {
    navigate('/transport/home'); // Assuming your HomePage.jsx route is '/'
  };

  // Function to get user's coordinates
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation(`Lat: ${latitude}, Long: ${longitude}`);
        },
        (error) => {
          console.error("Error fetching location:", error);
          setCurrentLocation('Unable to retrieve location');
        }
      );
    } else {
      setCurrentLocation('Geolocation is not supported by your browser.');
    }
  }, []);

  // Function to fetch real-time destination suggestions using OpenCage API
  useEffect(() => {
    if (destination.length > 2) {
      const fetchDestinationSuggestions = async () => {
        const apiKey = 'e0a5497dea8f447ba7d692339b463507'; // Your OpenCage API Key
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${destination}&key=${apiKey}&limit=5`;

        try {
          const response = await axios.get(url);
          const results = response.data.results.map((result) => ({
            id: result.annotations.geohash, // Use geohash as unique ID
            location: result.formatted,
          }));
          setFilteredTrips(results);
        } catch (error) {
          console.error('Error fetching destination suggestions:', error);
        }
      };
      fetchDestinationSuggestions();
    } else {
      setFilteredTrips([]); // Clear suggestions if input is empty or too short
    }
  }, [destination]);

  const handleSuggestionClick = (location) => {
    setDestination(location);
    navigate('/transport/booking', { state: { destination: location, transportMode } });
  };

  const handleTransportModeClick = (mode) => {
    setTransportMode(mode);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Top colored box with the back button and profile icon */}
      <div className="flex justify-between items-center p-4 text-white bg-gradient-to-r from-[#c2544d] to-[#f09107]">
        {/* Back button to navigate to HomePage */}
        <button className="flex items-center space-x-2 text-lg" onClick={handleBackClick}>
          <FaArrowLeft />
          <span>Back</span>
        </button>

        <div className="text-3xl">
          <FaUserCircle />
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-grow flex justify-center items-start pt-7">
        <div className="w-full max-w-lg text-center space-y-4">
          <h1 className="text-2xl font-bold mb-4">Get Directions</h1>

          {/* Current location input */}
          <div className="flex items-center border border-gray-300 rounded-md p-2 mx-auto w-full">
            <IoLocationSharp className="text-2xl text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Your current location"
              className="w-full p-2 outline-none"
              value={currentLocation}
              readOnly
            />
          </div>

          {/* Destination input with filter suggestions */}
          <div className="flex items-center border border-gray-300 rounded-md p-2 mx-auto w-full mt-2 relative">
            <MdLocationOn className="text-2xl text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Destination"
              className="w-full p-2 outline-none"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            {filteredTrips.length > 0 && (
              <div className="absolute top-12 left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {filteredTrips.map((trip) => (
                  <div
                    key={trip.id}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSuggestionClick(trip.location)}
                  >
                    {trip.location}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Transport mode selection */}
          <div className="flex justify-around items-center bg-gray-100 p-3 rounded-lg mt-2 w-8/12 mx-auto">
            <button
              className={`text-2xl ${transportMode === 'bus' ? 'text-orange-600' : 'text-gray-400'}`}
              onClick={() => handleTransportModeClick('bus')}
            >
              <FaBus />
            </button>
            <button
              className={`text-2xl ${transportMode === 'bicycle' ? 'text-orange-600' : 'text-gray-400'}`}
              onClick={() => handleTransportModeClick('bicycle')}
            >
              <FaBicycle />
            </button>
            <button
              className={`text-2xl ${transportMode === 'truck' ? 'text-orange-600' : 'text-gray-400'}`}
              onClick={() => handleTransportModeClick('truck')}
            >
              <FaTruck />
            </button>
            <button
              className={`text-2xl ${transportMode === 'walking' ? 'text-orange-600' : 'text-gray-400'}`}
              onClick={() => handleTransportModeClick('walking')}
            >
              <FaWalking />
            </button>
          </div>

          <div className="flex justify-center mt-4">
            <button className="bg-orange-600 text-white py-3 px-6 rounded-full shadow-md flex items-center space-x-2">
              <span>Choose on Map</span>
              <span className="text-xl">&#128506;</span>
            </button>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-left">Recent Trips</h2>
            <div className="space-y-4">
              {recentTrips.map((trip) => (
                <div
                  key={trip.id}
                  className="flex justify-between items-center border p-3 rounded-md bg-gray-50 shadow-sm"
                >
                  <div className="flex items-center">
                    <FaBus className="text-orange-600 mr-3" />
                  </div>
                  <div className="flex-grow text-center">
                    <span className="text-gray-700">{trip.location}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      className={`text-xl ${trip.isFavorite ? 'text-yellow-500' : 'text-gray-400'}`}
                      onClick={() => toggleFavorite(trip.id)}
                    >
                      <FaStar />
                    </button>
                    <button className="text-xl text-red-500" onClick={() => removeTrip(trip.id)}>
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseDestinationPage;
