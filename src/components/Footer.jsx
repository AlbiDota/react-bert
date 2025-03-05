import React from "react";

const Footer = () => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  
      return (
          <footer className="footer">
              <ul className="footerList">
                  <li><ul id="footerLeft">
                      <li><h3>Contact</h3></li>
                      <li>
                            <strong><label HTMLFor="email">GitHub: </label></strong>
                            <a href="https://github.com/AlbiDota">github.com/AlbiDota</a>
                      </li>
                      <li>
                            <strong><label HTMLFor="email">Epost: </label></strong>
                            <a href="mailto:alisaele1@gmail.com">alisaele1@gmail.com </a>
                      </li>
                  </ul></li>
                  <li><ul id="footerMid">
                      <li><p> react-bert</p></li>
                      <li><button className="back-to-top"
                      onClick={scrollToTop}>
                          Back to top
                      </button></li>
                  </ul></li>
              </ul>
          </footer>
      );
  };
  
  export default Footer;