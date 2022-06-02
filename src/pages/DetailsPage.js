import React from "react";
import { Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import "../styles/DetailsPage.css";

import TestImage from "../placeholder.jpg";
import EtherTable from "../components/EtherTable";

const DetailsPage = ({ user }) => {
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
