import { useEffect } from "react";

const cookies = require('js-cookie');

function Logout() {
    useEffect(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        cookies.remove('token');

        window.location.href = '/login';
    })

    return (
        <p>Cerrando sesión...</p>
    )
}

export default Logout;