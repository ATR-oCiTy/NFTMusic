import React from "react";
import { Grid } from "@mui/material";
import Navbar from "../components/Navbar";

const DetailsPage = ({ user }) => {
  return (
    <Grid container className="mint-main">
      <Grid item lg={1}>
        <Navbar />
      </Grid>
      <Grid item lg={11}>
          {/* YOUR CODE GOES HERE */}
          Ali pari
      </Grid>
    </Grid>
  );
};

export default DetailsPage;
