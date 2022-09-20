import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>

        <div class="dropdown">
          <button class="dropbtn" onClick={openMenu}>
            <img id="burger" src="https://i.imgur.com/H2F6PAe.png" />
            <img id="avi" src="https://i.imgur.com/llz1HeB.png" />
          </button>

          {/* showMenu breaking modal */}
          {/* {showMenu && ( */}
            <div class="dropdown-content">
              <NavLink to="/signup"><b>Sign Up</b></NavLink>
              <a href="#"><LoginFormModal /></a>
            </div>
          {/* )} */}
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
