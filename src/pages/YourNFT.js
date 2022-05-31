import {
  Grid,
  Link,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Button,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { useState } from "react";
import placeholder from "../placeholder.jpg";
const YourNFT = () => {
  const [YourNFTList, setYourNFTList] = useState([
    {
      image: placeholder,
      title: "Test Title",
      artist: "Test Artist",
    },
    {
      image: placeholder,
      title: "Test Title",
      artist: "Test Artist",
    },
  ]);
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
              {YourNFTList.map((item) => (
                // <Link href={item.audioUrl} target="_blank" key={item.title}>
                <div className='rengu'>
                  <ImageListItem
                    key={item.title}
                    style={{
                      width: "10vw",
                      height: "10vw",
                      cursor: "pointer",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={item.image}
                      srcSet={item.image}
                      alt={item.title}
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
                  <div className='button-block'>
                    <div>
                      <Button variant='contained'>Info</Button>
                      <Button variant='contained'>List</Button>
                    </div>
                  </div>
                </div>
              ))}
            </ImageList>
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
