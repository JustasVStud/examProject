import axios from 'axios';
import { authHeader } from '../auth/auth.service';

const BASE_URL = 'http://localhost:8080/api/employeeRatings'

export const getEmployeeRating = async(employeeId) => {
    console.log(employeeId)
    try{
        const response = await axios.get(`${BASE_URL}/${employeeId.id}`, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createEmployeeRating = async(values) => {
    try{
        const response = await axios.post(`${BASE_URL}`, {values}, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

