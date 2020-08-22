import { useReducer, useEffect } from 'react';
import { MAKE_REQUEST, GET_DATA, ERROR } from './actions';
import axios from 'axios';


const BASE_URL = "/positions.json";

function reducer(state, action) {
    switch(action.type){
        case MAKE_REQUEST:
            return {loading: true, jobs: []}
        case GET_DATA:
            return {
                ...state,
                loading: false,
                jobs: action.payload.jobs
            }
        case ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload.error,
                jobs: []
            }
        default:
            return state
    }
}

export default function useFetchJobs(params, page) {
    const [state, dispatch] = useReducer(reducer, {jobs: [], loading: true});

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        dispatch({type: MAKE_REQUEST});
        axios.get(BASE_URL, {
            cancelToken: cancelToken.token,
            params: {
                markdown: true,
                page: page,
                ...params
            }
        })
        .then(res => {
            dispatch({type: GET_DATA, payload: { jobs: res.data } })
        })
        .catch(err => {
            if (axios.isCancel(err)) return
            dispatch({type: ERROR, payload: { error: err }})
        })
        return () => {
            cancelToken.cancel();
        }
    }, [params, page]);

    return state
}