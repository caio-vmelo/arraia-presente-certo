
import React, { useState, useEffect } from 'react';
import GiftItem from './GiftItem';
import ReservationModal from './ReservationModal';
import { Gift } from '@/types/gift';
import { useGiftData } from '@/hooks/useGiftData';
import { toast } from '@/components/ui/use-toast';

const GiftList = () => {
  const { gifts, reserveGift, loading } = useGiftData();
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReserve = (giftId: string) => {
    const gift = gifts.find(g => g.id === giftId);
    if (gift) {
      setSelectedGift(gift);
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedGift(null);
  };

  const handleReservationSubmit = async (name: string, email: string) => {
    if (!selectedGift) return;
    
    try {
      await reserveGift(selectedGift.id, name, email);
      toast({
        title: "Presente reservado!",
        description: `Você reservou "${selectedGift.name}" com sucesso.`,
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error reserving gift:", error);
      toast({
        variant: "destructive",
        title: "Erro ao reservar",
        description: "Não foi possível reservar o presente. Tente novamente.",
      });
    }
  };

  return (
    <div className="mb-10">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-orange-600">
        Lista de Presentes
      </h2>
      
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {gifts.map(gift => (
            <GiftItem
              key={gift.id}
              gift={gift}
              onReserve={handleReserve}
            />
          ))}
        </div>
      )}
      
      {selectedGift && (
        <ReservationModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handleReservationSubmit}
          gift={selectedGift}
        />
      )}
    </div>
  );
};

export default GiftList;
