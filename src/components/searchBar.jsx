import React, { useState, useEffect, forwardRef } from "react";
import "./searchStyles.css";
import SearchData from "./Json_files/propertyData.json";
import "react-widgets/styles.css";
import { DropdownList } from "react-widgets";
import DatePicker from "react-widgets/DatePicker";
import NumberPicker from "react-widgets/NumberPicker";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Using React.forwardRef to forward the ref to the underlying input element
const SearchBar = forwardRef(({ callback }, ref) => {
  const location = useLocation();
  const navigate = useNavigate();
  // Accessing the current page from the URL
  const page = location.pathname.split("/")[1]; // Assuming the page is the first part of the path

  // State variables to manage the filtered data and the entered search word
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [selectedType, setSelectedType] = useState(null); // Newly added state for selected type
  const [fromPrice, setFromPrice] = useState(null);
  const [toPrice, setToPrice] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [untilDate, setUntilDate] = useState(null);
  const [bedrooms, setBedrooms] = useState(null);

  // Extracting unique property types from the JSON file
  const propertyTypes = Array.from(
    new Set(
      SearchData.reduce((types, property) => {
        if (property.Rent) {
          property.Rent.forEach((rental) => types.add(rental.type));
        }
        if (property.Buy) {
          property.Buy.forEach((purchase) => types.add(purchase.type));
        }
        return types;
      }, new Set())
    )
  );

  // Function to handle filtering based on the search input and selected type
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);

    // Filtering the data based on the entered search word and selected type
    const newFilter = SearchData.reduce((accumulator, currentValue) => {
      const filterRent = (!page || page === "rent") && currentValue.Rent;
      const filterBuy = (!page || page === "buy") && currentValue.Buy;

      const filteredRent = filterRent
        ? currentValue.Rent.filter(
            (rental) =>
              rental.title.toLowerCase().includes(searchWord.toLowerCase()) &&
              (!selectedType || rental.type === selectedType) &&
              (!bedrooms || rental.bedrooms === bedrooms) &&
              (!fromPrice || rental.price >= fromPrice) &&
              (!toPrice || rental.price <= toPrice) &&
              (!fromDate || new Date(rental.date) >= fromDate) &&
              (!untilDate || new Date(rental.date) <= untilDate)
          )
        : [];

      const filteredBuy = filterBuy
        ? currentValue.Buy.filter(
            (purchase) =>
              purchase.title &&
              purchase.title.toLowerCase().includes(searchWord.toLowerCase()) &&
              (!selectedType || purchase.type === selectedType) &&
              (!bedrooms || purchase.bedrooms === bedrooms) &&
              (!fromPrice || purchase.price >= fromPrice) &&
              (!toPrice || purchase.price <= toPrice) &&
              (!fromDate || new Date(purchase.date) >= fromDate) &&
              (!untilDate || new Date(purchase.date) <= untilDate)
          )
        : [];

      // If there are matching results, add them to the accumulator
      if (filteredRent.length > 0 || filteredBuy.length > 0) {
        accumulator.push({
          ...currentValue,
          Rent: filteredRent,
          Buy: filteredBuy,
        });
      }

      return accumulator;
    }, []);

    // Update the filtered data state
    if (
      searchWord === "" &&
      !selectedType &&
      !fromPrice &&
      !toPrice &&
      !fromDate &&
      !untilDate &&
      !bedrooms
    ) {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  // Function to handle type selection
  const handleTypeSelect = (value) => {
    setSelectedType(value);
  };
  // Function to handle price range filtering
  const handlePriceFrom = (value) => {
    setFromPrice(value);
  };
  const handlePriceTo = (value) => {
    setToPrice(value);
  };
  // Function to handle date range filtering
  const handleDateFrom = (value) => {
    setFromDate(value);
  };
  const handleDateTo = (value) => {
    setUntilDate(value);
  };
  // Function to handle bedroom filtering
  const handleBedrooms = (value) => {
    setBedrooms(value);
  };

  // Function to clear the search input and reset filtered data
  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
    setSelectedType(null);
    setFromPrice(null);
    setToPrice(null);
    setFromDate(null);
    setUntilDate(null);
    setBedrooms(null);
  };

  // Function to handle price range filtering
  const handlePriceFilter = () => {
    // Check if "to-Price" is greater than "from-Price"
    if (fromPrice !== null && toPrice !== null && toPrice <= fromPrice) {
      alert("To-Price must be greater than From-Price");
      return;
    }

    // Perform filtering based on price range
    const newFilter = filteredData.reduce((accumulator, currentValue) => {
      const filteredRent =
        currentValue.Rent && currentValue.Rent.length > 0
          ? currentValue.Rent.filter(
              (rental) =>
                (!fromPrice || rental.price >= fromPrice) &&
                (!toPrice || rental.price <= toPrice)
            )
          : [];

      const filteredBuy =
        currentValue.Buy && currentValue.Buy.length > 0
          ? currentValue.Buy.filter(
              (purchase) =>
                (!fromPrice || purchase.price >= fromPrice) &&
                (!toPrice || purchase.price <= toPrice)
            )
          : [];

      // If there are matching results, add them to the accumulator
      if (filteredRent.length > 0 || filteredBuy.length > 0) {
        accumulator.push({
          ...currentValue,
          Rent: filteredRent,
          Buy: filteredBuy,
        });
      }

      return accumulator;
    }, []);

    // Update the filtered data state
    setFilteredData(newFilter);
  };

  // Function to handle date range filtering
  const handleDateFilter = () => {
    // Check if "until-date" is greater than "from-date"
    if (fromDate !== null && untilDate !== null && untilDate <= fromDate) {
      alert("Until-Date must be greater than From-Date");
      return;
    }

    // Perform filtering based on date range
    const newFilter = filteredData.reduce((accumulator, currentValue) => {
      const filteredRent =
        currentValue.Rent && currentValue.Rent.length > 0
          ? currentValue.Rent.filter(
              (rental) =>
                (!fromDate || new Date(rental.date) >= fromDate) &&
                (!untilDate || new Date(rental.date) <= untilDate)
            )
          : [];

      const filteredBuy =
        currentValue.Buy && currentValue.Buy.length > 0
          ? currentValue.Buy.filter(
              (purchase) =>
                (!fromDate || new Date(purchase.date) >= fromDate) &&
                (!untilDate || new Date(purchase.date) <= untilDate)
            )
          : [];

      // If there are matching results, add them to the accumulator
      if (filteredRent.length > 0 || filteredBuy.length > 0) {
        accumulator.push({
          ...currentValue,
          Rent: filteredRent,
          Buy: filteredBuy,
        });
      }

      return accumulator;
    }, []);

    // Update the filtered data state
    setFilteredData(newFilter);
  };

  // Change handleItemClick to navigate to the details page
  const handleItemClick = (Id) => {
    const ID = Id;
    callback(ID);
    navigate("/details");
  };

  return (
    // The outermost container for the search bar component
    <div className="searchBar">
      {/* Container for the search content */}
      <div className="search">
        {/* Header section with a message */}
        <div className="searchHead">
          <h3>
            "Discover Your Dream Home: Where Comfort Meets Luxury, and Every
            House Tells a Story."
          </h3>
        </div>
        {/* Footer section containing search input and results */}
        <div className="searchFoot">
          {/* Label for the search input */}
          <div className="searchRow">
            <div className="searchp">Search: </div>
            {/* Container for search input and clear icon */}
            <div className="searchInputs">
              {/* Search input field */}
              <input
                type="text"
                placeholder="Type a city name: 'Negombo', 'Koswatte', 'Colombo' ..."
                onChange={handleFilter}
                value={wordEntered}
                ref={ref} // Using the ref here
              />
              {/* Search icon or clear icon based on the length of the search input */}
              <div>
                {wordEntered.length === 0 && !selectedType ? (
                  <i className="" />
                ) : (
                  <i className="fas fa-times searchIcon" onClick={clearInput} />
                )}
              </div>
            </div>
            {/* Container for the "Rent" and "Buy" buttons */}
            <div className="buyRentButtons">
              {/* Show both Buy and Rent buttons only on the home page */}
              {!page && (
                <>
                  <Button
                    className="buyRent rentButton"
                    variant="primary"
                    onClick={() => {
                      navigate("/rent");
                    }}>
                    Rent
                  </Button>{" "}
                  <Button
                    className="buyRent buyButton"
                    variant="success"
                    onClick={() => {
                      navigate("/buy");
                    }}>
                    Buy
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Display filtered results if any */}
          {filteredData.length !== 0 ? (
            <div className="dataResult">
              {/* Map through filtered data and display each property */}
              {filteredData.map((property) => {
                return (
                  <div className="dataItem" key={property.id}>
                    {/* Display rental data if available */}
                    {property.Rent &&
                      property.Rent.map((rental) => (
                        <>
                          <div
                            className="singleItem"
                            onClick={() => handleItemClick(rental.id)}>
                            <div className="singleItemDesc">
                              <li key={rental.id}>
                                {/* Header indicating the type (Rent) */}
                                <h3 className="type">Rent</h3>
                                {/* Link to the rental details page */}

                                {/* Title of the rental property */}
                                <div className="itemTitle">{rental.title}</div>
                                {/* Location of the rental property */}
                                <p className="itemLocation">
                                  {rental.location}
                                </p>
                                {/* Bedroom and bathroom information */}
                                <div className="itemBedRooms">
                                  {" "}
                                  <i className="fa-solid fa-bed"></i>{" "}
                                  {rental.bedrooms}{" "}
                                  <i className="fa-solid fa-toilet"></i>{" "}
                                  {rental.bathrooms}
                                </div>
                                {/* Price of the rental property */}
                                <p className="itemPrice">
                                  Rs.{rental.price.toLocaleString()}
                                </p>
                                {/* Type of the rental property */}
                                <p className="itemType">{rental.type}</p>
                                <p className="itemDate dateHead">
                                  Date Added:{" "}
                                  <span className="itemDate">
                                    {rental.date}
                                  </span>
                                </p>
                              </li>
                            </div>
                            <div className="itemImg">
                              <img src={rental.images[1]} alt="" />
                            </div>
                          </div>
                        </>
                      ))}
                    {/* Display purchase data if available */}
                    {property.Buy &&
                      property.Buy.map((purchase) => (
                        <>
                          <div
                            className="singleItem"
                            onClick={() => handleItemClick(purchase.id)}>
                            <div className="singleItemDesc">
                              <li key={purchase.id}>
                                {/* Header indicating the type (Buy) */}
                                <h3 className="type1">Buy</h3>
                                {/* Link to the purchase details page */}

                                {/* Title of the purchased property */}
                                <div className="itemTitle">
                                  {purchase.title}
                                </div>
                                {/* Location of the purchased property */}
                                <p className="itemLocation">
                                  {purchase.location}
                                </p>
                                {/* Bedroom and bathroom information */}
                                <div className="itemBedRooms">
                                  {" "}
                                  <i className="fa-solid fa-bed"></i>{" "}
                                  {purchase.bedrooms}{" "}
                                  <i className="fa-solid fa-toilet"></i>{" "}
                                  {purchase.bathrooms}
                                </div>
                                {/* Price of the purchased property */}
                                <p className="itemPrice">
                                  Rs.{purchase.price.toLocaleString()}
                                </p>
                                {/* Type of the purchased property */}
                                <p className="itemType">{purchase.type}</p>
                                <p className="itemDate dateHead">
                                  Date Added:{" "}
                                  <span className="itemDate">
                                    {purchase.date}
                                  </span>
                                </p>
                              </li>
                            </div>
                            <div className="itemImg">
                              <img src={purchase.images[1]} alt="" />{" "}
                            </div>
                          </div>
                        </>
                      ))}
                  </div>
                );
              })}
            </div>
          ) : // Show "No result Found" only when there is text in the search input
          wordEntered.length === 0 ? null : (
            <div className="noResultFound">No result Found</div>
          )}
        </div>
        {/* Container for the search filters */}
        <div className="searchFilters">
          <div className="buttons-container">
            {/* Dropdown list for property types */}
            <div className="typeLabel">
              <p>Type:</p>
              <div className="filter-Type">
                <DropdownList
                  className="typePick"
                  data={propertyTypes}
                  placeholder={"House"}
                  value={selectedType}
                  onChange={handleTypeSelect}
                  ref={ref}
                />
              </div>
            </div>
            {/* Number pickers for price and bedrooms */}
            <div className="fullPrice">
              <p>Price Range: </p>
              <div className="filter-Price">
                <div className="priceFrom">
                  <NumberPicker
                    className="numPrice from-Price"
                    id="numPrice"
                    placeholder={"From: "}
                    min={1000}
                    step={1000}
                    format={{ style: "currency", currency: "SLR" }}
                    value={fromPrice}
                    onChange={handlePriceFrom}
                    ref={ref}
                  />
                </div>
                <div className="priceTo">
                  <NumberPicker
                    className="numPrice to-Price"
                    placeholder={"To: "}
                    min={fromPrice + 1000}
                    step={1000}
                    format={{ style: "currency", currency: "SLR" }}
                    value={toPrice}
                    onChange={handlePriceTo}
                    ref={ref}
                  />
                </div>
              </div>
            </div>
            <div className="fullBed">
              <p>Bedrooms: </p>
              <div className="filter-Bedrooms">
                <NumberPicker
                  className="numBed"
                  placeholder={"1"}
                  min={1}
                  max={15}
                  onChange={handleBedrooms}
                  ref={ref}
                  value={bedrooms}
                />
              </div>
            </div>
            <div className="fullDates">
              <p>Date Picker: </p>
              <div className="filter-Date">
                <div className="dateFrom">
                  <DatePicker
                    className="datePick from-date"
                    placeholder={"From: "}
                    valueFormat={{ month: "short", year: "numeric" }}
                    calendarProps={{ views: ["year", "decade", "century"] }}
                    onChange={handleDateFrom}
                    value={fromDate}
                    max={untilDate ? untilDate : new Date()} // Set max to untilDate only if it exists
                  />
                </div>
                <div className="dateUntil">
                  <DatePicker
                    className="datePick until-date"
                    placeholder={"Until: "}
                    valueFormat={{ month: "short", year: "numeric" }}
                    calendarProps={{
                      views: ["year", "decade", "century"],
                    }}
                    min={fromDate}
                    max={new Date()}
                    value={untilDate}
                    onChange={handleDateTo}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default SearchBar;
