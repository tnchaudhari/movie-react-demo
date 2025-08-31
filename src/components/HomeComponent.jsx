import { Row, Col } from "react-bootstrap";
import MovieListComponent from "./MovieListComponent";
import CreateMovieModelComponent from "./CreateMovieModelComponent";

const HomeComponent = () => {
  return (
    <>
      <Row>
        <Col xs={12} md={10}>
          <h2>Movies</h2>
        </Col>
        <Col xs={12} md={2} className="align-self-center">
          <button className="float-end" onClick={() => { }}>
            Add New Movie
          </button>
        </Col>
      </Row>

      <MovieListComponent />
      <CreateMovieModelComponent />
    </>
  )
}

export default HomeComponent;
