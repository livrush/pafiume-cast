import React, { Component } from 'react';
import axios from 'axios';
import Parser from 'rss-parser';
import { Howl } from 'howler';
import colors from 'pafiume-colors';

import './App.css';
import './components/PodcastIcon.js';
import { PodcastIcon, PodcastListItem } from './components/PodcastIcon.js';
import PodcastControls from './components/PodcastControls.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'Pafiume-Cast',
      buffering: false,
      podcasts: [],
      player: null,
      playing: false,
      color: colors.random(),
      currentEpisode: {
        index: 0,
        name: '',
        title: '',
        url: null,
      },
    };
    this.onClickPodcast = this.onClickPodcast.bind(this);
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
    body.style['background-color'] = color.hues[1];
  }

  getPodcasts() {
    let parser = new Parser();
    const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'
    const component = this;
    axios('/rss-feeds.txt')
      .then(({ data }) => data.split('\n'))
      .then(rssFeedUrls => rssFeedUrls.map((feedUrl) => parser.parseURL(CORS_PROXY + feedUrl)))
      .then(rssFeedRequests => { Promise.all(rssFeedRequests)
          .then(responses => responses.map(response => { response.items = response.items.slice(0, 5); return response; }))
          .then(responses => responses.map(fillOutEpisodesInfo))
          .then(responses => responses.reduce((acc, res) => acc.concat(res), []))
          .then(podcasts => podcasts.sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate)))
          .then(podcasts => component.setState({
            podcasts,
            episodes: podcasts,
            currentEpisode: {
              index: 0,
              name: podcasts[0].name,
              title: podcasts[0].title,
              url: podcasts[0].enclosure.url,
            },
          }))
          .then(episodes => this.initPlayer(0))
          .catch(console.error);
      });
  }

  initPlayer(index) {
    const component = this;
    const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
    const { episodes, currentEpisode, player, playing } = component.state;
    if (player) player.unload();
    const episodeIndex = index ? index : currentEpisode.index + 1;
    const episode = episodes[episodeIndex]
    const track = episode.enclosure.url;
    component.setState({
      buffering: true,
      currentEpisode: {
        index: episodeIndex,
        name: episode.name,
        title: episode.title,
        url: track,
      },
    });
    const newPlayer = new Howl({
      src: [ CORS_PROXY + track ],
      // TODO: figure out what's up with the error that happens when you turn on html5 //
      // ! this is what will allow buffering //
      // html5: true,
      autoplay: playing,
      onload() {
        component.setState({ buffering: false });
        console.warn('LOADED');
      },
      onloaderror(id, error) {
        console.error('LOAD ERROR:', error);
      },
      onplayerror(id, error) {
        console.error('PLAY ERROR:', error);
      },
      onplay() {
        console.log('PLAYING');
      },
      onend() {
        console.log('ENDED');
        component.initPlayer(component, episodeIndex + 1);
      },
    });
    component.setState({ player: newPlayer });
    return component;
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

  onClickPodcast(value) {
    console.warn('PODCAST CLICK:', value);
    const { currentEpisode } = this.state;
    this.initPlayer(currentEpisode.index + 1);
  }

  render() {
    const { buffering, color, currentEpisode, podcasts, playing } = this.state;
    const { toggleTrackPlay, onClickPodcast } = this;
    const podcastComponents = podcasts.map((podcast) => {
      return (<PodcastListItem key={podcast.guid} podcast={podcast} handleClick={onClickPodcast} />);
    });

    return (
      <div className="App">
        <ul className="podcasts">
          { podcastComponents }
        </ul>
        <PodcastControls color={color} episode={currentEpisode} buffering={buffering} playing={playing} togglePlay={toggleTrackPlay} />
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
    episode.link = podcast.link;
    episode.name = podcast.title;
    episode.feedUrl = podcast.feedUrl;
    episode.description = podcast.description;
    episode.itunesPodcast = podcast.itunes;
    return episode;
  });
  return episodes;
}