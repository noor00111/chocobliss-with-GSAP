import { useRef } from 'react'
import './App.css'
import About from './components/About'
import BottomSection from './components/BottomSection'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Menu from './components/Menu'
import Navbar from './components/Navbar'
import useAnimation from './hooks/useAnimation'

function App() {
  const mainRef = useRef(null);
  useAnimation(mainRef);

  return (
    <>
      <div id="main" ref={mainRef}>
        <Navbar></Navbar>
        <Hero></Hero>
        <About></About>
        <BottomSection></BottomSection>
        <Menu></Menu>
        <Footer></Footer>
      </div>
    </>
  )
}

export default App
