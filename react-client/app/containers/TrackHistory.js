var React = require('react');
var TrackEntry = require('../components/TrackEntry');
var style = require('../styles');

var TrackHistory = React.createClass({
  render: function () {
    console.log("Props for TrackHistory ", this.props);
    var listItems = this.props.tracks.map(function(track){
      // return <li> {track.pageURL} </li>;
      return <TrackEntry url={ track.pageURL } name={ track.trackName } />
    });
    console.log(listItems);
    if (!listItems.length) listItems.push(<li>No tracks yet...</li>);

    return (
      <ul style={ style.trackList }>
          {listItems}
      </ul>
    )
  }
});

module.exports = TrackHistory;
