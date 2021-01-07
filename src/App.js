import React, { Fragment, useEffect } from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCountries, setCurrentLocale, setTranslations } from './store/reducers/general/action'
import CountryServices from "./services/CountryServices"
import Header from './layouts/_partials/header'
import Footer from './layouts/_partials/footer'
import NotFound from './components/NotFound/NotFound'
import Home from './layouts/pages/Homepage'
import GlobalOverview from './layouts/pages/GlobalOverview'
import CountryProfile from './layouts/pages/CountryProfile'
import Library from './layouts/pages/Library'
import News from './layouts/pages/News'
import NewsDetail from './layouts/pages/News/NewsDetail'
import Blogs from './layouts/pages/Blog/Blogs'
import BlogsDetail from './layouts/pages/Blog/BlogsDetail'
import Events from './layouts/pages/Events'
import EventsDetail from './layouts/pages/Events/EventsDetail'
import Resources from './layouts/pages/Resources'
import ResourcesDetail from './layouts/pages/Resources/ResourcesDetail'
import StaticPage from './layouts/pages/StaticPage'
import Tags from './layouts/pages/Library/Tags'
import TenderDetail from './layouts/pages/Tender/TenderDetail'
import BuyerProfile from './layouts/pages/Buyer/BuyerProfile'
import SupplierProfile from './layouts/pages/Supplier/SupplierProfile'

function App() {
    const dispatch = useDispatch()
    const currentLocale = useSelector((state) => state.general.currentLocale)

    useEffect(() => {
        dispatch(
            setCurrentLocale(window.localStorage.getItem('locale') || 'es')
        )

        CountryServices.getTranslations(currentLocale).then((response) => {
            if (response) {
                dispatch(setTranslations(response))
            }
        })
    }, [dispatch, currentLocale])

    useEffect(() => {
        CountryServices.Countries()
            .then((response) => {
                if (response) {
                    dispatch(setCountries(response))
                }
            })
    }, [dispatch])

    return (
        <BrowserRouter>
            <Fragment>
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />

                    <Route path="/global-overview/:tabSlug" component={GlobalOverview} />
                    <Route path="/global-overview/" component={GlobalOverview} />

                    <Route path="/country/:countrySlug/:tabSlug" component={CountryProfile} />
                    <Route path="/country/:countrySlug/" component={CountryProfile} />

                    <Route exact path="/news" component={News} />
                    <Route exact path="/news/:id" component={NewsDetail} />
                    <Route exact path="/blogs" component={Blogs} />
                    <Route exact path="/blogs/:id" component={BlogsDetail} />
                    <Route exact path="/events" component={Events} />
                    <Route exact path="/events/:id" component={EventsDetail} />
                    <Route exact path="/resources" component={Resources} />
                    <Route exact path="/resources/:id" component={ResourcesDetail} />
                    <Route path="/library" component={Library} />
                    <Route path="/tags" component={Tags} />
                    <Route path="/contracts/:contractId" component={TenderDetail} />
                    <Route path="/buyers/:id" component={BuyerProfile} />
                    <Route path="/suppliers/:id" component={SupplierProfile} />
                    <Route path="/pages/:slug" component={StaticPage} />
                    <Route component={NotFound} />
                </Switch>
            </Fragment>
            <Footer />
        </BrowserRouter>
    )
}

export default App
