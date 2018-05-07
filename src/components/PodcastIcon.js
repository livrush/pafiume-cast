import React from 'react';

function PodcastIcon({ podcast, handleClick }) {
  return (
    <li className="podcast-icon" onClick={() => handleClick(podcast)}>
      <img src={podcast.artworkUrl600} alt={podcast.artistName} />
    </li>
  )
}

export default PodcastIcon;