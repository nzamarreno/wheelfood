import { observable } from "mobx"

export class UiStore {
    @observable
    isOpenRegisterPopin: boolean = false
    @observable
    isOpenConnectionPopin: boolean = false
}
