import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';

const FooterPage = () => {
  return (
    <footer className="footer text-white py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5 class="h4 disabled">Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link href="#instagram" className="a1 text-white">
                  Auto body services
                </Link>
              </li>
            </ul>
            <ul className="list-unstyled">
              <li>
                <Link href="#instagram" className="text-white a1">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-6">
            <h5 class="h4 disabled">Menu</h5>
            <ul className="list-unstyled">
              <li>
                <Link href="#home" className="text-white a1">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#home" className="text-white a1">
                  About us
                </Link>
              </li>
              <li>
                <Link href="#home" className="text-white a1">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="row custom-copy">
          <div className="col-md-6">
            <p>&copy; 2023 Your Company. All rights reserved. By <a>Faustine</a></p>
          </div>
          <div className="col-md-6 text-md-right">
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
      </div>
    </footer>
  );
};

export default FooterPage;
