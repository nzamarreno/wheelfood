import * as React from "react"
import { observer, inject } from "mobx-react"
import { EateryStore, FoodStore } from "./../../store"
import { ConfigStore } from "../../configuration-store"
import {type} from "os"

export interface FoodListProps {
    foodStore?: EateryStore
    configStore?: ConfigStore
    colorsList: string[][]
}

@inject("foodStore", "configStore")
@observer
export class FoodList extends React.Component<FoodListProps, {}> {
    constructor(props: FoodListProps) {
        super(props)
    }

    private getRandomInt = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    private handleClick = (foodStore: FoodStore) => {
        this.props.foodStore!.pinStore(foodStore)
    }

    render() {
        const listFood = (this.props.configStore!.filterActive === null) ? this.props.foodStore!.foodStore : this.props.foodStore.foodStore.filter(x => {
            return (x.type === this.props.configStore!.filterActive.id)
        })

        return (
            <div className="card-choice">
                <ul className="tags">
                    {this.props.configStore!.filterActive && (
                        <li className="tags__tag">
                            <i className="tags__icon fas fa-times" onClick={() => this.props.configStore.filterActive = null}/>
                            {this.props.configStore.filterActive.name}
                        </li>
                    )}
                </ul>
                <ul className="card-choice__list">
                 {listFood.length > 0 &&
                        listFood.map((foodStore, index) => {
                            const colorGradient = this.getRandomInt(0, this.props.colorsList.length - 1)
                            const typeFoodCurrent = this.props.configStore.foodType.filter(x => x.id === foodStore.type)[0]

                            return (
                                <li
                                    className="card-choice__foodStore"
                                    key={index}
                                    onClick={() => this.handleClick(foodStore)}
                                    style={{
                                        background: `-webkit-linear-gradient(left, ${this.props.colorsList[colorGradient][0]}, ${
                                            this.props.colorsList[colorGradient][1]
                                        })`,
                                        animationDelay: `${index * 0.3}s`
                                    }}
                                >
                                    <div className="card-choice-intitulate">
                                        <div className="card-choice-intitulate__icono">
                                            <img src={`assets/images/icono/fill/${typeFoodCurrent.icono.pictureFill || null}.svg`} alt="" />
                                        </div>
                                        <div className="card-choice-intitulate__name">
                                            <span>Manger chez</span>
                                            {foodStore.name}
                                        </div>
                                        <div
                                            className={`card-choice-intitulate__status ${
                                                foodStore.isSelected ? "card-choice-intitulate__status--active" : ""
                                            }`}
                                            style={{ color: `${this.props.colorsList[colorGradient][1]}` }}
                                        />
                                    </div>
                                    <ul className="card-choice-desc">
                                        <li className="card-choice-desc__item">
                                            <span>Type</span>
                                            {typeFoodCurrent.name}
                                        </li>
                                        <li className="card-choice-desc__item">
                                            <span>Prix</span>
                                            {foodStore.price}
                                        </li>
                                        <li className="card-choice-desc__item">
                                            <span>Distance</span>
                                            {foodStore.distance}
                                        </li>
                                    </ul>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}
