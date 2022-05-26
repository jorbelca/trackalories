import logo from '../assets/calories-icon-4.jpg'
import { Link } from 'react-router-dom'

const Bar = () => {
  return (
    <div className="container is-fluid">
      <nav className="navbar" role="navigation" aria-label="main navigation">

        <div className="navbar-start">
          <Link className="navbar-item" to="/">

            <img src={logo} alt={'logo'} width={32} height={32} />
            <h1 className='title'>TrackAlories</h1>
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">

              <Link className="button is-primary" to="/register"><strong>Register</strong></Link>

              <Link className="button is-light" to="/login"><strong>Log in</strong></Link>
            </div>
          </div>
        </div>


      </nav>
    </div>

  )
}

export default Bar