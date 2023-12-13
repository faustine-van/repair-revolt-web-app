import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';


const AboutPage = () => {
  return (
    <section className="about-section">
      <div className="container-fluid">
        <div className="row">
          <div className="content">
            <h2 className="section-title">About Us</h2>
            <span></span>
          </div>
          <div class="col-md-6 p-5">
            <p className="section-description">
              Welcome to Repair Revolt, your go-to platform for hassle-free auto
              repairs. At Repair Revolt, we believe in connecting vehicle owners
              with skilled and trustworthy auto repair technicians in their local
              area.
            </p>
            <p className="section-description">
              Our mission is to revolutionize the auto repair industry by
              simplifying the process for both users and technicians. We understand
              the importance of your vehicle, and that's why we strive to provide a
              seamless experience for finding quality auto repair services.
            </p>
            <p className="section-description">
              Whether you're a vehicle owner looking for skilled technicians or a
              technician eager to showcase your expertise, Repair Revolt is the
              platform for you. We prioritize your satisfaction and the optimal
              performance of your vehicle.
            </p>
            <p className="section-description">
              Join Repair Revolt today and experience a new era in auto repairs.
              Connect with our community of skilled technicians or find the perfect
              repair solution for your vehicle.
            </p>
            <Link type='Link' to='/signup' className='btn btn2'>
              Sign up <FontAwesomeIcon icon={faArrowRightLong} />
            </Link>
          </div>
          <div className="col-md-6 p-5">
            <img class="mb-1" src={process.env.PUBLIC_URL + '/img/auto.jpeg'} alt="" width="500" height="500" />
          </div>
        </div>
        <div className="col-md-12">
          <ul>
            <li> <img class="" src={process.env.PUBLIC_URL + '/img/noun-satisfaction-5447028.svg'} alt="" width="50" height="50" /> Customer Satisfaction</li>
            <li> <img class="" src={process.env.PUBLIC_URL + '/img/noun-satisfaction-5447028.svg'} alt="" width="50" height="50" /> Transparency</li>
            <li> <img class="" src={process.env.PUBLIC_URL + '/img/noun-transparency-4146169.svg'} alt="" width="50" height="50" /> Skilled Technicians</li>
            <li> <img class="" src={process.env.PUBLIC_URL + '/img/noun-satisfaction-5447028.svg'} alt="" width="50" height="50" /> Convenience</li>
          </ul>
        </div>
        <div className="">
          <div className="col d-flex justify-content-center">
            <div className="social-media">
              <p className="mb-0 d-flex">
                <Link to="#" className="d-flex align-items-center justify-content-center custom-link">
                  <FontAwesomeIcon icon={faFacebook} />
                </Link>
                <Link to="#" className="d-flex align-items-center justify-content-center custom-link">
                  <FontAwesomeIcon icon={faTwitter} />
                </Link>
                <Link to="#" className="d-flex align-items-center justify-content-center custom-link">
                  <FontAwesomeIcon icon={faInstagram} />
                </Link>
                <Link to="#" className="d-flex align-items-center justify-content-center custom-link">
                  <FontAwesomeIcon icon={faGithub} />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
