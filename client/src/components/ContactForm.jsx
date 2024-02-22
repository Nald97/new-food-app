import React, { useState } from "react";
import emailjs from "emailjs-com";

const ContactForm = () => {
  const [formInput, setFormInput] = useState({
    from_name: "",
    reply_to: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formInput, "YOUR_USER_ID")
      .then(
        (result) => {
          console.log(result.text);
          alert("Email sent successfully!");
          // Reset form or handle success
        },
        (error) => {
          console.log(error.text);
          alert("Failed to send email. Please try again.");
          // Handle errors here
        }
      );
  };

  return (
    <form onSubmit={sendEmail}>
      <input
        type="text"
        name="from_name"
        value={formInput.from_name}
        onChange={handleChange}
        placeholder="Your Name"
        required
      />
      <input
        type="email"
        name="reply_to"
        value={formInput.reply_to}
        onChange={handleChange}
        placeholder="Your Email"
        required
      />
      <textarea
        name="message"
        value={formInput.message}
        onChange={handleChange}
        placeholder="Your Message"
        required
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default ContactForm;
