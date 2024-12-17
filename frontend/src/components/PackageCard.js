
import React from 'react';

const PackageCard = ({ packageItem, handleBookNow }) => {
  return (
    <div>
      <h2>{packageItem.title}</h2>
      <img src={packageItem.image} alt={packageItem.title} />
      <p>{packageItem.description}</p>
      <p>Price: ${packageItem.price}</p>
      <button onClick={() => handleBookNow(packageItem._id, packageItem.title, packageItem.price)}>
        Book Now
      </button>
    </div>
  );
};

export default PackageCard;
