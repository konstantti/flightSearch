import React, { useState } from 'react';

const FlightSearchForm = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [adults, setAdults] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [flightOffers, setFlightOffers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true); // Aseta lataus käynnissä -tilaan
      const response = await fetch(
        `http://localhost:8080/api/flights?origin=${origin}&destination=${destination}&departDate=${departDate}&returnDate=${returnDate}&adults=${adults}`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const fetchedFlightOffers = await response.json();
      setFlightOffers(fetchedFlightOffers); // Päivitä tila tuloksilla
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    } finally {
      setLoading(false); // Aseta lataus pois päältä
    }
    
  };


  return (
    <div>
      {loading && <div className='loader'></div>}
      <label className='label'>
        Origin:
        <input className= "textInput" type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} />
      </label>
      <br />
      <label className='label'>
        Destination:
        <input className= "textInput" type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
      </label >
      <br />
      <label className='label'>
        Departure Date:
        <input className= "textInput" type="text" value={departDate} onChange={(e) => setDepartDate(e.target.value)} />
      </label>
      <br />
      <label className='label'>
        Return Date:
        <input className= "textInput" type="text" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
      </label>
      <br />
      <label className='label'>
        Adults:
        <input className= "textInput" type="text" value={adults} onChange={(e) => setAdults(e.target.value)} />
      </label>
      <br />
      <button className='button' onClick={handleSearch}>Search Flights</button>

      {/* Tulosten näyttäminen */}
      {flightOffers.length > 0 && (
        <div>
          <h2>Flight Offers</h2>
          <ul>
            {flightOffers.map((offer, index) => (
              <li key={index}>
                <p>Price: {offer.price.total}</p>
                <p>Departure: {offer.itineraries[0].segments[0].departure.iataCode}</p>
                <p>Arrival: {offer.itineraries[0].segments[0].arrival.iataCode}</p>
                <p>Departure Time: {offer.itineraries[0].segments[0].departure.at}</p>
                <p>Arrival Time: {offer.itineraries[0].segments[0].arrival.at}</p>
                <p>_____________________________________________________________________________</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FlightSearchForm;