import React from 'react';
import PodcastTogglePlay from './podcastControls/PodcastTogglePlay.js';
import PodcastToggleTime from './podcastControls/PodcastToggleTime.js';

function PodcastControls({ onPlayTrack, onPauseTrack }) {
  return (
    <ul className="podcast-controls">
      <PodcastToggleTime />
      <PodcastTogglePlay onClickPlay={onPlayTrack} onClickPause={onPauseTrack} />
    </ul>
  )
}

export default PodcastControls;