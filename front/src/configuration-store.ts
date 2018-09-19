import { observable, action } from "mobx"

export interface Icono {
    name: string
    pictureStroke: string
    pictureFill: string
}

export interface FoodConfig {
    id: number
    name: string
    iconName: string
    icono: Icono
}

export class ConfigStore {
    public foodType: FoodConfig[] = [
        {
            id: 1,
            name: "Boulangerie",
            iconName: "baker",
            icono: {
                name: "Boulangerie",
                pictureStroke: "",
                pictureFill: "sandwich"
            }
        },
        {
            id: 2,
            name: "Burger",
            iconName: "burger",
            icono: {
                name: "Big Burger",
                pictureStroke: "",
                pictureFill: "burger"
            }
        },
        {
            id: 3,
            name: "Japonais",
            iconName: "jap",
            icono: {
                name: "Japonais",
                pictureStroke: "",
                pictureFill: "rice"
            }
        },
        {
            id: 4,
            name: "Healthy",
            iconName: "healthy",
            icono: {
                name: "Healthy",
                pictureStroke: "",
                pictureFill: "salad"
            }
        }
    ]

    public distance = ["Proche", "Milieu", "Loin"]

    public price = ["LowCost", "Moyen", "Powa"]

    @observable filterActive: FoodConfig | null = null

    @action
    addFilter(itemSelected: FoodConfig) {
        this.filterActive = itemSelected
    }

    @action
    removeFilter() {
        this.filterActive = null
    }
}
