import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ActorListComponent = () => {
  const [actors, setActors] = useState(null);
  const [actorsCount, setActorsCount] = useState(0);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    //Get all actors
    getPersons();
  }, [page]);

  const getPersons = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const PAGE_SIZE = import.meta.env.VITE_PAGING_SIZE;

    fetch(API_URL + "/person?pageSize=" + PAGE_SIZE + "&pageIndex=" + page)
      .then(res => res.json())
      .then(res => {
        if (res.status === true && res.data.count > 0) {
          setActors(res.data.persons);
          setActorsCount(Math.ceil(res.data.count / PAGE_SIZE));
        }
        else if (res.data.count === 0) {
          alert("There is no actor data in the system.");
        }
      })
      .catch(err => alert("Error while fetching actor data."));
  }

  const deletePerson = (id) => {
    fetch(import.meta.env.VITE_API_URL + "/Person?id=" + id, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        if (res.status === true) {
          alert(res.message);
          getPersons();
        }
      })
      .catch(err => alert("Error in deleting actor."));
  }

  const handlePageClick = (pageIndex) => {
    setPage(pageIndex.selected);
  }
  return (
    <>
      {actors
        ? <div> {actors.map((m, i) =>
          <Row key={i}>
            <Col>
              <div onClick={() => navigate(`/actors/details/${m.id}`)}><b><u>{m.name}</u></b></div>
              <Button onClick={() => navigate(`/actors/create-edit/${m.id}`)}>Edit</Button>{' '}
              <Button variant="danger" onClick={() => deletePerson(m.id)}>Delete</Button>
              <hr />
            </Col>
          </Row>)}
        </div>
        : ""}
      <div className="d-flex justify-content-center">
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'page-link'}
          pageCount={actorsCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-link'}
          nextClassName={'page-link'}
          activeClassName={'active'}
        />
      </div>
    </>
  )
}


export default ActorListComponent;