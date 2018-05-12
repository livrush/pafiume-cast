import React from 'react';
import moment from 'moment';

const PodcastIcon = ({ podcast, handleClick }) => (
  <li className="podcast-icon" onClick={() => handleClick(podcast)}>
    <img title={podcast.title} src={podcast.itunesPodcast.image} alt={podcast.artistName} />
  </li>
);

const PodcastListItem = ({ podcast, handleClick, style }) => (
  <li className="podcast-list-item" onClick={() => handleClick(podcast)} style={style}>
    <img title={podcast.title} src={podcast.itunesPodcast.image} alt={podcast.artistName} />
    <div className="podcast-info">
      <p><b>{ podcast.name }</b></p>
      <p>{ podcast.title }</p>
    </div>
  </li>
);

export {
  PodcastIcon,
  PodcastListItem
};
