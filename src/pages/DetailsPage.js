import React from "react";
import { useState } from "react";
import { Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import "../styles/DetailsPage.css";

import TestImage from "../placeholder.jpg";
import EtherTable from "../components/EtherTable";
import "../styles/DetailsPage.css"
import { contractAddress } from "../deployedContracts/NFT_ABI_Contract";
import { useMoralisWeb3Api } from "react-moralis";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";

const DetailsPage = (props) => {
  const Web3Api = useMoralisWeb3Api();
  let { tokenId } = useParams();

  const [NFTData, setNFTData] = useState(
    {
      artist: "XXX",
      audioUrl: "XXX",
      // image: "XXX",
      name: "XXX",
      title: "XXX",
      version: "XXX"
    });

  const [transferData, setTransferData] = useState(
    [

      {
        amount: "0",
        block_hash: "0",
        block_number: "0",
        block_timestamp: "2022-04-29T04:02:34.000Z",
        contract_type: "ERC721",
        from_address: "0x0000000000000000000000000000000000000000",
        log_index: 0,
        operator: null,
        to_address: "0",
        token_address: "0",
        token_id: "0",
        transaction_hash: "0",
        transaction_index: 0,
        transaction_type: "0",
        value: "0",
        verified: 1,
      }
    ]
  )

  const [tokenOwner, setTokenOwner] = useState("XXX");
  const [transferList, setTransferList] = useState();

  const getNFTDetails = async () => {
    const options = {
      address: contractAddress,
      token_id: tokenId,
      chain: "rinkeby",
    };
    var tokenMetadata = await Web3Api.token.getTokenIdMetadata(options);
    console.log(tokenMetadata)
    console.log(tokenMetadata.metadata)
    setNFTData(JSON.parse(tokenMetadata.metadata));
    setTokenOwner(tokenMetadata.owner_of)
    console.log(NFTData.image)
    // console.log(listedNFTData)
  }

  const getNFTTransfers = async () => {
    setTransferList([]);
    const options = {
      address: contractAddress,
      token_id: tokenId,
      chain: "rinkeby",
    };
    var transfers = await Web3Api.token.getWalletTokenIdTransfers(
      options
    );
    console.log(transfers)
    setTransferData(transfers.result);
  }

  return (
    <Grid container className='mint-main' spacing={2}>
      <Grid item lg={1}>
        <Navbar />
      </Grid>
      <Grid
        container
        lg={10}
        style={{ margin: "20px", height: "80vh", width: "90%" }}
      >
        <Grid item xs={5}>
          <img src={NFTData.image} alt={TestImage} style={{ height: "65vh" }} />
        </Grid>
        <Grid item xs={7} style={{ height: "24vh" }}>
          <h1>{NFTData.title}</h1>
          <Grid item xs={12}>
            <h2>Artist/Album : {NFTData.artist}</h2>
          </Grid>
          <Grid item xs={7}>
            <h4>Owned by : {tokenOwner}</h4>
          </Grid>

        </Grid>
        <Grid item xs={12} margin={2}>
          <EtherTable transferData={transferData} />
        </Grid>
        <Button variant="contained" onClick={() => {
          getNFTDetails();
          getNFTTransfers();
        }}>Refresh</Button>
      </Grid>
    </Grid>
  );
};

export default DetailsPage;
