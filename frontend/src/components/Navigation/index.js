import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div id="nav-wrap">
    <div className="nav-bar">
    <NavLink exact to="/">
      <img className="logo" src="https://i.imgur.com/TAA9t04.png"></img>
      </NavLink>
    <ul>
      <li>
        {isLoaded && sessionLinks}
      </li>
    </ul>
    </div>
    </div>

  );
}

export default Navigation;
