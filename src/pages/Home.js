import Navbar from "../components/Navbar";
import PlayBar from "../components/PlayBar";
import MusicCard from "../components/MusicCard";
import "../styles/Home.css";
import { Grid } from "@mui/material";

import { Button } from "@mui/material";

const Home = () => {
  // const loadMusicList = () => {
  //   fetchAllTokenIds();
  // }

  return (
    <div className="home-container">
      <div className="main">
        <Navbar />
        <Grid
          container
          className="main-component"
          rowSpacing={0}
        >
          <Grid item xs={12}  className="greeting">
            <h1 style={{color:"white"}}> Welcome back, Ashley! </h1>
          </Grid>
          <Grid item xs={12}>
            <MusicCard />
          </Grid>
          <div></div>
        </Grid>
      </div>
      <PlayBar />
      <style jsx>
        {`
          .main {
            display: flex;
          }
          .main-component {
            margin: 3%;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
