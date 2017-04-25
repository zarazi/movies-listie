import React from 'react';
import { Link } from 'react-router';
import { Jumbotron } from 'react-bootstrap';

const Index = () => (
  <div className="Index">
    <Jumbotron className="text-center">
      <h2>Movies Listie</h2>
      <p>Just another movies list</p>
      <p><Link className="btn btn-success" to="/movies">Goto the list</Link></p>
    </Jumbotron>
  </div>
);

export default Index;
