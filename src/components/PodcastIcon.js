import React from 'react';

function PodcastIcon({ podcast, handleClick }) {
  return (
    <li className="podcast-icon" onClick={() => handleClick(podcast)}>
      <img title={podcast.title} src={podcast.itunesPodcast.image} alt={podcast.artistName} />
    </li>
  )
}

const PodcastListItem = ({ podcast, handleClick }) => (
  <li className="podcast-list-item" onClick={() => handleClick(podcast)}>
    <img title={podcast.title} src={podcast.itunesPodcast.image} alt={podcast.artistName} />
    <div className="podcast-info">
      <b>{ podcast.name }</b>
      <p>{ podcast.title }</p>
    </div>
  </li>
);

export {
  PodcastIcon,
  PodcastListItem
};