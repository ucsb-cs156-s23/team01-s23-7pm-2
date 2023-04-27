import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "main/pages/HomePage";
import AvilaBeachPage from "main/pages/Towns/AvilaBeachPage";
import LosAlamosPage from "main/pages/Towns/LosAlamosPage";
import ArroyoGrandePage from "main/pages/Towns/ArroyoGrandePage";

import "bootstrap/dist/css/bootstrap.css";
import RestaurantCreatePage from "main/pages/Restaurants/RestaurantCreatePage";
import RestaurantEditPage from "main/pages/Restaurants/RestaurantEditPage";
import RestaurantIndexPage from "main/pages/Restaurants/RestaurantIndexPage";
import RestaurantDetailsPage from "main/pages/Restaurants/RestaurantDetailsPage";

import SchoolCreatePage from "main/pages/Schools/SchoolCreatePage";
import SchoolEditPage from "main/pages/Schools/SchoolEditPage";
import SchoolIndexPage from "main/pages/Schools/SchoolIndexPage";
import SchoolDetailsPage from "main/pages/Schools/SchoolDetailsPage";

function App() {

  const reload = () => window.location.reload();

  return (
    <BrowserRouter basename="/team01-s23-7pm-2">
      <Routes>
        <Route path="/storybook-static" onEnter={reload}/>
        <Route exact path="/" element={<HomePage />} />

        <Route exact path="/towns/AvilaBeach" element={<AvilaBeachPage />} />
        <Route exact path="/towns/LosAlamos" element={<LosAlamosPage />} />
        <Route exact path="/towns/ArroyoGrande" element={<ArroyoGrandePage />} />
        
        <Route exact path="/restaurants/create" element={<RestaurantCreatePage />} />
        <Route exact path="/restaurants/edit/:id" element={<RestaurantEditPage />} />
        <Route exact path="/restaurants/details/:id" element={<RestaurantDetailsPage />} />
        <Route exact path="/restaurants/" element={<RestaurantIndexPage />} />

        <Route exact path="/schools/create" element={<SchoolCreatePage />} />
        <Route exact path="/schools/edit/:id" element={<SchoolEditPage />} />
        <Route exact path="/schools/details/:id" element={<SchoolDetailsPage />} />
        <Route exact path="/schools/" element={<SchoolIndexPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
