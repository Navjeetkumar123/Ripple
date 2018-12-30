var rippleLib = require('ripple-lib');
var RippleWallet = require('ripple-wallet');

var address = RippleWallet.generate();
console.log(address);