import { useContext } from "react";
import { menuContext } from "../Contexts/MenuContext";

import { Link, useParams } from "react-router-dom";


function MealDetail() {
    const context = useContext(menuContext);

    const { idMeal } = useParams();
    const findMeal = context.listMeals.find((meal) => meal.id === idMeal);

    const handleDelete = () => {
        context.deleteMeal(meal.id);
    };

    return (
        <>
            <main>
                <section className="detail">
                    <Link className="volver" to={'/weekelymenu'}>Volver a Menu Semanal</Link>
                    {findMeal ? (
                        <>
                            <article className="detail-contain">
                                <img className="img-meal" src={findMeal.image} />
                                <div className="content-meal">
                                    <div>
                                        <h2 className="title-meal">{findMeal.name}</h2>
                                        <hr className="hr-detail" />
                                        <h5 className="prop-meal">Tipo de comida</h5>
                                        <p className="text-meal">{findMeal.type}</p>
                                        <h5 className="prop-meal">Descripción</h5>
                                        <p className="text-meal">{findMeal.description}</p>
                                        <h5 className="prop-meal">Ingredientes</h5>
                                        <p className="text-meal">{findMeal.ingredients.join(', ')}</p>
                                    </div>
                                    <div className="delete-meal">Eliminar Comida <button className="trash-icon" onClick={handleDelete}> 🗑</button></div>
                                </div>
                            </article>
                        </>
                    ) : null}

                </section>
            </main>
        </>
    )
};

export default MealDetail