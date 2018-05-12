import React from 'react';
// import { PodcastIcon, PodcastListItem } from './PodcastIcon.js';

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

const PodcastList = ({ color, podcasts, onClickPodcast }) => {
  const podcastComponents = podcasts.map((podcast, index) => {
    const style = index % 2 ? {
      backgroundColor: color.hues[1],
    } : {
      backgroundColor: color.hues[1],
      backgroundImage: 'url(./check.png)'
    };
    return (<PodcastIcon style={style} key={podcast.guid} podcast={podcast} handleClick={onClickPodcast} />);
  });

  return (
    <ul className="podcasts">
      { podcastComponents }
    </ul>
  );
}

export default PodcastList;