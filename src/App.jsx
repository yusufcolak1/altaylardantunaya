import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { BlockchainProvider } from "./context/BlockchainContext";
import Home from "./pages/Home";
import CreateNFT from "./pages/CreateNFT";
import UploadEvidence from "./pages/UploadEvidence";
import DaoPanel from "./pages/DaoPanel";
import NFTList from "./pages/NFTList"; 
import PaymentPage from "./pages/PaymentPage";
import Navbar from "./components/Navbar";

function App() {
  const [nfts, setNfts] = useState([]);

  const addNFT = (nft) => {
    setNfts((prev) => [...prev, nft]);
  };

  return (
    <BlockchainProvider>
      <Router>
        <div className="min-h-screen bg-blue-950 text-white">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-nft" element={<CreateNFT onCreate={addNFT} />} /> 
            <Route path="/nfts" element={<NFTList nfts={nfts} />} /> 
            <Route path="/upload-evidence" element={<UploadEvidence />} />
            <Route path="/dao-panel" element={<DaoPanel />} />
            <Route path="/payment-page" element={<PaymentPage />} />
          </Routes>
        </div>
      </Router>
    </BlockchainProvider>
  );
}

export default App;
