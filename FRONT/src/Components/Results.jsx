import React from "react";
import { searchStore } from "../state/store";
import CardResults from "./CardResults";
import ListStore from "./ListStore";

const Results = () => {
  const search = searchStore((state) => state.search);

  return (
    <>
      <div className="mt-3">
        {search.length === 0 ? (
          ""
        ) : (
          <>
            <CardResults />

            <ListStore />
          </>
        )}
      </div>
    </>
  );
};

export default Results;
