export default function MessageModal({ message, onClose }) {
  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-transparent ">
      <div className="p-6 text-justify text-white bg-orange-600 border border-black rounded shadow-lg font-press-start">
        <p className="mb-4">{message}</p>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-4 py-2 font-bold text-red-600 bg-white rounded hover:bg-red-100 hover:cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
