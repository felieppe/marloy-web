import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faBook, faCashRegister, faFileInvoice, faToolbox, faTruck, faUsers, faUserTie, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const styles = require('../styles/components/DashboardLeftMenu.module.css');

function DashboardLeftMenu({ activeTab = "" }) {
    const items = [
        { icon: faTruck, label: 'Proveedores', link: '/', adminRequired: true },
        { icon: faUtensils, label: 'Insumos', link: '/insumos', adminRequired: false },
        { icon: faAddressBook, label: 'Clientes', link: '/clientes', adminRequired: false },
        { icon: faCashRegister, label: 'Maquinas', link: '/maquinas', adminRequired: true },
        { icon: faUserTie, label: 'Tecnicos', link: '/tecnicos', adminRequired: true },
        { icon: faToolbox, label: 'Mantenimientos', link: '/mantenimientos', adminRequired: false },
        { icon: faFileInvoice, label: 'Registro de consumo', link: '/consumos', adminRequired: false },
        { icon: faUsers, label: 'Usuarios', link: '/usuarios', adminRequired: true },
        { icon: faBook, label: 'Reportes', link: '/reportes', adminRequired: true }
    ]

    const [showItems, setShowItems] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user) return;

        switch (user.isAdmin) {
            case true:
                setShowItems(items);
                break;
            case false:
                setShowItems(items.filter(item => !item.adminRequired));
                break;
            default:
                setShowItems([]);
                break;
        }
    }, [])

    return (
        <div className={styles.menu}>
            <div className={styles.logo}>
                <span>Marloy</span>
            </div>

            <div className={styles.menu__items}>
                {showItems.map((item, index) => (
                    <a key={index} href={item.link} className={(styles.menu__item + ' ' + (activeTab === item.label ? styles.item__active : ''))}>
                        <FontAwesomeIcon icon={item.icon} className={styles.icon} style={{fontSize: '20px'}}/>
                        <span className={styles.item__label}>{item.label}</span>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default DashboardLeftMenu;