
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookingFormModal from '../components/BookingForm';

const HomePage = () => {
  const [packages, setPackages] = useState([]); 
  const [selectedPackage, setSelectedPackage] = useState(null); 
  const [page, setPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const limit = 10; // Items per page

  // Fetch packages with pagination
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/packages?page=${page}&limit=${limit}`
        );
        setPackages(response.data.packages);
        setTotalPages(Math.ceil(response.data.total / limit)); // Calculate total pages
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchPackages();
  }, [page]); // Refetch when page changes

  const handleBookNow = (pkg) => {
    setSelectedPackage(pkg); // Set selected package for booking
  };

  // Handle next page
  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  // Handle previous page
  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center mb-6">Our Packages</h1>

      {/* Package Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg._id} className="bg-white shadow-lg rounded-lg p-4">
            <img
              src={pkg.image}
              alt={pkg.title}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold">{pkg.title}</h2>
            <p className="text-gray-600 mb-2">{pkg.description}</p>
            <p className="text-xl font-bold text-green-600 mb-2">${pkg.price}</p>

            {/* Available Dates */}
            <div className="mb-2">
              <h3 className="text-md font-semibold text-gray-700">Available Dates:</h3>
              <ul className="list-disc list-inside text-gray-500">
                {pkg.availableDates.map((date, index) => (
                  <li key={index}>{date}</li>
                ))}
              </ul>
            </div>

            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={() => handleBookNow(pkg)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="mx-2 bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="mx-2">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="mx-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>

      {/* Booking Form Modal */}
      {selectedPackage && (
        <BookingFormModal
          packageDetails={selectedPackage}
          onClose={() => setSelectedPackage(null)}
        />
      )}
    </div>
  );
};

export default HomePage;

