import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
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
    axios('https://itunes.apple.com/search?entity=podcast&term=crooked+media')
      .then(({ data }) => {
        component.setState({ podcasts: data.results })
      })
      .catch(console.error);
  }

  render() {
    const { name, podcasts } = this.state;
    const podcastComponents = podcasts.map((podcast) => {
      return (<PodcastIcon imageUrl={podcast.artworkUrl600} />);
    });

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{name}</h1>
        </header>
        <ul class="podcasts">
          { podcastComponents }
        </ul>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
