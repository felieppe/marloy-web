import { useEffect, useState } from "react";
import DashboardLeftMenu from '../components/dashboardLeftMenu';
import DashboardTopMenu from "@/components/dashboardTopMenu";
import DataList from "@/components/dataList";
import { dataConfig } from "@/config/dataConfig";

const styles = require('../styles/Home.module.css');
const cookies = require('js-cookie');

function Maquinas() {
    const [user, setUser] = useState(null);
    const tab = 'Maquinas'

    useEffect(() => {
        const token = localStorage.getItem('token') || cookies.get('token');
        if (!token) { window.location.href = '/login'; }

        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        } else { window.location.href = '/login'; }
    }, [])

    if (!user) { return <div>Loading...</div>; }

    return (
        <div className={styles.dashboard}>
            <DashboardLeftMenu activeTab={tab}/>
            
            <div className={styles.content}>
                <DashboardTopMenu activeTab={tab} user={user}/>

                <DataList config={ dataConfig.maquinas } />
            </div>
        </div>
    )
}

export default Maquinas;