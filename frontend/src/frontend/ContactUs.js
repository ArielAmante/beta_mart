import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [contactData, setContactData] = useState({ name: '', email: '', message: '' });

  const handleInput = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const submitContactForm = (e) => {
    e.preventDefault();
    console.log('Contact Data:', contactData);
    alert('Thank you for contacting us. We will get back to you shortly!');
    setContactData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-us-container">
      <h1>Contact Us</h1>
      <form onSubmit={submitContactForm}>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input type="text" className="form-control" name="name" value={contactData.name} required onChange={handleInput} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input type="email" className="form-control" name="email" value={contactData.email} required onChange={handleInput} />
        </div>
        <div className="mb-3">
          <label className="form-label">Message:</label>
          <textarea className="form-control" name="message" value={contactData.message} required onChange={handleInput}></textarea>
        </div>
        <button type="submit" className="btn" style={{ backgroundColor: '#ee4d2d', color: 'white', marginTop: '10px' }}>Submit</button>
      </form>
    </div>
  );
}

export default ContactUs;
