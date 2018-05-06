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
      'pod save america',
      'lovett leave it',
      'laser time',
      'talking simpsons',
      'what a cartoon',
      // 'fictional',
      'hidden brain',
      'reply all',
      // 'syntax',
      // 'this american life',
      'wait wait npr'
    ];
    const podcastIds = [
      // 'pod save america',
      // 'lovett leave it',
      // 'laser time',
      // 'talking simpsons',
      // 'what a cartoon',
      // 'fictional',
      // 'hidden brain',
      // 'reply all',
      // 'syntax',
      // 'this american life',
      // 'wait wait npr',
      1270922382,
      1192761536,
      1216346463,
      468086830,
      1050103463,
      983913299,
      1358186691,
      1028908750,
      941907967,
    ];
    const podcastCalls = podcasts.map((podcastName) => axios(`https://itunes.apple.com/search?entity=podcast&attribute=titleTerm&term=${podcastName.split(' ').join('+')}`));
    // axios('https://itunes.apple.com/search?entity=podcast&term=npr')
    Promise.all(podcastCalls)
      .then((responses) => {
        // console.log(responses);
        responses.forEach(({ data }) => {
          const podcasts = Array.from(component.state.podcasts).concat(data.results);
          component.setState({ podcasts });
        })
      })
      .catch(console.error);
  }

  render() {
    const { name, podcasts } = this.state;
    const podcastComponents = podcasts.map((podcast) => {
      console.log(podcast.collectionId);
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
