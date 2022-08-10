import './App.scss';
import ItemDetailContainer from './componentes/ItemDetailContainer/ItemDetailContainer';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import NavBar from './componentes/NavBar/NavBar';

import ItemListContainer from './componentes/ItemListContainer/ItemListContainer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Detail from './pages/Detail';

import Checkout from './pages/Checkout';
function App() {


  return (

    <BrowserRouter>

     <NavBar />
     <Routes>

      <Route path='/' element={<Home/>}/>
      <Route path='/contacto' element={<Contact />}/>
      <Route path='/productos' element={<ItemListContainer />}/>
      <Route path='/productos/:id' element={< Detail/>}/>
      <Route path='/cart' element={<Checkout/>}/>
      <Route path='*' element={<h1>ERROR 404 -página no encontrada</h1>}/>

     </Routes>
    

    </BrowserRouter>
  );
}

export default App;
