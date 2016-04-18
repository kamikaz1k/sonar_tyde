var React = require('react');
var PropTypes = React.PropTypes;
var style = require('../styles');

var Player = React.createClass({
  componentDidMount: function () {

    var Player = this;
    var playerElement = document.getElementById('player');
    console.info("Player Mounted: ", player);

    // Autoplay on load
    playerElement.addEventListener("canplay", function() {
			playerElement.play();
		});

    // Get new song on track ended
    playerElement.addEventListener("ended", function() {
			console.log("Track ended...");
			Player.props.onTrackEnded();
		});

		// Restart search on case of error
		player.addEventListener("error", function() {
      // Only raise error if there is a src -- to prevent false errors from component mount
      if (Player.props.streamURL) {
  			console.log("Error trying to stream URL: ", Player.props.streamURL, "\n Fetching new stream URL...");
  			Player.props.onPlaybackError();
      }
		});

  },
  componentWillUnmount: function () {
    // Remove listener?
  },
  render: function () {
    console.log("Props for Player: ", this.props);
    return (
      <span>
      <div className="container" style={ style.centerText }>
        <p id="track-name">{ this.props.trackName }</p>
			  <img id="album-art" style={ style.albumBg } src={ this.props.albumArt } onClick={ this.props.onOpenPage }></img>
		  </div>

  		<div className="container" style={ style.centerText }>
  		  <audio id="player" src={ this.props.streamURL } preload="auto" controls="true">
  	      Your browser does not support the audio element.
  	    </audio>
  	  </div>

  		<div className="container" style={ style.centerText }>
  			<button className="btn btn-primary" onClick={ this.props.onNextTrack }>
  				"Slamm'it"
  			</button>
  		</div>
      </span>
    )
  }
});

module.exports = Player;
