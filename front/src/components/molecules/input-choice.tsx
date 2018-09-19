import * as React from "react"

export interface InputChoiceProps {
    categories: string[]
    onChange: (value: string) => void
}

export interface InputChoiceState {
    indexElementActive: number
}

export class InputChoice extends React.Component<InputChoiceProps, InputChoiceState> {
    constructor(props: InputChoiceProps) {
        super(props)

        this.state = {
            indexElementActive: 0
        }
    }

    componentDidMount() {
        this.props.onChange(this.props.categories[0])
    }

    private handleClick = (item: string, index: number) => {
        this.props.onChange(item)
        this.setState({
            indexElementActive: index
        })
    }

    public render() {
        return (
            <ul className="input-choice__selection">
                {this.props.categories.map((item, index) => {
                    return (
                        <li
                            key={index}
                            onClick={() => this.handleClick(item, index)}
                            className={`input-choice__item ${
                                this.state.indexElementActive === index ? "input-choice__item--active" : ""
                            }`}
                        >
                            {item}
                        </li>
                    )
                })}
            </ul>
        )
    }
}
