import React from "react";

const InfoMeals = ({ data }) => {
  let totalCal = 0;
  let totalProt = 0;
  let totalCarbs = 0;
  let totalFats = 0;
  data.data.forEach((meal) => {
    totalProt += meal.nf_protein;
    totalCal += meal.nf_calories;
    totalCarbs += meal.nf_total_carbohydrate;
    totalFats += meal.nf_total_fat;
  });

  return (
    <div id="totals-tile">
      <div key={totalCal}>
        <div className="is-size-7 m-0 has-text-centered has-text-weight-bold">
          TOTALS
        </div>
        <div className="totalCard">
          <div className="totalCal has-text-centered mt-0 has-text-weight-bold">
            {+totalCal.toFixed(2)} <br /> KCal
          </div>
          <div className="totalMacros is-size-7 ">
            <div className="has-text-link">
              Protein: {+totalProt.toFixed(2)} g
              <br />
            </div>
            <div className="has-text-primary">
              Carbs: {+totalCarbs.toFixed(2)} g
              <br />
            </div>
            <div className="has-text-danger">
              Fats: {+totalFats.toFixed(2)} g
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoMeals;
