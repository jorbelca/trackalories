import React from "react"
import { useNavigate } from "react-router-dom"
import { userStore } from "../state/store"

const CaloriesPanel = () => {
  const navigate = useNavigate()
  const user = userStore((state) => state.user)
  if (Object.values(user).length === 0) return navigate("/")

  let age = 30
  let calories
  let lastWeight

  if (user !== undefined && user.weight !== undefined)
    lastWeight = user.weight[user.weight.length - 1].weight
  if (user.sex === "male") {
    calories = lastWeight * 10 + 6 * user.height - age * 5 + 5
  } else {
    calories = lastWeight * 10 + 6 * user.height - age * 5 - 161
  }
  switch (user.activity) {
    case 1:
      calories = calories * 1.2
      break
    case 2:
      calories = calories * 1.375
      break
    case 3:
      calories = calories * 1.45
      break
    case 4:
      calories = calories * 1.67
      break
    case 5:
      calories = calories * 1.81
      break
    case 6:
      calories = calories * 1.95
      break
    default:
      return calories
  }

  return (
    <>
      <div className="card-results ">
        <div className="has-text-weight-semibold" style={{ color: "#48c78e" }}>
          CaloriesPanel{" "}
        </div>
        <article className="media-content is-size-15 has-text-justified">
          <br />
          <div>
            For <span className="is-underlined">gaining weight</span>, you must
            ingest <b>{(calories * 1.2).toFixed(2)} </b>
            calories/day
          </div>
          <br />
          <div>
            For <span className="is-underlined">gaining weight mildly</span>,
            you must ingest <b>{(calories * 1.1).toFixed(2)}</b> calories/day
          </div>

          <br />
          <div>
            Based on your last weight and your current level of activity your
            calories of <span className="is-underlined">maintenance</span> are{" "}
            <b>{calories.toFixed(2)}</b> calories/day
          </div>
          <br />
          <div>
            You must ingest <b>{(calories * 0.9).toFixed(2)} </b>calories/day to
            have a <span className="is-underlined">mild weight loss</span>
          </div>
          <br />
          <div>
            You must ingest <b>{(calories * 0.8).toFixed(2)} </b>calories/day to
            have a <span className="is-underlined">sustantial weight loss</span>
          </div>
          <br />
          <div style={{ fontSize: 10 }}>
            *This results are based on the Mifflin-St Jeor Equation
          </div>
        </article>
      </div>
    </>
  )
}

export default CaloriesPanel

//   Mifflin-St Jeor Equation:
// For men:
// BMR = 10W + 6.25H - 5A + 5   W body weight      H height    A age
// For women:
// BMR = 10W + 6.25H - 5A - 161

// The value obtained from these equations is the estimated number of calories a person can consume in a day to maintain their body-weight, assuming they remain at rest. This value is multiplied by an activity factor (generally 1.2-1.95), dependent on a person's typical levels of exercise, in order to obtain a more realistic value for maintaining body-weight (since people are less likely to be at rest throughout the course of an entire day). 1 pound, or approximately 0.45 kg, equates to about 3,500 calories. As such, in order to lose 1 pound per week, it is recommended that 500 calories be shaved off the estimate of calories necessary for weight maintenance per day. For example, if a person has an estimated allotment of 2,500 calories per day to maintain body-weight, consuming 2,000 calories per day for one week would theoretically result in 3,500 calories (or 1 pound) lost during the period.
