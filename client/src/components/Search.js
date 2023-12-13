import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Technician from './Technician'
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


const SearchPage = () => {
  const [loading, setLoading] = useState(false);
  const [technicians, setTechnicians] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const searchForm = (data) => {
    // Set loading to true when submitting
    setLoading(true);

    console.log(data)

    let url = '/api/v1/search_technicians';
    if (data.category === 'name') {
      url += `?category=${data.category}&name=${data.name}`
    } else if (data.category === 'location') {
      url += `?category=location&${data.location_type}=${data.name}`
    }
    fetch(url)
      .then(res => res.json())
      .then(dataUrl => {
        console.log(dataUrl);
        setTechnicians(dataUrl)
        // Set loading to false when submitted
        setLoading(false);
        reset()
      })
      .catch(err => {
        console.log(err)
        // Set loading to false when submitted
        setLoading(false);

      })
  }
  //before


  return (
    <div className="search-bar">
      <div class="Search-bar">
        <form id="searchForm" onSubmit={handleSubmit(searchForm)}>
          <div className="selectName">
            <label htmlfor="category">Search by:</label>
            <select {...register("category")}>
              <option value="name">Technician Name</option>
              <option value="location">Location</option>
            </select>
          </div>
          <div className="selectLocation">
            <label htmlfor="searchType">Search by:</label>
            <select {...register("location_type")}>
              <option value="country">Country</option>
              <option value="city">City</option>
              <option value="district">District</option>
              <option value="sector">Sector</option>
              <option value="cell">Cell</option>
            </select>
          </div>

          <div className="nameSearchFields">
            <input type="text" id="technicianName" placeholder="Technician Name, city, country..." {...register("name")} />
          </div>
          <div className="buttonSearch">
            <button type="button" onClick={handleSubmit(searchForm)}>Search</button>
          </div>
        </form>


        <div className="tags-container">
          <div className="tag-text">Popular:</div>
          <div className="wrapper">
            <button className="hashtag">#mongodb</button>
            <button className="hashtag">#nodejs</button>
            <button className="hashtag">#a11y</button>
            <button className="hashtag">#mobility</button>
            <button className="hashtag">#inclusion</button>
            <button className="hashtag">#webperf</button>
            <button className="hashtag">#optimize</button>
            <button className="hashtag">#performance</button>
          </div>
        </div>
      </div>
      <div className="Search-output">
        {loading ? (
          <span className="loading-span"><FontAwesomeIcon icon={faSpinner} beatFade /></span>
        ) : (

          <div className="profiles">
            {
              technicians.map(
                //(technician, index) => (
                (technician) => (
                  //<Link to={{ pathname:`/technicians/${index}`, state: { technician }, }} key={index}>
                  <Link style ={{ textDecoration: 'none'}} to={`/technicians/${technician.id}`} state={{ fromHome: { technician } }}>
                    <Technician
                      full_name={technician.full_name}
                      bio_txt={technician.bio_txt}
                      location1={technician.locations[0].country}
                      location2={technician.locations[0].sector}
                      location3={technician.locations[0].cell}
                      phone_number={technician.phone_number}
                    />
                  </Link>
                )
              )
            }
          </div>
        )}
      </div>
    </div>

  )
};

export default SearchPage
