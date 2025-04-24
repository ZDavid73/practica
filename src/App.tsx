import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Layouts & Components
import {MainLayout, PageAnimation, AlertSystem, AuthLoader, PrivateRoute} from "./components/imports";

//Pages
import {NotFound, Login, Home} from "./pages/imports";


function App() {

  const location = useLocation();

  return (
    <AnimatePresence>
      

        <Routes location={location}>

          {/* Rutas públicas - sin autenticación */}
          <Route path="/" element={ <PageAnimation><Home/></PageAnimation> } />
          <Route path="/autenticacion" element={ <PageAnimation><Login/></PageAnimation> } />

          {/* Rutas del paciente */}
          <Route path="/paciente" element={<AuthLoader><PrivateRoute> <MainLayout/> </PrivateRoute></AuthLoader>}>
            <Route path="inicio" element={ <PageAnimation key="inicio"><h1>Home Paciente</h1></PageAnimation> } />
          </Route>

          {/* Ruta por defecto para 404 */}
          <Route path="*" element={<Navigate to="/404" />} />
          <Route path="/404" element={<PageAnimation key="notfound"><NotFound/></PageAnimation>} />
        </Routes>

        {/* Sistema de alertas */}
        <AlertSystem />
  
    </AnimatePresence>
  )
}

export default App
