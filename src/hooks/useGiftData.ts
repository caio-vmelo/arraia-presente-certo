
import { useState, useEffect } from 'react';
import { Gift } from '@/types/gift';
import { supabase } from '@/integrations/supabase/client';
import { sendReservationEmail, sendOwnerNotificationEmail } from '@/services/emailService';
import { toast } from './use-toast';

export const useGiftData = () => {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);

  // Load gifts from Supabase on component mount
  useEffect(() => {
    const loadGifts = async () => {
      try {
        setLoading(true);
        const { data: giftsData, error } = await supabase
          .from('gifts')
          .select('*');

        if (error) {
          throw error;
        }

        if (giftsData) {
          setGifts(giftsData.map(item => ({
            ...item,
            price: Number(item.price),
            isReserved: false,
            reservedBy: ''
          })));

          // Check for existing reservations
          const { data: reservations, error: reservationsError } = await supabase
            .from('reservations')
            .select('*');

          if (reservationsError) {
            throw reservationsError;
          }

          // Mark reserved gifts
          if (reservations && reservations.length > 0) {
            setGifts(prevGifts => prevGifts.map(gift => {
              const reservation = reservations.find(r => r.gift_id === gift.id);
              return reservation 
                ? { ...gift, isReserved: true, reservedBy: reservation.reserver_name }
                : gift;
            }));
          }

          // Extract unique categories
          const uniqueCategories = Array.from(new Set(giftsData.map(gift => gift.category)));
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error('Error loading gifts from Supabase:', error);
        toast({
          title: "Erro ao carregar presentes",
          description: "Não foi possível carregar a lista de presentes. Tente novamente mais tarde.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadGifts();
  }, []);

  // Reserve a gift
  const reserveGift = async (giftId: string, name: string, email: string): Promise<void> => {
    try {
      // First check if the gift is already reserved
      const { data: existingReservations, error: checkError } = await supabase
        .from('reservations')
        .select('*')
        .eq('gift_id', giftId);

      if (checkError) {
        console.error('Error checking reservation status:', checkError);
        throw new Error('Error checking reservation status');
      }

      if (existingReservations && existingReservations.length > 0) {
        throw new Error('Este presente já foi reservado');
      }

      // Get gift details
      const gift = gifts.find(g => g.id === giftId);
      if (!gift) {
        throw new Error('Presente não encontrado');
      }

      console.log(`Tentando reservar presente: ${gift.name} para ${name} (${email})`);
      
      // Insert reservation in Supabase
      const { error: insertError } = await supabase
        .from('reservations')
        .insert([{ 
          gift_id: giftId, 
          reserver_name: name, 
          reserver_email: email 
        }]);

      if (insertError) {
        console.error('Error adding reservation:', insertError);
        throw new Error('Falha ao registrar a reserva');
      }

      try {
        // Try to send confirmation email
        const emailSent = await sendReservationEmail({
          recipientEmail: email,
          senderName: name,
          giftName: gift.name
        });

        if (!emailSent) {
          console.log('Email service responded but email may not have been sent');
        }
      } catch (emailError) {
        console.error('Failed to send reservation email', emailError);
        // Don't throw error here, we want to continue even if email fails
      }

      try {
        // Try to notify site owner
        const ownerNotified = await sendOwnerNotificationEmail({
          recipientEmail: email,
          senderName: name,
          giftName: gift.name
        });

        if (!ownerNotified) {
          console.warn('Failed to send notification to owner');
        }
      } catch (notifyError) {
        console.error('Failed to send notification to owner', notifyError);
        // Don't throw error here, we want to continue even if notification fails
      }

      // Update local state
      setGifts(prevGifts => prevGifts.map(g => 
        g.id === giftId ? { ...g, isReserved: true, reservedBy: name } : g
      ));

      return Promise.resolve();
    } catch (error) {
      console.error('Error reserving gift:', error);
      return Promise.reject(error);
    }
  };

  // Filter gifts by category
  const getGiftsByCategory = (category: string | null) => {
    if (!category) return gifts;
    return gifts.filter(gift => gift.category === category);
  };

  return {
    gifts,
    categories,
    getGiftsByCategory,
    reserveGift,
    loading
  };
};
