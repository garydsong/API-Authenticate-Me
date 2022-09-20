import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './ProfileButton.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
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

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
    <div id="right-side-login-container">
    <NavLink to='/spots/new'>
      <div id="create-spot-button">Create a Spot</div>
    </NavLink>
      {/* <button onClick={openMenu}>
        <i className="fas fa-user-circle" />

      </button> */}
      <button class="dropbtn" onClick={openMenu}>
              <img id="burger" src="https://i.imgur.com/H2F6PAe.png" />
              <img id="avi" src="https://i.imgur.com/JELU5u0.jpg" />
      </button>
      {showMenu && (
        <div className="profile-dropdown">
          <div id="prodrop-one">{user.username}</div>
          <div id="prodrop-two">{user.email}</div>
          <div id="prodrop-three"onClick={logout}>Log Out
          </div>
        </div>
      )}
      </div>
    </>
  );
}

export default ProfileButton;
