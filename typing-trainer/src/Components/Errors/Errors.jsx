import React from 'react'
import './Errors.scss'
import { Link } from 'react-router-dom'

const Errors = ({errorMessage}) => {
  return (
    !errorMessage?
    <div className="error-container">
      <h2 className="error-code">404</h2>
      <p className="error-message">Sorry this page could not be found</p>
      <Link to={'/'}>Home</Link>
    </div>
    :
    <div className="error-container">
      <h2 className="error-code">{errorMessage.response.status}</h2>
      <p className="error-message">{errorMessage.response.data.msg}</p>
      <Link to={'/'}>Home</Link>
    </div>
  )
}

export default Errors