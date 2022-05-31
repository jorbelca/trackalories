import React, { useEffect, useState } from 'react'
import Bar from '../Components/Bar'
import { useStore } from '../state/store'
import { getMealsService } from '../Services/storeMealsService'

const Diary = () => {
  const [meals, setMeals] = useState([])
  const { user } = useStore()
  const token = user.token

  useEffect(() => {
    const find = async (token) => {
      const { data } = await getMealsService(token)

      let results
      data.map(n => results = n.data)


      setMeals(results)
    }
    find(token)
  }, [])




  console.log(meals);


  return (
    <>
      <Bar />
      <div>Diary</div>

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

              }} className="button button-remove">
                <span className="icon ">
                  <i className="fas fa-lg fa-solid fa-circle-minus"></i>
                </span>
              </button>

            </div>

          </article >
        </div >)
      }
    </>

  )
}

export default Diary