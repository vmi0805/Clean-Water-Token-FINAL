// Project - "Clean Water Donor Hub"

// Objective - Create a donor portal to manage campaign contributions.  Campaigns that receive sufficient votes will have funding made available by the contract, which also accepts ether donations (funding release functionality will be included in the next version).

// Creator - Kyle Makinen

// README DOCUMENT

## How to start - 

Preconditions: 
	1. Open a command line terminal with nodeJS and npm installed
	2. Install MetaMask in the browswer
	3. Ganache-cli installed
	4. Git installed

	Command Line Tab #1 
		* Starting from project root directory
		'Step 1. Type 'ganache-cli' to start the private test blockchain
		'Step 2. Open web browswer with MetaMask installed
		'Step 3. In MetaMask, upload the private blockchain wallet using the seed phrase from ganache-cli instance

	Step 4. Open a separate comamnd line tab

	Command Line Tab #2
		* Starting from project root directory
		'Step 5. Type 'truffle migrate' to deploy the contract to the blockchain
		'Step 6. Navigate to the 'client' folder.
		'Step 7. Type 'npm install' to update nodeJS packages
		'Step 8. Type 'npm run start' to launch the application in the local browswer


## How to test -
	1. Open the project root directory and start the development blockchain with ganache-cli
	2. Install chai with 'npm install'
	3. Run 'truffle test' - 5 tests should pass


## How to use -
    '1. On window load, approve use of web3 for the browser and accept the first transaction that automatically appears (if it does not appear, check MetaMask).  This first transaction mints tokens for the account logged into with MetaMask.

    '2. Click the top left button to obtain updated account and campaign balances

    '3. Vote for and donate to campaigns.  The approval status will change once a campaign receives 75 votes. 

    '4. Each transaction must be approved in MetaMask, including the 'pause' transaction.

## Tests explanation - 

// ~~~~~~~ WHAT TESTS ARE COVERING AND WHY CHOSEN ~~~~~~~

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// TEST 1 - Verify state variable that tracks 'ether pledges' updates based on front-end pledge

// TEST 1 Details - The struct for campaign #1 has an attribute for 'dedicatedFunding'.  This test checks that the dedicatedFunding variable updates when the function 'sendFunds' is called.

// WHY TEST 1 - Ensures variable that tracks ether pledges, which was designed to be independent of the .send ether method used to transfer ether on the front-end, updates when the function is called.  This feature was allows for a single contract to accept donations for all campaigns and track owed funds by struct attributes.


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// TEST 2 - Verify vote functionality (with application not paused)

// TEST 2 Details - Votes are ERC20 tokens that are transfered to the wallet of the contract address and a struct attribute (integer variable) for the campaign being voted on is increased accordingly.

// WHY TEST 2 - The state variable that tracks votes received is a struct attribute, similar to the state variable for ether donations (Test 1).  Testing the campaignVote function ensures that a single contract can manage vote balances using the struct attribute for campaignVotes. 


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// TEST 3 - Verify pause functionality

// TEST 3 Details - A paused button was added to the front-end to allow any donor to pause voting or dontations.

// WHY TEST 3 - This test ensure the critical circuit breaker is functional.  Additional controls on who can use this button and when will be incorporated into future versions.


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// TESTS 4 and 5 - Verify proper token deployment

// TESTS 4 and 5 Details - Verifies that the token deploy method utilized in the deployment scripts is executing as expected.

// WHY TESTS 4 and 5 - Ensures that proper application of the token deployment method, which is used not only in testing but also whenever the application loads in a browser and is what allows for campaign voting.
