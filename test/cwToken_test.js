const BigNumber = web3.BigNumber;

const cwToken = artifacts.require("./cwToken.sol");

require('chai')
	// .use(require('chai-bignumber')(BigNumber))
	.should();

tryCatch = async function(promise, errType) {
	try {
		await promise;
		throw null;
	}
	catch (error) {
		assert(error, "Expected an error but did not get one");
	}
};

contract("cwToken", accounts => {
	const _name = "cwToken";
	const _symbol = "CWV";
	const _decimals = 18;

	beforeEach(async function () {
		this.token = await cwToken.new(_name, _symbol, _decimals);
		this.token._mint(accounts[0], 300);

		console.log('*** NEW TEST ***');
	});


	// TEST 1 - Verify state variable that tracks ether pledges updates independent of the .send method implemented on the front-end
	it('update funding pledged state variable', async function(){

		const sendF = await this.token.getFunding(1)
			console.log(sendF)

		const testF = await this.token.sendFunds(1)
			// console.log(testF)

		const checkF = await this.token.getFunding(1)
			console.log(checkF)

		assert.notEqual(sendF, checkF, 'balance changed on send')

	});


	// TEST 2 - Verify vote functionality (with application not paused)
	it ('verify vote functionality works', async function(){

		let pausedStatus = await this.token.getPaused()
			console.log(pausedStatus)

		async function togglePause(){
			await this.token.togglePause();
		};

		assert.equal(pausedStatus, false, 'check on toggle pause')

		if (pausedStatus == false) {

			console.log('~~~~~~~~~TESTING FALSE~~~~~~~~~~');

			let votes1 = await this.token.balanceOf(accounts[0]);
			await this.token.campaignVote(1);

			let votes2 = await this.token.balanceOf(accounts[0]);

			console.log(votes1);
			console.log(votes2);	

			assert.notEqual(votes1, votes2, 'not paused');

			togglePause();

		}
	});

	// TEST 3 - Verify pause functionality
	it ('verify pause functionality works', async function(){

		let pausedStatus1 = await this.token.getPaused()
			console.log(pausedStatus1)

		assert.equal(pausedStatus1, false, 'check on toggle pause')

		if (pausedStatus1 == false) {
			const tp = await this.token.togglePause();
				console.log(tp);

		await tryCatch(this.token.campaignVote(1));
		}
	});


	// TESTS 4 and 5 - Verify proper token deployment
	it('has the correct name', async function(){
		const name = await this.token.name();
		name.should.equal(_name);
	})

	it('has the correct symbol', async function(){
		const symbol = await this.token.symbol();
		symbol.should.equal(_symbol);	
	});
})