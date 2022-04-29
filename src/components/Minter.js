import React from "react";
import { useState } from "react";
import { create } from "ipfs-http-client";
import { Card, Grid } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { MoralisContext, MoralisProvider } from "react-moralis";
import { contractAddress, ABI } from "../ABI_Contract";
import "../styles/Minter.css";
const Web3 = require("web3");

const Minter = ({ user, executeFunction }) => {
  const client = create("https://ipfs.infura.io:5001/api/v0");
  const w3 = new Web3(window.ethereum);
  // const web3 = await Moralis.enableWeb3();
  const tokenContract = new w3.eth.Contract(ABI, contractAddress);

  // const { native } = useMoralisWeb3Api();

  const [coverArtUrl, updateCoverArtUrl] = useState(``);
  const [musicFileUrl, updateMusicFileUrl] = useState(``);

  const [artistName, setArtistName] = React.useState("");
  const handleArtistNameChange = (event) => {
    setArtistName(event.target.value);
  };

  const [songTitle, setSongTitle] = React.useState("");
  const handleSongTitleChange = (event) => {
    setSongTitle(event.target.value);
  };

  async function onChangeCoverArtInput(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      updateCoverArtUrl(url);
      console.log(coverArtUrl);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function onChangeMusicFileInput(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      updateMusicFileUrl(url);
      console.log(musicFileUrl);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  // var options = {
  //   contractAddress: contractAddress,
  //   functionName: "mint",
  //   abi: ABI,
  //   params: {
  //     to: "",
  //     uri: "",
  //   },
  // };

  // const { fetch, data } = useWeb3ExecuteFunction();

  const mintNFT = async () => {
    if (coverArtUrl && musicFileUrl) {
      const added = await client.add(
        JSON.stringify({
          version: "MusicNFT",
          title: songTitle,
          artist: artistName,
          name: `${artistName} - ${songTitle}`,
          image: coverArtUrl,
          audioUrl: musicFileUrl,
        })
      );
      // options.params.to = user.attributes.ethAddress;
      // options.params.uri = "https://ipfs.infura.io/ipfs/" + added.path;

      // await executeFunction(options);
      // console.log(data)
      // console.log(options.params);
      console.log(String("https://ipfs.infura.io/ipfs/" + String(added.path)));
      const receipt = tokenContract.methods
        .safeMint(
          String(user.attributes.ethAddress),
          String("https://ipfs.infura.io/ipfs/" + String(added.path))
        )
        .send({ from: String(user.attributes.ethAddress) });
      console.log(added.path);
      console.log(receipt);
      //   console.log(user.attributes.ethAddress);
    }
  };

  return (
    <div className="mint-form mint-card">
      <Grid container spacing={3}>
        <Grid item xs={12} className="mint-form-heading">
          {" "}
          <h1>Mint NFT</h1>
        </Grid>
        <Grid item xs={12}>
          {" "}
          <TextField
            id="artist-name-input"
            label="Artist Name"
            value={artistName}
            onChange={handleArtistNameChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="song-title-input"
            label="Song Title"
            value={songTitle}
            onChange={handleSongTitleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            color={coverArtUrl ? "success" : "secondary"}
            variant={coverArtUrl ? "outlined" : "contained"}
            component="label"
          >
            {coverArtUrl ? "Upload Successful" : "Upload Cover Art"}
            <input type="file" onChange={onChangeCoverArtInput} hidden />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            color={musicFileUrl ? "success" : "secondary"}
            variant={musicFileUrl ? "outlined" : "contained"}
            component="label"
          >
            {musicFileUrl ? "Upload Successful" : "Upload Music File"}
            <input type="file" onChange={onChangeMusicFileInput} hidden />
          </Button>
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={mintNFT}>
            MINT
          </Button>
        </Grid>
      </Grid>

      {/* {data && <pre>{JSON.stringify(data)}</pre>} */}
    </div>
  );
};

export default Minter;
