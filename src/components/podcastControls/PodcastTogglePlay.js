import React from 'react';

function PodcastTogglePlay({ onClickPause, onClickPlay }) {
  return (
    <li className="podcast-control play" onClick={onClickPlay}>
      <i className="fas fa-play"></i>
    </li>
  )
}

export default PodcastTogglePlay;