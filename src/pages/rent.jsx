import "./rentStyles.css";
import Navbar from "../components/Navbar.jsx";
import SearchBar from "../components/searchBar.jsx";
import Footer from "../components/footer.jsx";
import BuyRentContainer from "../components/buyRentContainer.jsx";
import { useEffect } from "react";

function Rent({ sendBack, pageRef }) {
  // useEffect with an empty dependency array ensures it runs only once after initial render
  useEffect(() => {
    // Update the page reference
    pageRef("/rent");

    // Clean-up function (optional) - it will be called when the component unmounts
    return () => {
      // Additional cleanup, if needed
    };
  }, []); // Empty dependency array means it only runs on mount and unmount

  return (
    <>
      <div className="rent">
        <div className="homeDiv rentDiv">
          <Navbar />
          <SearchBar callback={sendBack} />
        </div>
        <BuyRentContainer page="Rent" callback={sendBack} />
        <Footer />
      </div>
    </>
  );
}

export default Rent;
