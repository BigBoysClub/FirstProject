import { BiMenu } from 'react-icons/bi';
import {AiOutlineSearch} from 'react-icons/ai'
import {FiSearch} from 'react-icons/fi'
import { FaRegSun } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import {BiArrowBack} from 'react-icons/bi'
import { TfiComment } from "react-icons/tfi";
import { MdHelpOutline } from "react-icons/md";
import { useState } from 'react';
import {AiOutlineBell} from 'react-icons/ai';
import defaultImage from '../../assets/defaultProfile.jpg';
import './Navbar.css'

import AuthStore from '../../stores/AuthStore';
import { useLogout } from '../../hooks/useLogout';

const Navbar = () => {

  const { user } = AuthStore()
  const { logoutUser } = useLogout()

  const [showSearch, setshowSearch] = useState(false);
  const [showDrop, setshowDrop] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const toggle = () => {
    const side = document.querySelector('.sidebar')
    const backdrop = document.querySelector('.backdrop')
    const postArea = document.querySelector('.categories')
    const reactions = document.querySelectorAll('.reactions')
    const comments = document.querySelectorAll('.comments')
    side.classList.toggle('show')
    backdrop.classList.toggle('darken')

    // reactions.classList.remove('overlap-0');

   
    
    if (postArea.classList.contains('overlap-0')) {
        postArea.classList.remove('overlap-0')
        // reactions.classList.remove('overlap-0')
        reactions.forEach((reaction) => {
          return reaction.classList.remove('overlap-0');
        })
        
        comments.forEach((reaction) => {
          return reaction.classList.remove('pos-relative');
        })
    }
    else {

        setTimeout(() => {
          postArea.classList.add('overlap-0');
          reactions.forEach((reaction) => {
            return reaction.classList.add('overlap-0');
          })
          comments.forEach((reaction) => {
            return reaction.classList.add('pos-relative');
          })
        }, 300)
    }

   
    console.log(reactions)
  }  


  return (
    <header className="navbar container"> 


      {showSearch && 
        <div className="clicked-search">
          <div className="back-container" onClick={() => setshowSearch(false)}>
            <BiArrowBack className='back'></BiArrowBack>
          </div>
          <form action="">
            <input type="text" placeholder='Search'/>
          </form>
        </div>
      }

      <BiMenu className="toggle-icon" onClick={toggle} />
      <h1 className="logo">LOGO</h1>
      <form className="input-section">
        <input type="text" placeholder='Search'/>
        <div className="search-container" onClick={() => setshowSearch(true)}>
          <FiSearch className='search-icon' ></FiSearch>
        </div>
      </form>
         
	  <div className='nav-features'>
	  	<ul className='icons-list'>
			<li className='list-items'>
        <div className='icon-border' onClick={() => setShowNotif(!showNotif)}>
            <AiOutlineBell className='bell'/>
        </div>
      </li>
			<li className='list-items'>
        <div className="icon-border">
          <TfiComment className='message'/> 
        </div>
        </li>
			<li className='list-items'>
				  <img onClick={() => setshowDrop(!showDrop)} className='profile-list' src={ !user ? defaultImage : user.image} alt="profile picture" />
			</li>
		</ul>

    {
      showNotif &&
      <div className="drop">
        <ul className='drop-list'>
          <li className='item'>Notif</li>
          <li className='item'>Notif</li>
        </ul>
      </div>
    }

    { showDrop &&
      <div className="drop">
        <ul className='drop-list'>
        <li className='item'><FaRegSun/> Settings </li>
        <li className='item'><MdHelpOutline/> Help </li>
        <li  onClick={logoutUser} className='item'><MdLogout/> Logout </li>
        </ul>
      </div>
    }
	  </div>


    </header>
  )
}

export default Navbar;