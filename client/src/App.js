import React, { Component } from "react";
import CampaignCard1 from "./components/CampaignCard1/CampaignCard1";
import CampaignCard2 from "./components/CampaignCard2/CampaignCard2";
import CampaignCard3 from "./components/CampaignCard3/CampaignCard3";
import Wrapper from "./components/Wrapper";
import campaigns from "./campaignList.json";
import status from "./campaignStates.json";
import cwToken from "./build/cwToken.json";
import getWeb3 from "./utils/getWeb3.js";
import "./App.css";

class App extends Component {
  state = {
    campaigns,
    status,
     storageValue: 0,
     web3: null,
     accounts: null,
     contract: null,
     balance: 0,
     ether: 0,
     c1e: 0,
     c1v: 0,
     c1a: false,
     c2e: 0,
     c2v: 0,
     c2a: false,
     c3e: 0,
     c3v: 0,
     c3a: false,
     paused: false
          };

  componentDidMount = async () => {

    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = cwToken.networks[networkId];
      const instance = new web3.eth.Contract(
        cwToken.abi,
        deployedNetwork && deployedNetwork.address,
      );

      this.setState({ web3, accounts, contract: instance});

      alert("The account you are logged into is: " + accounts[0]);
      
      var response = this.state.contract.methods._mint(accounts[0],300).send({from: accounts[0]});
        console.log(response);

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };


// Campaign 1 Buttons

  handleClick1e = async (event) => {
    const { accounts, contract } = this.state;

    var eth = await contract.methods.sendFunds(1).send({from: accounts[0], value: this.state.web3.utils.toWei("5", "ether")});
    console.log(eth);
    // alert("handleClick works! Version 2")

  };

  handleClick1v = async (event) => {
    const { accounts, contract } = this.state;

    var campaigns = await contract.methods.campaignVote(1).send({from: accounts[0]});
      console.log(campaigns);

    var votes = await contract.methods.getVotes(1).call();
      console.log(votes);
  };

// Campaign 2 Buttons

  handleClick2e = async (event) => {
    const { accounts, contract } = this.state;

    var eth = await contract.methods.sendFunds(2).send({from: accounts[0], value: this.state.web3.utils.toWei("5", "ether")});
    console.log(eth);
    // alert("handleClick works! Version 2")
  };

  handleClick2v = async (event) => {
    const { accounts, contract } = this.state;

    var campaigns = await contract.methods.campaignVote(2).send({from: accounts[0]});
      console.log(campaigns);

    var votes = await contract.methods.getVotes(2).call();
      console.log(votes);

  };


// Campaign 3 Buttons

  handleClick3e = async (event) => {
    const { accounts, contract } = this.state;

    var eth = await contract.methods.sendFunds(3).send({from: accounts[0], value: this.state.web3.utils.toWei("5", "ether")});
    console.log(eth);
    // alert("handleClick works! Version 2")

    return(eth)
  };

  handleClick3v = async (event) => {
    const { accounts, contract } = this.state;

    var campaigns = await contract.methods.campaignVote(3).send({from: accounts[0]});
      console.log(campaigns);

    var votes = await contract.methods.getVotes(3).call();
      console.log(votes);

      return(votes)
  };

// PAUSE FUNCTION
// PAUSE FUNCTION
// PAUSE FUNCTION


  pause = async (event) => {

    const { accounts, contract } = this.state;

    // var getPausedStatus1 = await this.state.contract.methods.getPaused().call();
    //   console.log(getPausedStatus1);

    this.setState({ paused: getPausedStatus2});

    var toggle = this.state.contract.methods.togglePause().send({from: accounts[0]});
      console.log(toggle);

    var getPausedStatus2 = await this.state.contract.methods.getPaused().call();
      console.log(getPausedStatus2);
  
  };


  getAccounts = async (event) => {

    const { accounts, contract } = this.state;

    // ** Get Ether balance **

        var currentAddress = this.state.accounts[0];
          console.log(currentAddress)

        var balanceWei = await this.state.web3.eth.getBalance(currentAddress);
        var balanceETH = this.state.web3.utils.fromWei(balanceWei, 'ether');
          console.log(balanceWei);

    // ** Get token balance **
        
        var tokens = await this.state.contract.methods.balanceOf(this.state.accounts[0]).call()
          console.log(tokens);

        this.setState({balance: tokens});
        this.setState({ether: balanceETH});  

        console.log(this.state.balance);
        console.log(this.state.ether);

    // Get camapign attributes

          var c1vv = await this.state.contract.methods.getVotes(1).call();
          var c2vv = await this.state.contract.methods.getVotes(2).call();
          var c3vv = await this.state.contract.methods.getVotes(3).call();

          var c1 = await this.state.contract.methods.getFunding(1).call();
            // var c1ee = this.state.web3.utils.fromWei(c1, 'ether');
          var c2 = await this.state.contract.methods.getFunding(2).call();
            // var c2ee = this.state.web3.utils.fromWei(c2, 'ether');
          var c3 = await this.state.contract.methods.getFunding(3).call();
            // var c3ee = this.state.web3.utils.fromWei(c3, 'ether');

          var c11 = await this.state.contract.methods.getStatus(1).call();
            var c1a = String(c11);
          var c22 = await this.state.contract.methods.getStatus(2).call();
            var c2a = String(c22);
          var c33 = await this.state.contract.methods.getStatus(3).call();
            var c3a = String(c33);

        this.setState({
           c1e: c1,
           c1v: c1vv,
           c1a: c1a,
           c2e: c2,
           c2v: c2vv,
           c2a: c2a,
           c3e: c3,
           c3v: c3vv,
           c3a: c3a
        });
  };



render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div>
        <div className = 'banner'>
          <div className = 'center'>
              <button id='button-align2' onClick={this.getAccounts.bind(this)}>Click to update campaign and account information}</button>
              <button id='button-align2' onClick={this.pause.bind(this)}>{'***Pause application***'}</button>
              <h1>{'"Paused" status is  ' + this.state.paused}</h1>
          </div>
        </div>  
          <div className = "bigWrapper">
          <Wrapper>
              <CampaignCard1
                  id={this.state.campaigns[0].id}
                  name={this.state.campaigns[0].name}
                  location={this.state.campaigns[0].location}
                  url = {this.state.campaigns[0].url}
                  approvalStatus = {this.state.c1a}
                  balance = {this.state.c1e}
                  votes = {this.state.c1v}
                  ether = {this.state.ether}
                  tokens = {this.state.balance}
                />

              <div className="eth-vote-button">
                <button id="button-align" onClick={this.handleClick1e.bind(this)}>Send 5 ETH</button>
              </div>
              <div className="eth-vote-button">
                <button id="button-align" onClick={this.handleClick1v.bind(this)}>Send 5 Votes</button>      
              </div>
          </Wrapper>
          </div>

        <div className = "bigWrapper">
          <Wrapper>
              <CampaignCard2
                  id={this.state.campaigns[1].id}
                  name={this.state.campaigns[1].name}
                  location={this.state.campaigns[1].location}
                  url = {this.state.campaigns[1].url}
                  approvalStatus = {this.state.c2a}
                  balance = {this.state.c2e}
                  votes = {this.state.c2v}
                  ether = {this.state.ether}
                  tokens = {this.state.balance}
              />

              <div className="eth-vote-button">
                <button id="button-align" onClick={this.handleClick2e.bind(this)}>Send 5 ETH</button>
              </div>
              <div className="eth-vote-button">
                <button id="button-align" onClick={this.handleClick2v.bind(this)}>Send 5 Votes</button>      
              </div>
          </Wrapper>
          </div>


        <div className = "bigWrapper">
          <Wrapper>
              <CampaignCard3
                  id={this.state.campaigns[2].id}
                  name={this.state.campaigns[2].name}
                  location={this.state.campaigns[2].location}
                  url = {this.state.campaigns[2].url}
                  approvalStatus = {this.state.c3a}
                  balance = {this.state.c3e}
                  votes = {this.state.c3v}
                  ether = {this.state.ether}
                  tokens = {this.state.balance}
              />

              <div className="eth-vote-button">
                <button id="button-align" onClick={this.handleClick3e.bind(this)}>Send 5 ETH</button>
              </div>
              <div className="eth-vote-button">
                <button id="button-align" onClick={this.handleClick3v.bind(this)}>Send 5 Votes</button>      
              </div>
          </Wrapper>
        </div>

      </div>
    );
  };
};

export default App;