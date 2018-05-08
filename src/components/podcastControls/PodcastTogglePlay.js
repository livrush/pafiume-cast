import React from 'react';

function PodcastTogglePlay({ togglePlay, playing }) {
  function playState(playing) {
    if (playing) {
      return (
        <li className="podcast-control stop" onClick={togglePlay}>
          <i className="fas fa-stop"></i>
        </li>
      );
    } else {
      return (
        <li className="podcast-control play" onClick={togglePlay}>
          <i className="fas fa-play"></i>
        </li>
      );
    }
  }

  return playState(playing);
}

export default PodcastTogglePlay;