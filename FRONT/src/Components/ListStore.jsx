import React from "react";
import { storeMealService } from "../Services/storeMealsService";
import { mealStore, notificationStore } from "../state/store";

const ListStore = () => {
  const setNotification = notificationStore((state) => state.setNotifications);

  const meals = mealStore((state) => state.meals);
  const removeMeal = mealStore((state) => state.removeMeal);
  const resetSearchedMeals = mealStore((state) => state.resetSearchedMeals);

  const token = window.localStorage.getItem("loggedUser");

  let totalCal = 0;
  let totalProt = 0;
  let totalCarbs = 0;
  let totalFats = 0;
  meals.forEach((meal) => {
    totalProt += meal.nf_protein;
    totalCal += meal.nf_calories;
    totalCarbs += meal.nf_total_carbohydrate;
    totalFats += meal.nf_total_fat;
  });

  const handleSave = async (event) => {
    event.preventDefault();
    if (
      window.confirm(
        "You're going to save the meals, and won't be able to modify them. The information is correct? "
      )
    ) {
      const response = await storeMealService(meals, token);
      resetSearchedMeals();

      if (response.status !== 200) {
        return setNotification({ error: response.response.data.message });
      }
      if (response.status === 200) {
        return setNotification({ message: response.statusText });
      }
    }
  };

  return (
    <>
      {totalCal !== 0 ? (
        <>
          <div className="title-list mt-5">
            <div>List of Foods </div>

            <div className="save-btn has-text-success">
              <button
                onClick={handleSave}
                className="button button-save is-align-items-flex-end has-text-success"
              >
                <p>Save in the diary</p>
                <span className="icon ">
                  <i className="fa-solid fa-folder-open"></i>
                </span>
              </button>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      {meals.map((meal) => (
        <div key={meal.id} className="card-results">
          <article className="media">
            <figure className="media-left" style={{ alignSelf: "flex-end" }}>
              <p className="image is-64x64">
                <img
                  alt="meal"
                  className="is-rounded"
                  src={`${meal.photo.thumb}`}
                />
              </p>
            </figure>
            <div className="media-content">
              <div className="content">
                <p>
                  <strong>
                    {meal.serving_weight_grams + " grams of " + meal.food_name}
                  </strong>
                </p>
              </div>
              <nav className="level is-mobile">
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Calories</p>
                    <p className="is-size-6-mobile has-text-weight-bold">
                      {meal.nf_calories} Kcal
                    </p>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Carbohidrates</p>
                    <p className="is-size-6-mobile has-text-weight-bold">
                      {meal.nf_total_carbohydrate}g
                    </p>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Fat</p>
                    <p className="is-size-6-mobile has-text-weight-bold">
                      {meal.nf_total_fat}g
                    </p>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Protein</p>
                    <p className="is-size-6-mobile has-text-weight-bold">
                      {meal.nf_protein}g
                    </p>
                  </div>
                </div>
              </nav>
            </div>
            <div
              className="media-right 
           mt-4"
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  removeMeal(meal.id);
                }}
                className="button button-remove is-normal"
              >
                <span className="icon ">
                  <i className="fas fa-lg fa-solid fa-circle-minus"></i>
                </span>
              </button>
            </div>
          </article>
        </div>
      ))}
      {totalCal !== 0 ? (
        <article className="media ">
          <div className="media-content ">
            <nav className="level is-mobile">
              <div
                className="media-left has-text-danger-dark
              ml-5"
              >
                Totals
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="is-size-7-mobile has-text-danger-dark">
                    {+totalCal.toFixed(2)} Kcal
                  </p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="is-size-7-mobile has-text-danger-dark">
                    {+totalCarbs.toFixed(2)}g
                  </p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="is-size-7-mobile has-text-danger-dark">
                    {+totalFats.toFixed(2)}g
                  </p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="is-size-7-mobile has-text-danger-dark">
                    {+totalProt.toFixed(2)}g
                  </p>
                </div>
              </div>
            </nav>
          </div>

          <div className="media-right">
            <button
              onClick={(e) => {
                e.preventDefault();
                resetSearchedMeals();
              }}
              className="button is-danger is-normal is-responsive"
            >
              Clear
            </button>
          </div>
        </article>
      ) : (
        <></>
      )}
    </>
  );
};

export default ListStore;
