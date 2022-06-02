import {
  Grid,
  Link,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Button,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import placeholder from "../placeholder.jpg";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { contractAddress } from "../deployedContracts/NFT_ABI_Contract";
import { marketPlaceContractAddress, marketPlaceABI } from "../deployedContracts/Marketplace_ABI_Contract";
const Web3 = require("web3");

const YourNFT = () => {
  const Web3Api = useMoralisWeb3Api();
  const [NFTList, setNFTList] = useState([]);
  const [musicList, setMusicList] = useState([]);
  const [listedNFTTokens, setlistedNFTTokens] = useState([]);

  const getAllListedNFTs = async () => {
    var i = 1;
    setlistedNFTTokens([])
    const w3 = new Web3(window.ethereum);
    const marketPlaceContract = new w3.eth.Contract(marketPlaceABI, marketPlaceContractAddress);
    while (true) {
      var reciept = await marketPlaceContract.methods.marketItems(
        i
      ).call()
      if (reciept.id == 0) {
        break;
      }
      i += 1

      setlistedNFTTokens((listedNFTTokens) => [
        ...listedNFTTokens,
        reciept
      ])
      // console.log(listedNFTTokens)
    }
    // setTokenIds(listedNFTTokens)
  }

  const checkIfListed = (token_id) => {
    var isListed = false;
    listedNFTTokens.forEach((item) => {
      // console.log(item.tokenId, "comp", token_id)
      if(item.tokenId == token_id ) {
        // console.log("break here")
        if(item.state=="0"){
          isListed = true;
        }
        return;
      }
    })
    return isListed;
  }

  // const [YourNFTList, setYourNFTList] = useState([
  //   {
  //     image: placeholder,
  //     title: "Test Title",
  //     artist: "Test Artist",
  //   },
  //   {
  //     image: placeholder,
  //     title: "Test Title",
  //     artist: "Test Artist",
  //   },
  // ]);

  const w3 = new Web3(window.ethereum);
  const marketPlaceContract = new w3.eth.Contract(marketPlaceABI, marketPlaceContractAddress);

  const { user } = useMoralis();

  const listNFT = async (item) => {
    // console.log(item)
    if (item.token_id) {
      const reciept = await marketPlaceContract.methods.createMarketItem(
        String(contractAddress),
        item.token_id,
        1000000000000000
      ).send({ from: String(user.attributes.ethAddress), value: String(1000000000000000) });

      // console.log(reciept)
    }
  }

  const unlistNFT = async (item) => {
    listedNFTTokens.forEach(async (listed) => {
      if(listed.tokenId == item.token_id && listed.state!="2") {
        console.log(listed.id)
        const reciept = await marketPlaceContract.methods.deleteMarketItem(
          listed.id
        ).send({ from: String(user.attributes.ethAddress) })
        return;
      }
    })
  }

  const fetchAllUserNFTs = async () => {
    setNFTList([]);
    const options = {
      token_address: contractAddress,
      chain: "rinkeby",
      address: user.attributes.ethAddress,
    };
    var NFTs = await Web3Api.account.getNFTsForContract(options);
    // console.log(NFTs.result);
    NFTs.result.forEach((item, index) => {
      if (item.metadata != null) {
        setNFTList((NFTList) => [
          ...NFTList,
          item,
        ])
      }
    });
    // setNFTList(NFTs.result);

  };

  const parseNFTs = async () => {
    setMusicList([]);
    NFTList.forEach((item, index) => {
      if (item.metadata != null) {
        // console.log(JSON.parse(item.metadata));
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
    // console.log(NFTList);
    parseNFTs();
  }, [NFTList]);

  return (
    <div className='home-container'>
      <div className='main'>
        <Navbar />
        <Grid container className='main-component' rowSpacing={0}>
          <Grid item xs={12} className='greeting'>
            <h1 style={{ color: "white" }}> Your Collections! </h1>
          </Grid>
          <Grid>
            <ImageList
              variant='standard'
              cols={7}
              gap={100}
              style={{ height: "100%" }}
            >
              {NFTList.map((item) => {
                // console.log(listedNFTTokens)
                return (
                  // console.log(JSON.parse(item.metadata))
                  // <Link href={item.audioUrl} target="_blank" key={item.title}>
                  <div className='rengu' key={item.token_id}
                  >
                    <ImageListItem
                      key={item.token_id}
                      style={{
                        width: "10vw",
                        height: "10vw",
                        cursor: "pointer",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={JSON.parse(item.metadata).image}
                        // srcSet={item.metadata["image"]}
                        // alt={item.metadata["title"]}
                        loading='lazy'
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
                    <div className='button-block'>
                      <div>
                        <Button variant='contained' href={"/nft/"+ item.token_id}>Info</Button>
                        <Button variant="contained" onClick={() => {
                          checkIfListed(item.token_id)?unlistNFT(item):listNFT(item)
                        }}>{checkIfListed(item.token_id)?"Unlist":"List"}</Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </ImageList>
          </Grid>
          <Grid>
            <Button variant="contained" onClick={async () => { await getAllListedNFTs(); fetchAllUserNFTs(); }}>Refresh</Button>
          </Grid>
        </Grid>
      </div>
      <style jsx>
        {`
          .main {
            display: flex;
          }
          .main-component {
            margin: 3%;
          }

          .button-block {
            display: none;
          }

          .rengu:hover .button-block {
            display: inline-block;
          }
        `}
      </style>
    </div>
  );
};

export default YourNFT;
