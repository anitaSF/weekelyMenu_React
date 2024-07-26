
import { Link } from "react-router-dom";
import { menuContext } from "../Contexts/MenuContext";
import { useContext } from "react";

function MealCard({ meal }) {
    const context = useContext(menuContext);

    const handleDelete = () => {
        context.deleteMeal(meal.id);
    };

    return (
        <>
            <div className="meal-card">
                <Link to={`/meal/${meal.id}`}>
                    <h6 className="type">{meal.type}</h6>
                    <img src={meal.image} alt={meal.name} className="img-meal" />
                    <h2 className="meal-name">{meal.name}</h2>
                    <p>{meal.description}</p>
                </Link>
                <div className="links-bottom">
                    <Link className="link-meal" to={`/meal/${meal.id}`}>Ver receta</Link>
                    <button className="trash-icon" onClick={handleDelete}>🗑</button>
                </div>

            </div>
        </>
    )
};

export default MealCard;