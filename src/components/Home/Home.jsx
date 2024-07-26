import { useEffect, useState } from "react";
import { getDataUser } from "../Services/api-user";

import WeekelyMenu from "../WeekelyMenu/WeekelyMenu";
import icono from '../../images/icono-menu.webp';

function Home({ userData }) {

    const [data, setData] = useState(null);
    useEffect(() => {
        if (userData) {
            getDataUser(userData.token).then((info) => {
                console.log(info);
                setData(info);
            });
        }
    }, []);

    return (
        <>
            <main>
                <section className="block-title">
                    <div className="icono-menu">
                        <img className="icono-img" src={icono} />
                    </div>
                    <h1>Weekely Menu</h1>
                    {data ?
                        <h3>Hola {data.firstName}, este es tu menú para esta semana</h3>
                        : null}
                </section>

                <WeekelyMenu></WeekelyMenu>
            </main>
        </>
    )
}

export default Home