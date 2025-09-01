import Header from "../Components/Header";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import PokemonCard from "../Components/PokemonCard";

export default function Checkout() {
  const { cart, updateQuantity } = useContext(CartContext);

  return (
    <div className="bg-gradient-to-b from-primarybg to-secondary h-max">
      <Header title="Complete Purchase" />
      <ul className="grid grid-cols-1 gap-6 p-4">
        {cart.map((poke, index) => (
          <li
            key={index}
            className="grid items-center grid-cols-3 p-4 text-white rounded "
          >
            {/* Columna izquierda: Tarjeta del Pokémon */}
            <div className="w-1/2 col-span-2">
              <PokemonCard
                name={poke.name}
                id={poke.id}
                image={poke.sprites.other["official-artwork"].front_default}
                price={poke.precio}
                showAddToCart={false}
                showId={false}
              />
            </div>
            <div className="flex justify-center gap-4 bg-gray-800 font-press-start">
              hola
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
