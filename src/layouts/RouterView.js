import React, { Fragment, Suspense } from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import WebLayout from './WebLayout'
import { webRoutes } from '../routes/webRoutes'
import { NotFound } from '../components/Utilities'
import Loader from '../components/Utilities/Loader'
import EmbeddedVisualization from './pages/Visualization/EmbeddedVisualization'

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
                <Suspense fallback={<Loader />}>
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
                </Suspense>
            </Fragment>
        </BrowserRouter>
    )
}

export default RouterView
