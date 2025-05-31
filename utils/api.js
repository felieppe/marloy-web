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

async function postProveedor(token, data) {
    const endpoint = `${API_URL}/v1/proveedores/`;

    try {
        const response = await axios.post(endpoint, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error creating proveedor:', error);
        throw error.response ? error.response.data["error"] : error;
    }
}

async function putProveedor(token, id, data) {
    const endpoint = `${API_URL}/v1/proveedores/${id}/`;

    try {
        const response = await axios.put(endpoint, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error updating proveedor:', error);
        throw error.response ? error.response.data["error"] : error;
    }
}

async function deleteProveedor(token, id) {
    const endpoint = `${API_URL}/v1/proveedores/${id}/`;

    try {
        const response = await axios.delete(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error deleting proveedor:', error);
        throw error.response ? error.response.data["error"] : error;
    }
}

async function fetchInsumos(token, page = 1, pageSize = 10) {
    const endpoint = `${API_URL}/v1/insumos?page=${page}&page_size=${pageSize}`;

    try {
        const response = await axios.get(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    } catch (error) {
        console.error('Error fetching insumos:', error);
        throw error.response ? error.response.data["error"] : error;
    }
}

async function postInsumo(token, data) {
    const endpoint = `${API_URL}/v1/insumos/`;

    try {
        const response = await axios.post(endpoint, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error creating insumo:', error);
        throw error.response ? error.response.data["error"] : error;
    }
}

async function putInsumo(token, id, data) {
    const endpoint = `${API_URL}/v1/insumos/${id}/`;

    try {
        const response = await axios.put(endpoint, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error updating insumo:', error);
        throw error.response ? error.response.data["error"] : error;
    }
}

async function deleteInsumo(token, id) {
    const endpoint = `${API_URL}/v1/insumos/${id}/`;

    try {
        const response = await axios.delete(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error deleting insumo:', error);
        throw error.response ? error.response.data["error"] : error;
    }
}

async function fetchClientes(token, page = 1, pageSize = 10) {
    const endpoint = `${API_URL}/v1/clientes?page=${page}&page_size=${pageSize}`;

    try {
        const response = await axios.get(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    } catch (error) {
        console.error('Error fetching clientes:', error);
        throw error.response ? error.response.data["error"] : error;
    }
}

async function postCliente(token, data) {
    const endpoint = `${API_URL}/v1/clientes/`;

    try {
        const response = await axios.post(endpoint, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error creating cliente:', error);
        throw error.response ? error.response.data["error"] : error;
    }
}

async function putCliente(token, id, data) {
    const endpoint = `${API_URL}/v1/clientes/${id}/`;

    try {
        const response = await axios.put(endpoint, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error updating cliente:', error);
        throw error.response ? error.response.data["error"] : error;
    }
}

async function deleteCliente(token, id) {
    const endpoint = `${API_URL}/v1/clientes/${id}/`;

    try {
        const response = await axios.delete(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error deleting cliente:', error);
        throw error.response ? error.response.data["error"] : error;
    }
}

export {
    postLogin,
    fetchProveedores, postProveedor, putProveedor, deleteProveedor,
    fetchInsumos, postInsumo, putInsumo, deleteInsumo,
    fetchClientes, postCliente, putCliente, deleteCliente
};