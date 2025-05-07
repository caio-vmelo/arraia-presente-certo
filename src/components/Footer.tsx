
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-orange-500 text-white py-6 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h3 className="text-xl font-bold">Arraiá Presente Certo</h3>
            <p className="text-sm mt-1">Chá de Panela com tema Junino</p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-center md:text-right">
            <a href="#" className="hover:underline">Sobre</a>
            <a href="#" className="hover:underline">Contato</a>
            <a href="#" className="hover:underline">Política de Privacidade</a>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm">
          <p>© 2025 Arraiá Presente Certo. Todos os direitos reservados.</p>
        </div>
      </div>
      
      {/* Bunting flags */}
      <div className="absolute -top-6 left-0 w-full">
        <div className="flex justify-center">
          <div className="flex w-full max-w-screen-xl overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className={`w-8 md:w-12 h-8 md:h-12 ${
                  i % 4 === 0 ? 'bg-green-500' :
                  i % 4 === 1 ? 'bg-yellow-400' :
                  i % 4 === 2 ? 'bg-purple-500' :
                  'bg-red-500'
                } transform rotate-45 -mt-4 mx-1`}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
