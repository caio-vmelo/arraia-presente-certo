
import React from 'react';
import Header from '@/components/Header';
import GiftList from '@/components/GiftList';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <section className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-orange-600 mb-4">
              Chá de Panela Junino
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-6">
              Ajude os noivos a equipar sua nova casa com muito amor e alegria!
            </p>
            <div className="flex justify-center">
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-md border-2 border-orange-400 max-w-2xl">
                <p className="text-base md:text-lg text-gray-600">
                  Escolha um presente da lista abaixo e clique em "Reservar" para garantir seu presente especial para os noivos.
                  É só preencher seus dados e pronto! Você pode comprar online ou levar no dia da festa.
                </p>
              </div>
            </div>
          </section>
          
          <GiftList />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
