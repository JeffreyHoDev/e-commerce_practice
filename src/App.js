import Home from './routes/home/home.component'
import { Routes, Route } from 'react-router-dom'
import Navigation from './routes/navigation/navigation.component'
import SignIn from './routes/sign-in/sign-in.component'

const App = () => {
  
  return (
    <Routes>
    {/* The base route */}
      <Route path='/' element={<Navigation />}> 
      {/* index=true helps it exist when path / match */}
        <Route index element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default App;
