var React = require('react');

var TrackEntry = React.createClass({
  render: function () {
    return (
      <li href={ this.props.url }>{ this.props.name }</li>
    )
  }
});

module.exports = TrackEntry;
