import React from 'react';
import { Formik } from 'formik';
import { 
    TextField,
    MenuItem,
    Button
} from '@material-ui/core/';
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from 'lodash';
import qs from 'qs';

import { fetchShipments } from '../../../store/modules/shipments';
import { removeEmptyProps } from '../../../utils';

import './searchShipments.scss';

const SearchShipments = () => {
    const params = useSelector(state => state.router.location.search);
    const parsedParams = qs.parse(params, { ignoreQueryPrefix: true });
    const dispatch = useDispatch();

    const noUrlParams = isEmpty(parsedParams);
    const initialValues = noUrlParams ? 
        { status: '', _sort: '', _order: '', id: '', _limit: 20, _page: 1 } :
        { status: '', _sort: '', _order: '', id: '', _limit: 20, _page: 1, ...parsedParams };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
                const valuesNoEmpty = removeEmptyProps(values);
                dispatch(fetchShipments(valuesNoEmpty))
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
                    className="search-shipments-form"
                >
                <TextField
                    type="text"
                    name="id"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="search-shipments-form__field"
                    value={values.id}
                    label="ID"
                    helperText="Search by Shipment ID"
                />
                <TextField
                    type="number"
                    name="_limit"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="search-shipments-form__field"
                    value={values._limit}
                    label="Limit"
                />
                <TextField
                    type="number"
                    name="_page"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="search-shipments-form__field"
                    value={values._page}
                    label="Page"
                />
                <TextField
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="search-shipments-form__field"
                    label="Status"
                    select
                    inputProps={{
                        name: 'status',
                        id: 'status',
                    }}
                >
                    <MenuItem value={'ACTIVE'}>Active</MenuItem>
                    <MenuItem value={'COMPLETED'}>Completed</MenuItem>
                </TextField>
                <TextField
                    value={values._order}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="search-shipments-form__field"
                    label="Order"
                    select
                    inputProps={{
                        name: '_order',
                        id: '_order',
                    }}
                >
                    <MenuItem value={'asc'}>asc</MenuItem>
                    <MenuItem value={'desc'}>desc</MenuItem>
                </TextField>
                <TextField
                    value={values._sort}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="search-shipments-form__field"
                    label="Sort by"
                    select
                    inputProps={{
                        name: '_sort',
                        id: '_sort',
                    }}
                >
                    <MenuItem value={'name'}>name</MenuItem>
                    <MenuItem value={'id'}>id</MenuItem>
                </TextField>
                <Button 
                    type="submit"
                    disabled={isSubmitting}
                    variant="contained"
                    className="search-shipments-form__submit-button"
                >
                    Search
                </Button>
                </form>
            )}
            </Formik>
    )
}

export default SearchShipments;