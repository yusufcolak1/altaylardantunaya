import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import CreateNFT from "./pages/CreateNFT";
import UploadEvidence from "./pages/UploadEvidence";
import DaoPanel from "./pages/DaoPanel";
import NFTList from "./pages/NFTList"; 
import PaymentPage from "./pages/PaymentPage";

function App() {
  const [nfts, setNfts] = useState([]);

  const addNFT = (nft) => {
    setNfts((prev) => [...prev, nft]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-blue-950 text-white">
        <nav className="bg-blue-900 shadow-md p-4 flex justify-center gap-6">
          <Link to="/" className="text-blue-200 hover:text-white transition">Ana Sayfa</Link>
          <Link to="/create-nft" className="text-blue-200 hover:text-white transition">NFT Oluştur</Link>
          <Link to="/nfts" className="text-blue-200 hover:text-white transition">NFT Listesi</Link> 
          <Link to="/upload-evidence" className="text-blue-200 hover:text-white transition">Delil Yükle</Link>
          <Link to="/dao-panel" className="text-blue-200 hover:text-white transition">DAO Paneli</Link>
          <Link to="/payment-page" className="text-blue-200 hover:text-white transition">Ödeme</Link>
          
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-nft" element={<CreateNFT onCreate={addNFT} />} /> {/* prop eklendi */}
          <Route path="/nfts" element={<NFTList nfts={nfts} />} /> 
          <Route path="/upload-evidence" element={<UploadEvidence />} />
          <Route path="/dao-panel" element={<DaoPanel />} />
          <Route path="/payment-page" element={<PaymentPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
