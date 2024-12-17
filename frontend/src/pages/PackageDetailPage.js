import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PackageDetailsPage = () => {
  const { id } = useParams();
  const [packageDetails, setPackageDetails] = useState(null);

  useEffect(() => {
    axios.get(`/api/packages/${id}`)
      .then(response => {
        setPackageDetails(response.data);
      })
      .catch(error => console.error('Error fetching package details:', error));
  }, [id]);

  const handleBooking = (event) => {
    event.preventDefault();
  
  };

  if (!packageDetails) return <div>Loading...</div>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold">{packageDetails.title}</h1>
        <p className="mt-4 text-gray-600">{packageDetails.description}</p>
        <img src={packageDetails.image} alt={packageDetails.title} className="w-full h-64 object-cover mt-4"/>
        <p className="font-bold text-lg mt-4">${packageDetails.price}</p>

        <form onSubmit={handleBooking} className="mt-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" className="w-full p-2 border border-gray-300 rounded mt-1" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Number of Travelers</label>
            <input type="number" className="w-full p-2 border border-gray-300 rounded mt-1" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Special Requests (Optional)</label>
            <textarea className="w-full p-2 border border-gray-300 rounded mt-1" rows="4"></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4">Book Now</button>
        </form>
      </div>
    </div>
  );
};

export default PackageDetailsPage;
