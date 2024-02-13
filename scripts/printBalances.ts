import { printBalances } from '@src/index';
import { providers } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

const { RPC_URL } = process.env;

const provider = new providers.JsonRpcProvider(RPC_URL);

async function main() {
  const [input] = process.argv.slice(2);

  if (!input) {
    console.log("Usage: bun script.ts <ENS_NAME_OR_ADDRESS>");
    return;
  }

  const address = input.endsWith('.eth') ? await provider.resolveName(input) : input;

  if (address !== null) {
    await printBalances(address, { includeTokens: true, includeNfts: true });
  }
}

main().catch(console.error);