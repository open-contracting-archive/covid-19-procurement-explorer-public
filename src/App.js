import React, { Fragment, useEffect } from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import About from './layouts/About'
import Library from './layouts/Library'
import Resources from './layouts/Resources'
import Tags from './layouts/Tags'
import Blogs from './layouts/Blogs'
import Events from './layouts/Events'
import Country from './layouts/Country'
import Data from './layouts/Data'
import Header from './components/header/header'
import Home from './layouts/Home'
import Footer from './components/footer/footer'
import GeoChart from './components/charts/GeoChart/GeoChart'
import GlobalProfile from './layouts/GlobalProfile'
import CountryProfileServices from './services/countryProfileServices'
import { useDispatch, useSelector } from 'react-redux'
import NotFound from './components/NotFound/notfound'

import {
    setCurrentLocale,
    setTranslations
} from './store/reducers/general/action'
import TenderDetail from './layouts/TenderDetail'
import News from './layouts/News'
import NewsDetail from './layouts/NewsDetail'
import EventsDetail from './layouts/EventsDetail'
import BlogsDetail from './layouts/BlogsDetail'

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
                    <Route exact path="/country/:slug" component={Country} />
                    <Route exact path="/data" component={GlobalProfile} />
                    <Route exact path="/global-data" component={Data} />
                    <Route path="/tender/:tenderId" component={TenderDetail} />
                    <Route exact path="/news" component={News} />
                    <Route path="/news-detail/:id" component={NewsDetail} />
                    <Route path="/blogs-detail/:id" component={BlogsDetail} />
                    <Route path="/events-detail/:id" component={EventsDetail} />
                    <Route path="/library" component={Library} />
                    <Route path="/blogs" component={Blogs} />
                    <Route path="/events" component={Events} />
                    <Route path="/resources" component={Resources} />
                    <Route path="/Tags" component={Tags} />
                    <Route component={NotFound} />
                </Switch>
            </Fragment>
            <Footer />
        </BrowserRouter>
    )
}

export default App
