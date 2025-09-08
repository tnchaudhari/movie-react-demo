import { Row, Col } from "react-bootstrap";
import MovieListComponent from "./MovieListComponent";
import CreateMovieModelComponent from "./CreateMovieModelComponent";
import { useState } from "react";


const HomeComponent = () => {

  const [show, setShow] = useState(false);

  return (
    <>
      <Row>
        <Col xs={12} md={10}>
          <h2 className="text-start">Movies</h2>
        </Col>
        <Col xs={12} md={2} className="align-self-center">
          <button className="float-end" onClick={() => setShow(true)}>
            Add New Movie
          </button>
        </Col>
      </Row>

      <MovieListComponent />
      <CreateMovieModelComponent show={show} handleClose={() => setShow(false)} />
    </>
  )
}

export default HomeComponent;
