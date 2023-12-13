import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMapMarkerAlt, faPenToSquare, faUser, faFilter } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass, faCircleQuestion, faHouse, faUserGroup, faCar } from '@fortawesome/free-solid-svg-icons';
import Technician from './Technician'
import { useForm } from 'react-hook-form';
import SearchPage from './Search';


const TechniciansPage = () => {

  const [technicians, setTechnicians] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const searchForm = (data) => {
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
      })
      .catch(err => console.log(err))
    reset()
  }
  //before



  useEffect(
    () => {
      fetch('/api/v1/technician/technicians')
        .then(res => res.json())
        .then(data => {
          console.log(data)
          //setTechnicians(data)
        })
        .catch(err => console.log(err))
    }, []
  );


  return (
    <div className="technicianpage">

      <nav className="sidebar">
        <div className="menu_content">
          <ul className="menu_items">
            <div className="menu_title menu_dahsboard"></div>

            <li className="item">
              <Link to="/profile" className="nav_link submenu_item">
                <span className="navlink_icon">
                  <FontAwesomeIcon icon={faHouse} />
                </span>
                <span className="navlink">Home</span>
                <i className="bx bx-chevron-right arrow-left"></i>
              </Link>
            </li>


            <li className="item">
              <div to="/aboutus" className="nav_link submenu_item">
                <span className="navlink_icon">
                  <FontAwesomeIcon icon={faUserGroup} />
                </span>
                <span className="navlink">About us</span>
                <i className="bx bx-chevron-right arrow-left"></i>
              </div>
            </li>

            <li className="item">
              <div href="#" className="nav_link submenu_item">
                <span className="navlink_icon">
                  <FontAwesomeIcon icon={faCar} />
                </span>
                <span className="navlink">Services</span>
                <i className="bx bx-chevron-right arrow-left"></i>
              </div>
            </li>

          </ul>
          <ul className="menu_items">
            <div className="menu_title menu_editor"></div>

            <li className="item">
              <Link to="/" className="nav_link">
                <span className="navlink_icon">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <span className="navlink">Create profile</span>
              </Link>
            </li>
            <li className="item">
              <Link href="#" className="nav_link">
                <span className="navlink_icon">
                  <FontAwesomeIcon icon={faPenToSquare} />
                </span>
                <span className="navlink">Edit profile</span>
              </Link>
            </li>
            <li className="item">
              <Link href="#" className="nav_link">
                <span className="navlink_icon">
                  <FontAwesomeIcon icon={faFilter} />
                </span>
                <span className="navlink">Filter</span>
              </Link>
            </li>
          </ul>
          <ul className="menu_items">
            <div className="menu_title menu_setting"></div>
            <li className="item">
              <Link href="#" className="nav_link">
                <span className="navlink_icon">
                  <i className="bx bx-flag"></i>
                </span>
                <span className="navlink">Notice board</span>
              </Link>
            </li>
            <li className="item">
              <Link href="#" className="nav_link">
                <span className="navlink_icon">
                  <i className="bx bx-medal"></i>
                </span>
                <span className="navlink">Award</span>
              </Link>
            </li>
          </ul>

          <div className="bottom_content">
            <div className="bottom expand_sidebar">
              <span> Help </span>
              <FontAwesomeIcon icon={faCircleQuestion} style={{ color: "#ffffff", }} />
            </div>
          </div>
        </div>
      </nav>
      <div className="section">

        <div className="search-card">
          <div className="search-container1">
            <div className="select-input">
              <select defaultValue="opt">
                <option value="opt">Categories</option>
                <option value="option3">Countery</option>
                <option value="option3">City</option>
                <option value="option4">Sector</option>
                <option value="option5">Cell</option>
              </select>
            </div>
            <div className="select-input">
              <select defaultValue="opt">
                <option placeholder="">Location</option>
                <option value="option1">Name</option>
                <option value="option2">Location</option>
                <option value="option3">City</option>
                <option value="option4">Sector</option>
                <option value="option5">Cell</option>
              </select>
            </div>
            <input type="text" className="search-input" placeholder="Search technicians, city..." />
            <button className="search-button">
              <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#ffffff", }} />
            </button>
          </div>


          <div className="tags-container1">
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
            </select>
          </div>

          <div className="nameSearchFields">
            <input type="text" id="technicianName" placeholder="Technician Name, city, country..." {...register("name")} />
          </div>
          <div className="buttonSearch">
            <button type="button" onClick={handleSubmit(searchForm)}>Search</button>
          </div>
        </form>
        <SearchPage />
        <div className="profiles">
          {
            technicians.map(
              (technician) => (
                <Technician
                  full_name={technician.full_name}
                  bio_txt={technician.bio_txt}
                  location1={technician.locations[0].country}
                  location2={technician.locations[0].sector}
                  location3={technician.locations[0].cell}
                  phone_number={technician.phone_number}
                />
              )
            )
          }

          <div className="card d-flex text-center">
            <div className="profile-img">
              <img className="img-p" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" />
              <h5>Kshiti Ghelani</h5>
              <h6 className="small"><FontAwesomeIcon icon={faMapMarkerAlt} /> Karuruma</h6>
              <p className="proile-rating">
                <span className="star checked"><FontAwesomeIcon icon={faStar} /></span>
                <span className="star checked"><FontAwesomeIcon icon={faStar} /></span>
                <span className="star checked"><FontAwesomeIcon icon={faStar} /></span>
                <span className="star"><FontAwesomeIcon icon={faStar} /></span>
                <span className="star"><FontAwesomeIcon icon={faStar} /></span>
              </p>
              <div className="btn-view btn">
                View profile
              </div>
            </div>

          </div>
          <div className="card d-flex text-center">
            <div className="profile-img">
              <img className="img-p" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" />
              <h5>Kshiti Ghelani</h5>
              <h6 className="small"><FontAwesomeIcon icon={faMapMarkerAlt} /> Karuruma</h6>
              <p className="proile-rating">
                <span className="star checked"><FontAwesomeIcon icon={faStar} /></span>
                <span className="star checked"><FontAwesomeIcon icon={faStar} /></span>
                <span className="star checked"><FontAwesomeIcon icon={faStar} /></span>
                <span className="star"><FontAwesomeIcon icon={faStar} /></span>
                <span className="star"><FontAwesomeIcon icon={faStar} /></span>
              </p>
              <div className="btn-view btn">
                View profile
              </div>
            </div>

          </div>
          <div className="card d-flex text-center">
            <div className="profile-img">
              <img className="img-p" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" />
              <h5>Kshiti Ghelani</h5>
              <h6 className="small"><FontAwesomeIcon icon={faMapMarkerAlt} /> Karuruma</h6>
              <p className="proile-rating">
                <span className="star checked"><FontAwesomeIcon icon={faStar} /></span>
                <span className="star checked"><FontAwesomeIcon icon={faStar} /></span>
                <span className="star checked"><FontAwesomeIcon icon={faStar} /></span>
                <span className="star"><FontAwesomeIcon icon={faStar} /></span>
                <span className="star"><FontAwesomeIcon icon={faStar} /></span>
              </p>
              <div className="btn-view btn">
                View profile
              </div>
            </div>

          </div>
          <div className="card d-flex text-center">
            <div className="profile-img">
              <img className="img-p" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" />
              <h5>Kshiti Ghelani</h5>
              <h6 className="small"><FontAwesomeIcon icon={faMapMarkerAlt} /> Karuruma</h6>
              <p className="proile-rating">
                <span className="star checked"><FontAwesomeIcon icon={faStar} /></span>
                <span className="star checked"><FontAwesomeIcon icon={faStar} /></span>
                <span className="star checked"><FontAwesomeIcon icon={faStar} /></span>
                <span className="star"><FontAwesomeIcon icon={faStar} /></span>
                <span className="star"><FontAwesomeIcon icon={faStar} /></span>
              </p>
              <div className="btn-view btn">
                View profile
              </div>
            </div>

          </div>
          <div className="card d-flex text-center">
            <div className="profile-img">
              <img className="img-p" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" />
              <h5>Kshiti Ghelani</h5>
              <h6 className="small"><FontAwesomeIcon icon={faMapMarkerAlt} /> Karuruma</h6>
              <p className="proile-rating">
                <span className="star checked"><FontAwesomeIcon icon={faStar} /></span>
                <span className="star checked"><FontAwesomeIcon icon={faStar} /></span>
                <span className="star checked"><FontAwesomeIcon icon={faStar} /></span>
                <span className="star"><FontAwesomeIcon icon={faStar} /></span>
                <span className="star"><FontAwesomeIcon icon={faStar} /></span>
              </p>
              <div className="btn-view btn">
                View profile
              </div>
            </div>

          </div>
          <div className="card d-flex text-center">
            <div className="profile-img">
              <img className="img-p" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" />
              <h5>Kshiti Ghelani</h5>
              <h6 className="small"><FontAwesomeIcon icon={faMapMarkerAlt} /> Karuruma</h6>
              <p className="proile-rating">
                <span className="star checked"><FontAwesomeIcon icon={faStar} /></span>
                <span className="star checked"><FontAwesomeIcon icon={faStar} /></span>
                <span className="star checked"><FontAwesomeIcon icon={faStar} /></span>
                <span className="star"><FontAwesomeIcon icon={faStar} /></span>
                <span className="star"><FontAwesomeIcon icon={faStar} /></span>
              </p>
              <div className="btn-view btn">
                View profile
              </div>
            </div>

          </div>
          <div className="card d-flex text-center">
            <div className="profile-img">
              <img className="img-p" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" />
              <h5>Kshiti Ghelani</h5>
              <h6 className="small"><FontAwesomeIcon icon={faMapMarkerAlt} /> Karuruma</h6>
              <p className="proile-rating">
                <span className="star checked"><FontAwesomeIcon icon={faStar} /></span>
                <span className="star checked"><FontAwesomeIcon icon={faStar} /></span>
                <span className="star checked"><FontAwesomeIcon icon={faStar} /></span>
                <span className="star"><FontAwesomeIcon icon={faStar} /></span>
                <span className="star"><FontAwesomeIcon icon={faStar} /></span>
              </p>
              <div className="btn-view btn">
                View profile
              </div>
            </div>

          </div>
          <div className="card d-flex text-center">
            <div className="profile-img">
              <img className="img-p" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" />
              <h5>Kshiti Ghelani</h5>
              <h6 className="small"><FontAwesomeIcon icon={faMapMarkerAlt} /> Karuruma</h6>
              <p className="proile-rating">
                <span className="star checked"><FontAwesomeIcon icon={faStar} /></span>
                <span className="star checked"><FontAwesomeIcon icon={faStar} /></span>
                <span className="star checked"><FontAwesomeIcon icon={faStar} /></span>
                <span className="star"><FontAwesomeIcon icon={faStar} /></span>
                <span className="star"><FontAwesomeIcon icon={faStar} /></span>
              </p>
              <div className="btn-view btn">
                View profile
              </div>
            </div>

          </div>

        </div>


      </div>
    </div>

  );
}
export default TechniciansPage
