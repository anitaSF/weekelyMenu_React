import { useMenuContext, menuContext } from "./Contexts/MenuContext";

import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Header/Header";
import Home from './Home/Home';
import Login from './Login/Login'
import NotFound from "./NotFound/NotFound";
import AuthRoute from "./Auth/AuthRoute";
import FormMeal from "./Form/FormMeal";
import MealList from "./MealList/MealList";
import MealDetail from "./MealDetail/MealDetail";

function App() {

  const menuContextExport = useMenuContext();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('authToken');
    if (storedUserData) {
      setUserData(storedUserData); // Establece el token al cargar la app
    }
  }, []);

  return (
    <>
      <menuContext.Provider value={menuContextExport}>
        <Routes>
          <Route path='/' element={<Login setUserData={setUserData} />} />
          <Route
            path='/weekelymenu'
            element={
              <main>
                <Header setUserData={setUserData} userData={userData} />
                <AuthRoute component={<Home userData={userData} />} />
              </main>}
          />

          <Route
            path='/mymeals'
            element={
              <main>
                <Header setUserData={setUserData} userData={userData} />
                <AuthRoute component={<MealList />} />
              </main>}
          />

          <Route
            path='/form'
            element={
              <main>
                <Header setUserData={setUserData} userData={userData} />
                <AuthRoute component={<FormMeal />} />
              </main>}
          />
          <Route
            path='/meal/:idMeal'
            element={
              <main>
                <Header setUserData={setUserData} userData={userData} />
                <AuthRoute component={<MealDetail />} />
              </main>}
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </menuContext.Provider>
    </>
  );
}

export default App 
