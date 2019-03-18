import React, { Component } from 'react'
import Header from './components/Header'
import GlobalStyle from './styles/global'
import CarouselComponent from './components/Carousel'

class App extends Component {
  render() {
    return (
      <div>
        <GlobalStyle />
        <Header />
        <CarouselComponent />
        <h1>asdasd</h1>
      </div>
    );
  }
}

export default App
