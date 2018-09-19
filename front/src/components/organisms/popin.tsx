import * as React from "react"
import { EateryStore } from "../../store"
import { inject, observer } from "mobx-react"
import { Input } from "../atoms/input"
import { UiStore } from "../../ui-store"

export interface PopinState {
    pseudo: string
    password: string
}

export interface PopinProps {
    foodStore?: EateryStore
    uiStore?: UiStore
}

@inject("foodStore", "uiStore")
@observer
export class Popin extends React.Component<PopinProps, PopinState> {
    constructor(props: PopinProps) {
        super(props)

        this.state = {
            pseudo: "Mysteria",
            password: ""
        }
    }

    private handlePseudoChange = (value: string) => {
        this.setState({
            pseudo: value
        })
    }

    private handlePassword = (value: string) => {
        this.setState({
            password: value
        })
    }

    private handleClick = () => {
        this.props
            .foodStore!.authUser(this.state.pseudo, this.state.password)
            .then(response => response.json())
            .then(response => {
                this.props.foodStore!.foodStore = response.foodStore
                this.props.foodStore!.user = response.user
                this.props.foodStore!.activeAccountCookie(response.user.id)
                this.props.uiStore!.isOpenConnexionPopin = false
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div className="popin">
                <div className="popin__wrapper">
                    <main className="popin__content">
                        <div className="popin__avatar">
                            <img src="assets/images/woman.svg" alt="WheelFood" />
                        </div>
                        <h1 className="popin__text">Connectez-vous dès maintenant pour retrouver vos restaurants enregistrés</h1>
                        <Input
                            onChange={value => this.handlePseudoChange(value)}
                            color={true}
                            value={this.state.pseudo}
                            placeholder="Your pseudo"
                            type="text"
                        />
                        <Input
                            onChange={value => this.handlePassword(value)}
                            color={true}
                            value={this.state.password}
                            placeholder="Your password"
                            type="password"
                        />
                        <footer className="popin__footer">
                            <div className="popin__close" onClick={() => (this.props.uiStore!.isOpenConnexionPopin = false)}>
                                <i className="fas fa-arrow-left" /> RETOUR
                            </div>
                            <button className="button button--fill popin__button" onClick={() => this.handleClick()}>
                                Connexion
                            </button>
                        </footer>
                    </main>
                </div>
            </div>
        )
    }
}
