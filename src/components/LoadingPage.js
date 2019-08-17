import React from 'react'

const LoadingPage = () => {
  return (
    <div className="container layout-children-container">
      <div className="blankslate">
        <h1>
          <span className="ion ion-md-refresh mr-3 ion-spin" />
          Loading...
        </h1>
      </div>
    </div>
  )
}

export default LoadingPage
