import { useContext } from "react";
import { menuContext } from "../Contexts/MenuContext";

function SelectType() {
    const context = useContext(menuContext);

    const handleSelect = (e) => {
        context.setFilterType(e.target.value);
    }

    return (
        <>
            <div className="select-type">
                <form>
                    <label htmlFor="type">Selecciona el tipo de comida</label>
                    <select name="type" id="type" value={context.filterType} onChange={handleSelect}>
                        <option value=''>Selecciona una opción</option>
                        {context.typeMeal.map((type, i) => (
                            <option value={type} key={i}> {type} </option>
                        ))};
                    </select>
                </form>
            </div>
        </>
    )
}

export default SelectType