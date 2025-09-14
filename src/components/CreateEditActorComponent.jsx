import { act, useEffect, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import NoImage from '../no-image.png';
import AsyncSelect from "react-select/async";
import { useNavigate, useParams } from "react-router-dom";

const CreateEditActorComponent = () => {
  const [actor, setActor] = useState({
    id: 0,
    name: '',
    dateOfBirth: undefined,
  });
  const [validated, setvalidated] = useState(false);
  const navigate = useNavigate();

  const handleFieldChange = (event) => {
    var data = actor;
    data[event.target.name] = event.target.value;

    setActor(oldData => {
      return { ...oldData, ...data };
    });
  }

  const handleSave = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropogation();
      setvalidated(true);
      return;
    }

    if (actor && actor.id > 0) {
      //update
      fetch(import.meta.env.VITE_API_URL + "/Person", {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(actor)
      })
        .then(res => res.json())
        .then(res => {
          if (res.status === true && res.data) {
            let actorData = res.data;
            if (actorData.dateOfBirth != null && actorData.dateOfBirth != undefined) {
              actorData.dateOfBirth = actorData.dateOfBirth.split('T')[0];
            }
            setActor(actorData);
            alert("Actor data updated successfully.");
            navigate('/actors');
          }
        })
        .catch(err => alert("Error updating actor data."));

    } else {
      //create
      fetch(import.meta.env.VITE_API_URL + "/Person", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(actor)
      })
        .then(res => res.json())
        .then(res => {
          if (res.status === true && res.data) {
            let actorData = res.data;
            if (actorData.dateOfBirth != null && actorData.dateOfBirth != undefined) {
              actorData.dateOfBirth = actorData.dateOfBirth.split('T')[0];
            }
            setActor(actorData);
            alert("Actor Created successfully.");
            navigate('/actors');
          }
        })
        .catch(err => alert("Error creating actor."));
    }
  }

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSave}>
        <Form.Group controlId="formActorName">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" value={actor.name || ''} required type="text" autoComplete="off" placeholder="Enter Actor Name" onChange={handleFieldChange} />
          <Form.Control.Feedback type="invalid">
            Please enter actor name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formActorDateOfBirthDate">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control name="dateOfBirth" value={actor && actor.dateOfBirth || ''} required type="date" onChange={handleFieldChange} />
          <Form.Control.Feedback type="invalid">
            Please enter actor date of birth.
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit">{actor && actor.id > 0 ? "Update" : "Create"}</Button>
      </Form>
    </>
  )
}


export default CreateEditActorComponent;