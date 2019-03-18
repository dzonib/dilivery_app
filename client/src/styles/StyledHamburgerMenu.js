import styled from 'styled-components'

export const StyledHamburgerMenu = styled.div `
    position: absolute;
    right: 30px;
    top: 37px;
    cursor: pointer;
    transition: all 0.5s ease-out;

    .btn-line {
      width: 28px;
      height: 3.5px;
      margin: 0 0 5px 0;
      background: white;
    }

    &.close {
      transform: rotate(180deg);

      .btn-line {
          // line one - rotate
          &:nth-child(1) {
              transform: rotate(45deg) translate(8px, 7px)
          }
          // line two - hide
          &:nth-child(2) {
              opacity: 0;
          }
          // line three - rotate
          &:nth-child(3) {
              transform: rotate(-45deg) translate(4px, -4px);
          }
      }
    }
`
