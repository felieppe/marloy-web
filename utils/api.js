const axios = require('axios');
require('dotenv').config();

const API_URL = process.env.API_URL || 'http://localhost:8000';

async function postLogin(email, password) {
    const endpoint = `${API_URL}/v1/auth/login/`;

    try {
        const response = await axios.post(endpoint, {
            correo: email,
            contraseña: password
        });

        return response.data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error.response ? error.response.data["error"] : error
    }
}

async function fetchProveedores(token, page = 1, pageSize = 10) {
    const endpoint = `${API_URL}/v1/proveedores?page=${page}&page_size=${pageSize}`;

    try {
        const response = await axios.get(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }  
        })

        return response;
    } catch (error) {
        console.error('Error fetching proveedores:', error);
        throw error.response ? error.response.data["error"] : error;
    }
}

export { postLogin, fetchProveedores };