import logo from "../assets/calories-icon-4.jpg";
import { Link, useNavigate } from "react-router-dom";
import { mealStore, notificationStore, userStore } from "../state/store";
import Notification from "./Notification";

const Bar = () => {
  const notification = notificationStore((state) => state.notifications);
  const user = userStore((state) => state.user);
  const removeUser = userStore((state) => state.removeUser);
  const resetSearchedMeals = mealStore((state) => state.resetSearchedMeals);

  const navigate = useNavigate();

  return (
    <>
      <nav
        className="navbar is-responsive"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-menu">
          <div className="navbar-start">
            <Link className="navbar-item" to="/">
              <img
                src={logo}
                alt={"logo"}
                width={32}
                height={32}
                className="is-hidden-mobile"
              />
              <h1 className="is-size-3 is-size-4-mobile has-text-weight-bold">
                TrackAlories
              </h1>
            </Link>
          </div>

          <div className="navbar-end mt-3">
            <div className="navbar-item">
              {user.username ? (
                <>
                  <div className="isLogged mr-5">
                    <Link to="/search" className="icon-text mr-2">
                      <span className="icon">
                        <i className="fa-solid fa-search"></i>
                      </span>
                    </Link>
                    <Link to="/diary" className="icon-text ">
                      <span className="icon">
                        <i className="fa-solid fa-book-open"></i>
                      </span>
                    </Link>
                    <Link to="/weight" className="icon-text ml-2 ">
                      <span className="icon">
                        <i className="fa-solid fa-weight-scale "></i>
                      </span>
                    </Link>
                    <Link to="/personal" className="icon-text has-text-success">
                      <span className="icon mr-0">
                        <i className="fa-solid fa-user"></i>
                      </span>
                      <span>{user.username}</span>
                    </Link>

                    <button
                      className="icon-text button is-small button-remove pb-5"
                      onClick={() => {
                        window.localStorage.removeItem("loggedUser");
                        removeUser();
                        navigate("/");
                        resetSearchedMeals();
                      }}
                    >
                      <span className="icon ">
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                      </span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="buttons mb-1">
                  <Link
                    className="button is-success is-responsive"
                    to="/register"
                  >
                    <strong>Register</strong>
                  </Link>

                  <Link className="button is-light is-responsive" to="/login">
                    <strong>Log In</strong>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {notification === undefined || notification.length === 0 ? (
        <></>
      ) : (
        <Notification />
      )}
    </>
  );
};

export default Bar;
