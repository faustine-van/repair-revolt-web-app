import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faUser, faPhone, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { useAuth, logout } from '../auth';

const LoggedInLinks = () => {
  return (
    <>
      <div id='ftco-nav'>
        <ul className='navbar-nav m-auto'>
          <li className='nav-item'>
            <Link className='nav-link active' to='/'>Home</Link>
          </li>
          <li className='nav-item dropdown'>
            <Link
              className='nav-link dropdown-toggle'
              to='#'
              id='dropdown04'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              Services
            </Link>
            <div className='dropdown-menu' aria-labelledby='dropdown04'>
              <Link className='dropdown-item' to='#'>
                Dent repair
              </Link>
              <Link className='dropdown-item' to='#'>
                Collision repair
              </Link>
            </div>
          </li>
          <li className='nav-item'>
            <Link to='/technicians' className='nav-link'>
              Technicians
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/profile' className='nav-link'>
              Create Profile
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/about' className='nav-link'>
              About us
            </Link>
          </li>

        </ul>
      </div>

      <div className='searchform order-sm-start order-lg-last'>
        <div className='d-flex'>
          <Link type='Link' className='btn btn1' onClick={() => { logout(); }}>
            Log Out
          </Link>
        </div>
      </div>

    </>
  );
};

const LoggedOutLinks = () => {
  return (
    <>

      <div id='ftco-nav'>
        <ul className='navbar-nav m-auto'>
          <li className='nav-item'>
            <Link className='nav-link active' to='/'>Home</Link>
          </li>
          <li className='nav-item dropdown'>
            <Link
              className='nav-link dropdown-toggle'
              to='#'
              id='dropdown04'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              Services
            </Link>
            <div className='dropdown-menu' aria-labelledby='dropdown04'>
              <Link className='dropdown-item' to='#'>
                Dent repair
              </Link>
              <Link className='dropdown-item' to='#'>
                Collision repair
              </Link>
            </div>
          </li>
          <li className='nav-item'>
            <Link className='nav-link active' to='/technicians'>Technicians</Link>
          </li>
        </ul>
      </div>

      <div className='searchform order-sm-start order-lg-last'>
        <div className='d-flex'>
          <Link type='Link' to='/login' className='btn btn1'>
            <FontAwesomeIcon icon={faUser} /> Log in
          </Link>
          <Link type='Link' to='/signup' className='btn btn2'>
            Sign up <FontAwesomeIcon icon={faArrowRightLong} />
          </Link>
        </div>
      </div>

    </>
  );
};

const NavBar = () => {
  const [logged] = useAuth();
  return (
    <section className='ftco-section'>
      <div className='wrap'>
        <div className='container'>
          <div className='row justify-content-between'>
            <div className='col'>
              <p className='mb-0 p-1 phone'>
                <FontAwesomeIcon icon={faPhone} style={{ color: '#ffffff' }} />
                <Link to='#' className='custom-link'>
                  +250 712 634 567
                </Link>
              </p>
            </div>
            <div className='col d-flex justify-content-center'>
              <div className='social-media'>
                <p className='mb-0 d-flex'>
                  <Link to='#' className='d-flex align-items-center justify-content-center custom-link'>
                    <FontAwesomeIcon icon={faFacebook} />
                  </Link>
                  <Link to='#' className='d-flex align-items-center justify-content-center custom-link'>
                    <FontAwesomeIcon icon={faTwitter} />
                  </Link>
                  <Link to='#' className='d-flex align-items-center justify-content-center custom-link'>
                    <FontAwesomeIcon icon={faInstagram} />
                  </Link>
                  <Link to='#' className='d-flex align-items-center justify-content-center custom-link'>
                    <FontAwesomeIcon icon={faGithub} />
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav className='navbar navbar-expand-lg' id='ftco-navbar'>
        <div className='container'>
          <Link className='navbar-brand' to='/'>
            <img src={process.env.PUBLIC_URL + '/img/smalllogo.svg'} alt='logo' />
          </Link>
          <button
            className='navbar-toggler' type='button' data-bs-toggle='collapse'
            data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon' />
          </button>
          {logged ? <LoggedInLinks /> : <LoggedOutLinks />}
        </div>
      </nav>
    </section>
  );
};

export default NavBar;
