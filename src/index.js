import React from "react";
import ReactDOM from "react-dom";
import "./assets/tailwind.scss";
import "./assets/main.scss";
import App from "./App";
import {
	Route,
	NavLink,
	BrowserRouter,
	Switch,
} from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import Notfound from "./components/notfound";
import About from "./layouts/About";
import Country from "./layouts/Country";

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<div>
				<ul>
					<li>
						<NavLink exact activeClassName="active" to="/">
							Home
						</NavLink>
					</li>
					<li>
						<NavLink activeClassName="active" to="/about">
							About
						</NavLink>
					</li>
					<li>
						<NavLink activeClassName="active" to="/country/mexico">
							Country
						</NavLink>
					</li>
				</ul>
				<hr />
				<Switch>
					<Route exact path="/" component={App} />
					<Route path="/about" component={About} />
					<Route path="/country/mexico" component={Country} />
					<Route component={Notfound} />
				</Switch>
			</div>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();