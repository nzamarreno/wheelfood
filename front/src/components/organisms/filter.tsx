import * as React from "react"
import { inject, observer } from "mobx-react"
import {ConfigStore, FoodConfig} from "../../configuration-store"

export interface FilterProps {
    configStore?: ConfigStore
}

export interface FilterState {
    itemSelected?: number | null
}

@inject("configStore")
@observer
export class Filter extends React.Component<FilterProps, FilterState> {
    constructor(props: FilterProps) {
        super(props)

        this.state = {
            itemSelected: null
        }
    }

    private handleClick(type: FoodConfig, index: number) {
        this.props.configStore!.addFilter(type)
        this.setState({
            itemSelected: index
        })
    }

    public render() {
        return (
            <nav className="filter">
                <ul className="filter-category">
                    {this.props.configStore.foodType.map((item, index) => {
                        return (
                            <li
                                key={index}
                                className={`filter-category__item ${
                                    this.state.itemSelected === index ? `filter-category__item--active` : ""
                                }`}
                                onClick={() => this.handleClick(item, index)}
                            >
                                <i className={`filter-category__icon icon-${item.iconName}`} />
                                <span className="filter-category__label">{item.name}</span>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        )
    }
}
