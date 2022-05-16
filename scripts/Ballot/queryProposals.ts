import { Contract, ethers } from "ethers";
import * as ballotJson from "../../artifacts/contracts/Ballot.sol/Ballot.json";
// eslint-disable-next-line node/no-missing-import
import { Ballot } from "../../typechain";
import { connectToWallet } from "../utils";
  
/**
 * > queryProposals <ballotContractAddress>
 * 
 * Outputs proposals and vote count
 */
async function main() {
  // Get inputs
  if (process.argv.length < 3) throw new Error("Ballot address missing");
  const ballotAddress = process.argv[2];
  
  // Connect to wallet
  const { signer } = await connectToWallet();

  // Connect to contract
  const ballotContract: Ballot = new Contract(
    ballotAddress,
    ballotJson.abi,
    signer
  ) as Ballot;

  // Query proposals
  const proposals = await ballotContract.getProposals();
  
  console.log();
  console.log(`-----------------------------------`);
  console.log(`index) proposal_name proposal_votes`);
  console.log(`-----------------------------------`);
  console.log();
  for (let index = 0; index < proposals.length; index++) {
    console.log(`${index}) ${ethers.utils.parseBytes32String(proposals[index].name)} ${proposals[index].voteCount.toString()}`)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
