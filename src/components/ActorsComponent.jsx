import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ActorListComponent from "./ActorListComponent";

const ActorsComponent = () => {
  const navigate = useNavigate();

  return (
    <>
      <Row>
        <Col xs={12} md={10}>
          <h2 className="text-start">Actors</h2>
        </Col>
        <Col xs={12} md={2} className="align-self-center">
          <button className="float-end" onClick={() => navigate('/actors/create-edit')}>
            Add New Actor
          </button>
        </Col>
      </Row>

      <ActorListComponent />
    </>
  )
}


export default ActorsComponent;