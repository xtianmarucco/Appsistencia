import { useState, useEffect } from 'react';
import Navbar from '../components/navbar/navbar';
import QRCodeDisplay from '../components/qr-generator/QRCodeDisplay';
import { generateSecret } from '../services/otpService';

const EmployeeDashboard = () => {
  const [secret, setSecret] = useState('');
  const userEmail = 'empleado@example.com'; // Reemplaza con el email del usuario

  useEffect(() => {
    // Genera una clave secreta cuando el componente se monta
    const newSecret = generateSecret();
    setSecret(newSecret);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-4 bg-primary text-primary-text">
        <h1 className="text-2xl font-bold">Panel de Empleado</h1>
        <p>Bienvenido, empleado. Aquí puedes registrar tu asistencia.</p>
        <div className="mt-4">
          <QRCodeDisplay email={userEmail} secret={secret} />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;