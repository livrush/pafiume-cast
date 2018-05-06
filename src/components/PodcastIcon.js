import React from 'react';

function PodcastIcon({ imageUrl }) {
  return (
    <li className="podcast-icon">
      <img src={imageUrl} alt="" />
    </li>
  )
}

export default PodcastIcon;