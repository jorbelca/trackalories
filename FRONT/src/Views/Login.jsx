import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Bar from "../Components/Bar";
import Footer from "../Components/Footer";
import loginService from "../Services/loginService";
import { notificationStore, userStore } from "../state/store";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const setNotification = notificationStore((state) => state.setNotifications);
  const setUser = userStore((state) => state.setUser);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userLog = {
      email: email,
      password: password,
    };

    // Service for login the user
    const response = await loginService(userLog);

    // Handle errors
    if (response.status !== 200) {
      return setNotification({ error: response.message });
    }

    if (response.status === 200) {
      setUser(response.data);
      window.localStorage.setItem("loggedUser", response.data.token);
      setNotification({ message: "Welcome!" });
      navigate("/search", { replace: true });
    }
  };

  return (
    <>
      <Bar />

      <div className="container is-max-desktop login-container">
        <form onSubmit={handleSubmit} autoComplete="on">
          <div className="columns ">
            <div className="column is-three-fifths is-offset-one-fifth">
              <div className="title is-3 has-text-centered">
                <h1>Login</h1>
              </div>

              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="on"
                    required
                    data-cy="login-email"
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
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    autoComplete="on"
                    required
                    data-cy="login-password"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                </p>
              </div>

              <div className="field  ">
                <p className="control">
                  <button className="button is-success responsive is-fullwidth">
                    Login
                  </button>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Login;
