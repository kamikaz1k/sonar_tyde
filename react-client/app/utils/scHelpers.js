var axios = require('axios');

var scTrackLink = "http://api.soundcloud.com/tracks/";
var clientId = "?client_id=86e82361b4e6d0f88da0838793618a92";

function getNextTrack () {
  // console.log("getNextTrack starting...");
  return axios.get(scTrackLink + (Math.random()*10000000).toFixed(0) + clientId).then(function (scObj){

    // @TODO if data.streamable is false, treat as failed
    if (scObj.data.streamable) {
      console.log("Success!", scObj);
      return extractInfo(scObj);
    } else {
      console.log("Track doesn't stream... ", scObj.data.streamable);
      return getNextTrack();
    }

  }, function (err) {
    console.log("Track Didn't resolve ", err);
    return getNextTrack();

  });
};

function extractInfo (scObj) {
  // return scObj;
  scObj = scObj.data;

  // Get bigger pictures
  if (scObj.user.avatar_url) scObj.user.avatar_url = scObj.user.avatar_url.replace("-large.","-t300x300.");
  if (scObj.artwork_url) scObj.artwork_url = scObj.artwork_url.replace("-large.","-t300x300.");

  var parsed = {
    streamURL: scObj.stream_url + clientId,
    pageURL: scObj.permalink_url,
    trackName: scObj.title,
    artistName: scObj.user.username,
    artistImg: scObj.user.avatar_url,
    albumArt: scObj.artwork_url
  }

  console.log("ExtractInfo: ", parsed);

  return parsed;
  // scObj.permalink_url
  // scObj.stream_url
  // scObj.title
  // scObj.waveform_url
  // scObj.artwork_url
  // scObj.user.avatar_url
  // scObj.user.username

};

var helpers = {
  getNextTrack: function () {
    return getNextTrack();
  }
};

module.exports = helpers;
