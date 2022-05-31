import React from "react";
import { Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";

function useQuery() {
  const {search} = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const DetailsPage = ({ user }) => {
  let query = useQuery();

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
