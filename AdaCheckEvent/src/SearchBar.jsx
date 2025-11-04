import React, { useState } from "react";

const SearchBar = ({ onSearchChange }) => {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    onSearchChange(input); // envoie la recherche au parent
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // permet aussi la recherche avec Entrée
    }
  };

  return (
    <div className="my-4 flex w-full max-w-xl items-center justify-center gap-3 rounded-xl border border-pink-200 bg-pink-50 px-4 py-3 shadow-sm transition hover:shadow-md">
      <input
        type="text"
        placeholder="Rechercher un événement (ex : concert, brocante...)"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        className="w-full rounded-lg border border-pink-200 bg-white px-3 py-2 text-black placeholder:text-pink-400 focus:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-400"
      />
      <button
        onClick={handleSearch}
        className="rounded-lg bg-pink-500 px-4 py-2 font-medium text-white transition hover:bg-pink-600 active:scale-95"
      >
        Rechercher
      </button>
    </div>
  );
};

export default SearchBar;
