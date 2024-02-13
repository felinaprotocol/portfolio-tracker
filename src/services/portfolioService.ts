import client from '@client/apolloClient';
import type { PortfolioBalancesQuery, NftBalanceQuery } from '@src/types/types-hooks';
import { PortfolioBalancesDocument, NftBalanceDocument } from '@src/types/types-hooks';

const SUPPORTED_CHAINS = ['ETHEREUM', 'ARBITRUM', 'OPTIMISM', 'POLYGON', 'BASE', 'BNB', 'CELO'];

type FetchOptions = {
    includeTokens?: boolean;
    includeNfts?: boolean;
};

export async function fetchPortfolioData(
    ownerAddress: string,
    options: FetchOptions = { includeTokens: true, includeNfts: true },
    chains: string[] = SUPPORTED_CHAINS
): Promise<{ tokens?: PortfolioBalancesQuery; nfts?: NftBalanceQuery }> {
    const [tokenResponse, nftResponse] = await Promise.all([
        options.includeTokens
            ? client.query({
                query: PortfolioBalancesDocument,
                variables: { ownerAddress, chains },
            })
            : Promise.resolve({ data: { portfolios: [] } }),
        options.includeNfts
            ? client.query({
                query: NftBalanceDocument,
                variables: { ownerAddress, chains },
            })
            : Promise.resolve({ data: { nftBalances: [] } }),
    ]);

    return {
        tokens: options.includeTokens ? tokenResponse.data : undefined,
        nfts: options.includeNfts ? nftResponse.data : undefined,
    };
}
