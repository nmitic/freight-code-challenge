import { APIConstants } from '../../APIConstants';
import axios from 'axios';
// Constants
const LOAD_START = 'freight/shipments/LOAD_START';
const LOAD_SUCCESS = 'freight/shipments/LOAD_SUCCESS';
const LOAD_FAIL = 'freight/shipments/LOAD_FAIL';

const UPDATE_START = 'freight/shipments/UPDATE_START';
const UPDATE_SUCCESS = 'freight/shipments/UPDATE_SUCCESS';
const UPDATE_FAIL = 'freight/shipments/UPDATE_FAIL';

const SORT = 'freight/shipments/SORT';
const SEARCH = 'freight/shipments/SEARCH';

const REQUEST_TYPES = {
    LOAD: 'LOAD',
    UPDATE: 'UPDATE',
}

// Case reducers
const startRequest = ( state, requestType ) => (
    {
        ...state,
        [requestType]: {
            ...state[requestType],
            isFetching: true
        }
    }
);

const failReguest = ( state, requestType ) => (
    {
        ...state,
        [requestType]: {
            isFetching: false,
            isError: true
        }
    }
);

const loadSuccessRequest = ( state, action ) => (
    {
        ...state,
        [REQUEST_TYPES.LOAD]: {
            ...state[REQUEST_TYPES.LOAD],
            isFetching: false
        },
        ITEMS: action.payload
    }
);

const updateSuccessRequest = ( state, action ) => {
    const { ITEMS } = state;
    const { payload: name } = action;
    const { id } = action.meta;

    const updatedItems = ITEMS
        .map(item => {
            if (item.id === id) {
                item.name = name;
            }
            return item;
        })

    return {
        ...state,
        [REQUEST_TYPES.UPDATE]: {
            ...state[REQUEST_TYPES.UPDATE],
            isFetching: false
        },
        ITEMS: updatedItems
    }
}


// EXPORTED => Reducer
const initialState = {
    ITEMS: [],
    [REQUEST_TYPES.LOAD]: {
        isFetching: false,
        isError: false
    },
    [REQUEST_TYPES.UPDATE]: {
        isFetching: false,
        isError: false
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        // Load Shipments
        case LOAD_START:
            return startRequest(state, REQUEST_TYPES.LOAD);
        case LOAD_FAIL:
            return failReguest(state, REQUEST_TYPES.LOAD);
        case LOAD_SUCCESS:
            return loadSuccessRequest(state, action);

        // Update Shipments
        case UPDATE_START:
            return startRequest(state, REQUEST_TYPES.UPDATE);
        case UPDATE_FAIL:
            return failReguest(state, REQUEST_TYPES.UPDATE);
        case UPDATE_SUCCESS:
            return updateSuccessRequest(state, action);
        default:
            return state;
    }
}

// Action Creators
const loadStart = () => ({ type: LOAD_START });
const loadFail = () => ({ type: LOAD_FAIL });
const loadSuccess = payload => ({
    type: LOAD_SUCCESS,
    payload
})

const updateStart = () => ({ type: UPDATE_START });
const updateFail = () => ({ type: UPDATE_FAIL });
const updateSuccess = (payload, id) => ({
    type: UPDATE_SUCCESS,
    payload,
    meta: { id }
})

export const fetchShipments = () => dispatch => {
    dispatch(loadStart());
    axios.get(APIConstants.shipments)
        .then(({data}) => dispatch(loadSuccess(data)))
        .catch(error => dispatch(loadFail()))
}

export const updateShipments = ( name, id ) => dispatch => {
    dispatch(updateStart());
    axios.patch(APIConstants.updateShipments(id), { name })
        .then(({data: {name}}) => dispatch(updateSuccess(name, id))
        )
        .catch(error => dispatch(updateFail()))
}