import React, { useState, useEffect } from 'react';
import './SearchVenues.css';

const SearchVenues = () => {
  const [venues, setVenues] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    location: '',
    capacity: '',
    date: ''
  });

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      const response = await fetch('https://attendapp-backend.cloud-stacks.com/api/venues');
      if (!response.ok) throw new Error('Failed to fetch venues');
      const data = await response.json();
      setVenues(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://attendapp-backend.cloud-stacks.com/api/venues/search?location=${searchCriteria.location}&capacity=${searchCriteria.capacity}&date=${searchCriteria.date}`);
      if (!response.ok) throw new Error('Failed to search venues');
      const data = await response.json();
      setVenues(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleChange = (e) => {
    setSearchCriteria({
      ...searchCriteria,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="search-venues">
      <div className="search-criteria">
        <input
          type="text"
          name="location"
          value={searchCriteria.location}
          onChange={handleChange}
          placeholder="Location"
        />
        <input
          type="text"
          name="capacity"
          value={searchCriteria.capacity}
          onChange={handleChange}
          placeholder="Capacity"
        />
        <input
          type="date"
          name="date"
          value={searchCriteria.date}
          onChange={handleChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="venue-list">
        {venues.map(venue => (
          <div key={venue.id} className="venue-item">
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

export default SearchVenues;
