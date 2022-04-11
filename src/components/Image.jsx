import React from 'react'

const Image = (data) => {

  return (
    <div>
          <img src={data.data} alt="img" />
    </div>
  )
}

export default Image