import * as React from "react"
import { InputChoice } from "../molecules/input-choice"
import { observer, inject } from "mobx-react"
import { EateryStore } from "../../store"
import { Slider } from "./slider"
import { observable } from "mobx"
import { ConfigStore, FoodConfig } from "../../configuration-store"

export interface CardAddFoodStore {
    configStore?: ConfigStore
    foodStore?: EateryStore
}

@inject("configStore", "foodStore")
@observer
export class CardAddFoodEatery extends React.Component<CardAddFoodStore, {}> {
    @observable
    nameFood: string = ""
    @observable
    distance: string = ""
    @observable
    price: string = ""
    @observable
    typeFood: FoodConfig | null
    @observable
    resetComponent: boolean = false

    constructor(props: CardAddFoodStore) {
        super(props)
    }

    private handleSubmit = () => {
        if (this.nameFood !== "") {
            this.props.foodStore!.insertStore(this.nameFood, this.price, this.distance, this.typeFood)
            this.reset()
        }
    }

    private reset = () => {
        this.nameFood = ""
    }

    public render() {
        return (
            <div className="cardStore">
                <i className="fas fa-check" />
                <div className="cardStore-name">
                    <img className="cardStore-name__operator" src="assets/images/operator.svg" alt="WheelFood" />
                    <textarea
                        className="cardStore-name__textarea"
                        value={this.nameFood}
                        placeholder="Saisir le nom du foodStore..."
                        onChange={e => (this.nameFood = e.currentTarget.value)}
                    />
                </div>
                <div className="line">
                    <span className="line__gradient line--first" />
                    <span className="line__gradient line--second" />
                    <span className="line__gradient line--third" />
                </div>

                <div className="cardStore__wrapper">
                    <h3 className="title--md">Type de foodStore</h3>
                    <Slider onChange={type => (this.typeFood = type)} />
                    <div className="input-choice">
                        <div className="input-choice__title text--md">Prix</div>
                        <InputChoice categories={this.props.configStore!.price} onChange={price => (this.price = price)} />
                    </div>
                    <div className="input-choice">
                        <div className="input-choice__title text--md">Distance</div>
                        <InputChoice
                            categories={this.props.configStore!.distance}
                            onChange={distance => (this.distance = distance)}
                        />
                    </div>
                    <div className="button-wrapper--center">
                        <button className="button button--fill" onClick={() => this.handleSubmit()}>
                            Passe commande <i className="button__icon fas fa-long-arrow-alt-right" />
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
