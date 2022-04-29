import React from "react";
import Minter from "../components/Minter";
import Navbar from "../components/Navbar";
import "../styles/MintPage.css";
import { Grid } from "@mui/material";

const MintPage = ({ user }) => {
  return (
    <Grid container className="mint-main">
      <Grid item lg={1}>
        <Navbar />
      </Grid>
      <Grid item lg={3}>
          <div></div>
      </Grid>
      <Grid item lg={4}>
        <Minter user={user} />
      </Grid>
      <Grid item lg={4}>
      <div style={{width:"100%"}}></div>
      </Grid>
    </Grid>
  );
};

export default MintPage;
