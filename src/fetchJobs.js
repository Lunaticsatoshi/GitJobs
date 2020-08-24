import { useReducer, useEffect } from 'react';
import { MAKE_REQUEST, GET_DATA, ERROR, UPDATE_HAS_NEXT_PAGE } from './actions';
import axios from 'axios';


const BASE_URL = "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json";

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
        case UPDATE_HAS_NEXT_PAGE:
            return {
                ...state,
                hasNextPage: action.payload.hasNextPage,
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

        const cancelToken1 = axios.CancelToken.source();
        axios.get(BASE_URL, {
            cancelToken: cancelToken1.token,
            params: {
                markdown: true,
                page: page + 1,
                ...params
            }
        })
        .then(res => {
            dispatch({type: UPDATE_HAS_NEXT_PAGE, payload: { hasNextPage: res.data.length !== 0 } })
        })
        .catch(err => {
            if (axios.isCancel(err)) return
            dispatch({type: ERROR, payload: { error: err }})
        })

        return () => {
            cancelToken.cancel();
            cancelToken1.cancel();
        }
    }, [params, page]);

    return state
}