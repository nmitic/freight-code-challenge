import { hot } from 'react-hot-loader/root';
import qs from 'qs';
import { useSelector, useDispatch } from "react-redux";
import { APIConstants } from './APIConstants';
import { fetchShipments, updateShipments } from './store/modules/shipments';

import React from 'react';

import './someCpm.scss';

const defaultParams = '_limit=20&_page=1';

const someCpm = () => {
  const params = useSelector(state => state.router.location.search);
  const parsedParams = params ? 
    qs.parse(params, { ignoreQueryPrefix: true }) : 
    qs.parse(defaultParams, { ignoreQueryPrefix: true });
  const dispatch = useDispatch();

  return (
    <div>
      <div>Sme cpm rendered from async!!!</div>
      <div>Bogic!</div>
      <div>{APIConstants.hostUrl}</div>
      <button onClick={() => dispatch(fetchShipments(parsedParams))}>fetchShipments</button>
      <button onClick={() => dispatch(fetchShipments({...parsedParams, _sort: 'name', order: 'acs'}))}>orderShipments</button>
      <button onClick={() => dispatch(updateShipments('Nikol je najjaci lik na svetu bre!', 'S1001'))}>updateShipments</button>
    </div>
  )
}

export default hot(someCpm);