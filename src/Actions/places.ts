import { database } from '../firebase'
import { FootballGamePlace } from '../Interfaces'

export const SET_PLACES = 'SET PLACES';

export function setPlaces(places: FootballGamePlace) {
  return {
    type: SET_PLACES,
    places
  };
}

export const loadPlaces = () => (dispath: any) =>
database
    .ref('places')
    .once('value')
    .then((snapshot) => {
      const places: Array<FootballGamePlace> = [];
      snapshot.forEach((snapshotChild) => {
        places.push({
          id: snapshotChild.key,
          ...snapshotChild.val()
        });
      });
      dispath(setPlaces(places));
    });
