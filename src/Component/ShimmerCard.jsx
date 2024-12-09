import React from 'react';
import './ShimmerCard.css';

const ShimmerCard = () => {
  return (
    <div className='ShimmerCardContainer'>
      <div className="image"></div>
      <div className="textShimmer">
        <div className="title"></div>
        <div className="population"></div>
        <div className="region"></div>
        <div className="capital"></div>
      </div>
    </div>
  );
}

export default ShimmerCard;
