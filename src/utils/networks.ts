import { VERSION } from './constants';
import { AztecAddress } from '@aztec/aztec.js';

export type Network = {
  nodeURL: string;
  name: string;
  description: string;
  hasTestAccounts: boolean;
  hasSponsoredFPC: boolean;
  version?: string;
  sponsoredFPC?: {
    version?: string;
    address: AztecAddress;
  };
  transactionCongestionThreshold?: number;
};

export const NETWORKS: Network[] = [
    {
    nodeURL: 'http://localhost:8080',
    name: 'Local Sandbox',
    description: `Run your own sandbox (v${VERSION})`,
    hasTestAccounts: true,
    hasSponsoredFPC: true,
    version: VERSION,
  },
  {
    nodeURL: 'https://aztec-alpha-testnet-fullnode.zkv.xyz',
    name: 'Aztec Testnet',
    description: 'Public testnet',
    hasTestAccounts: false,
    hasSponsoredFPC: true,
    version: '1.2.1',
    sponsoredFPC: {
      version: '1.2.1',
      address: AztecAddress.fromString('0x1260a43ecf03e985727affbbe3e483e60b836ea821b6305bea1c53398b986047'),
    },
    transactionCongestionThreshold: 40,
  },
  {
    nodeURL: 'http://34.169.170.55:8080',
    name: 'Aztec Devnet',
    description: 'Public development network',
    hasTestAccounts: false,
    hasSponsoredFPC: true,
    version: '0.85.0',
  },

];
