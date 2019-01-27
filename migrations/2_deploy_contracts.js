var cwToken = artifacts.require("./cwToken.sol");

module.exports = async function(deployer, network, accounts) {
    const _name = "Clean Water Voting";
    const _symbol = "CWV";
    const _decimals = 18;

  return deployer.deploy(cwToken, _name, _symbol, _decimals)

}