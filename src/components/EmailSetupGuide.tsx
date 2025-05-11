
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { isEmailConfigured } from '@/services/emailService';

// Este componente foi mantido para uso interno mas removido da UI pública
const EmailSetupGuide: React.FC = () => {
  const emailConfigured = isEmailConfigured();
  
  return (
    <Alert className="mb-6">
      <AlertTitle className="text-lg font-semibold mb-2">
        {emailConfigured ? '✅ Email configurado' : '⚠️ Configure o serviço de email'}
      </AlertTitle>
      <AlertDescription>
        {!emailConfigured ? (
          <div className="space-y-3">
            <p>
              Para enviar emails reais, você precisa configurar o serviço EmailJS:
            </p>
            <ol className="list-decimal ml-6 space-y-2">
              <li>Crie uma conta gratuita no <a href="https://www.emailjs.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">EmailJS</a></li>
              <li>Crie um serviço conectando sua conta de email (Gmail, Outlook, ou outros)</li>
              <li>Crie um template de email com as variáveis: recipient_email ou to_email, from_name, to_name, gift_name, message</li>
              <li>Atualize o arquivo <code>src/services/emailService.ts</code> com seu Service ID, Template ID e Public Key</li>
            </ol>
          </div>
        ) : (
          <p>O serviço de email está configurado e pronto para uso!</p>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default EmailSetupGuide;
