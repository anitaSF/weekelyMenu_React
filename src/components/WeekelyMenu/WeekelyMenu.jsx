import { useContext } from "react";
import { menuContext } from "../Contexts/MenuContext";

import { Link } from "react-router-dom";

import SelectType from "../SelectType/SelectType";

function WeekelyMenu() {

    const context = useContext(menuContext);
    const filteredMeals = context.getDataFiltered();
    const organizedFilteredMeals = filteredMeals.reduce((acc, meal) => {
        const day = meal.weekday || 'Nuevas comidas';
        if (!acc[day]) {
            acc[day] = [];
        }
        acc[day].push(meal);
        return acc;
    }, {});

    return (
        <>
            <main>
                <SelectType />
                <section className="weekely-menu" >
                    {Object.keys(organizedFilteredMeals).map((day) => (
                        <article className="day-menu" key={day}>
                            <h2 className="day">{day}</h2>
                            <ul>
                                {organizedFilteredMeals[day].map((meal) => (
                                    <li className="meal-menu" key={meal.id}>
                                        <Link to={`/meal/${meal.id}`}>
                                            <h6 className="type-menu">{meal.type}</h6>
                                            <img src={meal.image} alt={meal.name} className="img-menu" />
                                            <h2 className="name-menu">{meal.name}</h2>
                                            <p>{meal.description}</p>
                                            <hr />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    )
                    )}
                    <article className="notas">
                        <h2 className="notas-title">Notas</h2>
                        <hr className="hr-notas" />
                        <hr className="hr-notas" />
                        <hr className="hr-notas" />
                        <hr className="hr-notas" />
                        <hr className="hr-notas" />
                        <hr className="hr-notas" />
                        <hr className="hr-notas" />
                        <hr className="hr-notas" />
                        <hr className="hr-notas" />
                        <hr className="hr-notas" />
                        <hr className="hr-notas" />
                        <hr className="hr-notas" />
                        <hr className="hr-notas" />
                        <hr className="hr-notas" />
                        <hr className="hr-notas" />
                    </article>
                </section>
            </main>
        </>
    )
}

export default WeekelyMenu