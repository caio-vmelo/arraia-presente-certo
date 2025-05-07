
// Simple email service placeholder - can be replaced with a working email service later

export interface EmailData {
  recipientEmail: string;
  senderName: string;
  giftName: string;
}

export const sendReservationEmail = async (data: EmailData): Promise<boolean> => {
  console.log('Email seria enviado com estes dados:', data);
  console.log('----------------------');
  console.log('Para: ' + data.recipientEmail);
  console.log('De: ' + data.senderName);
  console.log('Presente: ' + data.giftName);
  console.log('----------------------');
  
  // Em uma implementação real, isso conectaria a um serviço de email
  // Por enquanto, vamos simular um envio de email bem-sucedido
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Email enviado com sucesso (simulado)');
      return resolve(true);
    }, 800);
  });
};

export const sendOwnerNotificationEmail = async (data: EmailData): Promise<boolean> => {
  console.log('Notificação do proprietário seria enviada com estes dados:', data);
  console.log('----------------------');
  console.log('Para: proprietario@exemplo.com');
  console.log('De: ' + data.senderName);
  console.log('Presente reservado: ' + data.giftName);
  console.log('----------------------');
  
  // Simular o envio de notificação para o proprietário do site
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Notificação do proprietário enviada com sucesso (simulado)');
      return resolve(true);
    }, 800);
  });
};

// Função de teste para verificar se o envio de email está funcionando
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
