import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import search from "../../assets/icons/search.svg"
import './Navigation.css';
import Fuse from "fuse.js"

const options = {
  findAllMatches: true,
  keys: [
    'tags.tag',
    { name: "name", weight: 2 },
    { name: "about", weight: .5 },
    { name: "city", weight: 2.5 },

  ],
  includeScore: true,
}


function Navigation({ isLoaded, setSearch }) {
  const sessionUser = useSelector(state => state.session.user);
  const spots = useSelector(state => state.spots.allSpots)
  const [showMenu, setShowMenu] = useState(false);
  const [query, setQuery] = useState("");

  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  function handleOnSearch({ target = {} }) {
    const { value } = target
    setQuery(value)
  }

  const handleSearchSubmit = async (e) => {
    e.preventDefault()
    let businessResults;
    const fuse = new Fuse(Object.values(spots), options)
    if (document.getElementById("search-input-field-business-list").value === "")  businessResults = Object.values(spots)
    else if (document.getElementById("search-input-field-business-list").value === "San Francisco") {
      businessResults = Object.values(spots).filter(business=> business.city === "San Francisco")
    }
    else if (document.getElementById("search-input-field-business-list").value === "New York") {
      businessResults = Object.values(spots).filter(business=> business.city === "New York")
    }
    else if (document.getElementById("search-input-field-business-list").value === "Brooklyn") {
      businessResults = Object.values(spots).filter(business=> business.city === "Brooklyn")
    }
    else {
      let results = fuse.search(document.getElementById("search-input-field-business-list").value).slice(0, 15)
       businessResults = results.map(result => result.item)
    }

    setSearch(businessResults)
    return history.push("/searchspots")

  }

  const dropDownClassChanger = () => {
    if (showMenu) {
      return 'dropdown-content-visible'
    } else {
      return 'dropdown-content-hidden'
    };
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

        <div className="dropdown">
          <button className="dropbtn" onClick={(() => showMenu ? setShowMenu(false) : setShowMenu(true))}>
            <img id="burger" src="https://i.imgur.com/H2F6PAe.png" />
            <img id="avi" src="https://i.imgur.com/llz1HeB.png" />
          </button>

          {/* showMenu breaking modal */}
          {/* {showMenu && ( */}
          <div className={dropDownClassChanger()}>
            <NavLink to="/signup"><b>Sign Up</b></NavLink>
            <a href='#'><LoginFormModal /></a>
          </div>
          {/* )} */}
        </div>
        {/* <NavLink to="/signup">Sign Up</NavLink> */}

      </>
    );
  }


  return (
    <>
      <div id="nav-wrap">
        <div className="nav-bar">
          <NavLink exact to="/">
            <img className="logo" src="https://i.imgur.com/TAA9t04.png"></img>
          </NavLink>

          <form className="search-bar-wrapper" onSubmit={handleSearchSubmit}>
            <input
              id="search-input-field-business-list"
              placeholder="Search destination"
              type="search"
              onChange={handleOnSearch}
            />
            <button
              className="search-button"
              type="submit"
            >
              <img id="search-mag" src={search}/>
            </button>
          </form>

          <div>

            {/* <ul>
            <li> */}
            {isLoaded && sessionLinks}
            {/* </li>
          </ul> */}

          </div>
        </div>
      </div>
      <div id="footer-bar">

        <div id="footer-left">
          <div id="name">A Gary Song Joint</div>
          <a href="https://github.com/garydsong">
            <img id="github" src="https://i.imgur.com/Y8NIiEq.png" />
          </a>
          <a href="https://www.linkedin.com/in/gary-song-96b071246/">
            <img id="linkedin" src="https://i.imgur.com/6xIfUke.png" />
          </a>
        </div>
        <div id="footer-right">
          <div id="name">Website inspired by Airbnb</div>
        </div>
      </div>
    </>

  );
}

export default Navigation;
