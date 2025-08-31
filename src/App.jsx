import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import './App.css'
import { Nav, Navbar, Container } from 'react-bootstrap'  // Recommended to use Container inside Navbar
import HomeComponent from './components/HomeComponent'
import ActorComponent from './components/ActorComponent'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar bg='dark' variant='dark' expand="lg">
        <Container>
          <Navbar.Brand as={Link} to='/'>Movie World</Navbar.Brand>
          <Nav className='me-auto'> {/* Use "me-auto" for Bootstrap 5 spacing */}
            <Nav.Link as={Link} to='/'>Movies</Nav.Link>
            <Nav.Link as={Link} to='/actors'>Actors</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={<HomeComponent />} />
        <Route path='/actors' element={<ActorComponent />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
