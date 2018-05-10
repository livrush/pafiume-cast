import React from 'react';

function PodcastIcon({ podcast, handleClick }) {
  return (
    <li className="podcast-icon" onClick={() => handleClick(podcast)}>
      <img title={podcast.title} src={podcast.itunesPodcast.image} alt={podcast.artistName} />
    </li>
  )
}

export default PodcastIcon;