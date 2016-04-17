var React = require('react');

var TrackHistory = React.createClass({
  render: function () {
    console.log("Props for TrackHistory ", this.props);
    var listItems = this.props.tracks.map(function(friend){
      return <li> {friend.pageURL} </li>;
    });
    console.log(listItems);
    if (!listItems.length) listItems.push(<li>No tracks yet...</li>);

    return (
      <ul>
          {listItems}
      </ul>
    )
  }
});

module.exports = TrackHistory;
