import React from 'react';
import { Typography } from '@material-ui/core';
import { useDispatch } from "react-redux";
import { Formik } from 'formik';
import { 
    TextField,
    Button
} from '@material-ui/core/';

import { updateShipments } from '../../../store/modules/shipments';

const ShipmentInfo = ({data}) => {
    const dispatch = useDispatch();

    const {
        id,
        name,
        mode,
        type,
        destination,
        origin,
        total,
        status,
        userId
    } = data
    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={{ name: name ? name : '' }}
                onSubmit={(values, { setSubmitting }) => {
                    dispatch(updateShipments(values.name, id))
                        .then(() => setSubmitting(false));
                }}
            >
            {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
            }) => (
                <form 
                    onSubmit={handleSubmit} 
                >
                <TextField
                    type="text"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    fullWidth
                >
                    <Typography variant="h4">Name: {values.name}</Typography>
                </TextField>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="contained"
                    className="search-shipments-form__submit-button"
                >
                    {
                        !isSubmitting ? 'Update Name' : 'Updating...'
                    }
                </Button>
                </form>
            )}
            </Formik>
            <Typography variant="h5">id: {id}</Typography>
            <Typography variant="h6">Mode: {mode}</Typography>
            <Typography variant="h6">Type: {type}</Typography>
            <Typography variant="h6">Destination: {destination}</Typography>
            <Typography variant="h6">Origin: {origin}</Typography>
            <Typography variant="h6">Total: {total}</Typography>
            <Typography variant="h6">Status: {status}</Typography>
            <Typography variant="h6">User ID: {userId}</Typography>
        </div>
    )
}

export default ShipmentInfo;