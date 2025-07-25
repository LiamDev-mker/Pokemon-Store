export default function PokemonCard({ name, id, image, price, onAddToCart }) {
  return (
    <div className="p-4 border border-white rounded shadow-lg text-orange text-red bg-purple-bg2 font-press-start">
      <img src={image} alt={name} />
      <div className="flex items-start justify-between mt-2">
        <div className="w-2/3">
          <h2 className="text-lg">{name}</h2>
          <p className="text-id">ID:{id}</p>
          <p className="text-price">Price: ${price}</p>
        </div>
        <div className="mt-2.5">
          <button
            onClick={onAddToCart}
            className="px-2 py-1 bg-yellow-500 rounded text-buttonText font-press-start hover:bg-yellow-600 hover:text-buttonHover hover:cursor-pointer"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
