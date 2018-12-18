import axios from 'axios';
import {GET_ITEMS, ADD_ITEM, DELETE_ITEM, EDIT_ITEM, ITEMS_LOADING} from './types';

axios.interceptors.request.use(request => {
    console.log('Starting Request', request)
    return request
  })
  
  axios.interceptors.response.use(response => {
    console.log('Response:', response)
    return response
  })

export const getItems = () => dispatch => {
    dispatch(setItemsLoading());

    axios
        .get('/api/items').then(res => 
            dispatch({
                type: GET_ITEMS,
                payload : res.data
            }))
}

export const addItem = item => dispatch => {
    axios
        .post('/api/items', item)
        .then(res => 
            dispatch({
            type: ADD_ITEM,
            payload: res.data
        }))
}

export const deleteItem = (id) => dispatch => {
    axios
        .delete(`/api/items/${id}`)
        .then( res => 
            dispatch({
            type: DELETE_ITEM,
            payload: id
        }))
}

export const editItem = (id,name) => dispatch => {
    console.log("Edit Item", id, name);

    const newItem = {
        name
    };
    console.log("newItem", newItem);
    axios
        .post(`/api/items/${id}`, newItem)
        .then( res => dispatch({
            type: EDIT_ITEM,
            payload: {id, newItem}
        }))
        .then( r => dispatch(
            setItemsLoading()
        )
        ).catch( err => {
            console.log(err);
        });
        //dispatch(setItemsLoading());
}

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}