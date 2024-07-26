import { useContext } from "react";
import { menuContext } from "../Contexts/MenuContext";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import icono from '../../images/icono-menu.webp';

function FormMeal() {
    const context = useContext(menuContext);
    const navigate = useNavigate();

    const INITIAL_STATE = {
        id: '',
        type: '',
        name: '',
        image: '',
        description: '',
        ingredients: [],
        weekday: ''
    };

    const [newMeal, setNewMeal] = useState(INITIAL_STATE);

    // Función para crear nuevo producto con los datos recogidos del formulario
    const changeNewMeal = (key, value) => {
        setNewMeal({ ...newMeal, [key]: value });
    };

    const handleInput = (e) => {
        changeNewMeal(e.target.id, e.target.value);
    };

    const handleForm = (e) => {
        e.preventDefault();
        context.addNewMeal(newMeal)
            .then(() => {
                setNewMeal(INITIAL_STATE);
                navigate('/mymeals');
            })
            .catch(error => {
                console.error('Error adding meal: ', error);
            });
    };

    return (
        <>
            <main>
                <section className="new-meal">
                    <h2 className="title-form">Añadir nueva comida</h2>
                    <form action="" onSubmit={handleForm}>
                        <fieldset className="form-card">
                            <div className="icono-menu">
                                <img src={icono} />
                            </div>
                            <div className="input-2col">
                                <div className="half-col first-child">
                                    <label htmlFor="id">Ref. comida </label>
                                    <input id="id" name="id" value={newMeal.id} onChange={handleInput}></input>
                                </div>
                                <div className="half-col">
                                    <label htmlFor="type">Tipo de comida </label>
                                    <input id="type" name="type" value={newMeal.type} onChange={handleInput}></input>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="name">Nombre del plato </label>
                                <input id="name" name="name" value={newMeal.name} onChange={handleInput}></input>
                            </div>

                            <div>
                                <label htmlFor="image">Imagen </label>
                                <input id="image" name="image" value={newMeal.image} onChange={handleInput}></input>
                            </div>
                            <div>
                                <label htmlFor="description">Descripción </label>
                                <input id="description" name="description" value={newMeal.description} onChange={handleInput}></input>
                            </div>
                            <div>
                                <label htmlFor="ingredients">Ingredientes </label>
                                <input id="ingredients" name="ingredients" value={newMeal.ingredients} onChange={handleInput}></input>
                            </div>
                            <div>
                                <label htmlFor="weekday">Día de la semana </label>
                                <input id="weekday" name="weekday" value={newMeal.weekday} onChange={handleInput}></input>
                            </div>
                            <div className="btn-form">
                                <button className="btn">Crear comida</button>
                            </div>

                        </fieldset>
                    </form>
                </section>
            </main>
        </>
    )
}

export default FormMeal