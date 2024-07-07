// Importing the styles for the footer from "./footer.css"
import "./footer.css";

// Importing data from JSON files
import footerData from "./Json_files/footerData.json";
import socialMedia from "./Json_files/socialMedia.json";

// Functional component definition for the footer
const Footer = () => {
  return (
    // Main container for the footer with the "footer" class
    <div className="footer">
      {/* Container with additional padding for the footer content */}
      <div className="sb__footer section__padding">
        {/* Container for different sections of footer links */}
        <div className="sb__footer-links">
          {/* Mapping data from footerData.json to create navigation links */}
          {footerData.map((post) => (
            <div key={post.id} className={post.cName}>
              {/* Section title */}
              <h3>{post.title}</h3>

              {/* List of links within the section */}
              <ul>
                {post.links &&
                  post.links.map((data) => (
                    <li key={data.id}>
                      {/* Link within the section */}
                      <a href={data.url}>{data.name}</a>
                    </li>
                  ))}
              </ul>
            </div>
          ))}

          {/* Container for social media links */}
          <div className="sb__footer-links-div">
            {/* Title for the social media section */}
            <h3>Connect</h3>

            {/* Container for the list of social media links */}
            <div className="socialmedia">
              <ul>
                {/* Mapping social media data to create links */}
                {socialMedia.map((data1) => (
                  <li key={data1.id}>
                    {/* Social media link */}
                    <a href={data1.link}>
                      {/* Social media icon */}
                      <i className={data1.icon}></i>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Horizontal line to separate sections */}
        <hr />

        {/* Container for the copyright information */}
        <div className="sb__footer-below">
          {/* Copyright notice */}
          <p>
            &copy; 2023 ON Shack. All rights reserved. Solution By |{" "}
            <a href="https://www.linkedin.com/in/oshada-perera-3536a1248/">
              {" "}
              OShada Perera
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

// Exporting the Footer component as the default export
export default Footer;
