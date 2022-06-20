import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import AirdropAbi from '../ContractsData/Airdrop.json'
import AirdropAddress from '../ContractsData/Airdrop-address.json'

export default function Airdrop() {
  useEffect(() => {
    loadweb3()
    loadBlockchainData()
  }, [])

  const [loader, setLoader] = useState(true)
  const [CurrentAccount, setCurrentAccount] = useState('')
  const [airdropInstance, setAirdropInstance] = useState({})

  const loadweb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert('no metamask found')
    }
  }

  const loadBlockchainData = async () => {
    setLoader(true)
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    const account = accounts[0]
    setCurrentAccount(account)

    const networkId = await web3.eth.net.getId()

    if (networkId === 3) {
      const airdrop = new web3.eth.Contract(
        AirdropAbi.abi,
        AirdropAddress.address,
      )
      setAirdropInstance(airdrop)
    
      setLoader(false)
    } else {
      window.alert('the smart contract is not deployed current network')
    }
  }

  const claim = async () => {
    setLoader(true)
    await airdropInstance.methods
      .claim()
      .send({from:CurrentAccount})
    setLoader(false)
  }

  if (loader) {
    return <div class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
    
  }

  return (
    <div className="container my-5 ">
      <h1>Claim INR token to commit  vote</h1>
      <div className="d-grid gap-2 d-md-flex justify-content-md-center">
        <button type="button" class="btn btn-dark" onClick={claim}>
          Claim
        </button>
      </div>
    </div>
  )
}
