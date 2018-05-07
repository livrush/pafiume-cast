import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import './components/PodcastIcon.js';
import PodcastIcon from './components/PodcastIcon.js';



class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'Pafiume-Cast',
      podcasts: [],
    };
  }

  componentWillMount() {
    const component = this;
    const podcasts = [
      // 'retronauts',
      'pod save america',
      'lovett leave it',
      'laser time',
      'talking simpsons',
      'what a cartoon',
      'hidden brain',
      'reply all',
      'syntax tasty',
      'dtr tinder',
      'front end happy hour',
      'wait wait don\'t tell me',
      'vgmpire',
      'ui breakfast',
      'ask me another',
      'invisibilia',
      'planet money',
      'the habitat gimlet',
      'drawn: the story of animation',

    ];
    const appleAPI = 'https://itunes.apple.com/search?entity=podcast&attribute=titleTerm&term='
    axios('/podcasts.txt')
      .then(({ data }) => data.split('\n'))
      .then(podcastNames => {
        const podcastCalls = podcastNames.map((podcastName) => axios(`${appleAPI}${podcastName.split(' ').join('+')}`));
        // axios('https://itunes.apple.com/search?entity=podcast&term=npr')
        Promise.all(podcastCalls)
          .then((responses) => responses.reduce((acc, { data }) => acc.concat(data.results), []))
          .then(podcasts => podcasts.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)))
          .then((podcasts) => component.setState({ podcasts }))
          .catch(console.error);
      })
  }

  render() {
    const { name, podcasts } = this.state;
    const podcastComponents = podcasts.map((podcast) => {
      console.log(podcast.releaseDate);
      return (<PodcastIcon key={podcast.trackId} imageUrl={podcast.artworkUrl600} />);
    });

    return (
      <div className="App">
        <ul className="podcasts">
          { podcastComponents }
        </ul>
      </div>
    );
  }
}

export default App;
