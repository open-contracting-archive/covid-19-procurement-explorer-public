import React, { Fragment, useEffect } from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Notfound from './components/notfound/notfound'
import About from './layouts/About'
import Country from './layouts/Country'
import Data from './layouts/Data'
import Header from './components/header/header'
import Home from './layouts/Home'
import Footer from './components/footer/footer'
import GeoChart from './components/charts/GeoChart/GeoChart'
import CountryProfileServices from './services/countryProfileServices'
import { useDispatch, useSelector } from 'react-redux'
import {
    setCurrentLocale,
    setTranslations
} from './store/reducers/general/action'
import TenderDetail from './layouts/TenderDetail'

function App() {
    const dispatch = useDispatch()
    const currentLocale = useSelector((state) => state.general.currentLocale)

    useEffect(() => {
        dispatch(
            setCurrentLocale(window.localStorage.getItem('locale') || 'es')
        )
        CountryProfileServices.getTranslations(currentLocale).then(
            (response) => {
                dispatch(setTranslations(response))
            }
        )
    }, [dispatch, currentLocale])

    return (
        <BrowserRouter>
            <Fragment>
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/geo-chart" component={GeoChart} />
                    <Route exact path="/country/:id" component={Country} />
                    <Route exact path="/data-visualization" component={Data} />
                    <Route
                        path="/country/:id/tender/:tenderId"
                        component={TenderDetail}
                    />
                    <Route component={Notfound} />
                </Switch>
            </Fragment>
            <Footer />
        </BrowserRouter>
    )
}

export default App
