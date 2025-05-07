
import React from 'react';

const Header = () => {
  return (
    <header className="bg-orange-500 text-white py-4 md:py-6 relative overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="flex items-center mb-2">
          <img src="/images/straw-hat.png" alt="Chapéu de Palha" className="w-12 h-12 md:w-16 md:h-16 mr-3" />
          <h1 className="text-2xl md:text-3xl font-bold">Arraiá Presente Certo</h1>
          <img src="/images/corn.png" alt="Milho" className="w-12 h-12 md:w-16 md:h-16 ml-3" />
        </div>
        <p className="text-base md:text-lg">Lista de Presentes - Chá de Panela Junino</p>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-2 sm:left-10">
          <div className="w-2 h-12 md:h-20 bg-yellow-400"></div>
        </div>
        <div className="absolute top-0 right-2 sm:right-10">
          <div className="w-2 h-12 md:h-20 bg-yellow-400"></div>
        </div>
      </div>
      
      {/* Bunting flags */}
      <div className="absolute -bottom-6 left-0 w-full">
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
                } transform rotate-45 -mb-4 mx-1`}
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
