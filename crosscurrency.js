const RippleAPI = require('ripple-lib').RippleAPI
// TESTNET ADDRESS 1
const ADDRESS_1 = "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh" GATEWAY_ADDR
const SECRET_1 = "snoPBrXtMeMyMHUVTgbuqAfg1SUTb"
// TESTNET ADDRESS 2
const GATEWAY_ADDR = "raTFStWt8QMKjpqjrJMaKrAkVYFqCN5kwJ"
const instructions = {maxLedgerVersionOffset: 5}

const payment = {
  source: {
    address: GATEWAY_ADDR,
    maxAmount: {
      currency: 'EUR',
      value: '50',
      counterparty: GATEWAY_ADDR
    }
  },
  destination: {
    address: ADDRESS_1,
    amount: {
      currency: 'EUR',
      value: '50',
      counterparty: GATEWAY_ADDR
    }
  }
};
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
