import { fetchPortfolioData } from '@services/portfolioService';

export async function printBalances(ownerAddress: string, options = {}, chains = ['ETHEREUM']) {
  const { tokens, nfts } = await fetchPortfolioData(ownerAddress, { ...options }, chains);

  if (tokens?.portfolios?.[0]?.tokenBalances) {
    const filteredTokenData = tokens.portfolios[0].tokenBalances
      .filter(token =>
        !(token.tokenProjectMarket?.tokenProject?.isSpam) && token.quantity !== 0
      );

    const tokenData = filteredTokenData.map(token => {
      const percentChange = token.tokenProjectMarket?.pricePercentChange?.value;
      const formattedPercentChange = percentChange != null
        ? `${percentChange >= 0 ? '+' : ''}${percentChange.toFixed(2)}%`
        : 'N/A';
      const formattedValue = token.denominatedValue?.value != null
        ? `$${token.denominatedValue.value.toFixed(3)} USD`
        : 'N/A';

      return {
        Name: token.token?.name || 'N/A',
        Symbol: token.token?.symbol || 'N/A',
        Quantity: token.quantity || 'N/A',
        Value: formattedValue,
        PercentChange: formattedPercentChange
      };
    });

    console.log("\n");
    console.log('--------------- Token Balances ---------------');
    console.table(tokenData);
    console.log("\n");
  } else {
    console.log('No token balances available.');
  }

  if (nfts?.nftBalances?.edges) {
    const nftData = nfts.nftBalances.edges.map(edge => {
      const nft = edge.node.ownedAsset;
      const floorPrice = nft?.collection?.markets?.[0]?.floorPrice?.value;
      return {
        Name: nft?.name,
        CollectionName: nft?.collection?.name,
        FloorPrice: floorPrice != null ? `${floorPrice} ETH` : 'N/A',
        TotalSupply: nft?.collection?.nftContracts?.[0]?.totalSupply,
      };
    });

    console.log('--------------- NFT Balances ---------------');
    console.table(nftData);
  } else {
    console.log('No NFT balances available.');
  }
}
