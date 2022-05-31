import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Bar from '../Components/Bar'
import loginService from '../Services/loginService'
import { useStore } from '../state/store'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { setUser, setErrors } = useStore()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const userLog = {
      email: email,
      password: password
    }

    // Service for login the user
    const response = await loginService(userLog)
    console.log(response);

    // Handle errors
    if (response.status === 404 || 400) setErrors(response.message)
    if (response.status === 0 || response.data === null) setErrors('Has been a problem with the connection with the server')

    if (response.status === 200) setUser(response.data);
    if (response.status === 200) navigate("/home", { replace: true })
  }

  return (
    <>
      <Bar />

      <div className="container is-max-desktop m-6">
        <form onSubmit={handleSubmit} autoComplete="on">
          <div className="columns is-mobile">
            <div className="column is-three-fifths is-offset-one-fifth">
              <div className="title is-3 has-text-centered"><h1>Login</h1></div>


              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="email"
                    placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                    autoComplete="on"
                    required
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>

                </p>
              </div>

              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} placeholder="Password"
                    autoComplete="on"
                    required
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                </p>
              </div>

              <div className="field is-align-self-center ">
                <p className="control">
                  <button className="button is-success ">
                    Login
                  </button>
                </p>
              </div>

            </div>
          </div>


        </form>
      </div>
    </>
  )
}

export default Login