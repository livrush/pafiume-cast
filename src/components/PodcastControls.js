import React from 'react';
import PodcastTogglePlay from './podcastControls/PodcastTogglePlay.js';
import PodcastToggleTime from './podcastControls/PodcastToggleTime.js';

const PodcastBufferingIcon = ({ buffering }) => buffering ?
  (
    <li className="podcast-control buffering">
      <i className="fas fa-spinner"></i>
    </li>
  ) :
  (
    <li className="podcast-control">
      <i className="fas fa-ok"></i>
    </li>
  );

const PodcastControls = ({ buffering, playing, togglePlay }) => (
  <ul className="podcast-controls">
    <PodcastBufferingIcon buffering={buffering} />
    <PodcastToggleTime togglePlay={togglePlay} />
    <PodcastTogglePlay togglePlay={togglePlay} playing={playing} />
  </ul>
);

export default PodcastControls;