import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { hot } from 'react-hot-loader/root';
import qs from 'qs';
import { Typography } from '@material-ui/core';

import SearchShipments from './SearchShipments';
import ListShipments from './ListShipments';

import { fetchShipments } from '../../store/modules/shipments';

const Shipments = () => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.shipments.ITEMS);
    const params = useSelector(state => state.router.location.search);

    useEffect(() => {
        const parsedParams = qs.parse(params, { ignoreQueryPrefix: true });
        
        dispatch(fetchShipments(parsedParams));
    }, []);
    return (
        <div>
            <SearchShipments />
            {
                data.length 
                        ? 
                    <ListShipments data={data} /> 
                        :
                    <Typography variant="h5">No results for selected search criterias</Typography>
            }
            
        </div>
    )
}

export default hot(Shipments);