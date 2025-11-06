import React, { useEffect, useState } from "react";
import CardEvent from "./CardEvent";
import SearchBar from "./SearchBar";
import FetchZipCode from "./FetchZipCode";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { ThemeToggle } from "./ThemToggle";
import '../App.css'
const BASE_URL = import.meta.env.VITE_PARIS_API_URL;

console.log("BASE_URL =>", BASE_URL);


const ListEvents = () => {
  // États principaux
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [offset, setOffset] = useState(0);
  const [zipCodeList, setZipCodeList] = useState([]);
  const [zipCodeSelected, setZipCodeSelected] = useState("all");
  const [error, setError] = useState(null);

  const limit = 20

  // ⭐ Favoris (stockés dans localStorage)
  const [favorites, setFavorites] = useLocalStorage("paris-events:favorites", [])
  //  useState(() => {
  //   try {
  //     const raw = localStorage.getItem("paris-events:favorites");
  //     return raw ? JSON.parse(raw) : [];
  //   } catch {
  //     return [];
  //   }
  // });

  const saveFavorites = (next) => {
    setFavorites(next);
    try {
      localStorage.setItem("paris-events:favorites", JSON.stringify(next));
    } catch (e) {
      console.error("Erreur localStorage favoris :", e);
    }
  };

  const toggleFavorite = (id) => {
    saveFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // 🔹 échappe les caractères spéciaux pour LIKE
  const escapeLike = (s) =>
    s
      .replace(/"/g, '\\"')
      .replace(/%/g, "\\%")
      .replace(/_/g, "\\_")
      .trim();

  // 🔹 Fonction principale : charger les données depuis l’API
  const loadData = async (query = "") => {
    setIsLoading(true);
    setError(null);

    
    let url = `${BASE_URL}?offset=${offset}&limit=${limit}`;

    // 🔎 Si au moins 3 lettres → recherche côté API
    if (query.trim().length >= 3) {
      const safe = escapeLike(query);
      const pattern = `%${safe}%`;
      const where = `(title like "${pattern}" OR qfap_tags like "${pattern}")`;
      url += `&where=${encodeURIComponent(where)}`;
    }

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Erreur API ${res.status}`);
      const data = await res.json();

      if (offset === 0) {
        setEvents(data.results || []);
      } else {
        setEvents((prev) => [...prev, ...(data.results || [])]);
      }

      // liste des codes postaux uniques à partir des résultats actuels
      const allResults =
        offset === 0 ? data.results || [] : [...events, ...(data.results || [])];

      let zipUniq = [
        ...new Set(
          allResults.map((z) => z.address_zipcode ?? z.address_zipCode)
        ),
      ].filter((x) => x !== undefined);
      zipUniq = zipUniq.sort((a, b) => Number(a) - Number(b));
      setZipCodeList(["all", ...zipUniq]);
    } catch (err) {
      console.error("Erreur lors du chargement :", err);
      setError(err.message);
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 🔁 Recharge à chaque changement de recherche ou d’offset
  useEffect(() => {
    loadData(searchText);
    
  }, [searchText, offset]);

  // 🔽 Filtrage local par code postal
  const visibleEvents =
    zipCodeSelected === "all"
      ? events
      : events.filter(
          (e) =>
            (e.address_zipcode ?? e.address_zipCode) === zipCodeSelected
        );

  // 🔹 Recherche depuis SearchBar
  const handleSearch = (text) => {
    setSearchText(text);
    setOffset(0); // reset pagination
  };

  // 🔹 Pagination
  const handleNext = () => setOffset((v) => v + limit);
  

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center  px-4 py-6 text-black">
      <div className="flex justify-center space-x-15 items-center mb-10 px-35 width-full">
      <h1 className="text-center text-2xl font-bold text-pink-600 dark:text-white">
        🎭 Événements à Paris
      </h1>
      <ThemeToggle className="" ></ThemeToggle>
      </div>
      <SearchBar onSearchChange={handleSearch} />

      <FetchZipCode
        zipCodeSelected={zipCodeSelected}
        setZipCodeSelected={setZipCodeSelected}
        zipCode={zipCodeList}
      />


      {isLoading && (
        <p className="mt-4 text-sm text-pink-600 animate-pulse">
          Chargement...
        </p>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-600">⚠️ {error}</p>
      )}

      {!isLoading && !error && visibleEvents.length === 0 && (
        <p className="mt-4 text-sm text-gray-600">
          Aucun événement trouvé.
        </p>
      )}

      {/* 🔹 GRID RESPONSIVE */}
      <div className="mt-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleEvents.map((event) => (
          <CardEvent
            key={event.id}
            event={event}
            isFavorite={favorites.includes(event.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        
        <button
          onClick={handleNext}
            disabled={isLoading || visibleEvents.length < limit}
          className="rounded-lg border border-pink-500 bg-pink-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300"
        >
          Voir PLus →
        </button>
      </div>
    </div>

  );
};
export default ListEvents;
