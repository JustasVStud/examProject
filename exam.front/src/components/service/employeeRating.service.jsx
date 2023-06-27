import axios from 'axios';
import { authHeader } from '../auth/auth.service';

const BASE_URL = 'http://localhost:8080/api/employeeRatings'

export const getEmployeeRatings = async() => {
    try{
        const response = await axios.get(BASE_URL, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getEmployeeRating= async(id) => {
    try{
        const response = await axios.get(`${BASE_URL}/${id}`, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createEmployeeRating = async(title) => {
    try{
        const response = await axios.post(`${BASE_URL}`, {title}, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const editEmployeeRating = async(id, title) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${id}`, {title}, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteEmployeeRating = async(id) => {
    try{
        const response = await axios.delete(`${BASE_URL}/${id}`, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
