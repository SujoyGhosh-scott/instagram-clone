import React,{ useState } from 'react'
import "./Login.css"
import HeaderLogo from "../images/Instagram_logo.png"

function Login() {
    const [loginorSignUp, setLoginOrSignUp] = useState(true)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const submitLogin = (e) => {
        e.preventDefault()

        setEmail("")
        setPassword("")
    }

    const submitSignUp = (e) => {
        e.preventDefault()

        setName("")
        setEmail("")
        setPassword("")
    }

    return (
        <div className="login">
            <img className="login__logo" src={HeaderLogo} alt="" />
            <div className="login__row2">
                <div className={loginorSignUp ? "selected" : ""} onClick={e => setLoginOrSignUp(true)}>Login</div>
                <div className={!loginorSignUp ? "selected" : ""} onClick={e => setLoginOrSignUp(false)}>Sign up</div>
            </div>
            <div className="login__forms">
                {
                    (loginorSignUp) ? 
                        <form className="loginform" onSubmit={e => submitLogin(e)}>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="enter Email..." />
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="enter password..." />
                            <button type="submit">Login</button>
                        </form>
                        :
                        <form className="signupform" onSubmit={e => submitSignUp(e)}>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="enter Name..." />
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="enter email..." />
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="enter password..." />
                            <button>Sign up</button>
                        </form>
                }
            </div>
        </div>
    )
}

export default Login
