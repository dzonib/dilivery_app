import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    html {
        box-sizing: border-box;
        font-size: 10px;
    }
    body {
        font-family: 'Lora', serif;
        margin: 0;
        padding: 0;
        font-size: 1.6rem;
        line-height: 2;
                
        a {
            text-decoration: none;
        }
    }
`

export default GlobalStyle