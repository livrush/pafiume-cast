import React from 'react';

function PodcastIcon({ artistName, imageUrl }) {
  return (
    <li className="podcast-icon">
      <img src={imageUrl} alt={artistName} />
    </li>
  )
}

export default PodcastIcon;