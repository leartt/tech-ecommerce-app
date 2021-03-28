import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

function GuestRoute({ component: Component, ...rest }) {
   const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

   return (
      <Route {...rest} render={(props) => (
         !isLoggedIn ? <Component {...props} />
            : <Redirect to={props.location.state ? props.location.state.from.pathname : '/'} />
      )}
      />
   )
}

export default GuestRoute