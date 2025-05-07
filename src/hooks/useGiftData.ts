
import { useState, useEffect } from 'react';
import { Gift } from '@/types/gift';
import { sendReservationEmail, sendOwnerNotificationEmail } from '@/services/emailService';

// Updated gift data with new items
const initialGifts: Gift[] = [
  {
    id: '1',
    name: "Kit Panelas Inox",
    price: 742.00,
    description: "Jogo de panelas Inox Tramontina",
    imageUrl: "https://m.media-amazon.com/images/I/61nYWmn3EOL._AC_SX679_.jpg",
    storeUrl: "https://www.tramontina.com.br/jogo-de-panelas-tramontina-allegra-em-aco-inox-com-fundo-triplo-5-pecas/65650190.html",
    isReserved: false,
    reservedBy: ''
  },
  {
    id: '2',
    name: "Chaleira Elétrica",
    price: 179.90,
    description: "Chaleira Elétrica Oster",
    imageUrl: "https://jcsbrasil.vteximg.com.br/arquivos/ids/175149-1000-1000/OCEL704-01.jpg?v=637266376266700000",
    storeUrl: "https://www.oster.com.br/chaleira-eletrica-oster-tea-com-infusor-de-cha-18l/p",
    isReserved: false,
    reservedBy: ''
  },
  {
    id: '3',
    name: "Liquidificador",
    price: 189.00,
    description: "Liquidificador Oster",
    imageUrl: "https://jcsbrasil.vteximg.com.br/arquivos/ids/175948-1000-1000/OLIQ610-01.jpg?v=638810309811230000",
    storeUrl: "https://www.amazon.com.br/dp/B08DFJRCJB",
    isReserved: false,
    reservedBy: ''
  },
  {
    id: '4',
    name: "Kit 3 Refratários",
    price: 227.22,
    description: "Kit 3 Refratários de Porcelana",
    imageUrl: "https://imgmarketplace.lojasrenner.com.br/20000/5594/7010705518689/7510711802695/0.jpeg",
    storeUrl: "https://www.camicado.com.br/p/kit-3-refratarios-de-porcelana-brancas-com-alcas-28x17cm-bas/-/A-7010705518689-br.lc?sku=7510711802695",
    isReserved: false,
    reservedBy: ''
  },
  {
    id: '5',
    name: "Fritadeira Air Fryer",
    price: 249.90,
    description: "Fritadeira Air Fryer Philco PFR15PG",
    imageUrl: "https://m.media-amazon.com/images/I/51cYs7G8oRL._AC_SX679_.jpg",
    storeUrl: "https://www.amazon.com.br/Fritadeira-Fryer-Brit%C3%A2nia-BFR30-Antiaderente/dp/B0CD14V4RQ/",
    isReserved: false,
    reservedBy: ''
  },
  {
    id: '6',
    name: "Escorredor inox",
    price: 159.99,
    description: "Escorredor inox para 20 pratos Mak-inox",
    imageUrl: "https://casafreitas2.vteximg.com.br/arquivos/ids/187080-1000-1000/1083022000001--3-.jpg?v=637598941602230000",
    storeUrl: "https://www.casafreitas.com.br/escorredor-inox-pt-montado-p-20-pratos-20-20--mak-inox/p",
    isReserved: false,
    reservedBy: ''
  },
  {
    id: '7',
    name: "Travessa cerâmica",
    price: 249.99,
    description: "Travessa cerâmica branca 41x22x7cm Scalla",
    imageUrl: "https://casafreitas2.vteximg.com.br/arquivos/ids/275464-55-55/image-25755216f90f472088d6a28a72fecc6b.jpg?v=638626272952570000",
    storeUrl: "https://www.casafreitas.com.br/travessa-ceramica-branca-41x22x7cm-scalla-33306/p#reviews",
    isReserved: false,
    reservedBy: ''
  },
  {
    id: '8',
    name: "Micro-ondas",
    price: 681.61,
    description: "Micro-ondas de Bancada Electrolux Efficient 23L (ME23S)",
    imageUrl: "https://m.media-amazon.com/images/I/51fyuoyD1sL._AC_SX522_.jpg",
    storeUrl: "https://www.amazon.com.br/Micro-ondas-Bancada-Electrolux-Efficient-ME23S/dp/B0B8P2FLSR/",
    isReserved: false,
    reservedBy: ''
  },
  {
    id: '9',
    name: "Cafeteira Nespresso",
    price: 1321.00,
    description: "Nespresso Cafeteira Lattissima One Branca 220V",
    imageUrl: "https://m.media-amazon.com/images/I/51OdKoJCrkL._AC_SX679_.jpg",
    storeUrl: "https://www.amazon.com.br/Nespresso-Lattissima-One-Branca-Cafeteira/dp/B09WZ27141/",
    isReserved: false,
    reservedBy: ''
  },
  {
    id: '10',
    name: "Purificador de Água",
    price: 619.91,
    description: "Purificador de Água Electrolux Compacto Pure 4x Cinza Bivolt Pe12g",
    imageUrl: "https://m.media-amazon.com/images/I/51KkkUJg0YL._SX522_.jpg",
    storeUrl: "https://www.amazon.com.br/Purificador-Electrolux-Compacto-Cinza-Bivolt/dp/B08X66RQ48/",
    isReserved: false,
    reservedBy: ''
  },
  {
    id: '11',
    name: "Fogão Cooktop",
    price: 589.00,
    description: "Electrolux COOKTOP A GÁS KE5GP",
    imageUrl: "https://m.media-amazon.com/images/I/51HC0kr2L9L._AC_SX522_.jpg",
    storeUrl: "https://www.amazon.com.br/Cooktop-Electrolux-KE5GP-G%C3%A1s-Bocas/dp/B0849TPYSC/",
    isReserved: false,
    reservedBy: ''
  },
  {
    id: '12',
    name: "Kit colcha casal 3 peças",
    price: 299.99,
    description: "Kit colcha casal 3 peças soft touch pontos cruzados rosa",
    imageUrl: "https://static.riachuelo.com.br/RCHLO/15846962001/portrait/25cf32954d9d414307cf47dbef90911d3e2d15b4.jpg",
    storeUrl: "https://www.riachuelo.com.br/kit-colcha-casal-3-pecas-soft-touch-pontos-cruzados-rosa-casa-riachuelo-15846962001_sku",
    isReserved: false,
    reservedBy: ''
  },
  {
    id: '13',
    name: "Manta casal sherpa",
    price: 199.99,
    description: "Manta casal sherpa canelada branca | Casa Riachuelo",
    imageUrl: "https://static.riachuelo.com.br/RCHLO/15794849001/portrait/524097e160c805727c2d589e7707481f07d872db.jpg",
    storeUrl: "https://www.riachuelo.com.br/manta-casal-sherpa-canelada-branca-casa-riachuelo-15794849001_sku",
    isReserved: false,
    reservedBy: ''
  },
  {
    id: '14',
    name: "Travesseiro viscoelástico",
    price: 139.99,
    description: "Travesseiro viscoelástico Nasa x alto branco | Duoflex",
    imageUrl: "https://www.duoflex.com.br/img/produtos/grande/mockup-ns3100-nasa-x-alto-1675103206.png",
    storeUrl: "https://www.riachuelo.com.br/travesseiro-viscoelastico-nasa-x-alto-branco-duoflex-14713721001_sku_sku",
    isReserved: false,
    reservedBy: ''
  },
  {
    id: '15',
    name: "Jogo de cama casal bordado",
    price: 179.99,
    description: "Jogo de cama bordado em microfibra Mali branco - CASAL Branco",
    imageUrl: "https://static.riachuelo.com.br/RCHLO/15660621001/portrait/8faa63d421c9e23c33638eee2cfb5cba3577d674.jpg",
    storeUrl: "https://www.riachuelo.com.br/jogo-de-cama-bordado-em-microfibra-mali-branco-casa-riachuelo-15660605_sku_sku_casal_branco",
    isReserved: false,
    reservedBy: ''
  },
  {
    id: '16',
    name: "Kit toalha de banho",
    price: 249.99,
    description: "Kit toalha de banho gigante 2 peças bambu básica branca",
    imageUrl: "https://static.riachuelo.com.br/RCHLO/KIT836817/portrait/b6f774415360e3e3af108941e03c7e8e159433b1.jpg",
    storeUrl: "https://www.riachuelo.com.br/produto/kit-toalha-de-banho-gigante-2-pecas-bambu-basica-branca-casa-riachuelo-KIT836817",
    isReserved: false,
    reservedBy: ''
  },
  {
    id: '17',
    name: "Aparelho de jantar e Chá",
    price: 487.19,
    description: "Aparelho de jantar e Chá 20 Peças Oxford Flat Duna",
    imageUrl: "https://imgmarketplace.lojasrenner.com.br/20000/1979/7010705082617/7510710680672/0.jpeg",
    storeUrl: "https://www.camicado.com.br/p/aparelho-de-jantar-e-cha-20-pecas-oxford-flat-duna/-/A-7010705082617-br.lc?sku=7510710680672",
    isReserved: false,
    reservedBy: ''
  },
  {
    id: '18',
    name: "Faqueiro",
    price: 299.99,
    description: "Faqueiro Home Style Madri 30 peças",
    imageUrl: "https://img.camicado.com.br/item/101256081/zoom/1.jpg",
    storeUrl: "https://www.camicado.com.br/p/faqueiro-home-style-madri-30-pecas/-/A-101256072-br.lc?sku=101256081",
    isReserved: false,
    reservedBy: ''
  },
  {
    id: '19',
    name: "Jogo de Taça",
    price: 159.99,
    description: "Jogo de Taça de Bordeaux Bohemia Gastro",
    imageUrl: "https://img.camicado.com.br/item/000000000000038756/zoom/1.jpg",
    storeUrl: "https://www.camicado.com.br/p/jogo-de-taca-de-bordeaux-bohemia-gastro/-/A-300038756-br.lc?sku=000000000000038756",
    isReserved: false,
    reservedBy: ''
  },
  {
    id: '20',
    name: "Ventilador de Coluna",
    price: 212.28,
    description: "Ventilador de Coluna Mallory Chronos",
    imageUrl: "https://m.media-amazon.com/images/I/71hUqqrFa1L._AC_SX679_.jpg",
    storeUrl: "https://www.amazon.com.br/Ventilador-Mallory-Coluna-Chronos-Preto/dp/B0BTQY3GMZ/",
    isReserved: false,
    reservedBy: ''
  },
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
        recipientEmail: 'viniciuscaioml@gmail.com', // Site owner email
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
