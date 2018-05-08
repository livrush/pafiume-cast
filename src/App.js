import React, { Component } from 'react';
import axios from 'axios';
import Parser from 'rss-parser';

import './App.css';
import './components/PodcastIcon.js';
import PodcastIcon from './components/PodcastIcon.js';
import PodcastControls from './components/PodcastControls.js';


class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'Pafiume-Cast',
      podcasts: [],
    };
  }

  test(value) {
    console.log(value);
  }

  componentWillMount() {
    let parser = new Parser();
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
    const component = this;
    const appleAPI = 'https://itunes.apple.com/search?entity=podcast&attribute=titleTerm&term='
    axios('/rss-feeds.txt')
      .then(({ data }) => data.split('\n'))
      .then(rssFeedUrls => {
        const rssFeedRequests = rssFeedUrls.map((feedUrl) => parser.parseURL(CORS_PROXY + feedUrl));
        Promise.all(rssFeedRequests)
          .then(responses => responses.map(response => { response.items = response.items.slice(0, 5); return response; }))
          .then(responses => responses.map(fillOutEpisodesInfo))
          .then(responses => responses.reduce((acc, res) => acc.concat(res), []))
          .then(podcasts => podcasts.sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate)))
          .then(podcasts => component.setState({ podcasts }))
          .catch(console.error);
      })
  }

  render() {
    const { podcasts } = this.state;
    const { test } = this;
    const podcastComponents = podcasts.map((podcast) => {
      return (<PodcastIcon key={podcast.isoDate} podcast={podcast} handleClick={test} />);
    });

    return (
      <div className="App">
        <ul className="podcasts">
          { podcastComponents }
        </ul>
        <PodcastControls />
      </div>
    );
  }
}

export default App;

// TODO: implement this to hide logic in call to rss feeds
// function limitEpisodes(podcast) {
//   const episodes = podcast.items.slice();

//   return episodes;
//   response => { response.items = response.items.slice(0, 5); return response; }
// }

function fillOutEpisodesInfo(podcast) {
  const episodes = podcast.items.slice(0);
  episodes.map(episode => {
    episode.link = podcast.link
    episode.title = podcast.title
    episode.feedUrl = podcast.feedUrl
    episode.description = podcast.description
    episode.itunesPodcast = podcast.itunes;
    return episode;
  });
  return episodes;
}