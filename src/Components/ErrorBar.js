import React from 'react'
import { useStore } from '../state/store'

const ErrorBar = () => {
  const { errors, setErrors } = useStore()
  if (errors.length > 0) setTimeout(() => setErrors(''), 3000)
  return (
    <>
      <div className="notification is-danger p-3 has-text-weight-bold">
        {errors}
      </div>
    </>
  )
}

export default ErrorBar