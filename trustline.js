const RippleAPI = require('ripple-lib').RippleAPI
// TESTNET ADDRESS 1
const ADDRESS_1 = "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh"
const SECRET_1 = "snoPBrXtMeMyMHUVTgbuqAfg1SUTb"
// TESTNET ADDRESS 2
const instructions = {
  "fee": "0.000012",
    "sequence": 23,
    "maxLedgerVersion": 8820051
}

const trustline = {
  "currency": "USD",
  "counterparty": "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh",
  "limit": "10000",
  "qualityIn": 0.91,
  "qualityOut": 0.87,
  "ripplingDisabled": true,
  "frozen": false,
  "memos": [
    {
      "type": "test",
      "format": "text/plain",
      "data": "texted data"
    }
  ]
};
const api = new RippleAPI({
  //server: 'wss://s1.ripple.com'                 // MAINNET
  server: 'ws://localhost:6006'   // TESTNET
})
api.connect().then(() => {
  console.log('Connected...')
  api.prepareTrustline(ADDRESS_1, trustline, instructions).then(prepared => {
    const {signedTransaction, id} = api.sign(prepared.txJSON, SECRET_1)
    console.log(id)
    api.submit(signedTransaction).then(result => {
      console.log(JSON.stringify(result, null, 2))
      api.disconnect()
    })
  })
}).catch(console.error)
