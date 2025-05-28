const styles = require('../styles/Login.module.css')

const { useState, useEffect } = require('react')
const { postLogin } = require('../utils/api')
const cookies = require('js-cookie')

function Login() {
    const [login, setLogin] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState([]);

    const validateForm = () => {
        setErrors([]);
        
        let errs = []
        let isValid = true;

        if (!login.email) {
            errs.push('EMAIL_REQUIRED');
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login.email)) {
            errs.push('EMAIL_INVALID');
            isValid = false;
        }

        if (!login.password) {
            errs.push('PASSWORD_REQUIRED');
            isValid = false;
        }

        setErrors(errs);
        console.log('Validation errors:', errors);
        return isValid
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        if (!validateForm()) { return; }

        postLogin(login.email, login.password)
            .then((response) => {
                if (response.success) {
                    localStorage.setItem('token', response.data.access_token);
                    localStorage.setItem('user', JSON.stringify({ email: login.email, access_token: response.data.access_token, isAdmin: response.data.is_admin }));

                    cookies.set('token', response.data.access_token, { path: '/' });
                    window.location.href = '/';
                } else {
                    alert('Login failed. Please check your credentials.');
                }
            })
            .catch((error) => {
                console.error('Login error:', error);
                alert('Login failed. Please check your credentials.')
            });
    }

    useEffect(() => {
        const token = localStorage.getItem('token') || cookies.get('token');
        if (token) {
            window.location.href = '/';
        }
    }, []);

    return (
        <div className={styles.loginContainer}>
            <div className={styles.leftPanel} />

            <div className={styles.rightPanel}>
                <div className={styles.login}>
                    <h1 className={styles.login__title}>Cafés Marloy</h1>

                    <div className={styles.login__form}>
                        <label htmlFor="email">Email</label> <br />
                        <input className={errors.includes("EMAIL_REQUIRED") || errors.includes("EMAIL_INVALID") ? styles.invalid_label : null} type="email" id="email" name="email" placeholder="Enter your email" value={login.email} onChange={(e) => { setLogin({ ...login, [e.target.name]: e.target.value }) }} required /> <br />

                        <label htmlFor="password">Password</label> <br />
                        <input className={errors.includes("PASSWORD_REQUIRED") ? styles.invalid_label : null} type="password" id="password" name="password" placeholder="Enter your password" value={login.password} onChange={(e) => { setLogin({ ...login, [e.target.name]: e.target.value }) }} required /> <br />

                        <div className={styles.login__form__options}>
                            <div className={styles.login__form__options__remember}>
                                <input type="checkbox" id="remember" name="remember" />
                                <label htmlFor="remember">Remember me</label>
                            </div>
                            <a href="/forgot-password">Forgot password</a>
                        </div>

                        <br /><button type="submit" className={styles.login__form__submit} onClick={ handleLogin }>Sign In</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;