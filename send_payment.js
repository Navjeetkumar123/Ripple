const RippleAPI = require('ripple-lib').RippleAPI
// TESTNET ADDRESS 1
const ADDRESS_1 = "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh"
const SECRET_1 = "snoPBrXtMeMyMHUVTgbuqAfg1SUTb"
// TESTNET ADDRESS 2
//const ADDRESS_2 = "rQN1tWZ8adtynqEoaczum2uHFCbXUpBd6V"
const ADDRESS_2 = "ramkXS32nMyVBwPtBLPPMWurAGgLucbw7a"
const instructions = {maxLedgerVersionOffset: 5}
const currency = 'XRP'
const amount = '200'
const payment = {
  source: {
    address: ADDRESS_1,
    maxAmount: {
      value: amount,
      currency: currency
    }
  },
  destination: {
    address: ADDRESS_2,
    amount: {
      value: amount,
      currency: currency
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
