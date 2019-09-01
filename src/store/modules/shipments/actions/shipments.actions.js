import { push } from 'connected-react-router';
import axios from 'axios';
import qs from 'qs';
import { isEmpty } from 'lodash';

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
} from '../types/shipments.types'

import { APIConstants } from '../../../../APIConstants';

const initialParams = {
    _limit: 20,
    _page: 1
};

const loadStart = () => ({ type: LOAD_START });
const loadFail = () => ({ type: LOAD_FAIL });
const loadSuccess = payload => ({
    type: LOAD_SUCCESS,
    payload
})

const loadShipmentDetailStart = () => ({ type: LOAD_SHIPMENT_START });
const loadShipmentDetailFail = () => ({ type: LOAD_SHIPMENT_FAIL });
const loadShipmentDetailSuccess = payload => ({
    type: LOAD_SHIPMENT_SUCCESS,
    payload
})

const updateStart = () => ({ type: UPDATE_START });
const updateFail = () => ({ type: UPDATE_FAIL });
const updateSuccess = (payload, id) => ({
    type: UPDATE_SUCCESS,
    payload,
    meta: { id }
})

export const fetchShipmentDetail = id => dispatch => {

    dispatch(loadShipmentDetailStart());
    axios.get(APIConstants.shipmentsDetail(id))
        .then(({data}) => {
            dispatch(loadShipmentDetailSuccess(data));
        })
        .catch(error => dispatch(loadShipmentDetailFail()))
}

export const fetchShipments = passedParams => dispatch => {
    const firstLoad = isEmpty(passedParams);
    const params  = firstLoad ? initialParams : passedParams;
    const stringifiedParams = qs.stringify(params);

    dispatch(loadStart());
    return axios.get(APIConstants.shipments(stringifiedParams))
        .then(({data}) => {
            dispatch(loadSuccess(data));
            if (!firstLoad) {
                dispatch(push({
                    search: stringifiedParams
                }))
            }
        })
        .catch(error => dispatch(loadFail()))
}

export const updateShipments = ( name, id ) => dispatch => {
    dispatch(updateStart());
    return axios.patch(APIConstants.shipmentsDetail(id), { name })
        .then(({data: {name}}) => dispatch(updateSuccess(name, id))
        )
        .catch(error => dispatch(updateFail()))
}