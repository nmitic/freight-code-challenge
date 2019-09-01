import React from 'react';
import { push } from 'connected-react-router';
import { useDispatch } from "react-redux";
import { 
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper
 } from '@material-ui/core';

 import './listShipments.scss';

const createData = (name, id, userId, destination, mode, origin, status, total, type) => {
    return { name, id, userId, destination, mode, origin, status, total, type };
}

const ListShipments = ({data}) => {
    const dispatch = useDispatch();
    const rows = data.map(item => {
        const { name, id, userId, destination, mode, origin, status, total, type} = item;
        return createData(name, id, userId, destination, mode, origin, status, total, type);
    })
    return (
        <Paper>
            <Table>
            <TableHead>
                <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">ID</TableCell>
                <TableCell align="right">User ID</TableCell>
                <TableCell align="right">Destination</TableCell>
                <TableCell align="right">Mode</TableCell>
                <TableCell align="right">Origin</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Type</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map(row => (
                <TableRow 
                    key={row.id} 
                    onClick={() => dispatch(push(`/shipments-detail/${row.id}`))}
                    className="list-shipments__row"
                >
                    <TableCell component="th" scope="row">
                    {row.name}
                    </TableCell>
                    <TableCell align="right">{row.id}</TableCell>
                    <TableCell align="right">{row.userId}</TableCell>
                    <TableCell align="right">{row.destination}</TableCell>
                    <TableCell align="right">{row.mode}</TableCell>
                    <TableCell align="right">{row.origin}</TableCell>
                    <TableCell align="right">{row.status}</TableCell>
                    <TableCell align="right">{row.total}</TableCell>
                    <TableCell align="right">{row.type}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </Paper>
    )
}

export default ListShipments;