import axios from 'axios';
import { authHeader } from '../auth/auth.service';

const BASE_URL = 'http://localhost:8080/api/postItems'

export const getPostItems = async() => {
    try{
        const response = await axios.get(BASE_URL, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getPostItem= async(id) => {
    try{
        const response = await axios.get(`${BASE_URL}/${id}`, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createPostItem = async(title) => {
    try{
        const response = await axios.post(`${BASE_URL}`, {title}, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const editPostItem = async(id, title) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${id}`, {title}, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deletePostItem = async(id) => {
    try{
        const response = await axios.delete(`${BASE_URL}/${id}`, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getPostSubItems = async(postItemId) => {
    try{
        const response = await axios.get(`${BASE_URL}/${postItemId}/postSubItems`, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getPostSubItem = async(postItemId, postSubItemId) => {
    try{
        const response = await axios.get(`${BASE_URL}/${postItemId}/postSubItems/${postSubItemId}`, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const createPostSubItem = async(postItemId, title) => {
    try{
        const response = await axios.post(`${BASE_URL}/${postItemId}/postSubItems`, {title}, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const editPostSubItem = async (postItemId, postSubItemId, title ) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${postItemId}/postSubItems/${postSubItemId}`,
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
export const deletePostSubItem = async(postItemId, postSubItemId) =>{
    try {
        const response = await axios.delete(`${BASE_URL}/${postItemId}/postSubItems/${postSubItemId}`,
        { headers: authHeader() }
        )
        return response.data;
    } catch (error) {
        throw error;
    }
}