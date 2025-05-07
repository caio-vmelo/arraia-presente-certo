
import React from 'react';
import { Button } from '@/components/ui/button';
import { Gift } from '@/types/gift';
import { ArrowRight } from 'lucide-react';

interface GiftItemProps {
  gift: Gift;
  onReserve: (giftId: string) => void;
}

const GiftItem: React.FC<GiftItemProps> = ({ gift, onReserve }) => {
  const { id, name, price, imageUrl, description, storeUrl, isReserved, reservedBy } = gift;

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden border-2 transition-all duration-300 ${isReserved ? 'border-gray-300' : 'border-orange-400 hover:shadow-lg'}`}>
      <div className="aspect-square overflow-hidden relative">
        <img 
          src={imageUrl} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {isReserved && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-red-500 text-white font-bold py-2 px-4 rounded-full transform -rotate-12">
              Reservado
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg md:text-xl text-gray-800 mb-1">{name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        
        <div className="flex justify-between items-center mb-3">
          <span className="font-medium text-gray-700">
            {price ? `R$ ${price.toFixed(2)}` : 'Preço variável'}
          </span>
        </div>
        
        <div className="space-y-2">
          <a 
            href={storeUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center w-full text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Ver na loja <ArrowRight className="w-4 h-4 ml-1" />
          </a>
          
          <Button
            onClick={() => !isReserved && onReserve(id)}
            disabled={isReserved}
            className={`w-full ${
              isReserved 
                ? 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed' 
                : 'bg-orange-500 hover:bg-orange-600'
            }`}
          >
            {isReserved ? 'Reservado por ' + reservedBy : 'Reservar'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GiftItem;
