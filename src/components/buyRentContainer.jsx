import React, { useState, useEffect } from "react";
import "./buyRentStyles.css";
import property from "./Json_files/propertyData.json";
import Pagination from "./pagination.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function BuyRentContainer({ page, callback }) {
  // Filter data based on the current page
  const filteredData = property.filter((data) => data[page]);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Assuming 'info' is the property data field you want to use
      const data = filteredData.length > 0 ? filteredData[0][page] : [];
      setPosts(data);

      setLoading(false);
    };

    fetchData();
  }, [filteredData, page]);

  if (!filteredData || filteredData.length === 0) {
    // Handle the case where data for the specified page is not found
    return <div>No data found for this page.</div>;
  }

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const navigate = useNavigate();

  // Change handleItemClick to navigate to the details page
  const handleItemClick = (Id) => {
    const ID = Id;
    callback(ID);
    navigate("/details");
  };

  return (
    <>
      <div className="fullPage">
        <div className="bcontainer">
          {currentPosts.map((data) => (
            <div
              key={data.id}
              className="bsingleContainer"
              onClick={() => handleItemClick(data.id)}>
              <div className="bimgContainer">
                {data.hTitle ? (
                  <div className="bhidContainer">
                    {/* Using Font Awesome for a circle check icon */}
                    <i className="fa-regular fa-circle-check"></i> {data.hTitle}
                  </div>
                ) : (
                  <div
                    className="bhidContainer"
                    style={{ display: "none" }}></div>
                )}
                <img src={data.images[0]} alt="IMG" className="displayImg" />
              </div>
              <div className="bbelowCont">
                <div className="bbelowHead">
                  <div className="beds">
                    {/* Using Font Awesome for a bed icon */}
                    <i className="fa-solid fa-bed"></i> {data.bedrooms}
                  </div>
                  <div className="baths">
                    {/* Using Font Awesome for a toilet icon */}
                    <i className="fa-solid fa-toilet"></i> {data.bathrooms}
                  </div>
                  <div className="bheadingContainer">{data.type}</div>
                </div>
                <hr />
                <div className="bPriceContainer">
                  {/* Formatting the price with 'toLocaleString' for better readability */}
                  Rs. {data.price.toLocaleString()}
                </div>
                <div className="bDescriptionContainer">{data.title}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="paginationPage">
          <Pagination
            className="pagination"
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
          />
        </div>
      </div>
    </>
  );
}

export default BuyRentContainer;
