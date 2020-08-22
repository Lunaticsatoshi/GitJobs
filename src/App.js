import React, {useState} from 'react';
import useFetchJobs from './fetchJobs';

//Bootstrap
import { Container } from 'react-bootstrap';

function App() {
  const [params, setParams] = useState({})
  const [page, setPage] = useState(1);
  const { jobs, loading, error } = useFetchJobs(params, page);
  return (
    <div className="App">
      {loading && <h1>Loading Jobs ....</h1>}
      {error && <h1>Error. Try Refreshing the page</h1>}
      {jobs.map(job => {
        return <h1> {job.company} </h1>
      })}
    </div>
  );
}

export default App;
