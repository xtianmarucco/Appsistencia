
import Navbar from '../components/navbar/navbar';
import QRCodeDisplay from '../components/qr-generator/QRCodeDisplay';

const SetupOtp = () => {
    

  return (
    <>
    <Navbar/>
    <div className="p-4 bg-primary text-primary-text">
      <h1 className="text-2xl font-bold">Configurar Google Authenticator</h1>
      <p>Escanea el siguiente código QR con la aplicación Google Authenticator:</p>

      <QRCodeDisplay/>
    </div>
    </>
  );
};

export default SetupOtp;