import React, { useState } from 'react';
import useFetchJobs from './fetchJobs';
import './index.css';

//Bootstrap
import { Container } from 'react-bootstrap';

//Components
import NavBar from './components/Nav';
import Job from './components/Job';
import CustomPagination from './components/Pagination';

function App() {
  const [params, setParams] = useState({})
  const [page, setPage] = useState(1);
  const { jobs, loading, error } = useFetchJobs(params, page);
  return (
    <div className="App">
      <NavBar />
      <Container className="my-4">
      {loading && <h1>Loading Jobs ....</h1>}
      {error && <h1>Error. Try Refreshing the page</h1>}
      <CustomPagination page={page} setPage={setPage} hasNextPage={true} />
        {jobs.map(job => {
          return <Job key={job.id} job={job} />
        })}
        <CustomPagination page={page} setPage={setPage} hasNextPage={true} />
      </Container>
    </div>
  );
}

export default App;
