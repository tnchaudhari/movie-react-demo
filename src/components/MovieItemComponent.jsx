import { Button, Col, Row } from "react-bootstrap";
import NoImage from '../no-image.png';
import { useNavigate } from 'react-router-dom';

const MovieItem = (props) => {
  const navigate = useNavigate();
  const { coverImage, title, actors } = props.data;

  return (
    <>
      <Row>
        <Col xs={12} md={2}>
          <img
            src={coverImage || NoImage}
            style={{ width: 150, height: 150 }}
            alt={title}
          />
        </Col>
        <Col xs={12} md={10}>
          <div><b>{title}</b></div>
          <div>
            Actors: {Array.isArray(actors) && actors.length > 0
              ? actors.map(x => x.name).join(", ")
              : "No actors listed"}
          </div>
          <Button onClick={() => navigate(`/details/${props.data.id}`)}>See Details</Button>{' '}
          <Button onClick={() => navigate(`/edit/${props.data.id}`)}>Edit</Button>{' '}
          <Button variant="danger" onClick={() => props.deleteMovie(props.data.id)}>Delete</Button>
        </Col>
        <Col>
          <hr />
        </Col>
      </Row>
    </>
  );
};

export default MovieItem;
