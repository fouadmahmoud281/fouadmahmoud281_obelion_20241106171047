import React, { useState, useEffect } from 'react';
import './VenueList.css';

const VenueList = () => {
  const [venues, setVenues] = useState([]);
  const [searchLocation, setSearchLocation] = useState('');
  const [searchCapacity, setSearchCapacity] = useState('');
  const [searchDate, setSearchDate] = useState('');

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      const response = await fetch('https://attendapp-backend.cloud-stacks.com/api/venues');
      const data = await response.json();
      setVenues(data);
    } catch (error) {
      console.error('Failed to fetch venues', error);
    }
  };

  const handleSearch = async () => {
    try {
      const queryParameters = new URLSearchParams();
      if (searchLocation) queryParameters.append('location', searchLocation);
      if (searchCapacity) queryParameters.append('capacity', searchCapacity);
      if (searchDate) queryParameters.append('date', searchDate);

      const response = await fetch(`https://attendapp-backend.cloud-stacks.com/api/venues/search?${queryParameters.toString()}`);
      const data = await response.json();
      setVenues(data);
    } catch (error) {
      console.error('Failed to search venues', error);
    }
  };

  return (
    <div className="venue-list">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />
        <input
          type="number"
          placeholder="Capacity"
          value={searchCapacity}
          onChange={(e) => setSearchCapacity(e.target.value)}
        />
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="venues">
        {venues.map((venue) => (
          <div key={venue.id} className="venue">
            <h3>{venue.name}</h3>
            <p>Location: {venue.location}</p>
            <p>Capacity: {venue.capacity}</p>
            <p>Available Date: {venue.availableDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenueList;
