import { Gavel, FileUp, UsersRound } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-slate-900 flex flex-col items-center justify-center text-white px-4">
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-10 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Adli Blokzincir Takip Sistemi
      </motion.h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* NFT Oluşturma */}
        <motion.div
          className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-md hover:scale-105 transition text-center"
          whileHover={{ scale: 1.05 }}
        >
          <Gavel className="w-12 h-12 mx-auto mb-3 text-blue-300" />
          <h2 className="text-xl font-semibold">NFT Tabanlı Tanık Oluştur</h2>
          <p className="text-sm mt-2 text-blue-100">
            Tanık ifadelerini sahteciliğe karşı blokzincirle koruyun.
          </p>
        </motion.div>

        {/* Delil Yükleme */}
        <motion.div
          className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-md hover:scale-105 transition text-center"
          whileHover={{ scale: 1.05 }}
        >
          <FileUp className="w-12 h-12 mx-auto mb-3 text-blue-300" />
          <h2 className="text-xl font-semibold">Delil Yükle</h2>
          <p className="text-sm mt-2 text-blue-100">
            Dijital belgeleri blokzincire yükleyerek iz kaybını önleyin.
          </p>
        </motion.div>

        {/* DAO Paneli */}
        <motion.div
          className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-md hover:scale-105 transition text-center"
          whileHover={{ scale: 1.05 }}
        >
          <UsersRound className="w-12 h-12 mx-auto mb-3 text-blue-300" />
          <h2 className="text-xl font-semibold">DAO Oylama Paneli</h2>
          <p className="text-sm mt-2 text-blue-100">
            Karar alma süreçlerini oylama sistemiyle yönetin.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
