import * as React from "react"
import { inject, observer } from "mobx-react"
import { Header } from "./components/organisms/header"
import { Filter } from "./components/organisms/filter"
import { WheelFood } from "./components/templates/wheel-food"
import { CardAddFoodEatery } from "./components/organisms/card-add-foodstore"
import { EateryStore } from "./store"
import { PopinRegister } from "./components/organisms/popinRegister"
import { UiStore } from "./ui-store"
import { Popin } from "./components/organisms/popin"

export interface AppProps {
    foodStore?: EateryStore
    uiStore?: UiStore
}

export interface AppState {
    isLoaded: boolean
}

@inject("foodStore", "uiStore")
@observer
export class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props)

        this.state = {
            isLoaded: false
        }
    }

    componentDidMount() {
        const result = this.props.foodStore!.connexionUser()

        if (result === undefined || result === null) {
            this.props.foodStore!.foodStore = []
        }

        this.setState({ isLoaded: true })
    }

    public render() {
        return (
            <>
                {this.state.isLoaded ? (
                    <main id="main">
                        <div className="container">
                            {this.props.uiStore!.isOpenRegisterPopin && <PopinRegister />}
                            {this.props.uiStore!.isOpenConnexionPopin && <Popin />}
                            <Header />
                            <Filter />
                            <WheelFood />
                        </div>
                        <div className="addStore">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6 addStore__desc">
                                        <div className="addStore__title">
                                            <h1 className="title">Ajoute tes foodStores</h1>
                                            <h2 className="title-baseline">it's easy, fill, launch & eat...</h2>
                                            <div className="line addStore__line">
                                                <span className="line__gradient line--first" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <CardAddFoodEatery />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                ) : (
                    <div>Is loading</div>
                )}
            </>
        )
    }
}
