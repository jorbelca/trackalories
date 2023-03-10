import React, { useState } from "react"
import InfoMeals from "./InfoMeals"

const Dropdown = ({ data }) => {
  const [isActive, setActive] = useState(true)
  const { date } = data

  const handleActive = () => {
    setActive(!isActive)
  }
  return (
    <>
      <div
        key={date}
        className={
          isActive
            ? "dropdown mr-3 mt-3 ml-3"
            : "dropdown is-active pr-5 mr-6 mt-3 ml-0 "
        }
      >
        <div className="dropdown-trigger">
          <button
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            onClick={handleActive}
          >
            <span>{date}</span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu2" role="menu">
          <div className="dropdown-content">
            <div className="dropdown-item">
              <InfoMeals key={date} data={data} />
            </div>
          </div>

          {data.data.map((indMeal, idx) => (
            <div key={indMeal.consumed_at + idx} className="dropdown-content">
              <div className="dropdown-item ">
                <div className="totalCard">
                  <span className="image is-32x32 mr-1">
                    <img
                      alt="food"
                      className="is-rounded"
                      src={`${indMeal.photo.thumb}`}
                    />
                  </span>
                  <div className="mt-0 mr-auto is-size-7">
                    <p>
                      {indMeal.serving_qty + indMeal.serving_unit.split(" ")[0]}
                      &nbsp; of &nbsp;
                      {indMeal.food_name[0].toUpperCase() +
                        indMeal.food_name.slice(1)}
                    </p>
                    <p className="has-text-weight-bold">
                      {indMeal.nf_calories} KCal{" "}
                    </p>
                  </div>
                  <div className="totalmini is-size-7">
                    <div className="has-text-link">{indMeal.nf_protein} g</div>
                    <div className="has-text-primary">
                      {indMeal.nf_total_carbohydrate} g
                    </div>
                    <div className="has-text-danger">
                      {indMeal.nf_total_fat} g
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Dropdown
