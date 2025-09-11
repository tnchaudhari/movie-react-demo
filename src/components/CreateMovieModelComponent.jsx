import { Modal } from "react-bootstrap";
import EditMovieComponent from "./EditMovieComponent";

const CreateMovieModelComponent = (props) => {


  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Movie</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <EditMovieComponent />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default CreateMovieModelComponent;