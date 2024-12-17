import React, { useState } from 'react';
import axios from 'axios';

const BookingFormModal = ({ packageDetails, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelers: 1,
    specialRequests: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const totalPrice = packageDetails.price * formData.travelers;

    const bookingData = {
      ...formData,
      packageId: packageDetails._id,
      packageTitle: packageDetails.title,
      pricePerPerson: packageDetails.price,
      totalPrice,
    };

    try {
      await axios.post('http://localhost:5000/api/bookings', bookingData);
      alert('Booking successful!');
      onClose(); // Close modal
    } catch (error) {
      console.error('Error saving booking:', error);
      alert('Failed to book. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Book {packageDetails.title}</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Number of Travelers</label>
            <input
              type="number"
              name="travelers"
              value={formData.travelers}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              min="1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Special Requests (Optional)</label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              rows="4"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Confirm Booking
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 text-red-500 underline w-full text-center"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BookingFormModal;
