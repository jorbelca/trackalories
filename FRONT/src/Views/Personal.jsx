import  { useState } from "react"
import Bar from "../Components/Bar"
import { notificationStore, userStore } from "../state/store"
import { updatePersonalInfo } from "../Services/personalService"
import eliminateUser from "../Services/eliminateUser"
import { useNavigate } from "react-router-dom"
import Footer from "../Components/Footer"

const Personal = () => {
  const removeUser = userStore((state) => state.removeUser)
  const user = userStore((state) => state.user)
  const setNotification = notificationStore((state) => state.setNotifications)

  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [activity, setActivity] = useState()

  const navigate = useNavigate()
  const token = window.localStorage.getItem("loggedUser")

  const handleSubmit = async (event) => {
    event.preventDefault()

    const data = {
      username: username || user.username,
      email: email || user.email,
      activity: activity || user.activity,
      password: password,
    }

    const response = await updatePersonalInfo(data, token)

    if (response.status !== 200) {
      setNotification({ error: response.message })
      return setNotification({ error: response.response.data.error })
    }
    if (response.status === 200) {
      window.localStorage.removeItem("loggedUser")
      removeUser()
      navigate("/")
      return setNotification({ message: response.statusText })
    }
  }

  const handleEliminate = async (event) => {
    event.preventDefault()

    if (
      window.confirm(
        "You're going to eliminate all the information of your profile. This action is irrevocable. Want to continue?"
      )
    ) {
      const token = window.localStorage.getItem("loggedUser")

      const response = await eliminateUser(token)

      if (response.status !== 200) {
        return setNotification({ error: response.response.data.error })
      }
      if (response.status === 200) {
        window.localStorage.removeItem("loggedUser")
        removeUser()
        navigate("/")
        return setNotification({ message: response.statusText })
      }
    }
  }

  return (
    <>
      <Bar />
      {/* PERSONAL INFO FOR UPDATE */}
      <div className="is-flex is-flex-direction-column is-align-items-center ">
        <fieldset className="container is-max-desktop">
          <div className="container  m-5 mb-6">
            <form onSubmit={handleSubmit}>
              <div className="title is-8 center">
                Personal
                <div className="subtitle is-5 ">
                  Only fill the fields that you want to update and click
                </div>
              </div>
              <div className="">
                <div className="control is-expanded mt-5 ">
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

                <div className="control is-expanded mt-5">
                  <label className="label">Email</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className="input "
                      type="email"
                      placeholder={user.email}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="off"
                      data-cy="update-email"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </div>
                </div>
              </div>

              <div className="field is-grouped">
                <div className="control is-expanded mt-5">
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
              </div>

              <label className="label">
                Level of Activity (Current:{user.activity})
              </label>
              <div className="control is-expanded mt-5">
                <div className="select is-fullwidth">
                  <select
                    name="levelActivity"
                    onChange={(e) => setActivity(e.target.value)}
                    data-cy="update-activity"
                  >
                    <option defaultValue="">Select</option>
                    <option value={1}>I make exercise 1 day of the week</option>
                    <option value={2}>
                      I make exercise 2 days of the week
                    </option>
                    <option value={3}>
                      I make exercise 3 days of the week
                    </option>
                    <option value={4}>
                      I make exercise 4 days of the week
                    </option>
                    <option value={5}>
                      I make exercise 5 days of the week
                    </option>
                    <option value={6}>
                      I make exercise 6 or more days of the week
                    </option>
                  </select>
                </div>
              </div>

              <div className=" mt-6">
                <div className="control mt-5">
                  <button
                    className="button is-success is-responsive"
                    type="submit"
                    data-cy="update-button"
                  >
                    Update Profile Info
                  </button>
                </div>
              </div>
            </form>
          </div>
        </fieldset>

        {/* ELIMINATE BUTTON */}

        <div className="ml-6 mr-6 mt-6 is-three-quarters container">
          <button
            className="button is-danger is-fullwidth mt-6 "
            onClick={handleEliminate}
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            data-cy="delete-profile"
          >
            <span className="has-text-weight-bold">Delete Profile</span>
            <span className="icon is-large ">
              <i className="fas fa-times"></i>
            </span>
          </button>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Personal
