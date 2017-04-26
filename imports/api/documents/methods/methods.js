import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Documents from '../documents';
import rateLimit from '../../../modules/rate-limit.js';

export const upsertDocument = new ValidatedMethod({
  name: 'documents.upsert',
  mixins: [RestMethodMixin],

  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    title: { type: String, optional: true },
    released: { type: SimpleSchema.Integer, optional: true },
    rating: { type: String, optional: true },
  }).validator(),

  restOptions: {
    url: '/api/movie/upsert',

    //// NOTE: this option shows how JSON-route parse raw data and forward to method
    //// NOTE: could be usefull for pre-processing data 
    // getArgsFromRequest: function (request) {
    //   var { message } = request.body;
    //   return [{ message }]; // pass back arguments in array
    // },

    // NOTE: default is 'post', so could be omitted
    httpMethod: 'post'
  },

  run(document) {
    document = Object.assign({
      title: 'NEW-MOVIE',
      released: 2000,
      rating: 'G'
    }, document);
    return Documents.upsert({ _id: document._id }, { $set: document });
  },
});

export const removeDocument = new ValidatedMethod({
  name: 'documents.remove',
  mixins: [RestMethodMixin],

  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),

  restOptions: {
    url: '/api/movie/remove',

    //// NOTE: this option shows how JSON-route parse raw data and forward to method
    //// NOTE: could be usefull for pre-processing data 
    // getArgsFromRequest: function (request) {
    //   var { message } = request.body;
    //   return [{ message }]; // pass back arguments in array
    // },

    // NOTE: default is 'post', so could be omitted
    httpMethod: 'post'
  },

  run({ _id }) {
    return Documents.remove(_id);
  },
});

rateLimit({
  methods: [
    upsertDocument,
    removeDocument,
  ],
  limit: 5,
  timeRange: 1000,
});
