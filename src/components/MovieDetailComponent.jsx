import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import NoImage from '../no-image.png';
import { Link, useParams } from "react-router-dom";


const MovieDetailComponent = () => {

  const [movie, setMovie] = useState({});
  const { movieid } = useParams();

  useEffect(() => {
    if (movieid !== undefined) {
      fetch(import.meta.env.VITE_API_URL + "/movie/" + movieid)
        .then(res => res.json())
        .then(res => {
          if (res.status === true) {
            setMovie(res.data);
          }
        })
        .catch(err => alert("Error in getting data."));
    }
  }, []);

  return (
    <>
      <Row>
        {
          movie &&
          <>
            <Col item xs={12} md={4}>
              <img src={movie.coverImage || NoImage} style={{ width: 300, height: 300 }} />
            </Col>
            <Col item xs={12} md={8}>
              <h3>{movie.title}</h3>
              <p>{movie.description || 'N/A'}</p>
              <div><b>Language:</b></div>
              <div>{movie.language}</div>
              <div><b>Relase Date:</b></div>
              <div>{movie.releaseDate && movie.releaseDate.split('T')[0]}</div>
              <div><b>Cast:</b></div>
              <div>{movie.actors ? movie.actors.map(x => x.name).join(", ") : 'N/A'}</div>
            </Col>
            <Col>
              <Link to="/">Go to Home Page</Link>
            </Col>
          </>
        }
      </Row>
    </>
  )
}


export default MovieDetailComponent;