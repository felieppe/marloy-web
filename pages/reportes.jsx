import { useEffect, useState } from "react";
import DashboardLeftMenu from '../components/dashboardLeftMenu';
import DashboardTopMenu from "@/components/dashboardTopMenu";
import DataList from "@/components/dataList";
import { dataConfig } from "@/config/dataConfig";

const styles = require('../styles/Home.module.css');
const cookies = require('js-cookie');

function Home() {
    const [user, setUser] = useState(null);
    const tab = 'Reportes'

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

                {
                    dataConfig.reportes.map((report, index) => (
                        <div key={index}>
                            <h2>{report.tabName}</h2>
                            <DataList config={report} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Home;