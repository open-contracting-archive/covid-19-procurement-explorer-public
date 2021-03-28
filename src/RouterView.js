import React, { Fragment } from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import WebLayout from './layouts/WebLayout'
import EmbeddedVisualization from './layouts/pages/Visualization/EmbeddedVisualization'
import NotFound from './components/NotFound/NotFound'
import { webRoutes } from './routes/webRoutes'

const RouterView = () => {
    const renderWebRoutes = () => {
        return webRoutes.map((item, key) => {
            return (
                <Route key={key} path={item.path} exact={item.exact}>
                    <WebLayout>{item.component}</WebLayout>
                </Route>
            )
        })
    }

    return (
        <BrowserRouter>
            <Fragment>
                <Switch>
                    {renderWebRoutes()}

                    <Route
                        exact
                        path="/visualization/embedded/:visualizationId"
                        component={EmbeddedVisualization}
                    />

                    <Route>
                        <WebLayout>
                            <NotFound />
                        </WebLayout>
                    </Route>
                </Switch>
            </Fragment>
        </BrowserRouter>
    )
}

export default RouterView
