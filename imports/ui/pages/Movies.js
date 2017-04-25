import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router';
import { Row, Col, Button } from 'react-bootstrap';
import MoviesList from '../components/MoviesList';

const Movies = observer(({ route: { store: s }}) => 
  <div className="Documents">
    <Row>
      <Col xs={ 12 }>
        <div className="page-header clearfix">
          <h4 className="pull-left">Movies ({s.total})</h4>
          <Link to="/documents/new">
            <Button
              bsStyle="success"
              className="pull-right"
            >New Movie</Button>
          </Link>
        </div>
        <MoviesList store={s} />
      </Col>
    </Row>
  </div>
);

export default Movies;