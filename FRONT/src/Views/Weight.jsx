import { useState, useEffect } from "react";
import Bar from "../Components/Bar";
import Chart from "../Components/Chart";
import { notificationStore, userStore } from "../state/store";
import {
  getPermanentWeights,
  setPermanentWeights,
} from "../Services/weightService";
import CaloriesPanel from "../Components/CaloriesPanel";
import Footer from "../Components/Footer";

const Weight = () => {
  const [formWeight, setFormWeight] = useState();
  const [weights, setWeights] = useState([]);

  const setNotification = notificationStore((state) => state.setNotifications);
  const setUserWeight = userStore((state) => state.setUserWeight);

  const token = window.localStorage.getItem("loggedUser");

  useEffect(() => {
    const find = async (token) => {
      const response = await getPermanentWeights(token);

      if (response.status !== 200 || response.message === "Network Error") {
        setNotification({ error: response.statusText });

        return setNotification({ error: response.message });
      }

      setWeights(response.data);
    };

    find(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await setPermanentWeights(+formWeight, token);

    if (response.status !== 200) {
      setNotification({ error: response.message });
      return setNotification({ error: response.response.data.error });
    }
    if (response.status === 200) {
      setWeights(response.data.weight);
      setUserWeight(response.data);
      setFormWeight("");
      return setNotification({ message: response.statusText });
    }
  };

  return (
    <>
      <Bar />
      <div className="container is-three-quarters m-5">
        <div className="columns is-desktop is-flex-tablet">
          <div className="column">
            <CaloriesPanel />
          </div>
          <div
            className="column"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <form onSubmit={handleSubmit}>
              <label className="label">Add your Weight (kg)</label>
              <div className="field has-addons ">
                <div className="control ">
                  <input
                    className="input is-responsive"
                    type="number"
                    placeholder="kg"
                    value={formWeight}
                    onChange={(e) => setFormWeight(e.target.value)}
                    data-cy="add-weight"
                    min="30"
                    max="150"
                    step="0.1"
                  ></input>
                </div>
                <div className="control">
                  <button className="button is-success ">Save</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Chart data={weights} />
      <Footer />
    </>
  );
};

export default Weight;
