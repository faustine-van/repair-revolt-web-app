import React from 'react'
//import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import SearchPage from './Search';

const HomePage = () => {
  return (

    <section className="hero-search">
      <div className="hero-section">
        <div className="container hero-container">
          <div className="divided">
            <p className="hero-headline">Connecting You with Local Auto Repair <br /> Technicians. </p>
            <p className="hero-value">Experience the difference in auto repair services.<br />Your
              satisfaction and the performance of your <br />vehicle are our top
              priorities.
            </p>
            <button to="/signup" className="call-to-button">
              <FontAwesomeIcon icon={faUser} /> Create Profile
            </button>
          </div>
          <div className="hero-features">
            <div>
              <img src={process.env.PUBLIC_URL + '/img/services-plumber-icon.svg'} alt="icon" height="40" width="40" />
              <h6> Create Technician Profile </h6>
              <p className="text-center">Showcase your skills and connect with local vehicle owners by
                creating your technician profile.</p>
            </div>
            <div>
              <img src={process.env.PUBLIC_URL + '/img/car-repair-service-icon.svg'} alt="icon" height="40" width="40" />
              <h6> Auto Repair services </h6>
              <p className="text-center">Discover a variety of auto repair services offered by skilled
                technicians in your local area.</p>
            </div>
          </div>

        </div>
      </div>

      <div className="Search">
        <SearchPage />
      </div>
      <div className="featured">
        <h2 className="text-center" >Service Offerings</h2>
        <p className="text-center">Discover a comprehensive range of auto repair services offered by our skilled technicians.<br />
          Our experts are dedicated to providing top-notch solutions to meet your vehicle needs.</p>
        <div className="hero-features">
          <div>
            <img src={process.env.PUBLIC_URL + '/img/collision-repair.jpg'} alt="icon" width="200" height="200" />
            <h6> Paintless Dent Repair </h6>
            <p className="text-center">Showcase your skills and connect with local vehicle owners by
              creating your technician profile.</p>
          </div>
          <div>
            <img src={process.env.PUBLIC_URL + '/img/collision-repair.jpg'} alt="icon" width="200" height="200" />
            <h6> Collision repair </h6>
            <p className="text-center">Discover a variety of auto repair services offered by skilled
              technicians in your local area.</p>
          </div>
          <div>
            <img src={process.env.PUBLIC_URL + '/img/collision-repair.jpg'} alt="icon" width="200" height="200" />
            <h6> Auto Repair services </h6>
            <p className="text-center">Discover a variety of auto repair services offered by skilled
              technicians in your local area.</p>
          </div>
          <div>
            <img src={process.env.PUBLIC_URL + '/img/tire-repair.jpg'} alt="icon" width="200" height="200" />
            <h6> Tire and Wheel Services </h6>
            <p className="text-center">Discover a variety of auto repair services offered by skilled
              technicians in your local area.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
export default HomePage
