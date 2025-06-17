import { useState, useEffect } from "react";

const dummyProposalsInitial = [
  {
    id: 1,
    title: "Delilin Blokzincire Kaydedilmesi",
    description: "Önemli bir delilin blockchain üzerinde saklanması.",
    status: "active",
    yes: 0,
    no: 0,
  },
  {
    id: 2,
    title: "Yeni DAO Üyesi Kabulü",
    description: "Topluluğa yeni bir üye eklenmesi teklifi.",
    status: "completed",
    yes: 14,
    no: 3,
  },
  {
    id: 3,
    title: "Oylama Süresinin Uzatılması",
    description: "Aktif oylamanın süresinin 3 gün daha uzatılması.",
    status: "active",
    yes: 4,
    no: 1,
  },
];

export default function DaoPanel() {
  const [proposals, setProposals] = useState(dummyProposalsInitial);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [vote, setVote] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [filter, setFilter] = useState("active"); // active or completed

  // Yeni teklif için state
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  // Oy kullanma işlemi
  const handleVote = () => {
    if (!vote) return alert("Lütfen oy seçin!");
    if (!selectedProposal) return;

    setProposals((prev) =>
      prev.map((p) => {
        if (p.id === selectedProposal.id) {
          if (vote === "yes") p.yes = (p.yes || 0) + 1;
          else if (vote === "no") p.no = (p.no || 0) + 1;
        }
        return p;
      })
    );
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
    setVote("");
    setSelectedProposal(null);
  };

  // Yeni teklif ekleme
  const handleAddProposal = () => {
    if (!newTitle.trim() || !newDesc.trim()) {
      alert("Başlık ve açıklama gerekli!");
      return;
    }
    const newProposal = {
      id: proposals.length + 1,
      title: newTitle,
      description: newDesc,
      status: "active",
      yes: 0,
      no: 0,
    };
    setProposals([...proposals, newProposal]);
    setNewTitle("");
    setNewDesc("");
  };

  // Oy sonuçlarını bar grafik olarak göstermek için yardımcı fonksiyon
  const totalVotes = (p) => (p.yes || 0) + (p.no || 0);

  return (
    <div className="min-h-screen bg-blue-900 text-white px-6 py-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">DAO Paneli</h1>

      {/* Filtre */}
      <div className="mb-6 flex justify-center gap-4">
        <button
          className={`px-4 py-2 rounded ${
            filter === "active" ? "bg-blue-600" : "bg-blue-800 hover:bg-blue-700"
          }`}
          onClick={() => setFilter("active")}
        >
          Aktif Oylamalar
        </button>
        <button
          className={`px-4 py-2 rounded ${
            filter === "completed" ? "bg-blue-600" : "bg-blue-800 hover:bg-blue-700"
          }`}
          onClick={() => setFilter("completed")}
        >
          Tamamlanmış Oylamalar
        </button>
      </div>

      {/* Oylamalar Listesi */}
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            {filter === "active" ? "Aktif Oylamalar" : "Tamamlanmış Oylamalar"}
          </h2>

          {proposals.filter((p) => p.status === filter).length === 0 && (
            <p className="italic text-gray-300">Bu kategoride teklif yok.</p>
          )}

          <ul className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {proposals
              .filter((p) => p.status === filter)
              .map((proposal) => (
                <li
                  key={proposal.id}
                  onClick={() => setSelectedProposal(proposal)}
                  className={`cursor-pointer p-4 rounded border ${
                    selectedProposal?.id === proposal.id
                      ? "border-blue-400 bg-blue-800"
                      : "border-transparent hover:border-blue-600 hover:bg-blue-800/60"
                  }`}
                >
                  <h3 className="font-semibold text-lg">{proposal.title}</h3>
                  <p className="text-sm text-gray-300 line-clamp-2">{proposal.description}</p>
                </li>
              ))}
          </ul>
        </div>

        {/* Detaylar ve Oy Kullanma */}
        <div className="bg-blue-800 rounded-lg p-6 flex flex-col justify-between min-h-[400px]">
          {!selectedProposal ? (
            <p className="text-center text-gray-400 mt-10">
              Bir teklif seçin ve detaylarını görün.
            </p>
          ) : (
            <>
              <div>
                <h3 className="text-2xl font-bold mb-2">{selectedProposal.title}</h3>
                <p className="mb-4">{selectedProposal.description}</p>

                {selectedProposal.status === "active" ? (
                  <>
                    <div className="mb-4">
                      <label className="mr-4 font-semibold">Oyunu seç:</label>
                      <label className="mr-4 cursor-pointer">
                        <input
                          type="radio"
                          name="vote"
                          value="yes"
                          checked={vote === "yes"}
                          onChange={() => setVote("yes")}
                          className="mr-1"
                        />
                        Evet
                      </label>
                      <label className="cursor-pointer">
                        <input
                          type="radio"
                          name="vote"
                          value="no"
                          checked={vote === "no"}
                          onChange={() => setVote("no")}
                          className="mr-1"
                        />
                        Hayır
                      </label>
                    </div>
                    <button
                      onClick={handleVote}
                      className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition"
                    >
                      Oy Ver
                    </button>
                  </>
                ) : (
                  <>
                    <h4 className="font-semibold mb-2">Sonuçlar:</h4>
                    <div className="space-y-2">
                      <div>
                        <span>Evet: {selectedProposal.yes}</span>{" "}
                        <div className="w-full bg-blue-700 rounded h-4 mt-1 relative">
                          <div
                            className="bg-green-500 h-4 rounded"
                            style={{
                              width:
                                totalVotes(selectedProposal) === 0
                                  ? "0%"
                                  : `${(selectedProposal.yes * 100) / totalVotes(selectedProposal)}%`,
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <span>Hayır: {selectedProposal.no}</span>{" "}
                        <div className="w-full bg-blue-700 rounded h-4 mt-1 relative">
                          <div
                            className="bg-red-600 h-4 rounded"
                            style={{
                              width:
                                totalVotes(selectedProposal) === 0
                                  ? "0%"
                                  : `${(selectedProposal.no * 100) / totalVotes(selectedProposal)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Yeni Teklif Oluşturma */}
      <div className="mt-12 p-6 bg-blue-800 rounded shadow-md max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-center">Yeni Teklif Oluştur</h2>
        <input
          type="text"
          placeholder="Teklif Başlığı"
          className="w-full mb-3 p-3 rounded text-black"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <textarea
          placeholder="Teklif Açıklaması"
          className="w-full mb-3 p-3 rounded text-black"
          rows={4}
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
        />
        <button
          onClick={handleAddProposal}
          className="w-full bg-green-600 py-3 rounded hover:bg-green-700 transition font-semibold"
        >
          Teklif Ekle
        </button>
      </div>

      {/* Oy verildi bildirimi */}
      {showMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-lg animate-fadeInOut z-50">
          Oy başarıyla kaydedildi! ✅
        </div>
      )}

      {/* Animasyon için Tailwind ek */}
      <style>{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; }
          10%, 90% { opacity: 1; }
        }
        .animate-fadeInOut {
          animation: fadeInOut 3s ease forwards;
        }
        /* Tailwind line clamp */
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </div>
  );
}
