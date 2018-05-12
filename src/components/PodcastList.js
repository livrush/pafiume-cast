import React, { Component } from 'react';
import { PodcastIcon, PodcastListItem } from './PodcastIcon.js';

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