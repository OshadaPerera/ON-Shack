import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./detailsPage.css";
import propertyData from "../components/Json_files/propertyData.json";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

// DetailsPage component that displays details of a selected property
const DetailsPage = ({ response, page }) => {
  // Find the property in the data based on the response ID
  const foundProperty = propertyData.find((item) => {
    if (item.Rent) {
      return item.Rent.some((property) => property.id === response);
    }
    if (item.Buy) {
      return item.Buy.some((property) => property.id === response);
    }
    return false;
  });

  // Display error message if the property is not found
  if (!foundProperty) {
    return (
      <div className="error404">
        <h2>Error 404!</h2> <p>File not found.</p>{" "}
      </div>
    );
  }

  // Get the selected property details
  const selectedItem = foundProperty.Rent
    ? foundProperty.Rent.find((property) => property.id === response)
    : foundProperty.Buy.find((property) => property.id === response);

  // ImageSlider component for displaying property images
  const ImageSlider = ({ images }) => {
    const [currentImage, setCurrentImage] = useState(0);

    // Move to the next image
    const nextImage = () => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Move to the previous image
    const prevImage = () => {
      setCurrentImage((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    };

    // Automatic transition to the next image after 6 seconds
    useEffect(() => {
      const intervalId = setInterval(() => {
        nextImage();
      }, 6000);

      // Cleanup the interval on component unmount
      return () => clearInterval(intervalId);
    }, [currentImage, images.length]);

    // Render the image slider
    return (
      <div className="image-slider">
        {images.map((imageUrl, index) => (
          <div
            key={index}
            style={{ display: index === currentImage ? "block" : "none" }}>
            <img
              src={imageUrl}
              alt={`Property ${index + 1}`}
              className={index === currentImage ? "selected" : ""}
              onClick={() => setCurrentImage(index)}
            />
          </div>
        ))}
        <button className="previous-img" onClick={prevImage}>
          Previous
        </button>
        <button className="next-img" onClick={nextImage}>
          Next
        </button>
      </div>
    );
  };

  // Render the DetailsPage component
  return (
    <div className="detailsPage-div">
      <Navbar />
      <div className="singleItem-div">
        {selectedItem && (
          <div className="singleItem__container" key={selectedItem.id}>
            {/* Property title */}
            <div className="singleItem__heading">
              <h2 className="infoTitle">{selectedItem.title}</h2>
            </div>

            {/* Image slider */}
            <div className="singleItem__container__image">
              <ImageSlider images={selectedItem.images} />
            </div>

            {/* Property information */}
            <div className="singleItem__container__info">
              <div className="singleItem__container__info_left">
                {/* Property type */}
                <div className="infoType infoDiv">
                  <h3 className="infoLabels">Type: </h3>
                  <h3 className="infoDesc">{selectedItem.type}</h3>
                </div>
                {/* Property price */}
                <div className="infoPrice infoDiv">
                  <h3 className="infoLabels">Price: </h3>
                  <h3 className="infoDesc">
                    Rs. {selectedItem.price.toLocaleString()}
                  </h3>
                </div>
                {/* Property location */}
                <div className="infoLoc infoDiv">
                  <h3 className="infoLabels">Location: </h3>
                  <h3 className="infoDesc">{selectedItem.location}</h3>
                </div>
                {/* Property district */}
                <div className="infoDis infoDiv">
                  <h3 className="infoLabels">District: </h3>
                  <h3 className="infoDesc">{selectedItem.district}</h3>
                </div>
                {/* Property province */}
                <div className="infoPro infoDiv">
                  <h3 className="infoLabels">Province: </h3>
                  <h3 className="infoDesc">{selectedItem.province}</h3>
                </div>
              </div>
              <div className="singleItem__container__info_right">
                {/* Contact number */}
                <div className="infoMob infoDiv">
                  <h3 className="infoLabels">Contact No: </h3>
                  <h3 className="infoDesc">{selectedItem.mobile}</h3>
                </div>
                {/* Postal code */}
                <div className="infoPost infoDiv">
                  <h3 className="infoLabels">Postal Code: </h3>
                  <h3 className="infoDesc">{selectedItem.postalCode}</h3>
                </div>
                {/* Bedrooms */}
                <div className="infoLoc infoDiv">
                  <h3 className="infoLabels">Bedrooms: </h3>
                  <h3 className="infoDesc">{selectedItem.bedrooms}</h3>
                </div>
                {/* Bathrooms */}
                <div className="infoDis infoDiv">
                  <h3 className="infoLabels">Bathrooms: </h3>
                  <h3 className="infoDesc">{selectedItem.bathrooms}</h3>
                </div>
                {/* Date added */}
                <div className="infoDate infoDiv">
                  <h3 className="infoLabels">Date Added: </h3>
                  <h3 className="infoDesc">{selectedItem.date}</h3>
                </div>
              </div>
            </div>

            {/* Property description */}
            <div className="propertyDescription">
              <h3 className="descLabel">Property Description: </h3>
              <p className="description">
                {selectedItem.description} Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Possimus illo reprehenderit odio
                tempora ullam commodi maxime odit quisquam, unde sunt dolorum
                fuga perferendis fugiat temporibus facilis. Nihil dolore libero
                repellendus dicta aspernatur reprehenderit, eveniet natus? Iure
                deserunt, tempora rerum iste accusamus sit est quibusdam!
                Obcaecati molestiae, placeat saepe ut velit consequatur ipsum
                aperiam blanditiis eaque tempora ab vitae sapiente voluptas
                minima atque accusamus qui magni. Tenetur aut ea sit quod?
              </p>
            </div>
          </div>
        )}
      </div>
      {/* Link to go back to the previous page */}
      <div className="back-link">
        <Link to={page}>Back</Link>
      </div>
      <Footer />
    </div>
  );
};

export default DetailsPage;
