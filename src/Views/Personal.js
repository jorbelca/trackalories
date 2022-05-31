import React, { useState } from 'react'
import Bar from '../Components/Bar'
import { useStore } from '../state/store'

const Personal = () => {
  const { user } = useStore()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [weight, setWeight] = useState('')
  const [activity, setActivity] = useState(0)
  const handleSubmit = () => { }

  return (
    <>
      <Bar />
      <fieldset disabled>
        <div className="container is-three-quarters m-5">
          <form onSubmit={handleSubmit}>
            <div className="title is-6 center">
              Personal
            </div>

            <div className="field is-grouped">
              <div className="control is-expanded">
                <label className="label">Username</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className="input "
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={user.username}
                    autoComplete="off"

                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user"></i>
                  </span>
                </div>
              </div>

              <div className="control is-expanded">
                <label className="label">Email</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className="input "
                    type="email"
                    placeholder={user.email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"

                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                </div>
              </div>
            </div>

            <div className="field is-grouped">
              <div className="control is-expanded ">
                <label className="label">Password</label>
                <p className="control has-icons-left">
                  <input
                    className="input"
                    type="password"

                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"

                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                </p>
              </div>

              <div className="control is-expanded">
                <label className="label">Weight (kg)</label>
                <input
                  className="input"
                  type="number"
                  placeholder={user.weight}
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}

                ></input>
              </div>
            </div>


            <label className="label">Level of Activity (Current:{user.activity})</label>
            <div className="control is-expanded">
              <div className="select is-fullwidth">
                <select name="levelActivity"
                  onChange={(e) => setActivity(e.target.value)}
                >
                  <option selected disabled>Select</option>
                  <option value={1}>I make exercise 1 day of the week</option>
                  <option value={2}>I make exercise 2 days of the week</option>
                  <option value={3}>I make exercise 3 days of the week</option>
                  <option value={4}>I make exercise 4 days of the week</option>
                  <option value={5}>I make exercise 5 days of the week</option>
                  <option value={6}>I make exercise 6 or more days of the week</option>
                </select>
              </div>
            </div>


            <div className="field is-grouped mt-4">
              <div className="control">
                <button className="button is-link " type='submit'>Update</button>
              </div>

            </div>
          </form>
        </div >

      </fieldset>
    </>
  )
}

export default Personal