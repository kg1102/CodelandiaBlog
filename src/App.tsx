import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';

export function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}