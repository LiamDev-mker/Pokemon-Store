//Import React hooks
import { useEffect, useState, useMemo, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

//Import components

import Header from '../Components/Header';
import PokemonCard from '../Components/PokemonCard';
import MessageModal from '../Components/modals/MessageModal';
import { CartContext } from '../Context/CartContext';

//Import axios for API requests
import axios from 'axios';

//Import icons
//Navigation icons
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

//Main App component
export default function PrincipalPage() {
  const [pokemon, setPokemon] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { cart, setCart } = useContext(CartContext);
  const [modalError, setModalError] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [page, setPage] = useState(1);
  const limit = 9;
  const maxPages = 10;

  //Navigate hook for routing
  const navigate = useNavigate();

  //Load Pokémon on component mount
  useEffect(() => {
    const cargarPokemones = async () => {
      try {
        const offset = (page - 1) * limit;

        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );

        const detalles = await Promise.all(
          response.data.results.map(async (poke) => {
            const res = await axios.get(poke.url);
            const data = res.data;

            // Obtener especie para cadena evolutiva
            const especie = await axios.get(data.species.url);
            const cadenaUrl = especie.data.evolution_chain.url;

            // Obtener cadena evolutiva
            const evolucionRes = await axios.get(cadenaUrl);
            const cadena = evolucionRes.data.chain;

            // Calcular etapa evolutiva (1, 2, 3...)
            let etapa = 1;
            let actual = cadena;

            while (actual) {
              if (actual.species.name === data.name) break;
              if (actual.evolves_to.length > 0) {
                actual = actual.evolves_to[0];
                etapa++;
              } else {
                break;
              }
            }

            // Asignar precio por etapa
            const precios = {
              1: 300,
              2: 600,
              3: 900,
            };
            data.precio = precios[etapa] ?? 300;

            return data;
          })
        );

        setPokemon(detalles);
        setCargando(false);
      } catch (error) {
        console.error('Error al cargar pokemones:', error);
        setCargando(false);
      }
    };

    cargarPokemones();
  }, [page]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [page]);

  //Función para agregar Pokémon al carrito
  const handleAddToCart = (poke) => {
    const isAlreadyInCart = cart.some((item) => item.id === poke.id);
    if (!isAlreadyInCart) {
      setCart([...cart, { ...poke, quantity: 1 }]); // Inicializa la cantidad en 1
    } else {
      setModalError(true);
      setMessageError('This Pokémon is already in the cart');
    }
  };
  //Memorizar el precio del carrito para evitar re-cálculos innecesarios
  const totalPrice = useMemo(() => {
    return cart.reduce((total, poke) => total + poke.precio, 0);
  }, [cart]);

  if (cargando) {
    return (
      <div className="text-center text-black font-press-start">Cargando...</div>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-b from-primarybg to-secondary">
        <Header title="PokeStore" />

        <div className="grid grid-cols-3 gap-4 p-4 text-amber-400 font-press-start">
          {pokemon.map((poke) => (
            <PokemonCard
              key={poke.id}
              name={poke.name}
              id={poke.id}
              image={poke.sprites.other['official-artwork'].front_default}
              price={poke.precio}
              showId={true}
            >
              <button
                onClick={() => handleAddToCart(poke)}
                className="py-1 text-white bg-yellow-500 rounded-sm hover:bg-yellow-600 hover:cursor-pointer"
              >
                Add to Cart
              </button>
            </PokemonCard>
          ))}

          <div className="flex justify-center col-span-3 gap-4 mb-10">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="transition-all duration-300 disabled:text-gray-400 bg-clip-text hover:cursor-pointer hover:scale-140 "
            >
              <IoIosArrowBack size={30} />
            </button>

            <div className="px-3 py-2 bg-gray-300 rounded text-secondary">
              {page}
            </div>

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, maxPages))}
              disabled={page === maxPages}
              className="transition-all duration-300 disabled:text-gray-400 bg-clip-text hover:cursor-pointer hover:scale-140"
            >
              <IoIosArrowForward size={30} />
            </button>
          </div>

          <div className="fixed z-50 -translate-x-1/2 bottom-2 left-1/2">
            <button
              onClick={() => navigate('/checkout')}
              className="px-10 py-2 text-white rounded-full shadow-sm bg-cartButton font-press-start hover:cursor-pointer hover:bg-buttonHover"
            >
              Complete Purchase: [{cart.length}] - ${totalPrice.toFixed(2)}
            </button>
          </div>
        </div>
      </div>

      {modalError && (
        <MessageModal
          message={messageError}
          onClose={() => setModalError(false)}
        />
      )}
    </>
  );
}
