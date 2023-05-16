import React from 'react';

const linkStyle = {
  listStyle: 'none',
  padding: '0',
};

const bottomStyle = {
  backgroundColor: '#ddd',
  padding: '10px 0',
  textAlign: 'center',
};

const Footer = () => {
  return (
    <footer className='SectionFooter'>
      <div className="Footer">
        <div className="Footer-Content">
          <h3>About Us</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="Footer-Content">
          <h3>Links</h3>
          <ul style={linkStyle}>
            <li><a href="/">Home</a></li>
            <li><a href="/about">Movie</a></li>
            <li><a href="/services">Series</a></li>
          </ul>
        </div>
        <div className="Footer-Content">
          <h3>Contact Us</h3>
          <p>Email: rubyplex@email.com</p>
          <p>Phone: 123-456-7890</p>
        </div>
      </div>
      <div className="Footer-CopyRight">
        <p>&copy; {new Date().getFullYear()} Your Ruby Plex. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
