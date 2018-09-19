import * as React from "react"
import { inject, observer } from "mobx-react"
import { EateryStore } from "../../store"
import { UiStore } from "../../ui-store"

export interface HeaderProps {
    foodStore?: EateryStore
    uiStore?: UiStore
}

@inject("foodStore", "uiStore")
@observer
export class Header extends React.Component<HeaderProps, {}> {
    constructor(props: HeaderProps) {
        super(props)
    }

    public render() {
        return (
            <header className="header">
                <div className="row">
                    <div className="col-md-6">
                        <img className="header__logo" src="assets/images/wheelFood_logo.svg" alt="WheelFood" />
                        <h2 className="title-baseline">Well, where are you going to eat ?</h2>
                    </div>

                    {this.props.foodStore!.user ? (
                        <div className="col-md-6 header__profiler">
                            <div className="header-profil">
                                <div className={`popin__avatar popin__avatar--man header-profil__avatar`}>
                                    {this.props.foodStore!.user.gender === "man" ? (
                                        <img src="assets/images/man.svg" alt="I am a Man" />
                                    ) : (
                                        <img src="assets/images/woman.svg" alt="I am a Woman" />
                                    )}
                                </div>
                                <div className="header-profil__information">
                                    <h2 className="header-profil__pseudo">{this.props.foodStore!.user.pseudo}</h2>
                                    <p className="header-profil__email">
                                        {this.props.foodStore!.user.email}
                                        <span
                                            className="header-profil__deconnexion"
                                            onClick={() => this.props.foodStore!.disconnect()}
                                        >
                                            Déconnexion <i className="fas fa-long-arrow-alt-right" />
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="col-md-6 header__connexion">
                            <button
                                role="button"
                                className="button button--fill"
                                onClick={() => (this.props.uiStore!.isOpenConnexionPopin = true)}
                            >
                                Connexion <i className="button__icon fas fa-long-arrow-alt-right" />
                            </button>

                            <button
                                role="button"
                                className="button button--stroke"
                                onClick={() => (this.props.uiStore!.isOpenRegisterPopin = true)}
                            >
                                Inscription <i className="button__icon fas fa-long-arrow-alt-right" />
                            </button>
                        </div>
                    )}
                </div>
            </header>
        )
    }
}
