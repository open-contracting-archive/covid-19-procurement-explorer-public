import React, { Fragment, useEffect } from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    setCurrentLocale,
    setTranslations
} from './store/reducers/general/action'
import About from './layouts/About'
import Library from './layouts/Library'
import Resources from './layouts/Resources'
import Tags from './layouts/Tags'
import Blogs from './layouts/Blogs'
import Events from './layouts/Events'
import Country from './layouts/Country'
import Header from './components/Header/header'
import Home from './layouts/pages/Homepage'
import Footer from './components/Footer/footer'
import GlobalOverview from './layouts/pages/GlobalOverview'
import CountryProfileServices from './services/countryProfileServices'
import NotFound from './components/NotFound/NotFound'
import TenderDetail from './layouts/TenderDetail'
import News from './layouts/News'
import NewsDetail from './layouts/NewsDetail'
import EventsDetail from './layouts/EventsDetail'
import BlogsDetail from './layouts/BlogsDetail'
import ResourcesDetail from './layouts/ResourcesDetail'
import Insights from './components/country/insights'
import BuyerProfile from './layouts/BuyerProfile'
import SupplierProfile from './layouts/SupplierProfile'

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
                    <Route exact path="/country/:slug" component={Country} />
                    <Route path="/about" component={About} />
                    <Route
                        exact
                        path="/global-overview"
                        component={GlobalOverview}
                    />
                    <Route path="/tender/:tenderId" component={TenderDetail} />
                    <Route path="/news" component={News} />
                    <Route path="/news-detail/:id" component={NewsDetail} />
                    <Route path="/blogs-detail/:id" component={BlogsDetail} />
                    <Route path="/events-detail/:id" component={EventsDetail} />
                    <Route
                        path="/resources-detail"
                        component={ResourcesDetail}
                    />
                    <Route path="/library" component={Library} />
                    <Route path="/blogs" component={Blogs} />
                    <Route path="/events" component={Events} />
                    <Route path="/resources" component={Resources} />
                    <Route path="/tags" component={Tags} />
                    <Route path="/insights/:id" component={Insights} />
                    <Route path="/buyer-profile" component={BuyerProfile} />
                    <Route
                        path="/supplier-profile"
                        component={SupplierProfile}
                    />
                    <Route component={NotFound} />
                </Switch>
            </Fragment>
            <Footer />
        </BrowserRouter>
    )
}

export default App
