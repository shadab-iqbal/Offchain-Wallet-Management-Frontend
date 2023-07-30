// import { ethers } from "ethers";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API || "http://localhost:5001/api";

const API_PUBLIC_URL = process.env.NEXT_PUBLIC_API_PUBLIC || "http://localhost:5001";

const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_BASE_URL || "http://localhost:3000";

const RPC_URLS: Record<number, string> = {
  1: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  5: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  137: "https://polygon-mainnet.infura.io/v3/ae2ab6acf1b94d2fb3593d79f5d368a3",
  31337: "http://localhost:8545",
} as const;

const getRpcUrl = (chainId: number): string | undefined => RPC_URLS[chainId];

// const getProvider = (chainId: number) => {
//   const rpcUrl = getRpcUrl(chainId);
//   if (!rpcUrl) throw new Error(`No RPC URL for chainId ${chainId}`);
//   return new ethers.providers.StaticJsonRpcProvider(rpcUrl);
// };

let config = {
  API_BASE_URL,
  API_PUBLIC_URL,
  FRONTEND_URL,
  RPC_URLS,
  getRpcUrl,
  // getProvider,
};

export default config;
