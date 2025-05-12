
import { supabase } from '@/integrations/supabase/client';

interface EmailParams {
  recipientEmail: string;
  senderName: string;
  giftName: string;
}

// Função para verificar se o email está configurado
export const isEmailConfigured = (): boolean => {
  // Esta função sempre retorna true agora que configuramos as variáveis no Supabase
  return true;
};

// Send reservation confirmation email to the user
export const sendReservationEmail = async (params: EmailParams): Promise<boolean> => {
  try {
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: {
        type: 'reservation',
        data: params
      }
    });

    if (error) {
      console.error('Error sending reservation email:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Exception sending reservation email:', error);
    return false;
  }
};

// Send notification email to site owner
export const sendOwnerNotificationEmail = async (params: EmailParams): Promise<boolean> => {
  try {
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: {
        type: 'notification',
        data: params
      }
    });

    if (error) {
      console.error('Error sending owner notification:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Exception sending owner notification:', error);
    return false;
  }
};
