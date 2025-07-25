import { useState } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function Header() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="p-4 text-white bg-red-500 rounded-sm h-23">
      <div className="flex items-center justify-between w-full">
        <div className="flex-1"></div>
        <h1 className="flex-1 text-2xl text-center font-press-start">
          PokeStore
        </h1>
        <div className="relative flex items-center justify-end flex-1">
          <div className="flex flex-col items-center justify-center mr-2">
            <div
              onClick={() => setExpanded(!expanded)}
              className="-mt-2 rounded-full cursor-pointer w-18 h-18"
            >
              <img
                src="/src/assets/foto-pokeStore.jpg"
                className="object-cover w-full h-full rounded-full"
                alt="Foto de perfil"
              />
            </div>
            <div
              className={`absolute left-5 flex flex-col items-center p-2 bg-red-500 min-w-[140px] z-20 transition-all duration-500 ease-out 
                ${
                  expanded
                    ? "opacity-100 translate-x-0 pointer-events-auto"
                    : "opacity-0 -translate-x-4 pointer-events-none"
                }`}
              style={{ minWidth: 120 }}
            >
              <span className="mb-1 text-xs font-bold font-press-start whitespace-nowrap">
                Pineda Castillejos Liam
              </span>
              <div className="flex justify-center gap-2 mt-1">
                <a
                  href="https://www.linkedin.com/in/pinedaliam"
                  className="text-white hover:text-blue-500"
                  title="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin size={25} />
                </a>
                <a
                  href="https://github.com/LiamDev-mker"
                  className="text-white hover:text-black"
                  title="GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub size={25} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
