// write test component here
import React, { useState, useCallback, useEffect, useRef } from "react";
import "./Test.css";
const countToFetch = 6;

const Test = () => {
  const [jobIds, setJobIds] = useState([]);
  const [fetchingJobNums, setFetchingJobNums] = useState(countToFetch);
  const [isLoading, setIsLoading] = useState(false);

  const [jobs, setJobs] = useState([]);

  function getJobByIds(jobIdArray) {
    setIsLoading(true);
    const promises = jobIdArray.map(async (id) => {
      return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        .then((res) => res.json())
        .then((jobDetails) => {
          if (!!jobDetails) {
            return jobDetails;
          }
        });
    });
    Promise.all(promises).then((fetchedJobs) => {
      setJobs((prev) => [...prev, ...fetchedJobs.filter((job) => !!job.title)]);
      setIsLoading(false);
    });
  }

  const fetchJobs = useCallback(() => {
    setIsLoading(true);
    fetch("https://hacker-news.firebaseio.com/v0/jobstories.json")
      .then((res) => res.json())
      .then((jobIds) => {
        setJobIds(jobIds); // Clear previous jobs
        getJobByIds(jobIds.slice(0, fetchingJobNums)); // Fetch first 10 jobs for demo
      });
  }, []);

  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current) {
      fetchJobs();
    }
    return () => {
      effectRan.current = true;
    };
  }, [fetchJobs]);

  useEffect(() => {
    getJobByIds(jobIds.slice(fetchingJobNums - countToFetch, fetchingJobNums));
  }, [fetchingJobNums]);

  return (
    <div className="container">
      <h2 className="job-header"> Hacker New Jobs Board</h2>

      <div className="jobs-list">
        {jobs.length > 0 &&
          jobs.map((job) => {
            return (
              <div className="job-card" key={job.id}>
                <div className="title">{job.title}</div>
                <span className="description">
                  By {job.by} <span className="divider"></span>
                  {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  }).format(new Date(job.time * 1000))}
                </span>
              </div>
            );
          })}

        {isLoading && (
          <div className="loading-skeleton">
            {Array.from({ length: countToFetch }).map((_, index) => (
              <div key={index} className="job-card">
                <div className="title skeleton"></div>
                <div className="description skeleton"></div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        className={`load-button ${isLoading ? 'loading' : ''}`}
        onClick={() => setFetchingJobNums((prev) => prev + countToFetch)}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="button-text">Loading...</span>
        ) : (
          <span className="button-text">Load more jobs</span>
        )}
      </button>
    </div>
  );
};

export default Test;
