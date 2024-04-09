import React from 'react';
import facebook from '../assets/facebook.png';
import twitter from '../assets/twitter.png';
import linkedin from '../assets/linkedin.png';
import '../cssfolder/Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <h6>About</h6>
            <p className="text-justify">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, nesciunt. Asperiores quam error provident nam rerum dicta ipsum corporis! Quae possimus exercitationem perspiciatis quia sint, optio nihil officiis deleniti asperiores.</p>
          </div>

          <div className="col-xs-6 col-md-3">
            <h6>Contact</h6>
            <ul className="footer-links">
              <li>tamil@gmail.com</li>
              <li>namakkal</li>
              <li>123456789</li>
              <li>987654321</li>
            </ul>
          </div>

          <div className="col-xs-6 col-md-3">
            <h6>Quick Links</h6>
            <ul className="footer-links">
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Contribute</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
        <hr />
      </div>
      <div className="container">
        <div className="row">

          <div className="col-md-4 col-sm-6 col-xs-12">
            <ul className="social-icons">
              <li><a className="facebook" href="#"><i className="fa fa-facebook"> <img src={facebook} alt="" /></i></a></li>
              <li><a className="twitter" href="#"><i className="fa fa-twitter"><img src={twitter} alt="" /></i></a></li>
              <li><a className="linkedin" href="#"><i className="fa fa-linkedin"><img src={linkedin} alt="" /></i></a></li>   
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
