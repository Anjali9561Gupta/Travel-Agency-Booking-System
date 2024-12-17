
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminPackageForm from "../components/AdminPackageForm";

const AdminDashboardPage = () => {
  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [currentPackage, setCurrentPackage] = useState(null);

  // Fetch packages
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/packages")
      .then((response) => {
        setPackages(response.data.packages);
      })
      .catch((error) => console.error("Error fetching packages:", error));
  }, []);

  // Fetch bookings
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/bookings")
      .then((response) => {
        setBookings(response.data.bookings);
      })
      .catch((error) => console.error("Error fetching bookings:", error));
  }, []);

  // Add a package
  const handleAddPackage = (newPackage) => {
    axios
      .post("http://localhost:5000/api/admin/packages", newPackage)
      .then((response) => {
        setPackages([...packages, response.data]);
      })
      .catch((error) => console.error("Error adding package:", error));
  };

  // Update a package
   const handleUpdatePackage = (updatedPackage) => {
  axios
  .put(
    `http://localhost:5000/api/admin/packages/${updatedPackage._id}`, // Correct the endpoint
    updatedPackage
  )
  .then((response) => {
    const updatedPackages = packages.map((packageItem) =>
      packageItem._id === updatedPackage._id ? response.data : packageItem
    );
    setPackages(updatedPackages);
    setCurrentPackage(null); // Reset form
  })
  .catch((error) => console.error("Error updating package:", error));

};

  

const handleDeletePackage = (id) => {
  console.log("Deleting package with ID:", id);  // Log package ID
  if (!id) {
    console.error("Error: Package ID is undefined");
    return;
  }

  axios
    .delete(`http://localhost:5000/api/admin/packages/${id}`)
    .then((response) => {
      console.log("Delete response:", response.data);  // Log the response
      setPackages(packages.filter((pkg) => pkg._id !== id));
    })
    .catch((error) => {
      console.error("Error deleting package:", error.response?.data || error.message);
    });
};



  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-8">
        <h2 className="text-4xl font-semibold text-gray-800 mb-6 text-center">
          Admin Dashboard
        </h2>

        <div className="flex flex-col lg:flex-row lg:space-x-8">
          {/* Package Form */}
          <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-lg mb-8 lg:mb-0">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
              {currentPackage ? "Edit Package" : "Add New Package"}
            </h3>
            <AdminPackageForm
              onSubmit={currentPackage ? handleUpdatePackage : handleAddPackage}
              packageData={currentPackage}
            />
          </div>

          {/* Package List */}
          <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
              Package List
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((packageItem) => (
                <div
                  key={packageItem._id}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200"
                >
                  <img
                    src={packageItem.image}
                    alt={packageItem.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h4 className="text-lg font-semibold text-gray-700">
                    {packageItem.title}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {packageItem.description}
                  </p>
                  <p className="text-lg font-bold text-indigo-600 mt-2">
                    ${packageItem.price}
                  </p>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => setCurrentPackage(packageItem)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-200"
                    >
                      Edit
                    </button>
                   
                    <button
  onClick={() => {
    console.log("Deleting package with ID:", packageItem._id); 
    handleDeletePackage(packageItem._id);
  }}
  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
>
  Delete
</button>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            Booking List
          </h3>
          {bookings.length === 0 ? (
            <p className="text-gray-500 text-center">No bookings available.</p>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Package</th>
                  <th className="px-4 py-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} className="border-b">
                    <td className="px-4 py-2">{booking.name}</td>
                    <td className="px-4 py-2">{booking.email}</td>
                    <td className="px-4 py-2">{booking.packageTitle}</td>
                    <td className="px-4 py-2">{booking.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;


