import { hot } from 'react-hot-loader/root';
import { APIConstants } from './APIConstants';
import { useSelector, useDispatch } from "react-redux";
import { fetchShipments, updateShipments } from './store/modules/shipments';

import React from 'react';

import './someCpm.scss';

const someCpm = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <div>Sme cpm rendered from async!!!</div>
      <div>Bogic!</div>
      <div>{APIConstants.hostUrl}</div>
      <button onClick={() => dispatch(fetchShipments())}>fetchShipments</button>
      <button onClick={() => dispatch(updateShipments('Nikol je najjaci lik na svetu bre!', 'S1001'))}>updateShipments</button>
    </div>
  )
}

export default hot(someCpm);