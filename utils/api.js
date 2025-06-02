const axios = require('axios');
const cookies = require('js-cookie');
require('dotenv').config();

const API_URL = process.env.API_URL || 'http://localhost:8000';

axios.interceptors.response.use((response) => response, async (error) => {
    if (error.response && error.response.status === 401) {
        console.error('Unauthorized access - possibly invalid token');
        
        localStorage.removeItem('user')
        localStorage.removeItem('token');
        cookies.remove('token');
    } else if (error.response && error.response.status === 404) {
        console.error('Resource not found:', error.response.data);
    } else if (error.response && error.response.status >= 500) {
        console.error('Server error:', error.response.data);
    } else {
        console.error('An unexpected error occurred:', error.message);
    }
    return Promise.reject(error);
})

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

async function fetchMaquinas(token, page = 1, pageSize = 10) {
    const endpoint = `${API_URL}/v1/maquinas?page=${page}&page_size=${pageSize}`;

    try {
        const response = await axios.get(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    } catch (error) {
        console.error('Error fetching maquinas:', error);
        throw error.response ? error.response.data["error"] : error;
    }
}

async function postMaquina(token, data) {
    const endpoint = `${API_URL}/v1/maquinas/`;

    try {
        const response = await axios.post(endpoint, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error creating maquina:', error);
        throw error.response ? error.response.data["error"] : error;
    }
}

async function putMaquina(token, id, data) {
    const endpoint = `${API_URL}/v1/maquinas/${id}/`;

    try {
        const response = await axios.put(endpoint, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error updating maquina:', error);
        throw error.response ? error.response.data["error"] : error;
    }
}

async function deleteMaquina(token, id) {
    const endpoint = `${API_URL}/v1/maquinas/${id}/`;

    try {
        const response = await axios.delete(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error deleting maquina:', error);
        throw error.response ? error.response.data["error"] : error;
    }
}

async function fetchTecnicos(token, page = 1, pageSize = 10) {
    const endpoint = `${API_URL}/v1/tecnicos?page=${page}&page_size=${pageSize}`;

    try {
        const response = await axios.get(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    } catch (error) {
        console.error('Error fetching tecnicos:', error);
        throw error.response ? error.response.data["error"] : error;
    }
}

async function postTecnico(token, data) {
    const endpoint = `${API_URL}/v1/tecnicos/`;

    try {
        const response = await axios.post(endpoint, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error creating tecnico:', error);
        throw error.response ? error.response.data["error"] : error;
    }
}

async function putTecnico(token, ci, data) {
    const endpoint = `${API_URL}/v1/tecnicos/${ci}/`;

    try {
        const response = await axios.put(endpoint, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error updating tecnico:', error);
        throw error.response ? error.response.data["error"] : error;
    }
}

async function deleteTecnico(token, ci) {
    const endpoint = `${API_URL}/v1/tecnicos/${ci}/`;

    try {
        const response = await axios.delete(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error deleting tecnico:', error);
        throw error.response ? error.response.data["error"] : error;
    }
}

async function fetchMantenimientos(token, page = 1, pageSize = 10) {
    const endpoint = `${API_URL}/v1/mantenimientos?page=${page}&page_size=${pageSize}`;

    try {
        const response = await axios.get(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    } catch (error) {
        console.error('Error fetching mantenimientos:', error);
        throw error.response ? error.response.data["error"] : error;
    }
}

async function postMantenimiento(token, data) {
    const endpoint = `${API_URL}/v1/mantenimientos/`;

    try {
        const response = await axios.post(endpoint, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error creating mantenimiento:', error);
        throw error.response ? error.response.data["error"] : error;
    }
}

async function putMantenimiento(token, id, data) {
    const endpoint = `${API_URL}/v1/mantenimientos/${id}/`;

    try {
        const response = await axios.put(endpoint, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error updating mantenimiento:', error);
        throw error.response ? error.response.data["error"] : error;
    }
}

async function deleteMantenimiento(token, id) {
    const endpoint = `${API_URL}/v1/mantenimientos/${id}/`;

    try {
        const response = await axios.delete(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error deleting mantenimiento:', error);
        throw error.response ? error.response.data["error"] : error;
    }
}

async function fetchRegistroConsumos(token, page = 1, pageSize = 10) {
    const endpoint = `${API_URL}/v1/registro-consumos?page=${page}&page_size=${pageSize}`;

    try {
        const response = await axios.get(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    } catch (error) {
        console.error('Error fetching registro de consumos:', error);
        throw error.response ? error.response.data["error"] : error;
    }
}

async function fetchUsuarios(token, page = 1, pageSize = 10) {
    const endpoint = `${API_URL}/v1/users?page=${page}&page_size=${pageSize}`;

    try {
        const response = await axios.get(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    } catch (error) {
        console.error('Error fetching usuarios:', error);
        throw error.response ? error.response.data["error"] : error;
    }
}

async function postUsuario(token, data) {
    const endpoint = `${API_URL}/v1/users/`;

    try {
        const response = await axios.post(endpoint, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error creating usuario:', error);
        throw error.response ? error.response.data["error"] : error;
    }
}

async function putUsuario(token, id, data) {
    const endpoint = `${API_URL}/v1/users/${id}/`;

    try {
        const response = await axios.put(endpoint, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error updating usuario:', error);
        throw error.response ? error.response.data["error"] : error;
    }
}

async function deleteUsuario(token, id) {
    const endpoint = `${API_URL}/v1/users/${id}/`;

    try {
        const response = await axios.delete(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error deleting usuario:', error);
        throw error.response ? error.response.data["error"] : error;
    }
}

async function fetchFacturacionMensual(token, page = 1, pageSize = 10, month = 5, year = 2025) {
    try {
        const res = await fetchClientes(token);
        let clientes = res.data.data;

        const billingPromises = clientes.map(async cliente => {
            const endpoint = `${API_URL}/v1/reportes/facturacion-mensual/${cliente.id}?month=${month}&year=${year}`;
            try {
                const response = await axios.get(endpoint, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                return response.data.data;
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    console.warn(`Client with ID ${cliente.id} not found (404). Skipping this client.`);
                    return null;
                } else {
                    console.error(`Error fetching monthly billing for client ${cliente.nombre} (ID: ${cliente.id}):`, err.message);
                    return null; 
                }
            }
        });
        const results = await Promise.allSettled(billingPromises);

        let facturaciones = results
            .filter(result => result.status === 'fulfilled' && result.value !== null)
            .map(result => result.value);

        const finalData = {
            data: {
                success: true,
                data: facturaciones,
                page: page,
                total_pages: Math.ceil(facturaciones.length / pageSize)
            }
        };

        return finalData;
    } catch (err) {
        console.error('An error occurred during the initial client fetch or overall process:', err);
        throw err.response ? err.response["error"] : err;
    }
}

async function fetchInsumosMasConsumidos(token) {
    const endpoint = `${API_URL}/v1/reportes/insumos-mas-consumidos`;

    try {
        const response = await axios.get(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    } catch (error) {
        console.error('Error fetching most consumed insumos:', error);
        throw error.response ? error.response.data["error"] : error;
    }
}

async function fetchTecnicosMasMantenimientos(token) {
    const endpoint = `${API_URL}/v1/reportes/tecnicos-mas-mantenimientos`;

    try {
        const response = await axios.get(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    } catch (error) {
        console.error('Error fetching technicians with most maintenances:', error);
        throw error.response ? error.response.data["error"] : error;
    }
}

async function fetchClientesMasMaquinas(token) {
    const endpoint = `${API_URL}/v1/reportes/clientes-mas-maquinas`;

    try {
        const response = await axios.get(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    } catch (error) {
        console.error('Error fetching clients with most machines:', error);
        throw error.response ? error.response.data["error"] : error;
    }
}

export {
    postLogin,
    fetchProveedores, postProveedor, putProveedor, deleteProveedor,
    fetchInsumos, postInsumo, putInsumo, deleteInsumo,
    fetchClientes, postCliente, putCliente, deleteCliente,
    fetchMaquinas, postMaquina, putMaquina, deleteMaquina,
    fetchTecnicos, postTecnico, putTecnico, deleteTecnico,
    fetchMantenimientos, postMantenimiento, putMantenimiento, deleteMantenimiento,
    fetchRegistroConsumos,
    fetchUsuarios, postUsuario, putUsuario, deleteUsuario,
    fetchFacturacionMensual, fetchInsumosMasConsumidos, fetchTecnicosMasMantenimientos, fetchClientesMasMaquinas
};