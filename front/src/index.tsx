import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "mobx-react"
import { App } from "./app"
import { EateryStore } from "./store"
import { ConfigStore } from "./configuration-store"
import {UiStore} from "./ui-store"

const eateryStore = new EateryStore()
const configStore = new ConfigStore()
const uiStore = new UiStore()

const stores = {
    foodStore: eateryStore,
    configStore: configStore,
    uiStore: uiStore
}

ReactDOM.render(
    <Provider {...stores}>
        <App />
    </Provider>,
    document.getElementById("app")
)
