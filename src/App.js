import React, { useState, useEffect } from 'react';
import html5Qrcode, { Html5Qrcode } from 'html5-qrcode';
import './App.css';

function App() {
  const [isEnabled, setEnabled] = useState(false);
  useEffect(() => {
    const config = { fps: 10, qrbox: { width: 400, height: 400 } };
    const html5Qrcode = new Html5Qrcode('qrCodeContainer');
    const startScanner = async () => {
      try {
        await html5Qrcode.start({ facingMode: 'environment' }, config, (decodedText) => {
          window.location.href = decodedText;
        });
        setEnabled(true);
      } catch (error) {
        console.error('Error starting QR code scanner:', error);
      }
    };
    const stopScanner = () => {
      html5Qrcode.stop();
      setEnabled(false);
    };
    if (isEnabled) {
      startScanner();
    }
    return () => {
      if (isEnabled) {
        stopScanner();
      }
    };
  }, [isEnabled]);
  return (
    <div className="scanner">
      <div id="qrCodeContainer"></div>
      <button className='start-button' onClick={() => setEnabled(!isEnabled)}>
        {isEnabled ? 'Stop Scanner' : 'Start Scanner'}
      </button>
    </div>
  );
}
export default App;