var React = require('react');
var Player = require('../components/Player');
var scHelpers = require('../utils/scHelpers');

// Container gets the next track to be played,
// and passes it to the player component
var PlayerContainer = React.createClass({
  getInitialState: function () {
    return {
      // streamURL, trackName, artistName, albumArt
      streamURL: '',
      trackName: '[Empty]',
      artistName: '[Yo Face]',
      albumArt: ''
    }
  },
  handleGetNextTrack: function (e) {
    console.log("handleGetNextTrack", e);
    e.preventDefault();

    var container = this;
    scHelpers.getNextTrack().then(function (trackObj){
      console.log("getNextTrack Success: ", trackObj);
      if (trackObj.streamURL) {
        container.setState({
          streamURL: trackObj.streamURL,
          trackName: trackObj.trackName,
          artistName: trackObj.artistName,
          albumArt: trackObj.albumArt
        })
      }

    }, function (err) {
      console.log("Error in container, while retrieving track info ", err);
    });
    // getNextTrack from SC
    // .then(function (){ this.setState({}); })
  },
  render: function () {
    return (
      <Player
        streamURL={ this.state.streamURL }
        trackName={ this.state.trackName }
        artistName={ this.state.artistName }
        albumArt={ this.state.albumArt }
        onNextTrack={ this.handleGetNextTrack } />
    )
  }
});

module.exports = PlayerContainer;
