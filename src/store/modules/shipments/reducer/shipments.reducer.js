import {
    LOAD_START,
    LOAD_SUCCESS,
    LOAD_FAIL,
    UPDATE_START,
    UPDATE_SUCCESS,
    UPDATE_FAIL,
    LOAD_SHIPMENT_START,
    LOAD_SHIPMENT_SUCCESS,
    LOAD_SHIPMENT_FAIL,
    REQUEST_TYPES
} from '../types/shipments.types'

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

const loadShipmentSuccessRequest = (state, action) => (
    {
        ...state,
        [REQUEST_TYPES.LOAD]: {
            ...state[REQUEST_TYPES.LOAD],
            isFetching: false
        },
        CURRENT_SHIPMENT: action.payload
    }
)

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
    CURRENT_SHIPMENT: {},
    [REQUEST_TYPES.LOAD_SHIPMENT]: {
        isFetching: false,
        isError: false
    },
    [REQUEST_TYPES.LOAD]: {
        isFetching: false,
        isError: false,
        totalPageCount: 0,
        currentPage: 1
    },
    [REQUEST_TYPES.UPDATE]: {
        isFetching: false,
        isError: false
    }
}

export const shipmentsReducer = (state = initialState, action) => {
    switch (action.type) {
        // Load Shipments
        case LOAD_START:
            return startRequest(state, REQUEST_TYPES.LOAD);
        case LOAD_FAIL:
            return failReguest(state, REQUEST_TYPES.LOAD);
        case LOAD_SUCCESS:
            return loadSuccessRequest(state, action);

        // Load Shipments
        case LOAD_SHIPMENT_START:
            return startRequest(state, REQUEST_TYPES.LOAD_SHIPMENT);
        case LOAD_SHIPMENT_FAIL:
            return failReguest(state, REQUEST_TYPES.LOAD_SHIPMENT);
        case LOAD_SHIPMENT_SUCCESS:
            return loadShipmentSuccessRequest(state, action);

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