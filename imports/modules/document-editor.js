/* eslint-disable no-undef */

import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { upsertDocument } from '../api/documents/methods.js';
import './validation.js';

let component;

const handleUpsert = () => {
  const { doc } = component.props;
  const confirmation = doc && doc._id ? 'Document updated!' : 'Document added!';
  const upsert = {
    title: document.querySelector('[name="title"]').value.trim(),
    released: parseInt(document.querySelector('[name="released"]').value.trim(), 10),
    rating: document.querySelector('[name="rating"]').value.trim(),
  };

  if (doc && doc._id) upsert._id = doc._id;

  upsertDocument.call(upsert, (error, response) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      component.documentEditorForm.reset();
      Bert.alert(confirmation, 'success');
      browserHistory.push(`/documents/${response.insertedId || doc._id}`);
    }
  });
};

const validate = () => {
  $(component.documentEditorForm).validate({
    rules: {
      title: {
        required: true,
      },
      released: {
        required: true,
        range:[1800,2100],
      },
      rating: {
        required: true,
      },
    },
    messages: {
      title: {
        required: 'Movie title, please.',
      },
      released: {
        required: 'Released year, please.',
      },
      rating: {
        required: 'Rating, please.',
      },
    },
    submitHandler() { handleUpsert(); },
  });
};

export default function documentEditor(options) {
  component = options.component;
  validate();
}
