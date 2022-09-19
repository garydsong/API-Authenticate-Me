import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        
        <div class="dropdown">
            <button class="dropbtn">
              <img id="burger" src="https://i.imgur.com/H2F6PAe.png" />
              <img id="avi" src="https://i.imgur.com/JELU5u0.jpg" />
            </button>
            <div class="dropdown-content">
              <NavLink to="/signup">Sign Up</NavLink>
              <a href="#"><LoginFormModal /></a>
            </div>
          </div>
        {/* <NavLink to="/signup">Sign Up</NavLink> */}
      </>
    );
  }


  return (
    <div id="nav-wrap">
      <div className="nav-bar">
        <NavLink exact to="/">
          <img className="logo" src="https://i.imgur.com/TAA9t04.png"></img>
        </NavLink>


        <div>

          {/* <ul>
            <li> */}
              {isLoaded && sessionLinks}
            {/* </li>
          </ul> */}

        </div>
      </div>
    </div>

  );
}

export default Navigation;
