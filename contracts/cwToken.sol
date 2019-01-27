pragma solidity ^0.5.0;

import "./ERC20.sol";

contract cwToken is ERC20 {

// @dev - define state variables
	address owner;
	bool paused = false;
	struct campaign {
		uint campaignID;
		string name;
		uint dedicatedFunding;
		uint votes;
		bool approvalState;
	}

// @dev - mapping to manage state variables by campaign
	mapping (uint => campaign) public campaigns;
	event sendfunds();
	event togglepause();

// @dev - modifier to implement the toggle pause circuit breaker
	modifier whenNotPaused(){
		require(!paused, '***Application is paused***');
		_;
	}

// Initial constructor
// @dev - called by the deployment method in the deployment script JS file and creates the tokens and campaigns
// @dev - creates contract owner
	constructor(string memory _name, string memory _symbol, uint8 _decimals) 
		ERC20(_name, _symbol, _decimals) 
		public 
		{
		owner = msg.sender;
		// paused = false;
		createCampaign(1, "Kenya", 0, 0, false);
		createCampaign(2, "Cambodia", 0, 0, false);
		createCampaign(3, "Indonesia", 0, 0, false);
		}

// Create campaigns
//@ dev - no inputs required because function is called in the constructor with set parameters
//@ dev - to create new campaigns, do so in the contract deployment with the constructor
	function createCampaign(uint _id, string memory _name, uint _dedicatedFunding, uint _votes, bool _approvalState) internal returns(bool){
		campaigns[_id].campaignID = _id;
		campaigns[_id].name = _name;
		campaigns[_id].dedicatedFunding = _dedicatedFunding;
		campaigns[_id].votes = _votes;
		campaigns[_id].approvalState = _approvalState;
	}

// Funding & Voting

//@ dev - input parameter is the campaign ID
//@ returns - boolean to confirm execution
	function sendFunds(uint _id)
		whenNotPaused 
		public 
		payable 
		returns(bool){
			_transfer(msg.sender, address (this), 5);
			campaigns[_id].dedicatedFunding += 5;
			emit sendfunds();
			return(true);
		}

//@ dev - input parameter is the campaign ID
//@ dev - function to check approval status called within - nested functions FYI
//@ returns - boolean to confirm execution
	function campaignVote(uint _id) 
		whenNotPaused
		public
		returns(bool){
			_transfer(msg.sender, address (this), 5);
			campaigns[_id].votes += 5;
			setApprovalState(_id);
			return(true);
		}

//@ dev - input parameter is the campaign ID
	function setApprovalState (uint _id) 
		public
		returns(bool){
			if(campaigns[_id].votes >= 75) {
				campaigns[_id].approvalState = true;
			}
		}

//@ dev - input parameter is the campaign ID
//@ returns - state value
	  function getVotes(uint _id) public view returns (uint votes) {
	    votes = campaigns[_id].votes;
	    // return (votes);
	  }

//@ dev - input parameters is the campaign ID
//@ returns - state value
	  function getStatus(uint _id) public view returns (bool status) {
	    status = campaigns[_id].approvalState;
	    // return (status);
	  }

//@ dev - input parameter is the campaign ID
//@ returns - state value
	  function getFunding(uint _id) public view returns (uint funding) {
	    funding = campaigns[_id].dedicatedFunding;
	    // return (funding);
	  }

//@ dev - get paused state status
	  function getPaused() public view returns (bool) {
	    return (paused);
	  }

// Pause function

//@ dev - function executes on button push or through a call on blockchain to stop transaction, uses the 'whenPaused' modifier
//@ returns - return state
		function togglePause () 
			public
			returns (bool) {
				paused = !paused;
				emit togglepause();
				return (paused);
			}
}
