import React from "react"
import ReactDOM from "react-dom/client"
import "./styles/index.css"
import App from "./App"
// import { createStore } from "redux"
import { Provider } from "react-redux"
// import rootReducer from "./store/reducers"
import "./services/i18n";
import store from './store/reducers'

// const store = createStore(
//     rootReducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )

ReactDOM.createRoot(document.getElementById("root"))
    .render(
        <React.StrictMode>
            <React.Suspense fallback="Loading...">
                <Provider store={store}>
                    <App className="container" />
                </Provider>
            </React.Suspense>
        </React.StrictMode>
    )
