import React, { useState } from "react";

const CardEvent = ({ event, isFavorite, onToggleFavorite }) => {
  const [showMore, setShowMore] = useState(false);

  // Nettoyer la description (supprimer le HTML)
  const full = event.description?.replace(/<[^>]*>/g, "") || "";
  const isLong = full.length > 100;
  const short = isLong ? full.slice(0, 100) + "..." : full;

  const imgSrc =
    event.cover_url ||
    event.cover ;

  return (
    <div className="mb-4 max-w-md rounded-xl border border-black bg-white p-4 shadow-sm">
      <div className="mt-2">
        <img
          src={imgSrc}
          alt={event.title }
          className="h-48 w-full rounded-lg object-cover"
        />
      </div>
      <h2 className="mb-2 text-lg font-semibold text-black">
        {event.title || "Sans titre"}
        {isFavorite && <span className="ml-2 text-yellow-400">★</span>}
      </h2>

      <p className="mb-1 text-sm text-black/70">
        {event.address_zipcode ?? event.address_zipCode ?? "Code postal inconnu"}
      </p>

      <p className="mb-3 text-sm text-black">
        {showMore ? full : short}
      </p>

      <div className="mb-3 flex flex-wrap gap-2">
        {isLong && (
          <button
            onClick={() => setShowMore((v) => !v)}
            className="rounded-lg border border-black bg-pink-100 px-3 py-1 text-sm font-medium text-black hover:bg-pink-200"
          >
            {showMore ? "Voir moins" : "Voir plus"}
          </button>
        )}

        <button
          onClick={() => onToggleFavorite(event.id)}
          className={`rounded-lg border px-3 py-1 text-sm font-medium ${
            isFavorite
              ? "border-pink-500 bg-pink-100 text-pink-700 hover:bg-pink-200"
              : "border-black bg-white text-black hover:bg-pink-100"
          }`}
        >
          {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        </button>
        {event.url && (
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-pink-400 bg-pink-500 px-3 py-1 text-sm font-semibold text-white transition hover:bg-pink-600"
          >
            Voir l’événement →
          </a>
        )}
      </div>

      
    </div>
  );
};

export default CardEvent;
