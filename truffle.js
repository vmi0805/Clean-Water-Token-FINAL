module.exports = {
	contracts_build_directory: "./client/src/build",
	networks:{
		development:{
			host: "127.0.0.1",
			port:"8545",
			network_id:"*"
		}
	},
	solc:{
		optimzer:{
			enabled: true,
			runs: 200
		}
		}
};