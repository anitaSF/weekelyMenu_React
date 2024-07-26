import { createContext } from "react";
import { API } from "../Services/api-menu";
import { useEffect, useState } from "react";

export const menuContext = createContext();

// Función para organizar comidas por día
const organizeMealsByDay = (meals) => {
    return meals.reduce((acc, meal) => {
        const day = meal.weekDay || 'Sin día';
        if (!acc[day]) {
            acc[day] = [];
        }
        acc[day].push(meal);
        return acc;
    }, {});
};

export const useMenuContext = () => {
    // State para alojar array de comidas importado de la API
    const [listMeals, setListMeals] = useState([]);

    const [menuDay, setMenuDay] = useState({});

    // State para definir array tipos de comida
    const [typeMeal, setTypeMeal] = useState(['Desayuno', 'Almuerzo', 'Cena']);

    // State para alojar seleccion tipo comida
    const [filterType, setFilterType] = useState('');

    // Petición a la API para traer el listado de comidas
    useEffect(() => {
        API.get('/comidas').then(response => {
            const meals = response.data;
            setListMeals(meals);
            const organizedMeals = organizeMealsByDay(meals);
            setMenuDay(organizedMeals);
        })
            .catch(error => {
                console.error('Error fetching meals: ', error);
            });
    }, []);

    // Funcion para añadir la nueva comida al array original
    const addNewMeal = (newMeal) => {
        return API.post('/comidas', newMeal)
            .then(response => {
                const addedMeal = response.data;
                setListMeals(prevListMeals => [...prevListMeals, addedMeal]);
                setMenuDay(prevMenuDay => {
                    const day = addedMeal.weekday;
                    const updatedDayMeals = prevMenuDay[day] ? [...prevMenuDay[day], addedMeal] : [addedMeal];
                    return { ...prevMenuDay, [day]: updatedDayMeals };
                });
                return addedMeal; // Devuelve el resultado para el manejo en el formulario
            })
            .catch(error => {
                console.error('Error: ', error);
                throw error; // Lanza el error para manejarlo en el formulario
            });
    };

    // Funcion para eliminar la nueva comida al array original
    const deleteMeal = (mealId) => {
        return API.delete(`/comidas/${mealId}`)
            .then(() => {
                setListMeals(prevListMeals => prevListMeals.filter(meal => meal.id !== mealId));
                setMenuDay(prevMenuDay => {
                    const updatedMenuDay = { ...prevMenuDay };
                    for (const day in updatedMenuDay) {
                        updatedMenuDay[day] = updatedMenuDay[day].filter(meal => meal.id !== mealId);
                    }
                    return updatedMenuDay;
                });
            })
            .catch(error => {
                console.error('Error deleting meal: ', error);
            });
    };

    //Función para filtrar listado de comidas por tipo
    const getDataFiltered = () => {
        return listMeals.filter((meal) => !filterType || meal.type === filterType);
    };



    return { listMeals, setListMeals, menuDay, addNewMeal, deleteMeal, typeMeal, setTypeMeal, filterType, setFilterType, getDataFiltered };
};

export const MenuProvider = ({ children }) => {
    const menu = useMenuContext();

    return (
        <menuContext.Provider value={menu}>
            {children}
        </menuContext.Provider>
    );
};