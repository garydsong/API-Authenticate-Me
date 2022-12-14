import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from "./components/Spots";
import SingleSpot from "./components/SingleSpot";
import SpotForm from "./components/SpotForm";
import CreateReview from "./components/ReviewForm";
import EditSpot from "./components/EditSpotForm";
import UserBookings from "./components/UserBookings";
import SearchSpots from "./components/SearchSpots";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [search, setSearch] = useState([])
  // const spots = useSelector((state) => state.spots)


  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <>
      <Navigation isLoaded={isLoaded} setSearch={setSearch} />
      {isLoaded && (
        <Switch>

          <Route exact path="/">
            <Spots />
          </Route>

          <Route path="/login">
            <LoginFormPage />
          </Route>

          <Route path="/signup">
            <SignupFormPage />
          </Route>

          <Route path="/searchspots">
            <SearchSpots search={search}  exact={true} />
          </Route>

          <Route exact path="/spots/new">
            <SpotForm />
          </Route>

          <Route exact path="/spots/:spotId">
            <SingleSpot />
          </Route>

          <Route exact path="/spots/:spotId/edit">
            <EditSpot />
          </Route>

          <Route exact path="/spots/:spotId/reviews">
            <CreateReview />
          </Route>

          <Route exact path="/user/:userId/bookings">
            <UserBookings />
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
