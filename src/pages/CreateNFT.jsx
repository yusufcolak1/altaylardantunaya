import { useState, useRef } from "react";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export default function CreateNFT({ onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef();

  const categories = [
    "Delil Fotoğrafı",
    "Ses Kaydı",
    "Video Kanıtı",
    "Sözleşme / Belge",
    "İşlem Kaydı",
    "Mahkeme Kararı",
    "Diğer",
  ];

  const validateFile = (file) => {
    const imageTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
    if (!imageTypes.includes(file.type)) {
      setError("Lütfen bir görsel dosyası seçin. (PNG, JPG, JPEG, GIF)");
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("Dosya boyutu 10MB'dan büyük olamaz.");
      return false;
    }
    return true;
  };

  const handleFileChange = (e) => {
    setError("");
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (!validateFile(selectedFile)) {
      setFile(null);
      setPreview(null);
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setMessage("");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setError("");
    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile) return;

    if (!validateFile(droppedFile)) {
      setFile(null);
      setPreview(null);
      return;
    }

    setFile(droppedFile);
    setPreview(URL.createObjectURL(droppedFile));
    setMessage("");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!title.trim() || !description.trim() || !category || !file) {
      setError("Lütfen tüm alanları doldurun ve bir dosya seçin.");
      return;
    }

    setLoading(true);

    try {
      // 1. Simüle edilmiş görsel linki (örneğin IPFS linki gibi)
      const fakeImageUrl = `ipfs://fake-path/${file.name}`;

      // 2. Metadata
      const metadata = {
        name: title,
        description,
        category,
        image: fakeImageUrl,
        createdAt: new Date().toISOString(),
      };

      console.log("Hazırlanan NFT Metadata:", metadata);

      // 3. OnCreate callback'i varsa parent'e bildir
      if (onCreate) {
        onCreate(metadata);
      }

      // 4. Gelecekte IPFS/blokzincir işlemi için yer tutucu
      await new Promise((r) => setTimeout(r, 2000));

      setMessage(`NFT "${title}" başarıyla oluşturuldu! 🎉`);
      setTitle("");
      setDescription("");
      setCategory("");
      setFile(null);
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setError("NFT oluşturma işlemi sırasında bir hata oluştu.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-800 to-purple-900 px-6 py-10 text-white">
      <h2 className="text-4xl font-bold mb-8">NFT Oluştur</h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col gap-6 bg-blue-900 bg-opacity-70 p-8 rounded-xl shadow-lg"
      >
        <input
          type="text"
          placeholder="NFT Başlığı"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 rounded bg-blue-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={loading}
          required
        />

        <textarea
          placeholder="NFT Açıklaması"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="p-3 rounded bg-blue-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          disabled={loading}
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 rounded bg-blue-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={loading}
          required
        >
          <option value="" disabled>
            Kategori Seçiniz
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-blue-400 rounded p-4 text-center cursor-pointer hover:border-blue-600 transition relative"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
            disabled={loading}
            required
          />
          {!file && <p>Dosya seçmek için tıklayın veya sürükleyip bırakın</p>}
          {file && (
            <p>
              Seçilen dosya: <strong>{file.name}</strong>
            </p>
          )}
        </div>

        {preview && (
          <div className="relative w-full h-56 overflow-hidden rounded-md border border-white/30 shadow-lg">
            <img
              src={preview}
              alt="NFT Önizleme"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center p-4">
              <h3 className="text-lg font-bold">{title || "Başlık yok"}</h3>
              <p className="text-sm">{category || "Kategori seçilmedi"}</p>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`rounded py-3 font-semibold transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Oluşturuluyor..." : "Oluştur"}
        </button>

        {error && (
          <p className="mt-4 text-center text-red-400 font-semibold">{error}</p>
        )}
        {message && (
          <p className="mt-4 text-center text-yellow-300 font-semibold">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
