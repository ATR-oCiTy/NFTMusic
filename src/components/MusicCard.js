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
import axios from "axios";

const MusicCard = ({ setMusicURL }) => {
  const Web3Api = useMoralisWeb3Api();
  var NFTs = [];
  const [NFTList, setNFTList] = useState([]);
  const [musicList, setMusicList] = useState([]);

  const fetchAllTokenIds = async () => {
    const options = {
      address: contractAddress,
      chain: "rinkeby",
    };
    NFTs = await Web3Api.token.getAllTokenIds(options);
    setNFTList(NFTs.result);
  };

  const parseNFTs = async () => {
    setMusicList([]);
    NFTList.forEach((item, index) => {
      if (item.metadata != null) {
        console.log(JSON.parse(item.metadata));
        if (!musicList.includes(JSON.parse(item.metadata))) {
          setMusicList((musicList) => [
            ...musicList,
            JSON.parse(item.metadata),
          ]);
        }
        // console.log(musicList);
      }
    });
  };

  useEffect(() => {
    console.log(NFTList);
    parseNFTs();
  }, [NFTList]);

  return (
    <div style={{ height: "100%" }}>
      <ImageList
        variant="standard"
        cols={6}
        gap={100}
        style={{ paddingTop: "5%", height: "90%", width: "90vw" }}
      >
        {musicList.map((item) => (
          // <Link href={item.audioUrl} target="_blank" key={item.title}>
          <ImageListItem
            onClick={() => {
              console.log("clicked");
              setMusicURL(item.audioUrl);
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
              src={`${item.image}?w=248&h=248&fit=crop&auto=format`}
              srcSet={`${item.image}?w=248&h=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
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
                  {item.title}
                </span>
              }
              subtitle={
                <span style={{ color: "white", fontWeight: "600" }}>
                  {item.artist}
                </span>
              }
            />
          </ImageListItem>
          // </Link>
        ))}
      </ImageList>
      <Button variant="contained" onClick={fetchAllTokenIds}>
        Refresh
      </Button>
    </div>
  );
};

export default MusicCard;

// const musicList = [
//   {
//     title: "Song title1",
//     url: "album",
//     image: "/music-title.svg",
//   },
//   {
//     title: "Song title2",
//     url: "",
//     image: "/music-title.svg",
//   },
//   {
//     title: "Song title3",
//     url: "",
//     image: "/music-title.svg",
//   },
//   {
//     title: "Song title4",
//     url: "",
//     image: "/music-title.svg",
//   },
//   {
//     title: "Song title5",
//     url: "",
//     image: "/music-title.svg",
//   },
// ];
