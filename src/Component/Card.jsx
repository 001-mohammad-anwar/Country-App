import React from 'react'
import './Card.css'
import { Link } from 'react-router'
const Card = ({title ,image , Population , region , Capital , data}) => {
  return (
    <>
        <Link className="Cardcontainer" to={`/${title}`} state = {data}>
              <div className="card">
                  <div className="image">
                    <img src={image} alt="" />
                  </div>
                  <div className="cardText">
                    <h1>{title}</h1>
                    <p><b>Population:</b>{Population}</p>
                    <p><b>region:</b>{region}</p>
                    <p><b>Capital:</b>{Capital}</p>
                  </div>
              </div>
        </Link>
    </>
  )
}

export default Card
