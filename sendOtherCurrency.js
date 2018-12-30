const RippleAPI = require('ripple-lib').RippleAPI
// TESTNET ADDRESS 1
const ADDRESS_1 = "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh"
const SECRET_1 = "snoPBrXtMeMyMHUVTgbuqAfg1SUTb"
// TESTNET ADDRESS 2
const COUNTER_PARTY = "rQN1tWZ8adtynqEoaczum2uHFCbXUpBd6V"
const instructions = {maxLedgerVersionOffset: 5}
//const currency = 'USD'
//const amount = '0.01'
const payment = {
    "source": {
    "address": ADDRESS_1,
    "maxAmount": {
      "value": "0.01",
      "currency": "USD",
      "counterparty": COUNTER_PARTY
    }
  },
  "destination": {
    "address": "ramkXS32nMyVBwPtBLPPMWurAGgLucbw7a",
    "amount": {
      "value": "0.01",
      "currency": "USD",
      "counterparty": COUNTER_PARTY
    }
  }
}
const api = new RippleAPI({
  //server: 'wss://s1.ripple.com'                 // MAINNET
  server: 'ws://localhost:6006'   // TESTNET
})
api.connect().then(() => {
  console.log('Connected...')
  api.preparePayment(ADDRESS_1, payment, instructions).then(prepared => {
    const {signedTransaction, id} = api.sign(prepared.txJSON, SECRET_1)
    console.log(id)
    api.submit(signedTransaction).then(result => {
      console.log(JSON.stringify(result, null, 2))
      api.disconnect()
    })
  })
}).catch(console.error)
