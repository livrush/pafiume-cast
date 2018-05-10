import React, { Component } from 'react';
import axios from 'axios';
import Parser from 'rss-parser';
import { Howl } from 'howler';
import colors from 'pafiume-colors';

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
      player: null,
      playing: false,
      color: colors.random(),
      currentEpisode: {
        index: 0,
        url: null,
      },
    };
    this.toggleTrackPlay = this.toggleTrackPlay.bind(this);
  }

  test(value) {
    console.log(value);
  }

  componentWillMount() {
    const component = this;
    const { color } = component.state;
    component.getPodcasts();
    const body = document.getElementsByTagName('body')[0];
    body.style['background-color'] = color.hues[2];
  }

  getPodcasts() {
    let parser = new Parser();
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
    const component = this;
    axios('/rss-feeds.txt')
      .then(({ data }) => data.split('\n'))
      .then(rssFeedUrls => {
        const rssFeedRequests = rssFeedUrls.map((feedUrl) => parser.parseURL(CORS_PROXY + feedUrl));
        Promise.all(rssFeedRequests)
          .then(responses => responses.map(response => { response.items = response.items.slice(0, 5); return response; }))
          .then(responses => responses.map(fillOutEpisodesInfo))
          .then(responses => responses.reduce((acc, res) => acc.concat(res), []))
          .then(podcasts => podcasts.sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate)))
          .then(podcasts => component.setState({
            podcasts,
            episodes: podcasts.map(episode => episode.enclosure.url),
            currentEpisode: {
              index: 0,
              url: podcasts[0].enclosure.url,
            },
          }))
          .then(episodes => initPlayer(component))
          .catch(console.error);
      })
  }

  toggleTrackPlay() {
    const { player, playing } = this.state;
    if (player) {
      if (playing) {
        player.pause();
      } else {
        player.play();
      }
    }
    this.setState({ playing: !playing });
  }

  onClickPodcast() {}

  render() {
    const { podcasts, playing } = this.state;
    const { test, toggleTrackPlay } = this;
    const podcastComponents = podcasts.map((podcast) => {
      return (<PodcastIcon key={podcast.guid} podcast={podcast} handleClick={test} />);
    });

    return (
      <div className="App">
        <ul className="podcasts">
          { podcastComponents }
        </ul>
        <PodcastControls playing={playing} togglePlay={toggleTrackPlay} />
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

function initPlayer(component, index) {
  const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
  const { episodes, currentEpisode } = component.state;
  const episodeIndex = index ? index : currentEpisode.index + 1;
  const track = episodes[episodeIndex];
  // const tracks = component.state.episodes.map(episode => CORS_PROXY + episode);
  const player = new Howl({
    src: [ CORS_PROXY + track ],
    onload() {
      console.warn('LOADED');
      component.setState({
        currentEpisode: {
          index: episodeIndex,
          url: track,
        },
      });
    },
    onplay() {
      console.log('PLAYING');
    },
    onend() {
      console.log('ENDED');
      initPlayer(component, episodeIndex + 1);
    },
  });
  component.setState({ player });
  return component;
}

function fillOutEpisodesInfo(podcast) {
  const episodes = podcast.items.slice(0);
  episodes.map(episode => {
    episode.link = podcast.link;
    episode.title = podcast.title;
    episode.feedUrl = podcast.feedUrl;
    episode.description = podcast.description;
    episode.itunesPodcast = podcast.itunes;
    return episode;
  });
  return episodes;
}