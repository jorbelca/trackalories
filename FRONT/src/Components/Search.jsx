import { useCallback, useState } from "react"
import searchService from "../Services/searchService"
import { notificationStore, searchStore } from "../state/store"
import Results from "./Results"
import debounce from "just-debounce-it"

const Search = () => {
  const [search, setSearchFood] = useState("")

  const setSearch = searchStore((state) => state.setSearch)
  const setNotification = notificationStore((state) => state.setNotifications)

  const debouncedSearchService = useCallback(
    debounce(async (search) => {
      const response = await searchService(search)
      setSearchFood("")

      // Handle errors
      if (response.status !== 200) {
        return setNotification({ error: response.response.data.message })
      }
      // Storing in the global state
      if (response.status === 200) setSearch(response.data.foods[0])
    }, 700),
    []
  )

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (search.length === 0) {
      return setNotification({ error: "Please introduce some value " })
    }
    // Service for the search of the meal
    const response = await searchService(search)
    setSearchFood("")

    // Handle errors
    if (response.status !== 200) {
      return setNotification({ error: response.response.data.message })
    }

    // Storing in the global state
    if (response.status === 200) setSearch(response.data.foods[0])
  }

  const handleChange = (e) => {
    if (e.target.value.startsWith(" ")) return

    setSearchFood(e.target.value)
    debouncedSearchService(e.target.value)
  }

  return (
    <>
      <div className="container is-max-desktop">
        <div className="column is-mobile ">
          <form onSubmit={handleSubmit}>
            <div className="field has-addons">
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
              {/* <div className="control">
                <button className="button is-success">Search</button>
              </div> */}
            </div>
          </form>
          {/* Results of the search */}
          <Results />
        </div>
      </div>
    </>
  )
}

export default Search
