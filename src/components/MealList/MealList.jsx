import { useContext } from "react";
import { menuContext } from "../Contexts/MenuContext";

import MealCard from "../MealCard/MealCard";
import SelectType from "../SelectType/SelectType";
import icono from '../../images/icono-menu.webp';

function MealList() {
    const context = useContext(menuContext);

    return (
        <>
            <section className="meal-list">
                <div className="icono-menu">
                    <img className="icono-img" src={icono} />
                </div>
                <h1>Mis Comidas</h1>
                <SelectType></SelectType>
                <article>
                    <ul className="meal-grid">
                        {context.getDataFiltered().map((meal) => (
                            <li key={meal.id}>
                                <MealCard meal={meal} key={meal.id} />
                            </li>
                        ))}
                    </ul>

                </article>
            </section>
        </>
    )
}

export default MealList