import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Bar from "../Components/Bar";
import Footer from "../Components/Footer";
import getCompleteDate from "../Services/completeDate";
import registerService from "../Services/registerService";
import { notificationStore } from "../state/store";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [sex, setSex] = useState("");
  const [activity, setActivity] = useState("");
  const [checkbox, setCheckBox] = useState(false);

  const setNotification = notificationStore((state) => state.setNotifications);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (checkbox === false)
      return setNotification({
        error: "You must accept the terms and conditions",
      });
    if (weight < 30 || weight > 250)
      return setNotification({ error: "Incorrect weight" });
    if (height < 50 || weight > 250)
      return setNotification({ error: "Incorrect height" });
    if (birthdate < "1920-01-02" || birthdate > getCompleteDate())
      return setNotification({ error: "Incorrect birthdate" });
    if (username.length < 3 || username.length > 12)
      return setNotification({
        error: "Username must contain between 3 and 12 caracters",
      });
    if (password.length < 3 || password.length > 12)
      return setNotification({
        error: "Password must contain between 3 and 12 caracters",
      });
    const user = {
      username: username,
      email: email,
      password: password,
      birthdate: new Date(birthdate),
      height: Number(height),
      weight: [{ date: getCompleteDate(), weight: Number(weight) }],
      sex: sex,
      activity: Number(activity),
    };

    // Service for registration
    const response = await registerService(user);

    // Handle errors
    if (response.status !== 200) {
      if (response.response.data === undefined)
        setNotification({ error: response.message });
      setNotification({ error: response.response.data.message });
      return setNotification({ error: response.response.data.error });
    }
    if (response.status === 200) {
      navigate("/login");
      setNotification({ message: response.statusText });
      handleCancel();
    }
  };

  const handleCancel = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setBirthdate("");
    setActivity();
    setWeight();
    setHeight();
    setSex();
  };
  return (
    <>
      <Bar />
      <div className="container is-three-quarters m-5">
        <form>
          <div className="title is-3 center">
            <h3>Register</h3>
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
                  placeholder="Enter your Username "
                  autoComplete="off"
                  required
                  data-cy="register-username"
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
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                  required
                  data-cy="register-email"
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
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
                  required
                  data-cy="register-password"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>

            <div className="control is-expanded ">
              <label className="label">Birth Date</label>
              <p className="control has-icons-left">
                <input
                  className="input is-responsive"
                  type="date"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  autoComplete="off"
                  required
                  data-cy="register-birthdate"
                  min={"1920-01-02"}
                  max={getCompleteDate()}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-calendar"></i>
                </span>
              </p>
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control is-expanded">
              <label className="label">Sex</label>

              <div className="select">
                <select
                  onChange={(e) => setSex(e.target.value)}
                  required
                  data-cy="register-sex"
                >
                  <option value="">Select</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </div>
            </div>

            <div className="control is-expanded">
              <label className="label">Weight (kg)</label>
              <input
                className="input"
                type="number"
                placeholder=" kg"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
                data-cy="register-weight"
                min="30"
                max="250"
              ></input>
            </div>

            <div className="control is-expanded">
              <label className="label">Height (cm)</label>
              <input
                className="input"
                type="number"
                placeholder=" cm"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
                data-cy="register-height"
                min="50"
                max="250"
              />
            </div>
          </div>

          <label className="label">Level of Activity</label>

          <div className="control is-expanded">
            <div className="select is-fullwidth">
              <select
                className="levelActivity "
                onChange={(e) => setActivity(e.target.value)}
                required
                data-cy="register-activity"
              >
                <option value="">Select</option>
                <option value={1}>I make exercise 1 day of the week</option>
                <option value={2}>I make exercise 2 days of the week</option>
                <option value={3}>I make exercise 3 days of the week</option>
                <option value={4}>I make exercise 4 days of the week</option>
                <option value={5}>I make exercise 5 days of the week</option>
                <option value={6}>
                  I make exercise 6 or more days of the week
                </option>
              </select>
            </div>
          </div>

          <div className="field mt-4">
            <div className="control">
              <label className="checkbox">
                <input
                  type="checkbox"
                  required
                  data-cy="register-checkbox"
                  value={checkbox}
                  onChange={() => setCheckBox(true)}
                />
                <>&nbsp;</>I agree to the{" "}
                <a className="has-text-success" href="/terms-conditions">
                  terms and conditions
                </a>
              </label>
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button
                className="button is-success is-responsive"
                type="submit"
                onClick={handleSubmit}
                data-cy="register-button"
              >
                Register
              </button>
            </div>
            <div className="control" onClick={handleCancel}>
              <button className="button is-success is-light is-responsive">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Register;
