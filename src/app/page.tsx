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
