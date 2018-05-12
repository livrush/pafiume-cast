import React, { Component } from 'react';

const PodcastList = ({ episode }) => (
  <ul className="podcasts">
    { podcastComponents }
  </ul>
);

export default PodcastList;