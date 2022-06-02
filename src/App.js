import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MintPage from "./pages/MintPage";
import DetailsPage from "./pages/DetailsPage";
import YourNFT from "./pages/YourNFT";
import "./styles/globals.css";
import { useMoralis } from "react-moralis";
import { Button, Card } from "@mui/material";

function App() {
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    // account,
    logout,
  } = useMoralis();

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "Log in using Moralis" })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user.attributes.ethAddress);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const logOut = async () => {
    await logout();
    console.log("logged out");
  };

  return (
    <div className='App'style={{height: "100vh", width: "100vw", overflow:"auto"}}>
      <Card>
        <Button variant="contained" color="success" onClick={login}>Moralis Metamask Login</Button>
        <Button variant="contained" color="error" onClick={logOut} disabled={isAuthenticating}>
          Logout
        </Button>
      </Card>
      <div style={{ display: isAuthenticated ? "" : "none" }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/mint' element={<MintPage user={user} />}></Route>
            <Route path='/nft/:tokenId' element={<DetailsPage />}></Route>
            <Route path='/user' element={<YourNFT />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
