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

async function fetchProveedores(token) {
    const endpoint = `${API_URL}/v1/proveedores/`;

    try {
        const response = await axios.get(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }  
        })

        return response.data;
    } catch (error) {
        console.error('Error fetching proveedores:', error);
        throw error.response ? error.response.data["error"] : error;
    }
}

export { postLogin, fetchProveedores };