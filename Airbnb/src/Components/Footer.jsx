import "./Footer.css";

import LanguageIcon from "@mui/icons-material/Language";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";

const Footer = () => {
  return (
    <footer className="Footer">

      <div className="links">

        <div className="footer-column">
          <h3>Support</h3>

          <ul>
            <li>Help Center</li>
            <li>Safety information</li>
            <li>Cancellation option</li>
            <li>Our COVID-19 Response</li>
            <li>Supporting people with disabilities</li>
            <li>Report a neighborhood concern</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Community</h3>

          <ul>
            <li>Airbnb.org: disaster relief housing</li>
            <li>Support: Afghan refugees</li>
            <li>Celebrating diversity & belonging</li>
            <li>Combating discrimination</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Hosting</h3>

          <ul>
            <li>Try hosting</li>
            <li>AirCover: protection for Hosts</li>
            <li>Explore hosting resources</li>
            <li>Visit our community forum</li>
            <li>How to host responsibly</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>About</h3>

          <ul>
            <li>Newsroom</li>
            <li>Learn about new features</li>
            <li>Letter from our founders</li>
            <li>Careers</li>
            <li>Investors</li>
            <li>Airbnb Luxe</li>
          </ul>
        </div>

      </div>

      <div className="botton">

        <div className="Term">
          <span>&copy; 2022 Airbnb, Inc.</span>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/sitestamp">Sitemap</a>
        </div>

        <div className="contaner">

          <div className="icons">
            <LanguageIcon />

            <select defaultValue="eng">
              <option value="zul">isiZulu</option>
              <option value="ven">Venda</option>
              <option value="eng">English</option>
              <option value="afr">Afrikaans</option>
            </select>
          </div>

          <div className="icons">
            <select defaultValue="zar">
              <option value="zar">ZAR</option>
              <option value="cad">CAD</option>
              <option value="eur">EUR</option>
              <option value="bwp">BWP</option>
            </select>
          </div>

          <div className="icon">
            <FacebookIcon />
            <InstagramIcon />
            <XIcon />
          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;