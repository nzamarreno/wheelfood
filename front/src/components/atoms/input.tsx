import * as React from "react"

export interface InputProps {
    onChange: (value: string) => void
    value: string
    placeholder: string
    type: string
    color: boolean
}

export class Input extends React.Component<InputProps, {}> {
    constructor(props: InputProps) {
        super(props)
    }

    render() {
        return (
            <>
                <input
                    className={`input ${this.props.color ? "input--gray" : "input--white"}`}
                    type={this.props.type}
                    onChange={event => this.props.onChange(event.target.value)}
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                />
            </>
        )
    }
}
