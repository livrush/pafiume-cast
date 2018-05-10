import React from 'react';
// import PodcastTogglePlay from './podcastControls/PodcastTogglePlay.js';
// import PodcastToggleTime from './podcastControls/PodcastToggleTime.js';

const PodcastEpisodeInfo = ({ episode }) => (
  <li className="podcast-control info">
    {/* <p>{ episode.index }</p> */}
    <b>{ episode.name }</b>
    <p>{ episode.title }</p>
  </li>
);

const PodcastBufferingIcon = ({ buffering }) => buffering ? (
  <li className="podcast-control buffering">
    <i className="fas fa-circle-notch"></i>
  </li>
) : (
  <li className="podcast-control">
    <i className="fas fa-smile"></i>
  </li>
);

const PodcastToggleTime = () => (
  <li className="podcast-control time" >
    <i className="fas fa-stopwatch"></i>
  </li>
);

const PodcastTogglePlay = ({ togglePlay, playing }) => playing ? (
  <li className="podcast-control stop" onClick={togglePlay}>
    <i className="fas fa-stop"></i>
  </li>
) : (
  <li className="podcast-control play" onClick={togglePlay}>
    <i className="fas fa-play"></i>
  </li>
);

const PodcastControls = ({ buffering, episode, playing, togglePlay }) => (
  <ul className="podcast-controls">
    <PodcastBufferingIcon buffering={buffering} />
    <PodcastEpisodeInfo episode={episode} />
    <PodcastToggleTime togglePlay={togglePlay} />
    <PodcastTogglePlay togglePlay={togglePlay} playing={playing} />
  </ul>
);

export default PodcastControls;