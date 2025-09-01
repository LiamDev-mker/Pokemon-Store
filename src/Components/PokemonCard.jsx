export default function PokemonCard({
  name,
  id,
  image,
  price,
  showId = true,
  children,
}) {
  return (
    <div className="p-4 border border-white rounded shadow-lg text-orange text-red bg-purple-bg2 font-press-start">
      <h2 className="text-xl text-center">{name}</h2>

      <img src={image} alt={name} />
      <div className="flex items-start justify-between ">
        <div className="w-2/3 mt-4">
          {showId && <p className="text-id">ID:{id}</p>}

          <p className="text-price">Price: ${price}</p>
        </div>
        <div className="mt-2.5">{children}</div>
      </div>
    </div>
  );
}
