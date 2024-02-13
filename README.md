# Portfolio Tracker

This repository contains a script for fetching and displaying Ethereum token and NFT balances. The script is designed to be run with `bun`, a fast all-in-one JavaScript runtime.


## Prerequisites

- [bun](https://bun.sh/) installed on your system.
- An Ethereum RPC URL, which can be obtained from services like [Infura](https://www.infura.io/) or [Alchemy](https://www.alchemy.com/).

## Setup

1. Clone the repository:

```bash
git clone https://github.com/felinaprotocol/portfolio-tracker.git
```

2. Navigate to the project directory:

```bash
cd portfolio-tracker && cp .env.example .env
```

## Usage

The script can be run with either an Ethereum address or an ENS name. To run the script, use the following command:

```bash
bun balance <ENS_NAME_OR_ADDRESS>
```

For example: 

```bash
bun balance vitalik.eth
```

or

```bash
bun balance 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
```

The script will resolve the ENS name to an Ethereum address if necessary, and then it will fetch and display the balance information.

## Contributing

Contributions to this project are welcome. Please ensure that your code adheres to the existing style and that all tests pass.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.