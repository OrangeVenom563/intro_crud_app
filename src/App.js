import './App.css';

import { Switch, Route } from "react-router-dom";
import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/home-page.component";
import AboutPage from "./pages/about/about-page.component";
import PostsPage from "./pages/posts/posts-page.component";

function App() {
  return (
    <div className="App">
      <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/posts" component={PostsPage} />
        </Switch>
    </div>
  );
}

export default App;
