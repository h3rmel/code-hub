import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { MainLayout } from "@layouts/Index";

import { getTrips } from "@api/trips";

import { toast } from "react-toastify";

import { AirplaneTilt } from "phosphor-react";

import { addBookTrip } from "@bookActions";

export const Home = () => {
  const [trips, setTrips] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    try {
      const response = await getTrips();

      if (response) setTrips(response);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAdd = (trip) => {
    dispatch(addBookTrip(trip));
  };

  return (
    <MainLayout pageTitle="Home">
      <ul className="home-list">
        {trips.map((trip) => (
          <li key={trip.id} className="trip-card">
            <img src={trip.image} alt={`${trip.title}'s city`} loading="lazy" />
            <div>
              <h3>Viagem para {trip.title}</h3>
              <span className={trip.status ? "available" : "unavailable"}>
                <strong>Status:</strong>{" "}
                {trip.status ? "Disponível" : "Indisponível"}
              </span>
              <p>{trip.description.substring(0, 192)}...</p>
            </div>
            <button onClick={() => handleAdd(trip)}>
              <AirplaneTilt size={20} weight="bold" /> Reservar
            </button>
          </li>
        ))}
      </ul>
    </MainLayout>
  );
};
