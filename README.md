``` typescript
"use client";
export default function Home() {
  let poolBalance: number = 0; // Pool balance in USDT
  const tokenWeights: { [key: string]: number } = {
    A: 0.32,
    B: 0.32,
    C: 0.32,
    D: 0.04,
  }; // Token weights
  const participants: { [key: string]: number } = {}; // Object to store participant information

  // Function to buy NFTs
  function buyNFTs(participantCount: number, purchaseAmount: number): void {
    const tokenAmount: number = purchaseAmount / participantCount;
    for (const token in tokenWeights) {
      const tokenShare: number = tokenWeights[token] * tokenAmount;
      participants[token] = participants[token]
        ? participants[token] + tokenShare
        : tokenShare;
      poolBalance += tokenShare;
    }
  }

  // Function to adjust the pool monthly
  function adjustPool(): void {
    const totalTokens: number = Object.values(participants).reduce(
      (total: number, token: number) => total + token,
      0
    );
    for (const token in participants) {
      participants[token] = participants[token] / totalTokens;
    }
  }

  // Function to distribute rewards
  function distributeRewards(): void {
    const nftCount: number = Object.keys(participants).length;
    const rewardPerNFT: number = poolBalance / nftCount;
    for (const token in participants) {
      const reward: number = rewardPerNFT * participants[token];
      document.getElementById(
        "reward"
      )!.innerHTML = `Reward for NFT with token ${token}: ${reward} USDT`;
      console.log(`Reward for NFT with token ${token}: ${reward} USDT`);
    }
  }

  // Function to withdraw liquidity
  function withdrawLiquidity(token: string): void {
    if (token in participants) {
      const withdrawalAmount: number = participants[token] * poolBalance;
      poolBalance -= withdrawalAmount;
      delete participants[token];
      document.getElementById("withdraw")!.innerHTML =
        "Withdrawn " + withdrawalAmount + "USDT for NFT with token " + token;
      console.log(
        `Withdrawn ${withdrawalAmount} USDT for NFT with token ${token}`
      );
    }
  }

  function main(): void {
    // Example usage
    buyNFTs(10, 100); // Buy NFTs for 10 participants with $100 each
    adjustPool(); // Adjust the pool weights
    distributeRewards(); // Distribute rewards
    withdrawLiquidity("A"); // Withdraw liquidity for NFT with token A

    document.getElementById("text")!.innerHTML =
      "Pool balance:" +
      poolBalance +
      "<br>" +
      "Participant information:" +
      JSON.stringify(participants, null, 4);
    console.log("Pool balance:", poolBalance);
    console.log("Participant information:", participants);
  }

  return (
    <main className="p-5 min-h-screen ">
      <p>OpenEGG</p>
      <button className="p-5 bg-zinc-800 text-white" onClick={main}>
        Buy NFT
      </button>
      <pre id="reward" />
      <pre id="withdraw" />
      <pre id="text" />
    </main>
  );
}


```


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
