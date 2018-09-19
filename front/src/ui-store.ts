import {observable} from "mobx"

export class UiStore {
    @observable isOpenRegisterPopin: boolean = false
    @observable isOpenConnexionPopin: boolean = false
}