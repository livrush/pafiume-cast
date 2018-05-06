import React from 'react';

function PodcastIcon({ imageUrl }) {
  console.warn(imageUrl);
  return (
    <div className="podcast-icon">
      <img src={imageUrl} alt="" />
    </div>
  )
}

export default PodcastIcon;