import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import './assets/scss/tailwind.scss'
import './assets/scss/main.scss'
import store from './store'
import App from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'
import { ModalProvider } from 'react-simple-hook-modal'
import * as Sentry from "@sentry/react"
import { Integrations } from "@sentry/tracing"

if (process.env.NODE_ENV === 'production') {
    Sentry.init({
        dsn: "https://f2c9b76e5d3f4d229871073fd9f16280@o288126.ingest.sentry.io/5597840",
        integrations: [
            new Integrations.BrowserTracing()
        ],
        tracesSampleRate: 0
    })
}

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <ModalProvider>
                <App />
            </ModalProvider>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
