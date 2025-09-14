import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import './App.css'
import { Nav, Navbar, Container } from 'react-bootstrap'  // Recommended to use Container inside Navbar
import HomeComponent from './components/HomeComponent'
import 'bootstrap/dist/css/bootstrap.min.css'
import EditMovieComponent from './components/EditMovieComponent'
import MovieDetailComponent from './components/MovieDetailComponent'
import ActorsComponent from './components/ActorsComponent'
import ActorDetailComponent from './components/ActorDetailComponent'
import CreateEditActorComponent from './components/CreateEditActorComponent'

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
        <Route path='/details/:movieid' element={<MovieDetailComponent />} />
        <Route path='/edit/:movieid' element={<EditMovieComponent />} />
        <Route path='/actors' element={<ActorsComponent />} />
        <Route path='/actors/create-edit' element={<CreateEditActorComponent />} />
        <Route path='/actors/details/:actorid' element={<ActorDetailComponent />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
