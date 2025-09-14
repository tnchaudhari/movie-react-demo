import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const ActorDetailComponent = (prop) => {
  const [actor, setActor] = useState({});
  const { actorid } = useParams();

  useEffect(() => {
    if (actorid !== undefined) {
      fetch(import.meta.env.VITE_API_URL + "/person/" + actorid)
        .then(res => res.json())
        .then(res => {
          if (res.status === true) {
            setActor(res.data);
          }
        })
        .catch(err => alert("Error in getting data."));
    }
  }, []);

  return (
    <>
      <Row>
        {
          actor &&
          <>
            <Col item xs={12} md={8}>
              <h3>{actor.name}</h3>
              <div><b>Date of Birth:</b></div>
              <div>{actor.dateOfBirth && actor.dateOfBirth.split('T')[0]}</div>
              <div><b>Movie:</b></div>
              <ul><div>{actor.movies && actor.movies.map(x => <li> {x}</li>)}</div></ul>
            </Col>
            <Col>
              <Link to="/actors">Go to Actors Page</Link>
            </Col>
          </>
        }
      </Row>
    </>
  )
}


export default ActorDetailComponent;