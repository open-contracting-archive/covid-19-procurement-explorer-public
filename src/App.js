import React, { useEffect } from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Notfound from './components/notfound/notfound'
import About from './layouts/About'
import Country from './layouts/Country'
import Header from './components/header/header'
import Home from './layouts/Home'
import Footer from './components/footer/footer'
import Map from './components/charts/map'
import CountryProfileServices from './services/countryProfileServices'
import { useDispatch, useSelector } from 'react-redux'
import {
    setCurrentLocale,
    setTranslations
} from './store/reducers/general/action'

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
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/map" component={Map} />
                <Route path="/country/:id" component={Country} />
                <Route component={Notfound} />
            </Switch>
            <Footer/>
        </BrowserRouter>
    )
}

export default App
