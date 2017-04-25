import {Meteor} from 'meteor/meteor';
import {autorun, toJS} from 'mobx';
import Movies from '../../api/documents/documents'


export default class Mongo2Mobx {
    constructor(store) {
        this.moviesSubscription = null;
        this.moviesObserver = null;

        let moviesDataSync = autorun(() => {
          let refreshMovies = (store) => {
                let latestMovies = Movies.find().fetch();
                store.updateMovies(latestMovies);
            };

            if (this.moviesSubscription) {
                this.moviesSubscription.stop();
            }
            if (this.moviesObserver) {
                this.moviesObserver.stop();
            }

            store.setMoviesLoading (true);
            this.moviesSubscription = Meteor.subscribe("documents.list", {
                onReady: () => {
                    this.moviesObserver = Movies.find().observe({
                        added: () => {
                            refreshMovies(store);
                        },
                        changed: () => {
                            refreshMovies(store);
                        },
                        removed: () => {
                            refreshMovies(store);
                        }
                    });
                    store.setMoviesLoading(false);
                }
            });
        })

    }
}

