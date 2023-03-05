const express = require("express");
const verifyProof = require("../utils/verifyProof");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
// create merkle tree from nice list
const merkleTree = new MerkleTree(niceList);
const MERKLE_ROOT = merkleTree.getRoot();

app.post("/gift", (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;

  // TODO: prove that a name is in the list
  const inTheList = verifyProof(body.proof, body.name, MERKLE_ROOT);
  if (inTheList) {
    res.send("Yep! You're in the list & you deserve a gift");
  } else {
    res.send("Whoops! You're not in the list! Better luck next time.");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
