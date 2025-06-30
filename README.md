# Adli Süreç Takip Sistemi

Bu proje, adli süreçlerin blokzincir teknolojisi kullanılarak şeffaf, güvenilir ve değiştirilemez bir şekilde kaydedilmesini ve takip edilmesini amaçlamaktadır.

## Özellikler

- NFT (Non-Fungible Token) tabanlı tanık kimlikleri
- IPFS ile delil saklama
- DAO (Decentralized Autonomous Organization) destekli bilirkişi rapor onay sistemleri
- Tokenize edilen adli süreç ödemeleri

## Teknolojiler

- Ethereum Blockchain
- Solidity Smart Contracts
- React.js
- Tailwind CSS
- Ethers.js
- IPFS / Arweave
- Zero-Knowledge Proofs (ZKP)

## Kurulum

### Ön Gereksinimler

- Node.js (v14+)
- npm veya yarn
- Metamask tarayıcı eklentisi
- Hardhat

### Adımlar

1. Repoyu klonlayın:
   ```
   git clone https://github.com/altaylardantunaya/adli-surec-takip.git
   cd adli-surec-takip
   ```

2. Bağımlılıkları yükleyin:
   ```
   npm install
   ```

3. `.env.example` dosyasını `.env` olarak kopyalayın ve gerekli değişkenleri doldurun.

4. Akıllı kontratları derleyin:
   ```
   npx hardhat compile
   ```

5. Yerel geliştirme zincirini başlatın:
   ```
   npx hardhat node
   ```

6. Akıllı kontratları dağıtın:
   ```
   npx hardhat run scripts/deploy.js --network localhost
   ```

7. Frontend uygulamasını başlatın:
   ```
   npm run dev
   ```

8. Tarayıcınızda `http://localhost:5173` adresini açın.

## Akıllı Kontratlar

Projede kullanılan ana akıllı kontratlar şunlardır:

- `WitnessNFT.sol`: Tanık kimliklerini NFT olarak tokenize eder
- `EvidenceManager.sol`: Delillerin yönetimi ve doğrulanması
- `ExpertDAO.sol`: Bilirkişi raporlarının oylanması için DAO sistemi
- `PaymentSystem.sol`: Adli süreçlerdeki ödemelerin yönetimi
- `AdliSurecTakip.sol`: Tüm bileşenleri entegre eden ana kontrat

## Katkıda Bulunma

1. Bu repoyu fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inize push edin (`git push origin feature/amazing-feature`)
5. Bir Pull Request oluşturun

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## İletişim

Proje Ekibi - [altaylardan.tunaya2345@gmail.com](mailto:altaylardan.tunaya2345@gmail.com)

Proje Linki: [https://github.com/altaylardantunaya/adli-surec-takip](https://github.com/altaylardantunaya/adli-surec-takip)

