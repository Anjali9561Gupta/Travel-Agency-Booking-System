import React, { useState, useEffect } from 'react';

const AdminPackageForm = ({ onSubmit, packageData }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    availableDates: [''],
    image: '',
  });

  useEffect(() => {
    if (packageData) {
      setFormData({
        title: packageData.title,
        description: packageData.description,
        price: packageData.price,
        availableDates: packageData.availableDates,
        image: packageData.image,
      });
    }
  }, [packageData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddDate = () => {
    setFormData({ ...formData, availableDates: [...formData.availableDates, ''] });
  };

  const handleRemoveDate = (index) => {
    const newDates = formData.availableDates.filter((_, i) => i !== index);
    setFormData({ ...formData, availableDates: newDates });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      description: '',
      price: '',
      availableDates: [''],
      image: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Add or Edit Package</h3>
      
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-600">Package Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-600">Description</label>
        <textarea
          name="description"
          id="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="block text-gray-600">Price</label>
        <input
          type="number"
          name="price"
          id="price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="availableDates" className="block text-gray-600">Available Dates</label>
        {formData.availableDates.map((date, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="date"
              name="availableDates"
              value={date}
              onChange={(e) => {
                const newDates = [...formData.availableDates];
                newDates[index] = e.target.value;
                setFormData({ ...formData, availableDates: newDates });
              }}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => handleRemoveDate(index)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddDate}
          className="mt-2 text-blue-500 hover:underline"
        >
          Add Another Date
        </button>
      </div>

      <div className="mb-4">
        <label htmlFor="image" className="block text-gray-600">Image URL</label>
        <input
          type="text"
          name="image"
          id="image"
          value={formData.image}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 mt-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
      >
        {packageData ? 'Update Package' : 'Add Package'}
      </button>
    </form>
  );
};

export default AdminPackageForm;
