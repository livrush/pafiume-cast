import React from 'react';
import PodcastTogglePlay from './podcastControls/PodcastTogglePlay.js';
import PodcastToggleTime from './podcastControls/PodcastToggleTime.js';

function PodcastControls({ podcast, handleClick }) {
  return (
    <ul className="podcast-controls">
      <PodcastToggleTime />
      <PodcastTogglePlay />
    </ul>
  )
}

export default PodcastControls;