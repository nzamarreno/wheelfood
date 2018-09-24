import * as React from "react"

export class Popin extends React.Component {
    public render() {
        return (
            <div className="popin">
                <div className="popin__wrapper">
                    <div className="popin__content">{this.props.children}</div>
                </div>
            </div>
        )
    }
}
