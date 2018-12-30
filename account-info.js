'use strict';
const RippleAPI = require('ripple-lib').RippleAPI;

const api = new RippleAPI({
  server: 'ws://localhost:6006' // Public rippled server
});
api.connect().then(() => {
  /* begin custom code ------------------------------------ */
  //const myAddress = 'ramkXS32nMyVBwPtBLPPMWurAGgLucbw7a';
  const myAddress = 'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh';
  //const myAddress = 'rQN1tWZ8adtynqEoaczum2uHFCbXUpBd6V';

  console.log('getting account info for', myAddress);
  return api.getAccountInfo(myAddress, {"ledgerVersion":"current"});
  

}).then(info => {
  console.log(info);
  console.log('getAccountInfo done');

  /* end custom code -------------------------------------- */
}).then(() => {
  return api.disconnect();
}).then(() => {
  console.log('done and disconnected.');
}).catch(console.error);