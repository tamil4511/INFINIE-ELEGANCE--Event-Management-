import React, { useContext } from 'react';
import logo from '../assets/logo.png';
import '../cssfolder/Header.css';
import { UserContext } from './Home'; // Import UserContext from the appropriate file
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { email, password } = useContext(UserContext); // Access values from UserContext
  const navigate = useNavigate(); // Import and use useNavigate for navigation

  // Function to handle navigation when the selection changes
  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    if (selectedOption === "1") {
      navigate('/StageDecoration',{ state: { value: { email: email, password: password } } });
    } 
    if(selectedOption === "2"){
      navigate('/DJ',{ state: { value: { email: email, password: password } } });
    }
    if(selectedOption === "3"){
      navigate('/MakeUp',{ state: { value: { email: email, password: password } } });
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container-fluid">
          <img src={logo} alt="" className='img' />
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Logo</h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
                <li className="nav-item">
                  <a className="nav-link mx-lg-2 active" href="#">Service</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link mx-lg-2" href="#">About Us</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link mx-lg-2" href="#">Gallery</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link mx-lg-2" href="#">Contact</a>
                </li>
                <li className="nav-item">
                  <div className="nav-item">
                    <select id="custom-select" onChange={handleSelectChange}>
                      <option value="0" className='nav-item-select-option' selected disabled>Select Event</option>
                      <option value="1" className='nav-item-select-option'>STAGE DECORATION</option>
                      <option value="2" className='nav-item-select-option'>DJ</option>
                      <option value="3" className='nav-item-select-option'>MAKEUP</option>
                    </select>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* hero section */}
      <section className="hero-section">
      </section>
    </div>
  );
}

export default Header;
