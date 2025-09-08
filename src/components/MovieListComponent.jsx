import { useEffect, useState } from "react";
import MovieItem from "./MovieItem";
import ReactPaginate from "react-paginate";

const MovieListComponent = () => {

  const [movies, setMovies] = useState(null);
  const [moviesCount, setMoviesCount] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    //Get all movies
    getMovies();
  }, [page]);

  const getMovies = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const PAGE_SIZE = import.meta.env.VITE_PAGING_SIZE;

    fetch(API_URL + "/movie?pageSize=" + PAGE_SIZE + "&pageIndex=" + page)
      .then(res => res.json())
      .then(res => {
        if (res.status === true && res.data.count > 0) {
          setMovies(res.data.movies);
          setMoviesCount(Math.ceil(res.data.count / PAGE_SIZE));
        }
        else if (res.data.count === 0) {
          alert("There is no movie data in the system.");
        }
      })
      .catch(err => alert("Error while fetching movie data."));
  }

  const handlePageClick = (pageIndex) => {
    setPage(pageIndex.selected);
  }
  return (
    <>
      {movies && movies.length > 0
        ? movies.map((m, i) => <MovieItem key={i} data={m} />)
        : ""}
      <div className="d-flex justify-content-center">
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'page-link'}
          pageCount={moviesCount}
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


export default MovieListComponent;
