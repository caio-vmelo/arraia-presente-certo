
import emailjs from 'emailjs-com';

// Email service configuration
const EMAILJS_SERVICE_ID = 'service_6k88u3n'; // You'll need to replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = 'template_y9xic6e'; // You'll need to replace with your template ID
const EMAILJS_PUBLIC_KEY = 'KP09pLKLOJbdflwBa'; // You'll need to replace with your EmailJS public key

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
  console.log('Usando EmailJS com:');
  console.log('Service ID:', EMAILJS_SERVICE_ID);
  console.log('Template ID:', EMAILJS_TEMPLATE_ID);
  console.log('Public Key:', EMAILJS_PUBLIC_KEY.substring(0, 3) + '...' + EMAILJS_PUBLIC_KEY.substring(EMAILJS_PUBLIC_KEY.length - 3));
  console.log('----------------------');
  
  try {
    // Template parameters for EmailJS
    // Important: EmailJS requires "to_email" as parameter for recipient
    const templateParams = {
      to_email: data.recipientEmail,
      from_name: 'Chá de Panela Junino',
      to_name: data.senderName,
      gift_name: data.giftName,
      message: `Você reservou com sucesso o presente: ${data.giftName}. Obrigado por sua contribuição!`,
      // Adding reply_to to ensure proper email routing
      reply_to: 'noreply@example.com'
    };
    
    console.log('Parâmetros do template:', templateParams);
    
    // Always send a real email since we're using our configured service
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );
    console.log('Email enviado com sucesso via EmailJS', response);
    return true;
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    console.error('Detalhes do erro:', JSON.stringify(error));
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
    // Important: EmailJS requires "to_email" as parameter for recipient
    const templateParams = {
      to_email: 'viniciuscaioml@gmail.com', // Site owner email
      from_name: data.senderName,
      to_name: 'Proprietário',
      gift_name: data.giftName,
      message: `O presente "${data.giftName}" foi reservado por ${data.senderName} (${data.recipientEmail}).`,
      // Adding reply_to parameter
      reply_to: data.recipientEmail
    };
    
    console.log('Parâmetros do template:', templateParams);
    
    // Always send a real email since we're using our configured service
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );
    console.log('Notificação enviada com sucesso via EmailJS', response);
    return true;
  } catch (error) {
    console.error('Erro ao enviar notificação:', error);
    console.error('Detalhes do erro:', JSON.stringify(error));
    return false;
  }
};

// Function to test the email service
export const testEmailService = async (): Promise<boolean> => {
  const testData = {
    recipientEmail: 'kapu061@gmail.com',
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

// Removemos a verificação de configuração já que estamos sempre utilizando
// os valores de configuração fornecidos diretamente

export const isEmailConfigured = (): boolean => {
  return EMAILJS_PUBLIC_KEY !== 'KP09pLKLOJbdflwBa';
};
