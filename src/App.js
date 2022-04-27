import Home from './routes/home/home.component'
import { Routes, Route } from 'react-router-dom'
import Navigation from './routes/navigation/navigation.component'
import Authentication from './routes/authentication/authentication.component'

const App = () => {
  
  return (
    <Routes>
    {/* The base route */}
      <Route path='/' element={<Navigation />}> 
      {/* index=true helps it exist when path / match */}
        <Route index element={<Home />} />
        <Route path='/auth' element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;
