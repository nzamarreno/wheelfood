import * as React from "react"
import { inject, observer } from "mobx-react"
import { EateryStore } from "../../store"

export interface LoaderStoreProps {
    foodStore?: EateryStore
}

@inject("foodStore")
@observer
export class Loader extends React.Component<LoaderStoreProps, {}> {
    calculPercent = (): number => {
        const maxChoices = 5
        let percent = this.props.foodStore!.foodStoreSelected.length / 5 * 100
        return 100 - percent
    }

    render() {
        return (
            <div className="loader">
                <img
                    className="loader__animated"
                    style={{ clipPath: `inset(${this.calculPercent()}% 0 0 0)` }}
                    src="https://image.flaticon.com/icons/svg/561/561071.svg"
                    alt=""
                />
                <img src="https://image.flaticon.com/icons/svg/560/560969.svg" alt="" />
            </div>
        )
    }
}
