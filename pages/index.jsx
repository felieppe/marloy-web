import { useEffect, useState } from "react";
import DashboardLeftMenu from '../components/dashboardLeftMenu';
import DashboardTopMenu from "@/components/dashboardTopMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { fetchProveedores, deleteProveedor } from "@/utils/api";
import ProveedorForm from "@/components/forms/proveedorForm";

const styles = require('../styles/Home.module.css');
const cookies = require('js-cookie');

function Home() {
    const [user, setUser] = useState(null);
    const [proveedores, setProveedores] = useState([]);
    const [currentPage, setCurrentPage] = useState(null);
    const [totalPages, setTotalPages] = useState(null);
    const [pageSize] = useState(10);
    const [formVisble, setFormVisble] = useState(false);
    const [formType, setFormType] = useState('create');
    const [formProveedor, setFormProveedor] = useState({});
    
    const tab = 'Proveedores'

    useEffect(() => {
        const token = localStorage.getItem('token') || cookies.get('token');
        if (!token) { window.location.href = '/login'; }

        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        } else { window.location.href = '/login'; }

        if (token) {
            fetchProveedores(localStorage.getItem('token') || cookies.get('token'), 1, pageSize).then((res) => {
                setProveedores(res.data.data);
                setCurrentPage(res.data.page)
                setTotalPages(res.data.total_pages)
            })
        }
    }, [])

    const handlePageChange = (page) => {
        if (page == currentPage || page < 1 || page > totalPages) return;

        fetchProveedores(localStorage.getItem('token') || cookies.get('token'), page, pageSize).then((res) => {
            setProveedores(res.data.data);
            setCurrentPage(page)
        })
    }

    if (!user || !totalPages) {
        return <div>Loading...</div>;
    }

    const handleProveedorEdit = (p) => { 
        setFormVisble(true);
        setFormType('edit');
        setFormProveedor(p);
    }

    const handleProveedorNew = () => {
        setFormVisble(true);
        setFormType('create');
    }

    const handleProveedorDelete = (proveedorID) => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar este proveedor?')) return;
        
        deleteProveedor(localStorage.getItem('token') || cookies.get('token'), proveedorID).then(() => {
            setProveedores(proveedores.filter(p => p.id !== proveedorID));
            if (currentPage > totalPages) {
                setCurrentPage(totalPages);
            }
        }).catch((error) => {
            console.error('Error al eliminar el proveedor:', error);
            alert('Error al eliminar el proveedor. Por favor, inténtalo de nuevo más tarde.');
        });
    }

    const handleProveedorClose = () => { 
        setFormVisble(false);
        setFormProveedor({});
    }
    
    const handleProveedorUpdate = () => {
        fetchProveedores(localStorage.getItem('token') || cookies.get('token'), currentPage, pageSize).then((res) => {
            setProveedores(res.data.data);
            setCurrentPage(res.data.page)
            setTotalPages(res.data.total_pages)
        })
    }

    return (
        <div className={styles.dashboard}>
            <DashboardLeftMenu activeTab={tab}/>
            
            <div className={styles.content}>
                <DashboardTopMenu activeTab={tab} user={user}/>

                <button className={styles.proveedores__add} onClick={ handleProveedorNew }>NUEVO PROVEEDOR</button>
                { formVisble ? <ProveedorForm formType={formType} onClose={handleProveedorClose} onUpdate={handleProveedorUpdate} proveedor={formProveedor}/> : null }

                <table className={styles.proveedores}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Contacto</th>
                            <th>Acciones</th>
                        </tr>
                        {proveedores.map((proveedor, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{proveedor.nombre}</td>
                                <td>{proveedor.contacto}</td>
                                <td className={styles.proveedor__actions}>
                                    <FontAwesomeIcon icon={faPencil} className={styles.proveedor__icon} onClick={ () => { handleProveedorEdit(proveedor) } } />
                                    <FontAwesomeIcon icon={faTrash} className={styles.proveedor__icon} id={proveedor.id} onClick={ () => { handleProveedorDelete(proveedor.id) } }/>
                                </td>
                            </tr>
                        ))}
                    </thead>
                </table>

                { totalPages > 1 ? <div className={styles.pagination}>
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={styles.pagination__button} >
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button key={i + 1} onClick={() => handlePageChange(i + 1)} className={`${styles.pagination__button} ${currentPage === i + 1 ? styles.pagination__button_active : ''}`} >
                            {i + 1}
                        </button>
                    ))}
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={styles.pagination__button} >
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </div> : null }
            </div>
        </div>
    )
}

export default Home;