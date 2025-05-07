
// Simple email service placeholder - can be replaced with a working email service later

export interface EmailData {
  recipientEmail: string;
  senderName: string;
  giftName: string;
}

export const sendReservationEmail = async (data: EmailData): Promise<boolean> => {
  console.log('Email would be sent with this data:', data);
  
  // In a real implementation, this would connect to an email service
  // For now, we'll simulate a successful email sending
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Email sent successfully (simulated)');
      resolve(true);
    }, 800);
  });
};

export const sendOwnerNotificationEmail = async (data: EmailData): Promise<boolean> => {
  console.log('Owner notification would be sent with this data:', data);
  
  // Simulate sending notification to the site owner
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Owner notification sent successfully (simulated)');
      resolve(true);
    }, 800);
  });
};
