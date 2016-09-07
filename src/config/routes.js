import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from '../shared/containers/app'
import NotFound from '../shared/components/app/notFound'
import { Start } from '../routes/start'
import { Learning } from '../routes/learning'
import { Dao } from '../routes/dao'

export const routes = () => {
  return (
    <div>
      <Route path='/' component={App}>
        <IndexRoute component={Start} />
        <Route path='/learning/:number' component={Learning} />
        <Route path='/dao' component={Dao} />
      </Route>
      <Route path='*' component={NotFound} />
    </div>
  )
}
