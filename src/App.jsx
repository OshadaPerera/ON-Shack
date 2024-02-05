// Importing necessary dependencies and styles
import "./App.css";
import Home from "./pages/Home.jsx";
import Buy from "./pages/buy.jsx";
import Rent from "./pages/rent.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/signIn.jsx";
import SignUp from "./pages/signUp.jsx";
import DetailsPage from "./pages/detailsPage.jsx";
import { useState } from "react";

// Main App Component
function App() {
  // State for managing the response and page references
  const [response, setResponse] = useState(null);
  const [page, setPage] = useState("");

  // Rendering the App component
  return (
    <>
      {/* Setting up the BrowserRouter for client-side routing */}
      <BrowserRouter>
        {/* Defining routes using the Routes component */}
        <Routes>
          {/* Route for the Home page */}
          <Route
            path="/"
            element={<Home sendBack={setResponse} pageRef={setPage} />}
          />

          {/* Route for the Buy page */}
          <Route
            path="/buy"
            element={<Buy sendBack={setResponse} pageRef={setPage} />}
          />

          {/* Route for the Rent page */}
          <Route
            path="/rent"
            element={<Rent sendBack={setResponse} pageRef={setPage} />}
          />

          {/* Route for the SignIn page */}
          <Route path="/signin" element={<SignIn />} />

          {/* Route for the SignUp page */}
          <Route path="/signUp" element={<SignUp />} />

          {/* Route for the DetailsPage with dynamic response and page props */}
          <Route
            path="/details"
            element={<DetailsPage response={response} page={page} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

// Exporting the App component
export default App;
