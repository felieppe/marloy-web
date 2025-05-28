import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faBook, faCashRegister, faFileInvoice, faToolbox, faTruck, faUsers, faUserTie, faUtensils } from '@fortawesome/free-solid-svg-icons';

const styles = require('../styles/components/DashboardLeftMenu.module.css');

function DashboardLeftMenu({ activeTab = "" }) {
    const items = [
        { icon: faTruck, label: 'Proveedores', link: '/' },
        { icon: faUtensils, label: 'Insumos', link: '/insumos' },
        { icon: faAddressBook, label: 'Clientes', link: '/clientes' },
        { icon: faCashRegister, label: 'Maquinas', link: '/maquinas' },
        { icon: faUserTie, label: 'Tecnicos', link: '/tecnicos' },
        { icon: faToolbox, label: 'Mantenimientos', link: '/mantenimientos' },
        { icon: faFileInvoice, label: 'Registro de consumo', link: '/registro-de-consumo' },
        { icon: faUsers, label: 'Usuarios', link: '/usuarios' },
        { icon: faBook, label: 'Reportes', link: '/reportes' }
    ]

    return (
        <div className={styles.menu}>
            <div className={styles.logo}>
                <span>Marloy</span>
            </div>

            <div className={styles.menu__items}>
                {items.map((item, index) => (
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