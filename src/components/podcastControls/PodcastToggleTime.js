import React from 'react';

function PodcastToggleTime({ podcast, handleClick }) {
  return (
    <li className="podcast-control time">
      <i className="fas fa-stopwatch"></i>
    </li>
  )
}

export default PodcastToggleTime;