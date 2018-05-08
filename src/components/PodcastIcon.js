import React from 'react';

function PodcastIcon({ podcast, handleClick }) {
  console.log(podcast);
  return (
    <li className="podcast-icon" onClick={() => handleClick(podcast)}>
      <img src={podcast.itunesPodcast.image} alt={podcast.artistName} />
    </li>
  )
}

export default PodcastIcon;