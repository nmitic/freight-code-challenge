import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { useSelector, useDispatch } from "react-redux";

import { fetchShipmentDetail } from '../../store/modules/shipments';

import ShipmentInfo from './ShipmentInfo';

const ShipmentsDetail = () => {
    const location = useSelector(state => state.router.location.pathname);
    const data = useSelector(state => state.shipments.CURRENT_SHIPMENT);
    const dispatch = useDispatch();

    const currentId = location.split('/').reverse()[0];

    useEffect(() => {
        dispatch(fetchShipmentDetail(currentId));
    }, []);

    return (
        <ShipmentInfo data={data} />
    )
}

export default hot(ShipmentsDetail);