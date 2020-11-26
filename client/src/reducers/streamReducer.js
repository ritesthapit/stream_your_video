import { CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM } from '../actions/types';
import _ from 'lodash';


export default (state = {}, action) => {
    switch(action.type) {
        case FETCH_STREAMS:
            return {...state, ..._.mapKeys(action.payload, 'id')} //changes the array into objects with id as a key
        case FETCH_STREAM:
            return {...state, [action.payload.id]: action.payload }; //key interpolation //single record return
        case CREATE_STREAM:
            return {...state, [action.payload.id]: action.payload }; //single record return
        case EDIT_STREAM:
            return {...state, [action.payload.id]: action.payload }; //single record return
        case DELETE_STREAM:
            return _.omit(state, action.payload); //payload is id so no id is required to be stated
            //omit creates a new object instead of updating the old one and contains the object without the id in action.payload       
        default:
            return state;
    }
}