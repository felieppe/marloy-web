const styles = require('../styles/components/DashboardTopMenu.module.css');

function DashboardTopMenu({ activeTab = "", user = {}}) {
    return (
        <div className={styles.menu}>
            <div className={styles.menu__active}>
                <span>{activeTab}</span>
            </div>

            <div className={styles.menu__right}>
                <div className={styles.right__hello}>
                    <span>Hola, {user.email.split('@')[0].charAt(0).toUpperCase() + user.email.split('@')[0].slice(1)}</span>
                </div>

                <a href="/logout" className={styles.right__logout}>
                    <span>LOGOUT</span>
                </a>
            </div>
        </div>
    );
}

export default DashboardTopMenu;