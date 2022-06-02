import React from "react";
import { Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import "../styles/DetailsPage.css"

const DetailsPage = ({ user }) => {
  return (
    <Grid container className="mint-main" spacing={2}>
      <Grid item lg={1}>
        <Navbar />
      </Grid>
      <Grid item  lg={11} xs={6} md={8}>
          {/* YOUR CODE GOES HERE */}
          <ul class="card-wrapper">
  <       li class="card">
    <     img src='https://images.unsplash.com/photo-1611916656173-875e4277bea6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHw&ixlib=rb-1.2.1&q=80&w=400' alt=''>
          </img>
          <h3><a href="">A Super Wonderful Headline</a></h3>
          <div className="DetailsBar">
            <div className="NFT NAME">
              NFT NAME
            </div>
            <div className="NFT PREVIEW">
              nft preview image
            </div>
            <div className="App">
            <table>
                <tr>
                  <th>Owner</th>
                  <th>eth adress</th>
                  <th>Price</th>
                  <th>Time</th>
                </tr>
                <tr>
                  <td>Anom</td>
                  <td>190234234234</td>
                  <td>0.1eth</td>
                </tr>
                <tr>
                  <td>Megha</td>
                  <td>345345345345</td>
                  <td>0.009eth</td>
                </tr>
                <tr>
                  <td>Subham</td>
                  <td>143254326</td>
                  <td>0.003eth</td>
                </tr>
              </table>
          </div>
          </div>
          </li>
          </ul>



      </Grid>
    </Grid>
  );
};

export default DetailsPage;
