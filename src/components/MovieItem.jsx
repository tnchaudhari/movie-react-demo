import { Col, Row } from "react-bootstrap";
import NoImage from '../no-image.png';

const MovieItem = (props) => {
  const { coverImage, title, actors } = props.data;

  return (
    <>
      <Row>
        <Col item xs={12} md={2}>
          <img
            src={coverImage || NoImage}
            style={{ width: 150, height: 150 }}
            alt={title}
          />
        </Col>
        <Col item xs={12} md={10}>
          <div className="text-start"><b>{title}</b></div>
          <div className="text-start">
            Actors: {Array.isArray(actors) && actors.length > 0
              ? actors.map(x => x.name).join(", ")
              : "No actors listed"}
          </div>
        </Col>
        <Col>
          <hr />
        </Col>
      </Row>
    </>
  );
};

export default MovieItem;
