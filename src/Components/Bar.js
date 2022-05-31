import logo from '../assets/calories-icon-4.jpg'
import { Link } from 'react-router-dom'
import { useStore } from '../state/store'
import ErrorBar from './ErrorBar'

const Bar = () => {
  const { user, errors } = useStore()

  return (
    <>
      <nav className="navbar " role="navigation" aria-label="main navigation">
        <div className="navbar-menu">
          <div className="navbar-start">
            <Link className="navbar-item" to="/">

              <img src={logo} alt={'logo'} width={32} height={32} />
              <h1 className='title'>TrackAlories</h1>
            </Link>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">

              <Link to="/home" className="icon-text m-7">
                <span className="icon">
                  <i className="fa-solid fa-search"></i>
                </span>
              </Link>
              {user.username
                ?
                <div className='isLogged mr-6'>

                  <Link to="/diary" className="icon-text ml-6">
                    <span className="icon">
                      <i className="fa-solid fa-book"></i>
                    </span>
                  </Link>
                  <Link to='/personal' className="icon-text">
                    <span className="icon">
                      <i className="fa-solid fa-user"></i>
                    </span>
                    <span>{user.username}</span>
                  </Link>
                </div>
                :
                <div className="buttons">
                  <Link className="button is-primary" to="/register"><strong>Register</strong></Link>

                  <Link className="button is-light" to="/login"><strong>Log in</strong></Link>
                </div>
              }

            </div>
          </div>
        </div>
      </nav >

      {errors === undefined || errors.length === 0
        ? <></>
        : <ErrorBar />}

    </>
  )
}

export default Bar