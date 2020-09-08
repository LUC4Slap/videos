import React, { Component } from 'react';
import VodeoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
import VideoCinema from './components/VideoCinema';
import './App.css';
import { VideoService } from './services/VideoService';
import { Channel } from './services/EventService';
import VideoInline from './components/VideoInline';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.inlineVideo = React.createRef();
    this.cinemaVideo = React.createRef();

    this.state = {
      videos: [],
      selectedVideo: {},
      videoContainerElement: this.inlineVideo
    }

    this.selectVideo = this.selectVideo.bind(this);
    this.toggleCinema = this.toggleCinema.bind(this);
  }

  async componentDidMount() {
    const videos = await VideoService.list();
    this.setState({videos: videos});
    Channel.on('video:select', this.selectVideo);
    Channel.on('video:toggle-cinema', this.toggleCinema);
  }

  componentWillUnmount() {
    Channel.removeListener('video:select', this.selectVideo());
    Channel.removeListener('video:toggle-cinema', this.toggleCinema);
  }

  toggleCinema(){
    const currentElement = this.state.videoContainerElement;
    const newContainer = currentElement === this.inlineVideo ? this.cinemaVideo : this.inlineVideo;
    this.setState({ videoContainerElement: newContainer})
  }

  selectVideo(video) {
    this.setState({selectedVideo: video})
  }

  render() {
    const { state } = this;
    return (
      <div className="App">
        <VideoPlayer video={state.selectedVideo} container={state.videoContainerElement.current} />
        <VideoInline>
          <div ref={this.inlineVideo}></div>
        </VideoInline>
        <VodeoList videos={state.videos} />
        <VideoCinema isActive={state.videoContainerElement === this.cinemaVideo}>
        <div ref={this.cinemaVideo}></div>
        </VideoCinema>
      </div>
    )
  }
}
