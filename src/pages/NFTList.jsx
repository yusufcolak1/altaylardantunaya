export default function NFTList({ nfts }) {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Oluşturulan NFT'ler</h2>
      {nfts.length === 0 ? (
        <p className="text-center text-gray-300">Henüz hiç NFT oluşturulmamış.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfts.map((nft, index) => (
            <div
              key={index}
              className="bg-blue-900 bg-opacity-80 p-4 rounded-xl shadow-lg"
            >
              <img
                src={nft.image}
                alt={nft.name}
                className="w-full h-48 object-contain rounded mb-3"
              />
              <h3 className="text-xl font-semibold">{nft.name}</h3>
              <p className="text-sm opacity-80">{nft.description}</p>
              <p className="mt-1 text-sm text-yellow-300 font-medium">
                Kategori: {nft.category}
              </p>
              <p className="mt-1 text-xs opacity-60">
                Oluşturulma: {new Date(nft.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
