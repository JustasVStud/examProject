import axios from 'axios';
import { authHeader } from '../auth/auth.service';

const BASE_URL = 'http://localhost:8080/api/autoServices'

export const getAutoServices = async() => {
    try{
        const response = await axios.get(BASE_URL, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getAutoService= async(id) => {
    try{
        const response = await axios.get(`${BASE_URL}/${id}`, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createAutoService = async(values) => {
    try{
        const response = await axios.post(`${BASE_URL}`, values, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const editAutoService = async(id, values) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${id}`, values, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteAutoService = async(id) => {
    try{
        const response = await axios.delete(`${BASE_URL}/${id}`, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getEmployees = async(autoServiceId) => {
    try{
        const response = await axios.get(`${BASE_URL}/${autoServiceId}/employees`, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getEmployee = async(autoServiceId, employeeId) => {
    try{
        const response = await axios.get(`${BASE_URL}/${autoServiceId}/employees/${employeeId}`, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const createEmployee = async(autoServiceId, values) => {
    try{
        const response = await axios.post(`${BASE_URL}/${autoServiceId}/employees`, values, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const editEmployee = async (autoServiceId, employeeId, values ) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${autoServiceId}/employees/${employeeId}`,
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
export const deleteEmployee = async(autoServiceId, employeeId) =>{
    try {
        const response = await axios.delete(`${BASE_URL}/${autoServiceId}/employees/${employeeId}`,
        { headers: authHeader() }
        )
        return response.data;
    } catch (error) {
        throw error;
    }
}