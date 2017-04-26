import SimpleSchema from 'simpl-schema'
import { ValidatedMethod } from 'meteor/mdg:validated-method'

export const echo = new ValidatedMethod({
  name: 'echo',
  mixins: [RestMethodMixin],

  validate: new SimpleSchema({
    message: { type: String },
  }).validator(),

  restOptions: {
    url: '/api/echo',

    //// NOTE: this option shows how JSON-route parse raw data and forward to method
    //// NOTE: could be usefull for pre-processing data 
    // getArgsFromRequest: function (request) {
    //   var { message } = request.body;
    //   return [{ message }]; // pass back arguments in array
    // },

    // NOTE: default is 'post', so could be omitted
    httpMethod: 'post'
  },

  run({ message }) {
    return { message }
  }
})