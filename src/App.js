import React, { Component } from 'react';
import axios from 'axios';
import Parser from 'rss-parser';

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

  test(value) {
    console.log(value);
  }

  componentWillMount() {
    let parser = new Parser();
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

    // parser.parseURL(CORS_PROXY + )
    //   .then(console.log);

    const component = this;
    const appleAPI = 'https://itunes.apple.com/search?entity=podcast&attribute=titleTerm&term='
    axios('/rss-feeds.txt')
      .then(({ data }) => data.split('\n'))
      .then(rssFeedUrls => {
        const rssFeedRequests = rssFeedUrls.map((feedUrl) => parser.parseURL(CORS_PROXY + feedUrl));
        Promise.all(rssFeedRequests)
          .then(responses => responses.map(response => { response.items = response.items.slice(0, 5); return response; }))
          .then(responses => responses.map(response => { response.items = response.items.slice(0, 5); return response; }))
          .then(responses => responses.reduce((acc, res) => acc.concat(res.items), []))
          .then(podcasts => podcasts.sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate)))
          .then(podcasts => component.setState({ podcasts }));
          // .then(console.log);
          // .then((responses) => responses.reduce((acc, { data }) => acc.concat(data.results), []))
          // .then(podcasts => podcasts.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)))
          // .then((podcasts) => component.setState({ podcasts }))
          // .catch(console.error);
      })

    // axios('/podcasts.txt')
    //   .then(({ data }) => data.split('\n'))
    //   .then(podcastNames => {
    //     const podcastCalls = podcastNames.map((podcastName) => axios(`${appleAPI}${podcastName.split(' ').join('+')}`));
    //     // axios('https://itunes.apple.com/search?entity=podcast&term=npr')
    //     Promise.all(podcastCalls)
    //       .then((responses) => responses.reduce((acc, { data }) => acc.concat(data.results), []))
    //       .then(podcasts => podcasts.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)))
    //       .then((podcasts) => component.setState({ podcasts }))
    //       .catch(console.error);
    //   })
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
      </div>
    );
  }
}

export default App;
