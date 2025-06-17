import { Link } from "react-router-dom";
import { Home, PlusCircle, Upload, Users, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-900 dark:bg-gray-800 shadow-md p-4 flex flex-col md:flex-row items-center md:justify-center gap-4 md:gap-8 relative">
      
      <button 
        className="md:hidden text-blue-200 dark:text-gray-300 hover:text-white transition"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menüyü aç/kapat"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
        className={`flex flex-col md:flex-row md:items-center md:justify-center gap-4 md:gap-8 overflow-hidden md:overflow-visible w-full md:w-auto`}
      >
        <Link to="/" className="flex items-center gap-1 text-blue-200 dark:text-gray-300 hover:text-white transition">
          <Home size={18} />
          Ana Sayfa
        </Link>

        <Link to="/create-nft" className="flex items-center gap-1 text-blue-200 dark:text-gray-300 hover:text-white transition">
          <PlusCircle size={18} />
          NFT Oluştur
        </Link>

        <Link to="/upload-evidence" className="flex items-center gap-1 text-blue-200 dark:text-gray-300 hover:text-white transition">
          <Upload size={18} />
          Delil Yükle
        </Link>

        <Link to="/dao-panel" className="flex items-center gap-1 text-blue-200 dark:text-gray-300 hover:text-white transition">
          <Users size={18} />
          DAO Paneli
        </Link>
      </motion.div>

      {/* Tema Değiştirici Buton */}
      <button
        onClick={toggleDarkMode}
        className="ml-auto md:ml-4 p-2 rounded-full bg-blue-700 dark:bg-gray-700 hover:bg-blue-600 dark:hover:bg-gray-600 transition text-white"
        aria-label="Tema değiştir"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </nav>
  );
}
