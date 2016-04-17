var React = require('react');
var PropTypes = React.PropTypes;
var style = require('../styles');

var Player = React.createClass({
  render: function () {
    console.log("Props for Player: ", this.props);
    return (
      <span>
      <div className="container" style={ style.centerText }>
        <p id="track-name">{ this.props.trackName }</p>
			  <img id="album-art" style={ style.albumBg } src={ this.props.albumArt } onClick={ this.props.onOpenPage }></img>
		  </div>

  		<div className="container" style={ style.centerText }>
  		  <audio src={ this.props.streamURL } preload="auto" controls="true">
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
