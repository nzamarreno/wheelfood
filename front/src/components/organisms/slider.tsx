import * as React from "react"
import { observer, inject } from "mobx-react"
import { ConfigStore, FoodConfig } from "../../configuration-store"

export interface SliderProps {
    configStore?: ConfigStore
    onChange: (type: FoodConfig) => void
}

export interface SliderState {
    indexSlider: number
    slideWidth: number
    isActiveAnimation: boolean
}

@inject("configStore")
@observer
export class Slider extends React.Component<SliderProps, SliderState> {
    private $slide: HTMLElement

    constructor(props: SliderProps) {
        super(props)

        this.state = {
            indexSlider: 0,
            slideWidth: 0,
            isActiveAnimation: false
        }
    }

    public render() {
        return (
            <div className="sliderFood">
                <ul className="sliderFood-menu">
                    {this.props.configStore!.foodType.map((item, index) => {
                        return (
                            <li
                                key={index}
                                onClick={() => this.handleClick(item, index)}
                                className={`sliderFood-menu__item ${
                                    this.state.indexSlider === index ? "sliderFood-menu__item--active" : ""
                                }`}
                            >
                                <i className={`icon-${item.iconName}`} />
                            </li>
                        )
                    })}
                </ul>
                <ul
                    className="sliderFood-carrousel"
                    style={{ transform: `translateX(-${this.state.indexSlider * this.state.slideWidth}px)` }}
                >
                    {this.props.configStore!.foodType.map((item, index) => {
                        return (
                            <li
                                key={index}
                                className={`sliderFood-carrousel__item ${
                                    this.state.indexSlider === index ? "sliderFood-carrousel__item--active" : ""
                                }`}
                                ref={$el => (this.$slide = $el!)}
                            >
                                <h3 className="sliderFood-carrousel__figure">{item.name}</h3>
                                <div className="sliderFood-carrousel__picture">
                                    <span className="sliderFood-carrousel__status" />
                                    <img src={`assets/images/icono/fill/${item.icono.pictureFill}.svg`} alt="" />
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }

    componentDidMount() {
        this.props.onChange(this.props.configStore!.foodType[0])

        const widthSlide = this.$slide.offsetWidth
        this.setState({
            slideWidth: widthSlide
        })
    }

    handleClick(type: FoodConfig, index: number) {
        this.props.onChange(type)
        if (!this.state.isActiveAnimation && this.state.indexSlider !== index) {
            this.setState({
                isActiveAnimation: true
            })

            document.querySelector(".sliderFood-carrousel__item--active").classList.remove("sliderFood-carrousel__item--active")

            setTimeout(() => {
                this.setState({
                    indexSlider: index,
                    isActiveAnimation: false
                })
            }, 1000)
        }
    }
}
