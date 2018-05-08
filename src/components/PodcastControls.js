import React from 'react';
import PodcastTogglePlay from './podcastControls/PodcastTogglePlay.js';
import PodcastToggleTime from './podcastControls/PodcastToggleTime.js';

function PodcastControls({ playing, togglePlay }) {
  return (
    <ul className="podcast-controls">
      <PodcastToggleTime togglePlay={togglePlay} />
      <PodcastTogglePlay togglePlay={togglePlay} playing={playing} />
    </ul>
  )
}

export default PodcastControls;