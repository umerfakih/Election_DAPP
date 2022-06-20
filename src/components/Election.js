import React, { useEffect, useState } from 'react'
import ElectionAbi from '../ContractsData/Voting.json'
import ElectionAddress from '../ContractsData/Voting-address.json'
import INRAbi from '../ContractsData/DigitalRupee.json'
import INRAddress from '../ContractsData/DigitalRupee-address.json'
import Web3 from 'web3'

export default function Election() {
  useEffect(() => {
    loadweb3()
    loadBlockchainData()
  }, [])

  const [inrInstance,setInrInstance] = useState({})
  const [loader, setLoader] = useState(true)
  const [CurrentAccount, setCurrentAccount] = useState('')
  const [electionInstance, setElectionInstance] = useState({})
  const [Candidate1, setCandidate1] = useState()
  const [Candidate2, setCandidate2] = useState()
  const [Canidate, setCandidate] = useState("");

  const loadweb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert('metamask not found')
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
      const election = new web3.eth.Contract(
        ElectionAbi.abi,
        ElectionAddress.address,
      )

      const canidate1 = await election.methods.candidates(1).call()
      const canidadte2 = await election.methods.candidates(2).call()
    
      const inr = new web3.eth.Contract(
        INRAbi.abi,
        INRAddress.address,
      )

      setInrInstance(inr)

      setCandidate1(canidate1)
      setCandidate2(canidadte2)
      setElectionInstance(election)
      setLoader(false)
    } else {
      window.alert('Please change it to ropsten network')
    }
  }

  const voteCandidate = async (canidateid) => {
    setLoader(true)

    let commit = "1000000000000000000"
    await inrInstance.methods
    .approve(electionInstance.options.address,commit)
    .send(({from:CurrentAccount}));

    await electionInstance.methods
      .vote(canidateid)
      .send({from:CurrentAccount})
    setLoader(false)
  }

  const onchange = (e) => {
    setCandidate(e.target.value);
    console.log(e.target.value);
  };

  const onsubmit = (e) => {
    e.preventDefault();
    if (Canidate.id !== 0) voteCandidate(Number(Canidate));
    else window.alert("there is error in submission");
  };

  if (loader) {
    return <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    
  }

  return (
    <div className="mt-4 text-center" style={{ color: '#000000' }}>
      <h1>First Claim INR TOKEN from Claim page You can see above in the navbar</h1>
      <h2>Without INR TOKEN You Cant commit Vote</h2>
      <h2>Election Results</h2>
      <hr
        style={{
          width: '70%',
          borderStyle: 'solid',
          borderWidth: '2px',
          borderColor: '#000000',
        }}
      />
      <div className="p-3 ml-auto mr-auto" style={{ width: '40%' }}>
        <div className="row ml-auto mr-auto  mb-2" style={{ width: '90%' }}>
          <div className="col">
            <p>#</p>
          </div>
          <div className="col">
            <p>Name</p>
          </div>
          <div className="col">
            <p>Votes</p>
          </div>
        </div>
        <hr
          style={{ width: '90%', borderStyle: 'solid', borderColor: '#000000' }}
        />
        <div
          className="row ml-auto mr-auto mt-2  mb-2"
          style={{ width: '90%' }}
        >
          <div className="col">
            <p>{Candidate1.id}</p>
          </div>
          <div className="col">
            <p>{Candidate1.name}</p>
          </div>
          <div className="col">
            <p>{Candidate1.votecount}</p>
          </div>
        </div>
        <hr
          style={{ width: '90%', borderStyle: 'solid', borderColor: '#000000' }}
        />
        <div
          className="row ml-auto mr-auto mt-2  mb-2"
          style={{ width: '90%' }}
        >
          <div className="col">
            <p>{Candidate2.id}</p>
          </div>
          <div className="col">
            <p>{Candidate2.name}</p>
          </div>
          <div className="col">
            <p>{Candidate2.votecount}</p>
          </div>
        </div>
      </div>
      <div className="my-5 mr-auto ml-auto text-left" style={{ width: '70%' }}>
        <h5>Cast Your Vote:</h5>
        <form onSubmit={onsubmit}>
          <select name="candidate" className="form-control" onChange={onchange}>
            <option defaultValue value="">
              Select
            </option>
            <option value="1">{Candidate1.name}</option>
            <option value="2">{Candidate2.name}</option>
          </select>
          <button className="btn btn-primary mt-2 btn-md w-100">
            Vote Candidate{''} {Canidate}
          </button>
        </form>
      </div>
      <p className="my-5">
        Your address: <span className="font-weight-bold">{CurrentAccount}</span>
      </p>
    </div>
  )
}
