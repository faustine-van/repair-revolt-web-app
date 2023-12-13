import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faUser, faFilter } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion, faHouse, faUserGroup, faCar } from '@fortawesome/free-solid-svg-icons';
import SearchPage from './Search';


const TechniciansPage = () => {

  return (
    <div className="technicianpage">

      <nav className="sidebar">
        <div className="menu_content">
          <ul className="menu_items">
            <div className="menu_title menu_dahsboard"></div>

            <li className="item">
              <Link to="/" className="nav_link submenu_item">
                <span className="navlink_icon">
                  <FontAwesomeIcon icon={faHouse} />
                </span>
                <span className="navlink">Home</span>
                <i className="bx bx-chevron-right arrow-left"></i>
              </Link>
            </li>


            <li className="item">
              <Link to="/about" className="nav_link submenu_item">
                <span className="navlink_icon">
                  <FontAwesomeIcon icon={faUserGroup} />
                </span>
                <span className="navlink">About us</span>
                <i className="bx bx-chevron-right arrow-left"></i>
              </Link>
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
              <Link to="/profile" className="nav_link">
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
        <SearchPage />
      </div>
    </div>

  );
}
export default TechniciansPage
