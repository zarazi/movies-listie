import React from 'react';
import { Jumbotron } from 'react-bootstrap';

const Index = () => (
  <div className="Index">
    <Jumbotron className="text-center">
      <h2>Movies Listie</h2>
      <p>Just another movies list</p>
      <p><a className="btn btn-success" href="/documents" role="button">Goto the list</a></p>
    </Jumbotron>
  </div>
);

export default Index;
