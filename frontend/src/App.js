import "./App.css";
import Header from "./Components/Header/Header";
import LandingPage from "./Screens/Landing page/LandingPage";
import { BrowserRouter, Route } from "react-router-dom";
import Profiles from "./Screens/Profiles/Profiles";
import RegisterScreen from "./Screens/RegisterScreen/RegisterScreen";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import CreateProfile from "./Screens/CreateProfile/createProfile";
import SingleProfile from "./Screens/SingleProfile/SingleProfile";

const App = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Route path="/" component={LandingPage} exact />
      <Route path="/login" component={LoginScreen} exact />
      <Route path="/register" component={RegisterScreen} exact />
      <Route path="/profiles" component={Profiles} />
      <Route path="/profile/:id" component={SingleProfile} />
      <Route path="/createprofile" component={CreateProfile} />
    </main>
  </BrowserRouter>
);

export default App;
