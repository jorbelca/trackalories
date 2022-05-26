import React from 'react'

const Search = () => {

  return (
    <>
      <div className="container is-max-desktop">
        <div>Search</div>


        <div className="field has-addons">
          <div className="control is-expanded">
            <input className="input" type="text" placeholder="Find a repository" />
          </div>
          <div className="control">
            <a className="button is-info">
              Search
            </a>
          </div>
        </div>
      </div>

    </>
  )
}

export default Search