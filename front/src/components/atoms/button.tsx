import * as React from "react"

export interface ButtonProps {
    type: "stroke" | "fill"
    classComponent?: string
    onClick: () => void
}

export class Button extends React.Component<ButtonProps> {
    public render() {
        const { type, classComponent, onClick } = this.props

        return (
            <button role="button" className={`button button--${type} ${classComponent || ""}`} onClick={onClick}>
                {this.props.children}
            </button>
        )
    }
}
