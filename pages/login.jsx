const styles = require('../styles/Login.module.css')

const { useState } = require('react')
const { postLogin } = require('../utils/api')

function Login() {
    const [login, setLogin] = useState({ email: '', password: '' });

    const handleLogin = async (e) => {
        e.preventDefault()
        if (!validateForm()) { return; }

        postLogin(login.email, login.password)
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem('token', response.data.token)
                    window.location.href = '/dashboard'
                } else {
                    alert('Login failed. Please check your credentials.')
                }
            })
            .catch((error) => {
                console.error('Login error:', error);
                alert('Login failed. Please check your credentials.')
            });
    }

    return (
        <div className={styles.loginContainer}>
            <div className={styles.leftPanel} />

            <div className={styles.rightPanel}>
                <div className={styles.login}>
                    <h1 className={styles.login__title}>Cafés Marloy</h1>

                    <div className={styles.login__form}>
                        <label htmlFor="email">Email</label> <br />
                        <input type="email" id="email" name="email" placeholder="Enter your email" value={login.email} onChange={(e) => { setLogin({ ...login, [e.target.name]: e.target.value }) }} required /> <br />

                        <label htmlFor="password">Password</label> <br />
                        <input type="password" id="password" name="password" placeholder="Enter your password" value={login.password} onChange={(e) => { setLogin({ ...login, [e.target.name]: e.target.value }) }} required /> <br />

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