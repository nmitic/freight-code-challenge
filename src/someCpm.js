import { hot } from 'react-hot-loader/root';
import { APIConstants } from './APIConstants';

import React from 'react';

import './someCpm.scss';

const someCpm = () => (<div>
  <div>Sme cpm rendered from async!!!</div>
  <div>Bogic!</div>
  <div>{APIConstants.hostUrl}</div>
</div>)

export default hot(someCpm);