import React, { Fragment, Suspense } from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import WebLayout from './layouts/WebLayout'
import EmbeddedVisualization from './layouts/pages/Visualization/EmbeddedVisualization'
import NotFound from './components/NotFound/NotFound'
import { webRoutes } from './routes/webRoutes'
import Loader from './components/Loader/Loader'

const RouterView = () => {
    const renderWebRoutes = () => {
        return webRoutes.map((item, key) => {
            return (
                <Route key={key} path={item.path} exact={item.exact}>
                    <Suspense fallback={<Loader />}>
                        <WebLayout>{item.component}</WebLayout>
                    </Suspense>
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
