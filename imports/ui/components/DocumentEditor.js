/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import documentEditor from '../../modules/document-editor.js';

export default class DocumentEditor extends React.Component {
  componentDidMount() {
    documentEditor({ component: this });
    setTimeout(() => { document.querySelector('[name="title"]').focus(); }, 0);
  }

  render() {
    const { doc } = this.props;
    return (<form
      ref={ form => (this.documentEditorForm = form) }
      onSubmit={ event => event.preventDefault() }
    >
      <FormGroup>
        <ControlLabel>Title</ControlLabel>
        <FormControl
          type="text"
          name="title"
          defaultValue={ doc && doc.title }
          placeholder="Title"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Released year</ControlLabel>
        <FormControl
          type="number"
          min="1800"
          max="2100"
          name="released"
          defaultValue={ doc && doc.released }
          placeholder="ex. 2012"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Rating</ControlLabel>
        <FormControl componentClass="select" placeholder="select" name="rating"
          defaultValue={ doc && doc.rating }>
          <option value="">select one ..</option>
          <option value="G">G</option>
          <option value="PG">PG</option>
          <option value="M">M</option>
          <option value="MA">MA</option>
          <option value="R">R</option>
        </FormControl>
      </FormGroup>
      <Button type="submit" bsStyle="success">
        { doc && doc._id ? 'Save Changes' : 'Add Document' }
      </Button>
    </form>);
  }
}

DocumentEditor.propTypes = {
  doc: PropTypes.object,
};
