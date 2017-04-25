import React from 'react';
import { observer } from 'mobx-react';
import { Link, browserHistory } from 'react-router';
import { ListGroup, ListGroupItem, Alert } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import Documents from '../../api/documents/documents';

const LoadingStatus = ({store: {moviesLoading: isLoading}}) => (
  store.moviesLoading ? 
    <div>Loading ...</div> :
    <Alert bsStyle="warning">No documents yet.</Alert>
);

const handleNav = _id => browserHistory.push(`/documents/${_id}`);

const MoviesList = observer(({ store }) =>
  store.movies && store.movies.length > 0 ? 
  <ListGroup className="DocumentsList">
    {store.movies.map(({ _id, title, released, rating }) => (
      <ListGroupItem key={ _id } onClick={ () => handleNav(_id) }>
        { title } { released } [{ rating }]
      </ListGroupItem>
    ))}
  </ListGroup> : <LoadingStatus store={store}/>
);

export default MoviesList;
