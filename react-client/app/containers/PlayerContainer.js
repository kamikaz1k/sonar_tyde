var React = require('react');
var Player = require('../components/Player');
var scHelpers = require('../utils/scHelpers');
var TrackHistory = require('./TrackHistory');

// Container gets the next track to be played,
// and passes it to the player component
var PlayerContainer = React.createClass({
  getInitialState: function () {
    return {
      // streamURL, trackName, artistName, albumArt
      trackHistory: [],
      streamURL: '',
      pageURL: '',
      trackName: '[Empty]',
      artistName: '[Yo Face]',
      albumArt: ''
    }
  },
  handleGetNextTrack: function (e) {
    console.log("handleGetNextTrack", e);
    if (e) e.preventDefault();

    var container = this;
    scHelpers.getNextTrack().then(function (trackObj){
      console.log("getNextTrack Success: ", trackObj);
      if (trackObj.streamURL) {

        // Set image as avatar if album unavailable
        trackObj.albumArt = trackObj.albumArt ? trackObj.albumArt : trackObj.artistImg;

        container.state.trackHistory.unshift(trackObj);
        container.setState({
          streamURL: trackObj.streamURL,
          trackName: trackObj.trackName,
          artistName: trackObj.artistName,
          albumArt: trackObj.albumArt,
          pageURL: trackObj.pageURL
        });

        console.log("Unshifted trackHistory ", container.state.trackHistory);

      }

    }, function (err) {
      console.log("Error in container, while retrieving track info ", err);
    });
    // getNextTrack from SC
    // .then(function (){ this.setState({}); })
  },
  handleOpenPage: function () {
    window.open(this.state.pageURL);
  },
  handleTrackEnded: function () {
    console.log("handleTrackEnded");
    this.handleGetNextTrack();
  },
  handlePlaybackError: function () {
    console.log("handlePlaybackError");
    // this.handleGetNextTrack();
  },
  render: function () {
    console.log("Rendering PlayerContainer ", this.state.trackHistory);
    return (
      <span>
        <Player
          streamURL={ this.state.streamURL }
          trackName={ this.state.trackName }
          artistName={ this.state.artistName }
          albumArt={ this.state.albumArt }
          onNextTrack={ this.handleGetNextTrack }
          onOpenPage={ this.handleOpenPage }
          onTrackEnded={ this.handleTrackEnded }
          onPlaybackError={ this.handlePlaybackError } />
        <TrackHistory tracks={ this.state.trackHistory } />
      </span>
    )
  }
});

module.exports = PlayerContainer;
