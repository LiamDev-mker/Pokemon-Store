import { useEffect, useState } from "react";
import PokemonCard from "./Components/PokemonCard";
import axios from "axios";
export default function App() {
  const [pokemon, setPokemon] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cargarPokemones = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=9"
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
        console.error("Error al cargar pokemones:", error);
        setCargando(false);
      }
    };

    cargarPokemones();
  }, []);
  if (cargando) {
    return (
      <div className="text-center text-black font-press-start">Cargando...</div>
    );
  }
  return (
    <>
      <div className="p-4 text-white bg-red-500">
        <div className="flex items-center justify-between w-full">
          <div className="flex-1"></div>
          <h1 className="flex-1 text-2xl text-center font-press-start">
            PokeStore
          </h1>
          <div className="flex items-center justify-end flex-1">
            <span className="flex items-center text-xs font-press-start">
              Pineda Castillejos Liam
            </span>
            <div className="ml-2 rounded-full w-14 h-14">
              <img
                src="/src/assets/foto-pokeStore.jpg"
                className="object-cover w-full h-full rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 p-4 text-amber-400 bg-gradient-to-b from-primarybg to-secondary font-press-start">
        {pokemon.map((poke, index) => (
          <PokemonCard
            key={poke.name}
            name={poke.name}
            id={index + 1}
            image={poke.sprites.other["official-artwork"].front_default}
            price={poke.precio}
            onAddToCart={() => setCart([...cart, poke])}
          />
        ))}
        <div className="h-20"></div>
        <div className="fixed z-50 -translate-x-1/2 bottom-8 left-1/2">
          <button className="px-10 py-2 text-white rounded-full shadow-lg bg-cartButton font-press-start hover:cursor-pointer">
            Finalizar compra [{cart.length}]
          </button>
        </div>
      </div>
    </>
  );
}
