import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';


const Technician = ({ full_name, bio_txt, phone_number, location1, location2, location3 }) => {
  return (
    <div className="card d-flex text-center">
      <div className="profile-img">
        <img className="img-p"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
          alt="" />
        <h5>{full_name}</h5>
        <h6 className="small"><FontAwesomeIcon icon={faMapMarkerAlt} /> {location1},{location2},{location3}</h6>
        <h6 className="small">{phone_number}</h6>
        <h6 className="small">{bio_txt}</h6>
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
  )
}
export default Technician
