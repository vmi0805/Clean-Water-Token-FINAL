// Project - "Clean Water Donor Hub"

// Objective - Offer a web-baesd UI to vote for and fund the short list of clean water projects currently proposed.  Projects that receive sufficient votes will have funding made available by the contract that accepts ether donations (the funding release functionality is still being developed).

// Creator - Kyle Makinen

// DESIGN PATTERNS UTILIZED

'1. Pause contract (CIRCUIT BREAKER + FAIL LOUD) - a 'toggle pause' button in the web-UI that allows any person to call the contract function and stop votes and donations.  In the future, this functionality will be changed to the contract owner and other approved admins.  The 'toggle pause' button includes a 'require' statement to throw an error to inform the user why transactions have stopped (due to the 'toggle pause' button). 

'2. A state variable for ether donated - a state variable was dedicated to 'funding pledged' to track the amount of the contract ether is was pledged to a particular campaign.  This allows a single contract to manage the funds for multiple campaigns as opposed to a contract for each campaign.  This added variable helps reconcile the intended use of funds when withdrawl is required (withdrawl functionality will be coded in future versions).

'3. Approval status depdenency - the function that updates approval status is changed after each voting event and the voting button sends a small number of votes ('5').  Donors should refresh account balances before and after voting to check whether the 75 votes for approval have been attained either from their vote or from the real-time votes of others.  Future functionality will include a modifier to check the vote status before allow additional votes, migitaging unnecessary votes for a recently approved proejct.

