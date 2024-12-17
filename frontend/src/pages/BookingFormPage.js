
import React from 'react';
import { useParams } from 'react-router-dom';
import BookingForm from '../components/BookingForm';

const BookingFormPage = () => {
  const { id } = useParams();

  const handleBookingSubmit = (formData) => {
    formData.packageId = id;
    };

  return (
    <div>
      <h1>Booking Form</h1>
      <BookingForm onSubmit={handleBookingSubmit} />
    </div>
  );
};

export default BookingFormPage;
