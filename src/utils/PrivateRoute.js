import React from 'react'
import {Route} from 'react-router-dom'

export const PrivateRoute = ({children, ...rest}) => {
  return (
    <Route {...rest}>{children}</Route>
  )
}
