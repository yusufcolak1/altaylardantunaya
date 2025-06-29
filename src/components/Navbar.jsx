import { Link } from "react-router-dom";
import { useState } from "react";
import { useBlockchain } from "../context/BlockchainContext";
import { Wallet, LogOut, Menu, X } from "lucide-react";

const Navbar = () => {
  const { 
    isInitialized, 
    isLoading, 
    error, 
    account, 
    balance, 
    initialize, 
    disconnect 
  } = useBlockchain();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Format account address for display
  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleConnectWallet = async () => {
    try {
      await initialize();
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };
  
  const handleDisconnect = () => {
    disconnect();
  };
  
  return (
    <nav className="bg-blue-900 shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-white">
            Adli Blokzincir
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-blue-200 hover:text-white transition">
            Ana Sayfa
          </Link>
          <Link to="/create-nft" className="text-blue-200 hover:text-white transition">
            NFT Oluştur
          </Link>
          <Link to="/nfts" className="text-blue-200 hover:text-white transition">
            NFT Listesi
          </Link>
          <Link to="/upload-evidence" className="text-blue-200 hover:text-white transition">
            Delil Yükle
          </Link>
          <Link to="/dao-panel" className="text-blue-200 hover:text-white transition">
            DAO Paneli
          </Link>
          <Link to="/payment-page" className="text-blue-200 hover:text-white transition">
            Ödeme
          </Link>
        </div>
        
        {/* Wallet Connection */}
        <div className="hidden md:flex items-center">
          {!isInitialized ? (
            <button
              onClick={handleConnectWallet}
              disabled={isLoading}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              <Wallet className="mr-2 h-5 w-5" />
              {isLoading ? "Bağlanıyor..." : "Cüzdan Bağla"}
            </button>
          ) : (
            <div className="flex items-center">
              <div className="mr-4 text-sm">
                <div className="font-medium text-blue-200">{formatAddress(account)}</div>
                <div className="text-blue-300">{balance ? `${parseFloat(balance).toFixed(4)} ETH` : ""}</div>
              </div>
              <button
                onClick={handleDisconnect}
                className="flex items-center bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden pt-4 pb-2">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="text-blue-200 hover:text-white transition px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Ana Sayfa
            </Link>
            <Link 
              to="/create-nft" 
              className="text-blue-200 hover:text-white transition px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              NFT Oluştur
            </Link>
            <Link 
              to="/nfts" 
              className="text-blue-200 hover:text-white transition px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              NFT Listesi
            </Link>
            <Link 
              to="/upload-evidence" 
              className="text-blue-200 hover:text-white transition px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Delil Yükle
            </Link>
            <Link 
              to="/dao-panel" 
              className="text-blue-200 hover:text-white transition px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              DAO Paneli
            </Link>
            <Link 
              to="/payment-page" 
              className="text-blue-200 hover:text-white transition px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Ödeme
            </Link>
            
            {/* Mobile Wallet Connection */}
            <div className="px-4 py-2">
              {!isInitialized ? (
                <button
                  onClick={handleConnectWallet}
                  disabled={isLoading}
                  className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition w-full justify-center"
                >
                  <Wallet className="mr-2 h-5 w-5" />
                  {isLoading ? "Bağlanıyor..." : "Cüzdan Bağla"}
                </button>
              ) : (
                <div className="flex flex-col space-y-2">
                  <div className="text-sm">
                    <div className="font-medium text-blue-200">{formatAddress(account)}</div>
                    <div className="text-blue-300">{balance ? `${parseFloat(balance).toFixed(4)} ETH` : ""}</div>
                  </div>
                  <button
                    onClick={handleDisconnect}
                    className="flex items-center bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition justify-center"
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    Bağlantıyı Kes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 