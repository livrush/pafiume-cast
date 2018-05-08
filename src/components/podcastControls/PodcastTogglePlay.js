import React from 'react';

function PodcastTogglePlay({ podcast, handleClick }) {
  return (
    <li className="podcast-control play">
      <i className="fas fa-play"></i>
    </li>
  )
}

export default PodcastTogglePlay;