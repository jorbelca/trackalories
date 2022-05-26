import React, { useState } from 'react'
import Bar from '../Components/Bar'
import registerService from '../Services/registerService'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [height, setHeight] = useState(0)
  const [weight, setWeight] = useState(0)
  const [gender, setGender] = useState(0)
  const [activity, setActivity] = useState(0)

  const handleSubmit = (event) => {
    event.preventDefault()
    const user = {
      username: username,
      email: email,
      password: password,
      height: Number(height),
      weight: Number(weight),
      gender: gender,
      activity: Number(activity)
    }
    // Service for registratio
    const { data } = registerService(user)
    console.log(data)
  }
  return (
    <>
      <Bar />
      <div className="container is-three-quarters m-5">
        <form onSubmit={handleSubmit}>
          <div className="title is-3 center">
            <h1>Register</h1>
          </div>

          <div className="field">
            <label className="label">Username</label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input "
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your Username "
                autoComplete="off"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </div>
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input "
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
            </div>
          </div>

          <div className="field ">
            <label className="label">Password</label>
            <p className="control has-icons-left">
              <input
                className="input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>

          <div className="field is-grouped">
            <div className="control is-expanded">
              <label className="label">Gender</label>

              <div className="select">
                <select onChange={(e) => setGender(e.target.value)} >
                  <option default>Select</option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                </select>
              </div>
            </div>

            <div className="control is-expanded">
              <label className="label">Weight</label>
              <input
                className="input"
                type="number"
                placeholder=" kg"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              ></input>
            </div>

            <div className="control is-expanded">
              <label className="label">Height</label>
              <input
                className="input"
                type="number"
                placeholder=" cm"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
          </div>


          <label className="label">Level of Activity</label>

          <div className="control is-expanded">
            <div className="select is-fullwidth">
              <select name="levelActivity"
                onChange={(e) => setActivity(e.target.value)}>
                <option default>Select</option>
                <option value={1}>I make exercise 1 day of the week</option>
                <option value={2}>I make exercise 2 days of the week</option>
                <option value={3}>I make exercise 3 days of the week</option>
                <option value={4}>I make exercise 4 days of the week</option>
                <option value={5}>I make exercise 5 days of the week</option>
                <option value={6}>I make exercise 6 or more days of the week</option>
              </select>
            </div>
          </div>

          <div className="field mt-4">
            <div className="control">
              <label className="checkbox">
                <input type="checkbox" />
                I agree to the <a href="#">terms and conditions</a>
              </label>
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link" type='submit'>Register</button>
            </div>
            <div className="control">
              <button className="button is-link is-light">Cancel</button>
            </div>
          </div>
        </form>
      </div >
    </>
  )
}

export default Register