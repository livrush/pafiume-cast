import React from 'react';

function PodcastTogglePlay({ togglePlay, playing }) {
  function playState(playing) {
    if (playing) {
      return (<i className="fas fa-stop"></i>);
    } else {
      return (<i className="fas fa-play"></i>);
    }
  }

  return (
    <li className="podcast-control play" onClick={togglePlay}>
      { playState(playing) }
    </li>
  )
}

export default PodcastTogglePlay;