const styles = require('../styles/Login.module.css')

function Login() {

    return (
        <div className={styles.loginContainer}>
            <div className={styles.leftPanel}>

            </div>

            <div className={styles.rightPanel}>
                <div className={styles.login}>
                    <h1 className={styles.login__title}>Cafés Marloy</h1>

                    <div className={styles.login__form}>
                        <label htmlFor="email">Email</label> <br />
                        <input type="email" id="email" name="email" placeholder="Enter your email" required /> <br />

                        <label htmlFor="password">Password</label> <br />
                        <input type="password" id="password" name="password" placeholder="Enter your password" required /> <br />

                        <div className={styles.login__form__options}>
                            <div className={styles.login__form__options__remember}>
                                <input type="checkbox" id="remember" name="remember" />
                                <label htmlFor="remember">Remember me</label>
                            </div>
                            <a href="/forgot-password">Forgot password</a>
                        </div>

                        <br /><button type="submit" className={styles.login__form__submit}>Sign In</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;