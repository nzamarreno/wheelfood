import { observable, action } from "mobx"
import { EndPoint } from "./enums/endpoint"
import { FoodConfig } from "./configuration-store"

export interface FoodStore {
    id: number
    name: string
    isSelected: boolean
    type: number
    distance: string
    price: string
}

export interface User {
    id: number
    pseudo: string
    email: string
    gender: string
}

export class EateryStore {
    private nameCookie: string = ""

    @observable
    public foodStore: FoodStore[] = []
    @observable
    public user: User | null
    @observable
    public foodStoreSelected: FoodStore[] = []

    constructor() {
        this.nameCookie = "iduser"
    }

    @action
    public pinStore(foodStore: FoodStore) {
        if (foodStore.isSelected) {
            const store = this.foodStoreSelected.filter(x => x.name !== foodStore.name)
            this.foodStoreSelected = store
        } else {
            this.foodStoreSelected.push(foodStore)
        }

        foodStore.isSelected = !foodStore.isSelected
    }

    @action
    public authUser(pseudo: string, password: string) {
        return fetch(`${EndPoint.ADRESS}/api/authuser?XDEBUG_SESSION_START`, {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                pseudo: pseudo,
                password: password
            })
        })
    }

    @action
    connexionUser() {
        if (this.IsAuthUser(this.nameCookie)) {
            return fetch(`${EndPoint.ADRESS}/api/authuser/${this.IsAuthUser(this.nameCookie)}?XDEBUG_SESSION_START`, {
                method: "GET",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-type": "application/json"
                }
            })
                .then(response => response.json())
                .then(response => {
                    this.foodStore = response.foodStore
                    this.user = response.user
                })
                .catch(error => console.log(error))
        } else {
            return null
        }
    }

    public activeAccountCookie = (idUser: number) => {
        document.cookie = `${this.nameCookie}=${idUser}`
    }

    private deleteCookie = () => {
        document.cookie = `${this.nameCookie}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
    }

    private IsAuthUser = (name: any) => {
        return (
            (name = new RegExp("(?:^|;\\s*)" + ("" + name).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") + "=([^;]*)").exec(
                document.cookie
            )) && name[1]
        )
    }

    @action
    public disconnect() {
        this.deleteCookie()
        this.foodStore = []
        this.user = null
        this.foodStoreSelected = []
    }

    @action
    public registerUser(pseudo: string, email: string, password: string, gender: string) {
        return fetch(`${EndPoint.ADRESS}/api/registeruser?XDEBUG_SESSION_START`, {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                pseudo: pseudo,
                email: email,
                password: password,
                gender: gender
            })
        })
    }

    @action
    public insertStore(title: string, price: string, distance: string, type: FoodConfig) {
        fetch(`${EndPoint.ADRESS}/api/foodstore?XDEBUG_SESSION_START`, {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name: title,
                type: type.id,
                distance: distance,
                price: price,
                userId: this.user.id
            })
        })
            .then(response => response.json())
            .then(response => {
                this.foodStore.push({
                    id: response,
                    name: title,
                    isSelected: false,
                    type: type.id,
                    distance: distance,
                    price: price
                })
            })
            .catch(error => console.log(error))
    }
}
