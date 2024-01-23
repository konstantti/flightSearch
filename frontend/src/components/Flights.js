import React, { useState, useEffect } from 'react';

export default function MyComponent() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/flights?origin=LON&destination=NYC&departDate=2024-11-15&returnDate=2024-11-17&adults=3');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>API Data</h1>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data && (
        <ul>
          {data.map((flight) => (
            <li key={flight.id}>
              <h3>Flight ID: {flight.id}</h3>
              <p>Departure: {flight.itineraries[0].segments[0].departure.at}</p>
              <p>Arrival: {flight.itineraries[0].segments[0].arrival.at}</p>
              <p>Price: {flight.price.total} {flight.price.currency}</p>
              {/* Add more details as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
