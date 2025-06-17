import React, { useState } from 'react';
import { Wallet, Send, Clock, CheckCircle, AlertTriangle, Plus, Eye } from 'lucide-react';

const PaymentSystem = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [showNewPayment, setShowNewPayment] = useState(false);
  
  const [walletBalance] = useState({
    eth: 15.7,
    usdc: 50000,
    matic: 1250
  });

  const [pendingPayments] = useState([
    { 
      id: 1, 
      recipient: 'Bilirkişi Dr. Mehmet Alkan', 
      amount: '0.5 ETH', 
      status: 'Onay Bekliyor', 
      type: 'Bilirkişi Ücreti',
      date: '2024-05-30'
    },
    { 
      id: 2, 
      recipient: 'Tanık - TNK-001', 
      amount: '0.2 ETH', 
      status: 'İşlemde', 
      type: 'Tanık Ücreti',
      date: '2024-05-30'
    }
  ]);

  const [completedPayments] = useState([
    { 
      id: 4, 
      recipient: 'Avukat Ayşe Kaya', 
      amount: '1.2 ETH', 
      status: 'Tamamlandı', 
      type: 'Avukatlık Ücreti',
      date: '2024-05-28',
      txHash: '0xa1b2c3d4e5f6789...'
    }
  ]);

  const [newPayment, setNewPayment] = useState({
    recipient: '',
    amount: '',
    currency: 'ETH',
    type: '',
    description: ''
  });

  const styles = {
     container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
      padding: '20px'
    },
    card: {
      backgroundColor: 'lightskyblue',
      borderRadius: '12px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      marginBottom: '20px'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: 0
    },
    subtitle: {
      color: 'black',
      margin: '5px 0 0 0'
    },
    nav: {
      display: 'flex',
      gap: '10px',
      marginBottom: '20px'
    },
    navButton: {
      padding: '8px 16px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'all 0.2s'
    },
    navButtonActive: {
      backgroundColor: '#2563eb',
      color: 'white'
    },
    navButtonInactive: {
      backgroundColor: '#f3f4f6',
      color: '#374151'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      marginBottom: '20px'
    },
    balanceCard: {
      padding: '20px',
      borderRadius: '12px',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    ethCard: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
    },
    usdcCard: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
    },
    maticCard: {
      background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
    },
    paymentItem: {
      border: '1px solidrgb(45, 9, 47)',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '12px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    statusBadge: {
      padding: '4px 8px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '500'
    },
    statusCompleted: {
      backgroundColor: '#dcfce7',
      color: '#166534'
    },
    statusPending: {
      backgroundColor: '#fef3c7',
      color: '#92400e'
    },
    statusProcessing: {
      backgroundColor: '#dbeafe',
      color: '#1e40af'
    },
    button: {
      padding: '8px 16px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'all 0.2s'
    },
    primaryButton: {
      backgroundColor: '#2563eb',
      color: 'white'
    },
    secondaryButton: {
      backgroundColor: '#f3f4f6',
      color: '#374151'
    },
    input: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '14px'
    },
    formGroup: {
      marginBottom: '16px'
    },
    label: {
      display: 'block',
      marginBottom: '4px',
      fontWeight: '500',
      color: '#374151'
    }
  };

  const NavButton = ({ id, label, active }) => (
    <button
      onClick={() => setActiveSection(id)}
      style={{
        ...styles.navButton,
        ...(active ? styles.navButtonActive : styles.navButtonInactive)
      }}
    >
      {label}
    </button>
  );

  const renderOverview = () => (
    <div>
      <div style={styles.grid}>
        <div style={{...styles.balanceCard, ...styles.ethCard}}>
          <div>
            <p style={{margin: 0, opacity: 0.8}}>ETH Bakiye</p>
            <p style={{fontSize: '24px', fontWeight: 'bold', margin: '4px 0'}}>{walletBalance.eth} ETH</p>
            <p style={{fontSize: '14px', margin: 0, opacity: 0.8}}>≈ $47,250</p>
          </div>
          <Wallet size={32} />
        </div>

        <div style={{...styles.balanceCard, ...styles.usdcCard}}>
          <div>
            <p style={{margin: 0, opacity: 0.8}}>USDC Bakiye</p>
            <p style={{fontSize: '24px', fontWeight: 'bold', margin: '4px 0'}}>{walletBalance.usdc.toLocaleString()} USDC</p>
            <p style={{fontSize: '14px', margin: 0, opacity: 0.8}}>Stablecoin</p>
          </div>
          <Wallet size={32} />
        </div>

        <div style={{...styles.balanceCard, ...styles.maticCard}}>
          <div>
            <p style={{margin: 0, opacity: 0.8}}>MATIC Bakiye</p>
            <p style={{fontSize: '24px', fontWeight: 'bold', margin: '4px 0'}}>{walletBalance.matic} MATIC</p>
            <p style={{fontSize: '14px', margin: 0, opacity: 0.8}}>≈ $875</p>
          </div>
          <Wallet size={32} />
        </div>
      </div>

      <div style={styles.card}>
        <h3 style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '16px'}}>Son İşlemler</h3>
        {[...pendingPayments.slice(0, 2), ...completedPayments.slice(0, 1)].map(payment => (
          <div key={payment.id} style={styles.paymentItem}>
            <div>
              <p style={{fontWeight: '500', margin: 0}}>{payment.recipient}</p>
              <p style={{fontSize: '14px', color: '#6b7280', margin: '4px 0 0 0'}}>{payment.type}</p>
            </div>
            <div style={{textAlign: 'right'}}>
              <p style={{fontWeight: '600', margin: 0}}>{payment.amount}</p>
              <span style={{
                ...styles.statusBadge,
                ...(payment.status === 'Tamamlandı' ? styles.statusCompleted : 
                   payment.status === 'İşlemde' ? styles.statusProcessing : styles.statusPending)
              }}>
                {payment.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPending = () => (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <h2 style={styles.title}>Bekleyen Ödemeler</h2>
        <span style={{...styles.statusBadge, ...styles.statusPending}}>
          {pendingPayments.length} ödeme bekliyor
        </span>
      </div>
      
      <div style={styles.card}>
        {pendingPayments.map(payment => (
          <div key={payment.id} style={styles.paymentItem}>
            <div>
              <h4 style={{margin: 0, fontWeight: '600'}}>{payment.recipient}</h4>
              <p style={{fontSize: '14px', color: '#6b7280', margin: '4px 0'}}>{payment.type}</p>
              <p style={{fontSize: '12px', color: '#9ca3af', margin: 0}}>{payment.date}</p>
            </div>
            <div style={{textAlign: 'right'}}>
              <p style={{fontSize: '18px', fontWeight: 'bold', margin: 0}}>{payment.amount}</p>
              <div style={{display: 'flex', gap: '8px', marginTop: '8px'}}>
                <button style={{...styles.button, backgroundColor: '#10b981', color: 'white', fontSize: '12px'}}>
                  Onayla
                </button>
                <button style={{...styles.button, backgroundColor: '#ef4444', color: 'white', fontSize: '12px'}}>
                  Reddet
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCompleted = () => (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <h2 style={styles.title}>Tamamlanan Ödemeler</h2>
        <span style={{...styles.statusBadge, ...styles.statusCompleted}}>
          {completedPayments.length} ödeme tamamlandı
        </span>
      </div>
      
      <div style={styles.card}>
        {completedPayments.map(payment => (
          <div key={payment.id} style={styles.paymentItem}>
            <div>
              <h4 style={{margin: 0, fontWeight: '600'}}>{payment.recipient}</h4>
              <p style={{fontSize: '14px', color: '#6b7280', margin: '4px 0'}}>{payment.type}</p>
              <p style={{fontSize: '10px', color: '#3b82f6', margin: 0, fontFamily: 'monospace'}}>
                {payment.txHash}
              </p>
            </div>
            <div style={{textAlign: 'right'}}>
              <p style={{fontSize: '18px', fontWeight: 'bold', margin: 0}}>{payment.amount}</p>
              <span style={{...styles.statusBadge, ...styles.statusCompleted}}>
                {payment.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNewPayment = () => (
    <div style={styles.card}>
      <h2 style={{...styles.title, marginBottom: '24px'}}>Yeni Ödeme Oluştur</h2>
      
      <div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Alıcı</label>
          <input
            type="text"
            value={newPayment.recipient}
            onChange={(e) => setNewPayment({...newPayment, recipient: e.target.value})}
            style={styles.input}
            placeholder="Alıcı adı veya cüzdan adresi"
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Ödeme Türü</label>
          <select
            value={newPayment.type}
            onChange={(e) => setNewPayment({...newPayment, type: e.target.value})}
            style={styles.input}
          >
            <option value="">Seçiniz</option>
            <option value="Bilirkişi Ücreti">Bilirkişi Ücreti</option>
            <option value="Tanık Ücreti">Tanık Ücreti</option>
            <option value="Avukatlık Ücreti">Avukatlık Ücreti</option>
            <option value="Mahkeme Harçları">Mahkeme Harçları</option>
          </select>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Miktar</label>
            <input
              type="number"
              step="0.001"
              value={newPayment.amount}
              onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})}
              style={styles.input}
              placeholder="0.00"
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Para Birimi</label>
            <select
              value={newPayment.currency}
              onChange={(e) => setNewPayment({...newPayment, currency: e.target.value})}
              style={styles.input}
            >
              <option value="ETH">ETH</option>
              <option value="USDC">USDC</option>
              <option value="MATIC">MATIC</option>
            </select>
          </div>
        </div>

        <div style={{display: 'flex', gap: '12px', marginTop: '24px'}}>
          <button
            onClick={() => {
              console.log('Yeni ödeme:', newPayment);
              setShowNewPayment(false);
            }}
            style={{...styles.button, ...styles.primaryButton, display: 'flex', alignItems: 'center', gap: '8px'}}
          >
            <Send size={16} />
            Ödeme Gönder
          </button>
          <button
            onClick={() => setShowNewPayment(false)}
            style={{...styles.button, ...styles.secondaryButton}}
          >
            İptal
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={{maxWidth: '1200px', margin: '0 auto'}}>
        {/* Header */}
        <div style={styles.card}>
          <div style={styles.header}>
            <div>
              <h1 style={styles.title}>Kripto Ödeme Sistemi</h1>
              <p style={styles.subtitle}>Blockchain tabanlı adli süreç ödemeleri</p>
            </div>
            <button
              onClick={() => setShowNewPayment(true)}
              style={{...styles.button, ...styles.primaryButton, display: 'flex', alignItems: 'center', gap: '8px'}}
            >
              <Plus size={16} />
              Yeni Ödeme
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div style={styles.card}>
          <div style={styles.nav}>
            <NavButton id="overview" label="Genel Bakış" active={activeSection === 'overview'} />
            <NavButton id="pending" label="Bekleyen Ödemeler" active={activeSection === 'pending'} />
            <NavButton id="completed" label="Tamamlanan" active={activeSection === 'completed'} />
          </div>
        </div>

        {/* Content */}
        {showNewPayment ? renderNewPayment() : (
          <>
            {activeSection === 'overview' && renderOverview()}
            {activeSection === 'pending' && renderPending()}
            {activeSection === 'completed' && renderCompleted()}
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSystem;