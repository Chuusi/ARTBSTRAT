import { Outlet } from 'react-router-dom'
import './App.css'
import { Footer, Header } from './components/'
import ScrollToTop from './utils/scrollToTop'

function App() {

  return (
    <>
      <Header />
      <main>
        <ScrollToTop/>
        <Outlet />
      </main>
      < Footer />
    </>
  )
}

export default App
