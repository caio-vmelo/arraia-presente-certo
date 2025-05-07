
import { useState, useEffect } from 'react';
import { Gift } from '@/types/gift';
import { sendReservationEmail, sendOwnerNotificationEmail } from '@/services/emailService';

// Demo gift data
const initialGifts: Gift[] = [
  {
    id: '1',
    name: 'Conjunto de Panelas Antiaderentes',
    price: 299.90,
    description: 'Conjunto com 5 peças de panelas antiaderentes de alta qualidade.',
    imageUrl: '/images/panelas.jpg',
    storeUrl: 'https://www.example.com/panelas',
    isReserved: false,
    reservedBy: ''
  },
  {
    id: '2',
    name: 'Jogo de Talheres 24 Peças',
    price: 189.90,
    description: 'Jogo completo de talheres em aço inox com 24 peças.',
    imageUrl: '/images/talheres.jpg',
    storeUrl: 'https://www.example.com/talheres',
    isReserved: false,
    reservedBy: ''
  },
  {
    id: '3',
    name: 'Liquidificador 3 Velocidades',
    price: 129.90,
    description: 'Liquidificador potente com 3 velocidades e função pulse.',
    imageUrl: '/images/liquidificador.jpg',
    storeUrl: 'https://www.example.com/liquidificador',
    isReserved: false,
    reservedBy: ''
  },
  {
    id: '4',
    name: 'Jogo de Pratos 12 Peças',
    price: 159.90,
    description: 'Conjunto com 12 pratos de porcelana, sendo 6 rasos e 6 fundos.',
    imageUrl: '/images/pratos.jpg',
    storeUrl: 'https://www.example.com/pratos',
    isReserved: false,
    reservedBy: ''
  },
  {
    id: '5',
    name: 'Jogo de Copos 6 Peças',
    price: 89.90,
    description: 'Conjunto com 6 copos de vidro para água ou suco.',
    imageUrl: '/images/copos.jpg',
    storeUrl: 'https://www.example.com/copos',
    isReserved: false,
    reservedBy: ''
  },
  {
    id: '6',
    name: 'Toalha de Mesa Junina',
    price: 69.90,
    description: 'Toalha de mesa com estampa junina, ideal para decorar sua mesa.',
    imageUrl: '/images/toalha.jpg',
    storeUrl: 'https://www.example.com/toalha',
    isReserved: false,
    reservedBy: ''
  }
];

const STORAGE_KEY = 'junina_gift_list';

export const useGiftData = () => {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(true);

  // Load gifts from localStorage on component mount
  useEffect(() => {
    const loadGifts = () => {
      try {
        const storedGifts = localStorage.getItem(STORAGE_KEY);
        if (storedGifts) {
          setGifts(JSON.parse(storedGifts));
        } else {
          // If no stored data, use initial data
          setGifts(initialGifts);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(initialGifts));
        }
      } catch (error) {
        console.error('Error loading gifts from localStorage:', error);
        setGifts(initialGifts);
      } finally {
        setLoading(false);
      }
    };

    // Add small delay to simulate loading
    setTimeout(loadGifts, 800);
  }, []);

  // Save gifts to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gifts));
    }
  }, [gifts, loading]);

  // Reserve a gift
  const reserveGift = async (giftId: string, name: string, email: string): Promise<void> => {
    const gift = gifts.find(g => g.id === giftId);
    if (!gift || gift.isReserved) {
      throw new Error('Gift is not available for reservation');
    }

    try {
      // Send emails (this would connect to a real email service in production)
      await sendReservationEmail({
        recipientEmail: email,
        senderName: name,
        giftName: gift.name
      });

      // Notify site owner
      await sendOwnerNotificationEmail({
        recipientEmail: 'meuemail@exemplo.com', // Site owner email
        senderName: name,
        giftName: gift.name
      });

      // Update gift status
      const updatedGifts = gifts.map(g => 
        g.id === giftId ? { ...g, isReserved: true, reservedBy: name } : g
      );
      
      setGifts(updatedGifts);
      return Promise.resolve();
    } catch (error) {
      console.error('Error reserving gift:', error);
      return Promise.reject(error);
    }
  };

  return {
    gifts,
    reserveGift,
    loading
  };
};
