import streams from '../apis/streams';
import history from '../history';
import { 
    SIGN_IN, 
    SIGN_OUT, 
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM } from './types';

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};
//action creator to create stream with data from the form
export const createStream = (formValues) => {
    return async (dispatch, getState) => {
        const { userId } = getState().auth; //get the user id 
        const response = await streams.post('/streams', {...formValues, userId }); //post all the formValues with userId
        dispatch({type:CREATE_STREAM, payload: response.data});
        //Programmatic navigate the user back to the root route
        history.push('/');
    }
}

//action creator to fetch all the list
export const fetchStreams = () => {
    return async (dispatch) => {
        const response = await streams.get('/streams');
        dispatch({ type: FETCH_STREAMS, payload: response.data});
    }
};

//action creator to fetch a single stream
export const fetchStream = (id) => {
    return async (dispatch) => {
        const response = await streams.get(`/streams/${id}`);
        dispatch({ type: FETCH_STREAM, payload: response.data});
    }
};

//action creator to edit the stream
export const editStream = (id, formValues) => {
    return async (dispatch) => {
        const response = await streams.patch(`/streams/${id}`, formValues); //communicate the update in the body of the update
        dispatch({ type: EDIT_STREAM, payload: response.data});
        history.push('/');
    }
};

//action creator to delete the stream
export const deleteStream = (id) => {
    return async (dispatch) => {
        await streams.delete(`/streams/${id}`);
        dispatch({ type: DELETE_STREAM, payload: id});
        history.push('/');
    }
};