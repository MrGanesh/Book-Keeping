import './App.css';
import AddBook from './components/Books/AddBook';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home'
import LoginUser from './components/users/LoginUser'
import RegisterUser from './components/users/RegisterUser'
import Profile from './components/Profile/Profile'
import Books from './components/Books/Books'

function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Navbar />
        <Switch>
        <Route exact path='/' component={Home} />
          <Route exact path='/login' component={LoginUser} />
           <Route exact path='/profile' component={Profile} />
          <Route exact path='/addbook' component={AddBook} />
          <Route exact path='/books' component={Books} />
          <Route exact path='/register' component={RegisterUser} />
        </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
