import * as React from "react"
import { EateryStore } from "../../store"
import { inject, observer } from "mobx-react"
import { Input } from "../atoms/input"
import { UiStore } from "../../ui-store"

export interface PopinRegisterState {
    pseudo: string
    password: string
    email: string
    gender: "man" | "woman"
}

export interface PopinRegisterProps {
    foodStore?: EateryStore
    uiStore?: UiStore
}

@inject("foodStore", "uiStore")
@observer
export class PopinRegister extends React.Component<PopinRegisterProps, PopinRegisterState> {
    constructor(props: PopinRegisterProps) {
        super(props)

        this.state = {
            pseudo: "John Doe",
            password: "hello",
            email: "me@contact.com",
            gender: "woman"
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

    private handleEmail = (value: string) => {
        this.setState({
            email: value
        })
    }

    private handleClick = () => {
        this.props
            .foodStore!.registerUser(this.state.pseudo, this.state.email, this.state.password, this.state.gender)
            .then(response => response.json())
            .then(response => {
                this.props.foodStore!.activeAccountCookie(response)
                this.props.uiStore!.isOpenRegisterPopin = false
                this.props.foodStore!.user = {
                    id: response,
                    email: this.state.email,
                    pseudo: this.state.pseudo,
                    gender: this.state.gender
                }
            })
            .catch(error => console.log(error))
    }

    private changeGenderClick = (gender: "man" | "woman") => {
        this.setState({ gender: gender })
    }

    render() {
        return (
            <div className="popin">
                <div className="popin__wrapper">
                    <div className="popin__content">
                        <h1 className="popin__text popin__text--register">Faisons connaissance</h1>

                        <div className="popin__gender">
                            <div
                                className={`popin__avatar popin__avatar--register popin__avatar--woman ${
                                    this.state.gender === "woman" ? "popin__avatar--isActive" : ""
                                }`}
                                onClick={() => this.changeGenderClick("woman")}
                            >
                                <img src="assets/images/woman.svg" alt="WheelFood" />
                            </div>
                            <div
                                className={`popin__avatar popin__avatar--register popin__avatar--man ${
                                    this.state.gender === "man" ? "popin__avatar--isActive" : ""
                                }`}
                                onClick={() => this.changeGenderClick("man")}
                            >
                                <img src="assets/images/man.svg" alt="WheelFood" />
                            </div>
                        </div>

                        <Input
                            onChange={value => this.handlePseudoChange(value)}
                            color={true}
                            value={this.state.pseudo}
                            placeholder="Your pseudo"
                            type="text"
                        />
                        <Input
                            onChange={value => this.handleEmail(value)}
                            color={true}
                            value={this.state.email}
                            placeholder="Your email"
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
                            <div className="popin__close" onClick={() => (this.props.uiStore!.isOpenRegisterPopin = false)}>
                                <i className="fas fa-arrow-left" /> RETOUR
                            </div>
                            <button className="button button--fill popin__button" onClick={() => this.handleClick()}>
                                Je m'inscris !
                            </button>
                        </footer>
                    </div>
                </div>
            </div>
        )
    }
}
