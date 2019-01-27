// Project - "Clean Water Donor Hub"

// Objective - Offer a web-baesd UI to vote for and fund the short list of clean water projects currently proposed.  Projects that receive sufficient votes will have funding made available by the contract that accepts ether donations (the funding release functionality is still being developed).

// Creator - Kyle Makinen

// AVOIDING COMMON ATTACKS

'1. Cross functions race conditions - the only nested function (checks for approval status post votes) does not require much computation (no loops) and does not release any funds so 'denial of service attacks' are not possible. 

'2. Cross function re-entry - no two (or more) functions update the same state variable

'3. Re-entry attacks - No functions or methods send or withdrawl ether to external addresses and the ether send methods are implemented in the front-end code so no blockchain efforts can result in errant ether sends.

'4. Integer underflow/overflow protection - a confirmed math contract was used 'safeMath.sol' and all integers are uint-256 and will revert on error.