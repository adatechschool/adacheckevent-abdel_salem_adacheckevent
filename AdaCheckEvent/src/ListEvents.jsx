import React, { useEffect, useState } from "react";
import CardEvent from "./CardEvent";
import SearchBar from "./SearchBar";
import FetchZipCode from "./FetchZipCode";

const ListEvents = () => {
  // états principaux : événements, pagination, cache et chargement
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(0);
  const [number, setNumber] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [allEvents,setAllEvents]=useState([])
  const [zipCode, setZipCode]= useState([])
  const [zipCodeSelected, setZipCodeSelected]= useState("all")
console.log("allEvents",allEvents)
console.log("dhdhdh",zipCode)
  const numberLimit = 100;
  // let l = 1
  // console.log(l , "L")
  console.log(number, "number");
  console.log("event", events);
  console.log("page", page);

const fetchFiltred= async()=>{
    const res = await fetch(
        `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=${numberLimit}`
      );
      const data = await res.json();

      console.log(data.results);
      // setEventsOffset([])
      setAllEvents(data.results);

      let zipUniq = [...new Set(data.results.map(z=>z.address_zipcode ?? z.address_zipCode))]
      zipUniq =zipUniq.filter(x => x!== undefined)

      zipUniq = zipUniq.sort((a, b) => {
        if (a === 'all') return -1
        if (b === 'all') return 1
        return Number(a) - Number(b)
        })
      setZipCode(["all",...zipUniq])
}

//const fltredZipCode = zipCodeSelected === "all" ? allEvents: allEvents.filter(event=> event.address_zipCode=zipCodeSelected)
const visibleEvents =
  filteredEvents.length > 0
    ? filteredEvents
    : zipCodeSelected === "all"
    ? allEvents
    : allEvents.filter(
        (event) =>
          (event.address_zipcode ?? event.address_zipCode) === zipCodeSelected
      )
  // fonction qui récupère les événements depuis l’API et les enregistre dans le cache

  const fetchEvent = async (cache) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=${numberLimit}&offset=${page}`
      );
      const data = await res.json();

      console.log(data.results);
      // setEventsOffset([])
      setEvents(data.results);
      // setEventsOffset(([...events, ...data.results]))
      cache[page] = data.results;
      localStorage.setItem("adacheckevent", JSON.stringify(cache));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  // effet déclenché à chaque changement de page pour lire ou mettre à jour le cache

  useEffect(() => {
    // si on est déjà en cours de chargement ou si localStorage n’existe pas, on ne fait rien

    if (loading || !localStorage) {
      return;
    }

    let cache = {};
    // Vérifie si un cache existe déjà dans le navigateur et le recharge en mémoire
    if (localStorage.getItem("adacheckevent")) {
      cache = JSON.parse(localStorage.getItem("adacheckevent"));
      console.log("📦 Cache lu depuis localStorage :", cache);
    }

    // Si les données de la page actuelle sont déjà en cache, on les affiche sans refetcher l’API
    if (cache[page]) {
      //read from cach
      setData(cache[page]);
      console.log("✅ Données trouvées dans le cache pour la page :", page);

      setEvents(cache[page]);
      return;
    }
    console.log("🆕 Aucune donnée dans le cache, on va fetch la page :", page);

    fetchEvent(cache);
    
  }, [page]);
  useEffect(() => {
  fetchFiltred() // remplit allEvents une fois
}, [])
  const next = () => {
    setPage((p) => p + numberLimit);

    // if (eventsOffset === 1){
    //     setEventsOffset(eventsOffset +1)
    // }

    //   const start = (eventsOffset -1 ) * numberLimit
    //   const slice = events.slice(start, start + numberLimit)

    //   console.log(events, "evenements")
    //   setEvents(slice)
    //   console.log(slice, "slice")

    //   setNumber(start)
    //   setEventsOffset(eventsOffset +1)
  };

  const prev = () => {
    if (page > 0) {
      setPage((p) => p - numberLimit);
    }
  };

  return (
    <div>
      <SearchBar
        allEvents={allEvents}
        setFilteredEvents={setFilteredEvents}
        setPage={setPage}
      />
      <FetchZipCode zipCodeSelected={zipCodeSelected} setZipCodeSelected={setZipCodeSelected} zipCode={zipCode} />
      {visibleEvents.map((event) => (
        <CardEvent key={event.id} event={event}  />
      ))}
      
      <button
        style={{ display: page === 0 ? "none" : "inline-block" }}
        onClick={() => prev()}
      >
        page précedente
      </button>
      <button onClick={() => next()}>page suivante</button>
    </div>
  );
};

export default ListEvents;
