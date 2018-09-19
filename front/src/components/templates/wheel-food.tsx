import * as React from "react"
import { FoodList } from "./../organisms/food-list"
import { Loader } from "../molecules/loader"
import { observer, inject } from "mobx-react"
import { EateryStore } from "../../store"
import { ConfigStore } from "../../configuration-store"

export interface WheelFoodState {
    lottery: boolean
}

export interface WheelFoodProps {
    foodStore?: EateryStore
    configStore?: ConfigStore
}

@inject("foodStore", "configStore")
@observer
export class WheelFood extends React.Component<WheelFoodProps, WheelFoodState> {
    constructor(props: WheelFoodProps) {
        super(props)

        this.state = {
            lottery: false
        }
    }
    private gradients = [
        ["#D2B4FF", "#9CAAFF"],
        ["#22c1c3", "#03CEAD"],
        ["#7ED9D1", "#FA8C8D"],
        ["#F699B3", "#F6958F"],
        ["#98D0F4", "#51DBCC"],
        ["#87D9D3", "#22c1c3"],
        ["#F9A88D", "#FD789D"]
    ]

    private getRandomInt = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    render() {
        const randomNumber = this.getRandomInt(0, this.props.foodStore!.foodStoreSelected.length - 1)
        let typeOfRandomStore: any
        let randomFoodStore: any

        if (this.state.lottery) {
            randomFoodStore = this.props.foodStore!.foodStoreSelected[randomNumber]
            typeOfRandomStore = this.props.configStore!.foodType.filter(x => x.id === randomFoodStore.type)[0]
        }

        return (
            <>
                <div className="row">
                    {this.props.foodStore!.foodStoreSelected.map((x, index) => <div key={index} className="card" />)}
                </div>
                <div className="row">
                    {!this.state.lottery ? (
                        <>
                            <div className="col-md-7 wheelfood__loader">
                                <div className="wheelfood__desc wheelfood__desc--middle">
                                    <h1>Séléctionnez au moins 5 foodStores</h1>
                                    <p>Et laisser la chance faire pour vous occupez de votre diner</p>
                                    <div
                                        className="wheelfood__button"
                                        onClick={() => this.setState({ lottery: !this.state.lottery })}
                                    >
                                        <span className="fas fa-plus wheelfood__icon" />
                                        Tentez votre chance
                                    </div>
                                </div>

                                <Loader />
                            </div>
                            <div className="col-md-5">
                                <FoodList colorsList={this.gradients} />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="col-md-4 wheelfood__loader">
                                <div className="wheelfood__circle">
                                    <img
                                        className="wheelfood__picture"
                                        src={`assets/images/icono/fill/${
                                            this.state.lottery ? typeOfRandomStore.icono.pictureFill : ""
                                        }.svg`}
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="wheelfood__desc">
                                    <p>Ton destin te menera à manger...</p>
                                    <h1 className="wheelfood__title">Chez {this.state.lottery ? randomFoodStore.name : ""}</h1>
                                    <div
                                        className="wheelfood__button wheelfood__button--change"
                                        onClick={() => this.setState({ lottery: !this.state.lottery })}
                                    >
                                        <span className="fas fa-plus wheelfood__icon" />
                                        Cela ne me convient pas...
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </>
        )
    }
}
