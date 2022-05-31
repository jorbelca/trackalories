import React from 'react'
import {storeMealService} from '../Services/storeMealsService'
import { useStore } from '../state/store'

const ListStore = () => {
  const { meals, user, removeMeal } = useStore()
  const token = user.token

  let totalCal = 0
  let totalProt = 0
  let totalCarbs = 0
  let totalFats = 0
  meals.forEach(meal => {
    totalProt += meal.nf_protein;
    totalCal += meal.nf_calories;
    totalCarbs += meal.nf_total_carbohydrate;
    totalFats += meal.nf_total_fat
  })

  return (
    <>
      {totalCal !== 0
        ? <>
          <div>List of Foods </div>

          <div className="save-btn">
            <button onClick={(e) => {
              e.preventDefault()
              storeMealService(meals, token)
            }} className="button button-save is-align-items-flex-end">
              <p>Save in the diary</p>
              <span className="icon ">
                <i className="fa-solid fa-folder-open"></i>
              </span>
            </button>
          </div>
        </>
        : ''}
      {meals.map(meal =>
        <div key={meal.id} className='card-results'>
          <article className="media">
            <figure className="media-left">
              <p className="image is-64x64">
                <img className="is-rounded" src={`${meal.photo.thumb}`} />
              </p>
            </figure>
            <div className="media-content">
              <div className="content">
                <p>
                  <strong>{meal.serving_weight_grams + ' grams of ' + meal.food_name}</strong>
                </p>
              </div>
              <nav className="level is-mobile">
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Calories</p>
                    <p className="title is-6">{meal.nf_calories} Kcal</p>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Carbohidrates</p>
                    <p className="title is-6">{meal.nf_total_carbohydrate}g</p>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Fat</p>
                    <p className="title is-6">{meal.nf_total_fat}g</p>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Protein</p>
                    <p className="title is-6">{meal.nf_protein}g</p>
                  </div>
                </div>
              </nav>
            </div>
            <div className="media-right 
           mt-4">

              <button onClick={(e) => {
                e.preventDefault()
                removeMeal(meal.id)
              }} className="button button-remove">
                <span className="icon ">
                  <i className="fas fa-lg fa-solid fa-circle-minus"></i>
                </span>
              </button>

            </div>

          </article >
        </div >


      )}
      {totalCal !== 0
        ?
        <article className="media ">
          <div className="media-content ">
            <nav className="level is-mobile">
              <div className="media-left has-text-danger-dark
              ml-5">Totals</div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="title is-7 has-text-danger-dark">{totalCal} Kcal</p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="title is-7 has-text-danger-dark">{+totalCarbs.toFixed(2)}g</p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="title is-7 has-text-danger-dark">{+totalFats.toFixed(2)}g</p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="title is-7 has-text-danger-dark">{+totalProt.toFixed(2)}g</p>
                </div>
              </div>
            </nav>
          </div>
          <div className="media-right mx-5 pr-1">
          </div>
        </article>
        : <></>
      }

    </>
  )

}

export default ListStore