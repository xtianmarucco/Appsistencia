import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { setUserOtpConfigured } from '../store/slices/userSlice';
import Navbar from '../components/navbar/navbar';

const SetupOtp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [error, setError] = useState('');

  // Generar el código QR para Google Authenticator
  useEffect(() => {
    const generateQrCode = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('otp_secret')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        if (!data.otp_secret) {
          // Generar un nuevo secreto OTP si no existe
          const secret = generateOtpSecret(); // Función para generar un secreto OTP
          const { error: updateError } = await supabase
            .from('users')
            .update({ otp_secret: secret })
            .eq('id', user.id);

          if (updateError) throw updateError;

          setQrCodeUrl(generateQrCodeUrl(secret, user.email)); // Función para generar el código QR
        } else {
          setQrCodeUrl(generateQrCodeUrl(data.otp_secret, user.email));
        }
      } catch (error) {
        setError('Error al generar el código QR. Inténtalo de nuevo.');
      }
    };

    generateQrCode();
  }, [user]);

  // Función para generar un secreto OTP (puedes usar una librería como `otplib`)
  const generateOtpSecret = () => {
    // Implementa la lógica para generar un secreto OTP
    return 'tu_secreto_otp_generado';
  };

  // Función para generar la URL del código QR
  const generateQrCodeUrl = (secret, email) => {
    const issuer = 'AppAsistencia';
    return `otpauth://totp/${issuer}:${email}?secret=${secret}&issuer=${issuer}`;
  };

  // Validar el código OTP ingresado por el usuario
  const handleVerifyOtp = async () => {
    try {
      const isValid = verifyOtpCode(otpCode, user.otp_secret); // Función para verificar el código OTP
      if (!isValid) {
        throw new Error('Código OTP inválido');
      }

      // Actualizar el estado de OTP en la base de datos
      const { error } = await supabase
        .from('users')
        .update({ user_otp_configured: true })
        .eq('id', user.id);

      if (error) throw error;

      // Actualizar el estado de Redux
      dispatch(setUserOtpConfigured(true));
      navigate('/employee'); // Redirigir al panel del empleado
    } catch (error) {
      setError('Código OTP inválido. Inténtalo de nuevo.');
    }
  };

  return (
    <>
    <Navbar/>
    <div className="p-4 bg-primary text-primary-text">
      <h1 className="text-2xl font-bold">Configurar Google Authenticator</h1>
      <p>Escanea el siguiente código QR con la aplicación Google Authenticator:</p>
      {qrCodeUrl && <img src={qrCodeUrl} alt="Código QR" className="my-4" />}
      <input
        type="text"
        placeholder="Ingresa el código OTP"
        value={otpCode}
        onChange={(e) => setOtpCode(e.target.value)}
        className="w-full p-2 border border-neutral rounded text-primary-text bg-white"
      />
      {error && <p className="text-error mt-2">{error}</p>}
      <button
        onClick={handleVerifyOtp}
        className="mt-4 px-4 py-2 bg-accent text-white rounded"
      >
        Verificar OTP
      </button>
    </div>
    </>
  );
};

export default SetupOtp;