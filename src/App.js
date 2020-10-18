import React, {useEffect} from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Notfound from "./components/notfound";
import About from "./layouts/About";
import Country from "./layouts/Country";
import Header from "./components/header";
import Home from "./layouts/Home";
import JsonServices from "./services/jsonServices";
import { useDispatch } from "react-redux";
import { setCurrentLocale, setTranslations } from "./store/reducers/general/action"

function App() {
  const dispatch = useDispatch();

  useEffect( () => {
	dispatch(setCurrentLocale(window.localStorage.getItem("locale") || 'en' ));		  
    JsonServices.getTranslations().then(response => {
      dispatch(setTranslations(response))
    })
  }, [dispatch])

	return (
		<BrowserRouter>
			<Header />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/about" component={About} />
				<Route path="/country/mexico" component={Country} />
				<Route component={Notfound} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
