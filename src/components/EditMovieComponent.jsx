import { useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import NoImage from '../no-image.png';
import AsyncSelect from "react-select/async";

const EditMovieComponent = () => {

  const [movie, setMovie] = useState({});
  const [actors, setActors] = useState(null);
  const [validated, setvalidated] = useState(false);

  const handleFileUpload = (event) => {
    event.preventDefault();
    var file = event.target.files[0];
    const form = new FormData();
    form.append("image", file);

    fetch(import.meta.env.VITE_API_URL + "/Movie/upload-movie-poster", {
      method: "POST",
      body: form
    })
      .then(res => res.json())
      .then(res => {
        var data = movie;
        data.coverImage = res.profileImage;

        setMovie(oldData => {
          return { ...oldData, ...data };
        });
      })
      .catch(err => alert("Error in file upload."));
  }

  const handleFieldChange = (event) => {
    var data = movie;
    data[event.target.name] = event.target.value;

    setMovie(oldData => {
      return { ...oldData, ...data };
    });
  }

  const promiseOptions = (inputValue) => {
    return fetch(import.meta.env.VITE_API_URL + "/Person/Search/" + inputValue)
      .then(res => res.json())
      .then(res => {
        if (res.data.count === 0) {
          alert("There is no actor matching with this name.")
        }

        return res.data.map(x => { return { value: x.id, label: x.name } })
      })
      .catch(err => alert("Error in getting data."));
  }

  const multiselectchange = (data) => {
    setActors(data);

    var people = data.map(x => {
      return {
        id: x.value, name: x.label
      }
    });

    var data = movie;
    data.actors = people;

    setMovie(oldData => {
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

    let model = movie;
    model.actors = model.actors.map(x => x.id);

    if (movie && movie.id > 0) {
      //update
      fetch(import.meta.env.VITE_API_URL + "/Movie", {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(model)
      })
        .then(res => res.json())
        .then(res => {
          if (res.status === true && res.data) {
            setMovie(res.data);
            alert("Movie updated successfully.")
          }
        })
        .catch(err => alert("Error updating movie."));

    } else {
      //create
      fetch(import.meta.env.VITE_API_URL + "/Movie", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(model)
      })
        .then(res => res.json())
        .then(res => {
          if (res.status === true && res.data) {
            setMovie(res.data);
            alert("Movie Created successfully.")
          }
        })
        .catch(err => alert("Error updating movie."));
    }
  }

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSave}>
        <Form.Group className="d-flex justify-content-center">
          <Image width={200} height={200} src={movie && movie.coverImage || NoImage} />
        </Form.Group>
        <Form.Group className="d-flex justify-content-center">
          <div><input type="file" onChange={handleFileUpload} /></div>
        </Form.Group>
        <Form.Group controlId="formmovieTitle">
          <Form.Label>Movie Title</Form.Label>
          <Form.Control name="title" value={movie && movie.title || ''} required type="text" autoComplete="off" placeholder="Enter Movie Name" onChange={handleFieldChange} />
          <Form.Control.Feedback type="invalid">
            Please enter movie name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formmovieDescription">
          <Form.Label>Movie Description</Form.Label>
          <Form.Control name="description" value={movie && movie.description || ''} type="textarea" rows={3} placeholder="Enter Movie Description" onChange={handleFieldChange} />
        </Form.Group>
        <Form.Group controlId="formmovieReleaseDate">
          <Form.Label>Release Date</Form.Label>
          <Form.Control name="releaseDate" value={movie && movie.releaseDate || ''} required type="date" onChange={handleFieldChange} />
          <Form.Control.Feedback type="invalid">
            Please enter movie release date.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formmovieReleaseDate">
          <Form.Label>Actors</Form.Label>
          <AsyncSelect cacheOptions isMulti value={actors} loadOptions={promiseOptions} onChange={multiselectchange} />
        </Form.Group>
        <Form.Group controlId="formmovieLanguage">
          <Form.Label>Movie Language</Form.Label>
          <Form.Control name="language" value={movie && movie.language || ''} type="text"
            placeholder="Enter Movie Language" onChange={handleFieldChange} />
        </Form.Group>
        <Button type="submit">{movie && movie.id > 0 ? "Update" : "Create"}</Button>
      </Form>
    </>
  )
}


export default EditMovieComponent;