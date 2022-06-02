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


const DetailsPage = (props) => {
  const Web3Api = useMoralisWeb3Api();
  let {tokenId} = useParams();

  const [listedNFTData, setlistedNFTData] = useState();
  const [transferList, setTransferList] = useState();

  const getNFTDetails = async () => {
    setlistedNFTData([])
    const options = {
      address: contractAddress,
      token_id: tokenId,
      chain: "rinkeby",
    };
    const tokenMetadata = await Web3Api.token.getTokenIdMetadata(options);
    setlistedNFTData((listedNFTData) => [
      ...listedNFTData,
      tokenMetadata
    ])
    console.log(listedNFTData)
  }

  const getNFTTransfers = async () => {
    const options = {
      address: contractAddress,
      token_id: tokenId,
      chain: "rinkeby",
    };
    const transfers = await Web3Api.token.getWalletTokenIdTransfers(
      options
    );
    setTransferList(transferList)
    console.log(transferList)
  }

  useState(()=> {
    getNFTDetails();
    getNFTTransfers();
  },[])

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
          <img src={TestImage} style={{ height: "65vh" }} />
        </Grid>
        <Grid item xs={7} style={{ height: "24vh" }}>
          <h1>Test NFT Name</h1>
          <Grid item xs={7}>
            <h4>Owned by : </h4>
          </Grid>
          <Grid item xs={12}>
            <h2>Top bid : </h2>
          </Grid>
        </Grid>
        <Grid item xs={12} margin={2}>
          <EtherTable />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DetailsPage;
