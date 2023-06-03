import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';

function App() {
	const ChainInfo = {
		chainId: 'Oraichain-testnet',
		coinMinimalDenom: 'orai',
		coinDecimal: 6,
		walletURL: 'https://testnet-wallet.web.app/',
		bip44CoinType: 118,
		lcd: 'https://testnet-lcd.orai.io',
		rpc: 'https://testnet-rpc.orai.io',
		gRPC: 'http://18.118.151.163:9090',
	};

	const connectWallet = async () => {
		if (window.owallet) {
			await window.owallet.enable(ChainInfo.chainId);
			const offlineSigner = await window.getOfflineSigner(ChainInfo.chainId);
			console.log('offline signer: ', offlineSigner);

			const client = await SigningCosmWasmClient.connectWithSigner(ChainInfo.rpc, offlineSigner, {
				gasPrice: 200000,
			});
			// const accounts = await offlineSigner.getAccounts();

			const account = await client.getAccount('orai1r85udfyg5nx4kxu7777jtlh3nfgg6qc824scmg');
			console.log('account: ', account);

			const height = await client.getHeight();
			console.log('height: ', height);

			const block = await client.getBlock(height);
			console.log('block: ', block);

			const chainId = await client.getChainId();
			console.log('chainId: ', chainId);

			const balance = await client.getBalance('orai1r85udfyg5nx4kxu7777jtlh3nfgg6qc824scmg', 'orai');
			console.log('balance: ', balance);

			const contract = await client.getContract(
				'orai1tu4eetwkyg0aka09dwhq22888ss5584p7q60mez2n6cfgndekz0qfwfzvy'
			);
			console.log('contract: ', contract);

			const executeMsg = { vote: { proposal_id: 123, yes_vote: true } };
			// const signedMsg = await client.sign(account.address, executeMsg);
			const executer = await client.execute(account.address, contract.address, executeMsg, 'auto');
			console.log(executer);
			
		} else alert('Connect failed, please install wallet.');
	};

	return (
		<>
			<div>
				<button onClick={connectWallet}>Connect</button>
			</div>
		</>
	);
}

export default App;
