import {
  Grid,
  Link,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Button,
} from "@mui/material";
// import { useEffect, useState } from "react";
// import { useMoralisWeb3Api } from "react-moralis";
import { useEffect, useState } from "react";
import { useMoralisWeb3Api } from "react-moralis";
import { MoralisContext, MoralisProvider } from "react-moralis";
import { contractAddress } from "../deployedContracts/NFT_ABI_Contract";
import { marketPlaceABI, marketPlaceContractAddress } from "../deployedContracts/Marketplace_ABI_Contract";
import axios from "axios";
const Web3 = require("web3");


const MusicCard = ({ setMusicURL }) => {
  const Web3Api = useMoralisWeb3Api();
  var NFTs = [];
  const [NFTList, setNFTList] = useState([]);
  const [musicList, setMusicList] = useState([]);
  const [listedTokens, setListedTokens] = useState([]);
  const [listedNFTTokenIds, setlistedNFTTokenIds] = useState([]);
  const [listedNFTData, setlistedNFTData] = useState([]);
  const [tokenIds, setTokenIds] = useState([]);

  const getAllListedNFTs = async () => {
    var i=1;
    setlistedNFTTokenIds([])
    const w3 = new Web3(window.ethereum);
    const marketPlaceContract = new w3.eth.Contract(marketPlaceABI, marketPlaceContractAddress);
    while(true){
      var reciept = await marketPlaceContract.methods.marketItems(
        i
      ).call()
      if(reciept.id==0){
        break;
      }
      i+=1
      
      console.log(reciept)
      if(reciept.state!="2"){
      setlistedNFTTokenIds((listedNFTTokenIds) => [
        ...listedNFTTokenIds,
        reciept.tokenId
      ])
    }
      console.log(listedNFTTokenIds)
    }
    setTokenIds(listedNFTTokenIds)
  }

  const getNFTData = async () => {
    setlistedNFTData([])
    tokenIds.forEach(async (item, index) => {
      const options = {
        address: contractAddress,
        token_id: item,
        chain: "rinkeby",
      };
      const tokenMetadata = await Web3Api.token.getTokenIdMetadata(options);
      setlistedNFTData((listedNFTData) => [
        ...listedNFTData,
        tokenMetadata
      ])
    })
    console.log(listedNFTData)
  }

  // const fetchAllTokenIds = async () => {
  //   const options = {
  //     address: contractAddress,
  //     chain: "rinkeby",
  //   };
  //   NFTs = await Web3Api.token.getAllTokenIds(options);
  //   setNFTList(NFTs.result);
  // };

  // const parseNFTs = async () => {
  //   setMusicList([]);
  //   NFTList.forEach((item, index) => {
  //     if (item.metadata != null) {
  //       console.log(JSON.parse(item.metadata));
  //       if (!musicList.includes(JSON.parse(item.metadata))) {
  //         setMusicList((musicList) => [
  //           ...musicList,
  //           JSON.parse(item.metadata),
  //         ]);
  //       }
  //       // console.log(musicList);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   console.log(NFTList);
  //   parseNFTs();
  // }, [NFTList]);

  useEffect(() => {
    console.log(listedNFTTokenIds);
    getNFTData();
  }, [tokenIds])

  return (
    <div style={{ height: "100%" }}>
      <ImageList
        variant="standard"
        cols={6}
        gap={100}
        style={{ paddingTop: "5%", height: "90%", width: "90vw" }}
      >
        {listedNFTData.map((item) => (
          // <Link href={item.audioUrl} target="_blank" key={item.title}>
          <ImageListItem
            onClick={() => {
              console.log("clicked");
              setMusicURL(JSON.parse(item.metadata).audioUrl);
            }}
            key={item.title}
            style={{
              width: "10vw",
              height: "10vw",
              cursor: "pointer",
              overflow: "hidden",
            }}
          >
            <img
              src={`${JSON.parse(item.metadata).image}?w=248&h=248&fit=crop&auto=format`}
              srcSet={`${JSON.parse(item.metadata).image}?w=248&h=248&fit=crop&auto=format&dpr=2 2x`}
              alt={JSON.parse(item.metadata).title}
              loading="lazy"
              // style={{ width: "10vw", height:"10vw", cursor: "pointer" }}
            />
            <ImageListItemBar
              title={
                <span
                  style={{
                    fontSize: "auto",
                    color: "white",
                    fontWeight: "600",
                  }}
                >
                  {JSON.parse(item.metadata).title}
                </span>
              }
              subtitle={
                <span style={{ color: "white", fontWeight: "600" }}>
                  {JSON.parse(item.metadata).artist}
                </span>
              }
            />
          </ImageListItem>
          // </Link>
        ))}
      </ImageList>
      <Button variant="contained" onClick={() => {getAllListedNFTs()}}>
        Refresh
      </Button>
    </div>
  );
};

export default MusicCard;