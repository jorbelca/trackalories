import { useState } from "react";
import searchService from "../Services/searchService";
import { notificationStore, searchStore } from "../state/store";
import Results from "./Results";
import ImageRecognition from "./ImageRecognition";

const Search = () => {
  const [search, setSearchFood] = useState("");

  const setSearch = searchStore((state) => state.setSearch);
  const setNotification = notificationStore((state) => state.setNotifications);

  //debounce, not used by the image recognition implementation
  // const debouncedSearchService = useDebounce(async (search) => {
  //   const response = await searchService(search);
  //   setSearchFood("");
  //   // Manejar errores
  //   if (response.status !== 200) {
  //     return setNotification({ error: response.response.data.message });
  //   }
  //   // Almacenar en el estado global
  //   if (response.status === 200) setSearch(response.data.foods[0]);
  // }, 900);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (search.length === 0) {
      return setNotification({ error: "Please introduce some value " });
    }
    // Service for the search of the meal
    const response = await searchService(search);
    setSearchFood("");

    // Handle errors
    if (response.status !== 200) {
      return setNotification({ error: response.response.data.message });
    }

    // Storing in the global state
    if (response.status === 200) setSearch(response.data.foods[0]);
  };

  const handleChange = (e) => {
    if (e.target.value.startsWith(" ")) return;
    setSearchFood(e.target.value);
  };

  return (
    <>
      <div className="container is-max-desktop">
        <div className="column is-mobile ">
          <form onSubmit={handleSubmit}>
            <div className="field has-addons" style={{ textAlign: "" }}>
              <div className="control is-expanded">
                <input
                  className="input"
                  type="text"
                  placeholder="66g of broccolli"
                  value={search}
                  onChange={handleChange}
                  data-cy="search-bar"
                />
              </div>
              <div className="control">
                <button className="button is-success" type="submit">
                  Search
                </button>
                <ImageRecognition setSearchFood={setSearchFood} />
              </div>
            </div>
          </form>
          {/* Results of the search */}
          <Results />
        </div>
      </div>
    </>
  );
};

export default Search;
