import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VenuePage.css';

const VenuePage = () => {
  const [venues, setVenues] = useState([]);
  const [searchLocation, setSearchLocation] = useState('');
  const [searchCapacity, setSearchCapacity] = useState('');
  const [searchDate, setSearchDate] = useState('');

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get('https://attendapp-backend.cloud-stacks.com/api/venues');
        setVenues(response.data);
      } catch (error) {}
    };
    fetchVenues();
  }, []);

  useEffect(() => {
    const searchVenues = async () => {
      try {
        const response = await axios.get('https://attendapp-backend.cloud-stacks.com/api/venues/search', {
          params: {
            location: searchLocation,
            capacity: searchCapacity,
            date: searchDate,
          },
        });
        setVenues(response.data);
      } catch (error) {}
    };
    if (searchLocation || searchCapacity || searchDate) {
      searchVenues();
    }
  }, [searchLocation, searchCapacity, searchDate]);

  return (
    <div className="venue-page">
      <h1>Venue Listings</h1>
      <div className="search-filters">
        <input
          type="text"
          placeholder="Search by location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />
        <input
          type="number"
          placeholder="Minimum capacity"
          value={searchCapacity}
          onChange={(e) => setSearchCapacity(e.target.value)}
        />
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
      </div>
      <div className="venue-list">
        {venues.map(venue => (
          <div key={venue.id} className="venue-card">
            <h2>{venue.name}</h2>
            <p>Location: {venue.location}</p>
            <p>Capacity: {venue.capacity}</p>
            <p>Available Dates: {venue.availableDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenuePage;
