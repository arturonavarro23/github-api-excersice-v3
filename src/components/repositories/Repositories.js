import React, { useEffect, Fragment, Suspense } from 'react';
import { Grid, Row, Col, Modal } from 'react-bootstrap';
import Form from './components/form';
import Results from './components/results';
import Comments from './components/comments';
import Loader from '../loader';
import GitHub from '../../services/github';
import useState from '../../hooks/useState';

const Repositories = () => {
  const [state, setState] = useState({
    repositories: [],
    isFetchingRepos: false,
    commentsModalOpen: false,
    isFetchingComments: false,
    comments: [],
    query: 'facebook',
  });

  useEffect(() => {
    searchResults();
  }, []);

  const onSearchFormSubmit = (e) => {
    e.preventDefault();
    searchResults();
  };

  const onRepositoryClick = repo => {
    setState({
      commentsModalOpen: true,
      isFetchingComments: true, 
    });

    GitHub.getComments(repo)
      .then(response => {
        const { data } = response;
        const comments = data.sort((curr, prev) => prev.id - curr.id);
        setState({
          comments:  comments.slice(0, 5),
          isFetchingComments: false,
        });
      })
      .catch(() => {
        setState({
          comments: [],
          isFetchingComments: false,
        });
      });
  }

  const closeModal = () => {
    setState({
      isFetchingComments: true,
      commentsModalOpen: false,
    });
  }

  const searchResults = () => {
    const { query } = state;
    setState({
      isFetchingRepos: true,
    });

    GitHub.getRepositories(query)
      .then(response => {
        const { data: { items } } = response;
        setState({
          repositories: items,
          isFetchingRepos: false,
        });
      })
      .catch(() => {
        setState({
          repositories: [],
          isFetchingRepos: false,
        });
      });
  }

  const onInputChange = (e) => {
    setState({
      query: e.target.value,
    });
  }
  
  const {
    repositories,
    isFetchingRepos,
    commentsModalOpen,
    isFetchingComments,
    comments,
    query,
  } = state;

  return (
    <Fragment>
      <Grid>
        <Row>
          <Col xs={12}>
            <Form
              inputValue={query}
              onSubmit={onSearchFormSubmit}
              onInputChange={onInputChange}
            />
          </Col>
        </Row>
        <Results 
          isLoading={isFetchingRepos}
          repositories={repositories}
          onRepositoryClick={onRepositoryClick}
        />
      </Grid>
      <Modal show={commentsModalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Suspense fallback={<Loader />}>
            <Comments 
              isLoading={isFetchingComments}
              comments={comments}
            />
          </Suspense>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default Repositories;
