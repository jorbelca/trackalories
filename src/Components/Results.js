import React from 'react'
import { useStore } from '../state/store';
import CardResults from './CardResults';
import ListStore from './ListStore';

const Results = () => {
  const { search } = useStore()

  return (
    <>
      <div className='mt-3'>
        {search.length === 0
          ? ''
          : <>
            <CardResults />

            <ListStore />
          </>
        }
      </div>
    </>
  )
}

export default Results