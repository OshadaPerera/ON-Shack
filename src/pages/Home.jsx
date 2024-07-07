import "./homeStyles.css";
import Navbar from "../components/Navbar.jsx";
import SearchBar from "../components/searchBar.jsx";
import Footer from "../components/footer.jsx";
import homeContainer from "../components/Json_files/homeContainerData.json";
import { useEffect } from "react";

function Home({ sendBack, pageRef }) {
  // useEffect with an empty dependency array ensures it runs only once after initial render
  useEffect(() => {
    // Update the page reference
    pageRef("/");

    // Clean-up function (optional) - it will be called when the component unmounts
    return () => {
      // Additional cleanup, if needed
    };
  }, []); // Empty dependency array means it only runs on mount and unmount

  return (
    <div className="home">
      <div className="homeDiv">
        <Navbar />
        <SearchBar callback={sendBack} />
      </div>
      {/* This is for the containers in the home page */}
      <div className="container">
        {homeContainer.map((Data) => (
          <div key={Data.id} className="singleContainer">
            <div className="imgContainer">
              <div className="hidContainer">{Data.hTitle}</div>
              <img src={Data.img} alt="IMG"></img>
            </div>
            <div className="belowCont">
              <div className="headingContainer">{Data.heading}</div>
              <div className="textContainer">{Data.description}</div>
              <div className="linkContainer">
                {Data.link} <i className="fa-solid fa-arrow-right"></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
export default Home;
