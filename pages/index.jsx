import { useEffect, useState } from "react";
import DashboardLeftMenu from '../components/dashboardLeftMenu';
import DashboardTopMenu from "@/components/dashboardTopMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { fetchProveedores } from "@/utils/api";

const styles = require('../styles/Home.module.css');
const cookies = require('js-cookie');

function Home() {
    const [user, setUser] = useState(null);
    const [proveedores, setProveedores] = useState([]);
    
    const tab = 'Proveedores'

    useEffect(() => {
        const token = localStorage.getItem('token') || cookies.get('token');
        if (!token) { window.location.href = '/login'; }

        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        } else { window.location.href = '/login'; }

        if (token) {
            fetchProveedores(localStorage.getItem('token') || cookies.get('token')).then((res) => {
                setProveedores(res.data);
            })
        }
    }, [])

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.dashboard}>
            <DashboardLeftMenu activeTab={tab}/>
            
            <div className={styles.content}>
                <DashboardTopMenu activeTab={tab} user={user}/>

                <button className={styles.proveedores__add}>NUEVO PROVEEDOR</button>

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
                                    <FontAwesomeIcon icon={faPencil} className={styles.proveedor__icon} />
                                    <FontAwesomeIcon icon={faTrash} className={styles.proveedor__icon} />
                                </td>
                            </tr>
                        ))}
                    </thead>
                </table>
            </div>
        </div>
    )
}

export default Home;