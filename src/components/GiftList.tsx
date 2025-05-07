
import React, { useState, useEffect } from 'react';
import GiftItem from './GiftItem';
import ReservationModal from './ReservationModal';
import { Gift } from '@/types/gift';
import { useGiftData } from '@/hooks/useGiftData';
import { toast } from '@/components/ui/use-toast';
import { Search } from 'lucide-react';

const GiftList = () => {
  const { gifts, reserveGift, loading } = useGiftData();
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  
  // Extract unique categories from gifts
  const categories = React.useMemo(() => {
    const uniqueCategories = new Set<string>();
    gifts.forEach(gift => {
      // Extract category from description or use a default
      const category = gift.description.includes('|') 
        ? gift.description.split('|')[1].trim() 
        : 'Outros';
      uniqueCategories.add(category);
    });
    return Array.from(uniqueCategories).sort();
  }, [gifts]);

  // Filter gifts based on search term and category
  const filteredGifts = React.useMemo(() => {
    return gifts.filter(gift => {
      const matchesSearch = 
        gift.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        gift.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !categoryFilter || 
        gift.description.toLowerCase().includes(categoryFilter.toLowerCase());
      
      return matchesSearch && matchesCategory;
    });
  }, [gifts, searchTerm, categoryFilter]);

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
      
      {/* Search and filter section */}
      <div className="mb-8">
        <div className="relative flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Pesquisar presentes..."
              className="pl-10 pr-4 py-2 w-full border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
          >
            <option value="">Todas as categorias</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        <div className="text-center text-sm text-gray-500">
          Mostrando {filteredGifts.length} de {gifts.length} presentes
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGifts.map(gift => (
            <GiftItem
              key={gift.id}
              gift={gift}
              onReserve={handleReserve}
            />
          ))}
          
          {filteredGifts.length === 0 && (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500 text-lg">Nenhum presente encontrado com os filtros atuais.</p>
            </div>
          )}
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
