import React, {useState} from 'react'
import { StyledHamburgerMenu } from '../styles/StyledHamburgerMenu';

export default function HamburgerMenu() {
  const [toggle, setToggle] = useState(false)

  function toggleHamburger() {
    setToggle(!toggle)
  }

  return (
    <StyledHamburgerMenu className={toggle ? 'close' : ''} onClick={toggleHamburger}>
      <div className="btn-line"></div>
      <div className="btn-line"></div>
      <div className="btn-line"></div>
    </StyledHamburgerMenu>
  )
}