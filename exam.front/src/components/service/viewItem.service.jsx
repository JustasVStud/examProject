import axios from 'axios';
import { authHeader } from '../auth/auth.service';

const BASE_URL = 'http://localhost:8080/api/viewItems'

export const getViewItems = async() => {
    try{
        const response = await axios.get(BASE_URL, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getViewItem= async(id) => {
    try{
        const response = await axios.get(`${BASE_URL}/${id}`, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createViewItem = async(title) => {
    try{
        const response = await axios.post(`${BASE_URL}`, {title}, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const editViewItem = async(id, title) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${id}`, {title}, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteViewItem = async(id) => {
    try{
        const response = await axios.delete(`${BASE_URL}/${id}`, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getViewSubItems = async(viewItemId) => {
    try{
        const response = await axios.get(`${BASE_URL}/${viewItemId}/viewSubItems`, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getViewSubItem = async(viewItemId, viewSubItemId) => {
    try{
        const response = await axios.get(`${BASE_URL}/${viewItemId}/viewSubItems/${viewSubItemId}`, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const createViewSubItem = async(viewItemId, title) => {
    try{
        const response = await axios.post(`${BASE_URL}/${viewItemId}/viewSubItems`, {title}, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const editViewSubItem = async (viewItemId, viewSubItemId, title ) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${viewItemId}/viewSubItems/${viewSubItemId}`,
        {title},
        {
            headers: authHeader()
        }
        )
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const deleteViewSubItem = async(viewItemId, viewSubItemId) =>{
    try {
        const response = await axios.delete(`${BASE_URL}/${viewItemId}/viewSubItems/${viewSubItemId}`,
        { headers: authHeader() }
        )
        return response.data;
    } catch (error) {
        throw error;
    }
}