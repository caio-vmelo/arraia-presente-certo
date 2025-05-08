
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { isEmailConfigured } from '@/services/emailService';
import { ExternalLink } from 'lucide-react';

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
              <li>Crie um serviço conectando sua conta de Gmail</li>
              <li>Crie um template de email com as variáveis: to_email, from_name, to_name, gift_name, message</li>
              <li>Atualize o arquivo <code>src/services/emailService.ts</code> com os IDs do seu serviço</li>
            </ol>
            <Button
              variant="outline"
              className="mt-2 flex items-center"
              onClick={() => window.open('https://www.emailjs.com/docs/tutorial/overview/', '_blank')}
            >
              <span>Ver tutorial do EmailJS</span>
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ) : (
          <p>O serviço de email está configurado e pronto para uso!</p>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default EmailSetupGuide;
