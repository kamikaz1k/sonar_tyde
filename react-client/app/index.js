var React = require('react');
var ReactDOM = require('react-dom');
var PlayerContainer = require('./containers/PlayerContainer');

var HelloUser = React.createClass({
  render: function(){
    return (
      <div> Hello, {this.props.name}</div>
    )
  }
});

ReactDOM.render(
  <PlayerContainer name="Tyler"/>,
  document.getElementById('app')
);
