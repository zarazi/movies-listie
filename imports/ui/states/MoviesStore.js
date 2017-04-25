import {Meteor} from 'meteor/meteor';
import {computed, observable, extendObservable, action, useStrict, toJS, map} from 'mobx';
import Mongo2Mobx from './Mongo2Mobx'

//window.toJS = toJS;

class MoviesStore {
    constructor() {
        // useStrict(true);
        this.mongo2mobx = new Mongo2Mobx(this);
    }

    @observable movies: [];
    @observable moviesLoading: false;

    @computed get total() {
        return this.movies && this.movies.length || 0;
    }

    @action updateMovies(newMovies) {
        this.movies = newMovies;
    }
    @action setMoviesLoading(boolean) {
        this.moviesLoading = boolean;
    }
}
// class MoviesStore {
//     constructor() {
//         //useStrict(true);

//         extendObservable(this, {
//             moviesLoading: false,
//             movies: [],
//             updateMovies: action((newMovies) => {
//                 this.movies = newMovies;
//             }),
//             setMoviesLoading: action((boolean) => {
//                 this.moviesLoading = boolean;
//             }),
//         });

//         this.mongo2mobx = new Mongo2Mobx(this);
//     }
// }
var store = window.store = new MoviesStore();
export default store;
