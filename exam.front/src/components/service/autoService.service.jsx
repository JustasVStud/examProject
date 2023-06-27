import axios from 'axios';
import { authHeader } from '../auth/auth.service';

const BASE_URL_SERVICE = 'http://localhost:8080/api/autoServices'
const BASE_URL_EMPLOYEE ='http://localhost:8080/api/employees';

export const getAutoServices = async() => {
    try{
        const response = await axios.get(BASE_URL_SERVICE, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getAutoService= async(id) => {
    try{
        const response = await axios.get(`${BASE_URL_SERVICE}/${id}`, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createAutoService = async(values) => {
    try{
        console.log(values);
        const response = await axios.post(`${BASE_URL_SERVICE}`, values, {
            headers: authHeader()
        });
        console.log(response)
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const editAutoService = async(id, values) => {
    try {
        const response = await axios.patch(`${BASE_URL_SERVICE}/${id}`, values, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteAutoService = async(id) => {
    try{
        const response = await axios.delete(`${BASE_URL_SERVICE}/${id}`, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getEmployees = async(autoServiceId) => {
    try{
        const response = await axios.get(`${BASE_URL_EMPLOYEE}/autoService/${autoServiceId}`, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getEmployee = async(employeeId) => {
    try{
        const response = await axios.get(`${BASE_URL_EMPLOYEE}/${employeeId}`, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const createEmployee = async(values) => {
    try{
        const response = await axios.post(`${BASE_URL_EMPLOYEE}`, values, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const editEmployee = async (employeeId, values ) => {
    try {
        const response = await axios.patch(`${BASE_URL_EMPLOYEE}/${employeeId}`,
        values,
        {
            headers: authHeader()
        }
        )
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const deleteEmployee = async( employeeId) =>{
    try {
        const response = await axios.delete(`${BASE_URL_EMPLOYEE}/${employeeId}`,
        { headers: authHeader() }
        )
        return response.data;
    } catch (error) {
        throw error;
    }
}