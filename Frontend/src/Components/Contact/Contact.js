import React from "react";
import styles from "./Contact.module.css";

const Contact = () => {
  return (
    <section id="contact" className={styles.contact}>
      <div className="container">
        <div className={styles.map}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.121169986175!2d73.90618951442687!3d18.568575172551647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c131ed5b54a7%3A0xad718b8b2c93d36d!2sSky%20Vista!5e0!3m2!1sen!2sin!4v1654257749399!5m2!1sen!2sin"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <form action="" method="">
          <div className={styles.form}>
            <div className="row">
              <div className="col-12 col-lg-6">
                <div className={styles.formTxt}>
                  <h2>Contact Us</h2>
                  <span>
                    As you might expect of a company that began as a high-end
                    interiors contractor, we pay strict attention.
                  </span>
                  <h3>USA</h3>
                  <p>
                    195 E Parker Square Dr, Parker, CO 801<br />+43 982-314-0958
                  </p>
                  <h3>India</h3>
                  <p>HW95+C9C, Lorem ipsum dolor sit.<br />411014</p>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className={styles.formDetails}>
                  <div className="col-12">
                    <input
                      type="text"
                      className="form-input"
                      name="name"
                      id="name"
                      placeholder="Name"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="email"
                      className="form-input"
                      name="email"
                      id="email"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <textarea
                      name="message"
                      className="form-textarea"
                      id="message"
                      cols="52"
                      rows="7"
                      placeholder="Message"
                      required
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <button className={styles.submitBtn}>SEND MESSAGE</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
