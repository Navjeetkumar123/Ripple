'use strict';
const RippleAPI = require('ripple-lib').RippleAPI;

const api = new RippleAPI({
  server: 'ws://localhost:6006' // Public rippled server
});
api.connect().then(() => {
  /* begin custom code ------------------------------------ */

  return api.generateAddress();
  

}).then(info => {
  console.log(info);
  console.log('generateAddress done');

  /* end custom code -------------------------------------- */
}).then(() => {
  return api.disconnect();
}).then(() => {
  console.log('done and disconnected.');
}).catch(console.error);