import React from 'react'
import { useStore } from '../state/store'


const CardResults = () => {
  const { search, setMeal } = useStore()

  const { food_name, photo, nf_calories, nf_total_carbohydrate, nf_total_fat, nf_protein, serving_weight_grams } = search


  return (
    <>
      <div className='card-results'>
        <article className="media">
          <figure className="media-left">
            <p className="image is-64x64">
              <img className="is-rounded" src={`${photo.thumb}`} />
            </p>
          </figure>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{serving_weight_grams + ' grams of ' + food_name}</strong>
              </p>
            </div>
            <nav className="level is-mobile">
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">Calories</p>
                  <p className="title is-6">{nf_calories} Kcal</p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">Carbohidrates</p>
                  <p className="title is-6">{nf_total_carbohydrate}g</p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">Fat</p>
                  <p className="title is-6">{nf_total_fat}g</p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">Protein</p>
                  <p className="title is-6">{nf_protein}g</p>
                </div>
              </div>
            </nav>
          </div>
          <div className="media-right  mt-4">

            <button onClick={(e) => {
              e.preventDefault()
              setMeal(search)
            }} className="button button-add">
              <span className="icon ">
                <i className="fas fa-lg fa-solid fa-circle-plus"></i>
              </span>
            </button>

          </div>

        </article >
      </div >

    </>
  )
}

export default CardResults