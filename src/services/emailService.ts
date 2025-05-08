
import emailjs from 'emailjs-com';

// Email service configuration
const EMAILJS_SERVICE_ID = 'service_gmail'; // You'll need to replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = 'template_gift_reservation'; // You'll need to replace with your template ID
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // You'll need to replace with your EmailJS public key

export interface EmailData {
  recipientEmail: string;
  senderName: string;
  giftName: string;
}

// Function to send reservation confirmation to the person who reserved the gift
export const sendReservationEmail = async (data: EmailData): Promise<boolean> => {
  console.log('Enviando email com estes dados:', data);
  console.log('----------------------');
  console.log('Para: ' + data.recipientEmail);
  console.log('De: ' + data.senderName);
  console.log('Presente: ' + data.giftName);
  console.log('----------------------');
  
  try {
    // Template parameters for EmailJS
    const templateParams = {
      to_email: data.recipientEmail,
      from_name: 'Chá de Panela Junino',
      to_name: data.senderName,
      gift_name: data.giftName,
      message: `Você reservou com sucesso o presente: ${data.giftName}. Obrigado por sua contribuição!`
    };
    
    // If EmailJS credentials are configured, send a real email
    if (EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      console.log('Email enviado com sucesso via EmailJS');
      return true;
    } else {
      // Simulation mode - just log the data
      console.log('EMAIL SIMULADO (EmailJS não configurado)');
      console.log('Parâmetros do template:', templateParams);
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Email simulado enviado com sucesso');
          return resolve(true);
        }, 800);
      });
    }
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return false;
  }
};

// Function to notify the site owner about the reservation
export const sendOwnerNotificationEmail = async (data: EmailData): Promise<boolean> => {
  console.log('Enviando notificação para o proprietário com estes dados:', data);
  console.log('----------------------');
  console.log('Para: viniciuscaioml@gmail.com');
  console.log('De: ' + data.senderName);
  console.log('Presente reservado: ' + data.giftName);
  console.log('----------------------');
  
  try {
    // Template parameters for EmailJS
    const templateParams = {
      to_email: 'viniciuscaioml@gmail.com', // Site owner email
      from_name: data.senderName,
      to_name: 'Proprietário',
      gift_name: data.giftName,
      message: `O presente "${data.giftName}" foi reservado por ${data.senderName} (${data.recipientEmail}).`
    };
    
    // If EmailJS credentials are configured, send a real email
    if (EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      console.log('Notificação enviada com sucesso via EmailJS');
      return true;
    } else {
      // Simulation mode - just log the data
      console.log('NOTIFICAÇÃO SIMULADA (EmailJS não configurado)');
      console.log('Parâmetros do template:', templateParams);
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Notificação simulada enviada com sucesso');
          return resolve(true);
        }, 800);
      });
    }
  } catch (error) {
    console.error('Erro ao enviar notificação:', error);
    return false;
  }
};

// Function to test the email service
export const testEmailService = async (): Promise<boolean> => {
  const testData = {
    recipientEmail: 'teste@exemplo.com',
    senderName: 'Usuário de Teste',
    giftName: 'Presente de Teste'
  };
  
  console.log('TESTANDO SERVIÇO DE EMAIL');
  
  try {
    // Testa o envio de email de reserva
    const emailSent = await sendReservationEmail(testData);
    
    // Testa o envio de notificação ao proprietário
    const notificationSent = await sendOwnerNotificationEmail(testData);
    
    return emailSent && notificationSent;
  } catch (error) {
    console.error('Erro ao testar o serviço de email:', error);
    return false;
  }
};

// Function to check if EmailJS is properly configured
export const isEmailConfigured = (): boolean => {
  return EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY';
};
