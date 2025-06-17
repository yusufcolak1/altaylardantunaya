import { useState } from "react";

export default function UploadEvidence() {
  const [file, setFile] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) {
      setShowErrorMessage(true);
      setShowSuccessMessage(false);
      setTimeout(() => setShowErrorMessage(false), 3000);
      return;
    }
    setFileName(file.name);
    setShowSuccessMessage(true);
    setShowErrorMessage(false);
    setTimeout(() => setShowSuccessMessage(false), 3000);
    // Burada dosya yükleme işlemi yapilabilir
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-800 to-purple-900 px-4 text-white relative">
      <h2 className="text-4xl font-bold mb-4">Delil Yükle</h2>
      <form onSubmit={handleUpload} className="flex flex-col items-center gap-4">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="text-white bg-white/20 px-4 py-2 rounded cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-white file:text-blue-900 hover:file:bg-blue-200"
        />
        <button
          type="submit"
          className="bg-white text-blue-900 px-6 py-2 rounded-full hover:bg-blue-300 transition"
        >
          Yükle
        </button>
      </form>

      {/* Başarılı yükleme mesajı */}
      {showSuccessMessage && (
        <div className="absolute top-1/3 bg-white/80 text-blue-900 px-6 py-4 rounded-xl shadow-lg backdrop-blur-md transition duration-300 ease-in-out">
          <strong>{fileName}</strong> başarıyla yüklendi ✅
        </div>
      )}

      {/* Hata mesajı */}
      {showErrorMessage && (
        <div className="absolute top-1/3 bg-red-100 text-red-800 px-6 py-4 rounded-xl shadow-lg backdrop-blur-md transition duration-300 ease-in-out">
          Lütfen bir dosya seçin! ⚠️
        </div>
      )}
    </div>
  );
}
