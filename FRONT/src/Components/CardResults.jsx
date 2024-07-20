import { mealStore, searchStore } from "../state/store";

const CardResults = () => {
  const search = searchStore((state) => state.search);
  const setMeal = mealStore((state) => state.setMeal);

  const {
    food_name,
    photo,
    nf_calories,
    nf_total_carbohydrate,
    nf_total_fat,
    nf_protein,
    serving_weight_grams,
  } = search;

  return (
    <>
      <div className="card-results ">
        <article className="media">
          <div className="media-left" style={{ alignSelf: "flex-end" }}>
            <figure className="image is-64x64">
              <img
                alt="meal"
                className="is-rounded is-64x64"
                src={`${photo.thumb}`}
              />
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>
                  {serving_weight_grams + " grams of " + food_name}
                </strong>
              </p>
            </div>
            <nav className="level is-mobile">
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">Calories</p>
                  <p className="is-size-6-mobile has-text-weight-bold">
                    {nf_calories} Kcal
                  </p>
                </div>
              </div>
              {/* <div className="grid"> */}
              <div className="level-item has-text-centered ">
                <div>
                  <p className="heading">Carbohidrates</p>
                  <p className="is-size-6-mobile has-text-weight-bold">
                    {nf_total_carbohydrate}g
                  </p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">Fat</p>
                  <p className="is-size-6-mobile has-text-weight-bold">
                    {nf_total_fat}g
                  </p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">Protein</p>
                  <p className="is-size-6-mobile has-text-weight-bold">
                    {nf_protein}g
                  </p>
                </div>
              </div>
              {/* </div> */}
            </nav>
          </div>
          <div className="media-right mt-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                setMeal(search);
              }}
              className="button button-add is-normal"
            >
              <span className="icon ">
                <i className="fas fa-lg fa-solid fa-circle-plus"></i>
              </span>
            </button>
          </div>
        </article>
      </div>
    </>
  );
};

export default CardResults;
