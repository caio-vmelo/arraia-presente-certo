
// src/components/GiftList.tsx
import React, { useState } from 'react';
import GiftItem from './GiftItem';
import CategoryFilter from './CategoryFilter';
import { useGiftData } from '@/hooks/useGiftData';
import ReservationModal from './ReservationModal';
import { toast } from '@/hooks/use-toast';
import { Loader2, Landmark } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const GiftList: React.FC = () => {
  const { gifts, categories, getGiftsByCategory, reserveGift, loading } = useGiftData();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGiftId, setSelectedGiftId] = useState<string | null>(null);
  
  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };
  
  const filteredGifts = getGiftsByCategory(selectedCategory);

  const handleReserveClick = (giftId: string) => {
    setSelectedGiftId(giftId);
    setIsModalOpen(true);
  };

  const handleReservationSubmit = async (name: string, email: string) => {
    if (!selectedGiftId) return;
    
    try {
      const selectedGift = gifts.find(gift => gift.id === selectedGiftId);
      if (!selectedGift) throw new Error("Presente não encontrado");
      
      await reserveGift(selectedGiftId, name, email);
      setIsModalOpen(false);
      
      toast({
        title: "Presente reservado com sucesso!",
        description: `Sua reserva para "${selectedGift.name}" foi registrada. Obrigado!`,
      });
    } catch (error) {
      console.error('Error during reservation:', error);
      toast({
        title: "Erro na reserva",
        description: "Não foi possível reservar o presente. Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-10 w-10 text-orange-500 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <Alert className="bg-blue-50 border border-blue-200 shadow-sm">
          <Landmark className="h-5 w-5 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <span className="font-semibold">Prefere contribuir com um valor? </span> 
            Faça um PIX para: <span className="font-semibold select-all">viniciuscaioml@gmail.com</span>
          </AlertDescription>
        </Alert>
      </div>
      
      <CategoryFilter 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onSelectCategory={handleCategorySelect} 
      />
      
      {filteredGifts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Nenhum presente encontrado nesta categoria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredGifts.map((gift) => (
            <GiftItem key={gift.id} gift={gift} onReserve={handleReserveClick} />
          ))}
        </div>
      )}

      {isModalOpen && (
        <ReservationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleReservationSubmit}
        />
      )}
    </div>
  );
};

export default GiftList;
