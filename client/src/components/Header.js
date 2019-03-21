import React from 'react'
import {StyledHeader} from '../styles/StyledHeader'
import { Link } from 'react-router-dom'

import HamburgerMenu from './HamburgerMenu'
import { StyledNav } from '../styles/StyledNav'
import logo from '../images/logo2.png'


export default function Header() {
  return (
    <StyledHeader>
      <img src={logo} alt="" style={{
        width: '400px'
      }}/>

      <StyledNav>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/products'>Web Shop</Link>
        </li>
        <li>
          <Link to='/admin'>Admin Products</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          <Link to='/contact'>Contact</Link>
        </li>
      </StyledNav>
      {/* <HamburgerMenu /> */}
    </StyledHeader>
  )
}