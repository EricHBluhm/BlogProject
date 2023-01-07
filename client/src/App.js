import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import HomePage from './scenes/homePage'; // don't have do to ./ because of the jsconfig.json
import LoginPage from './scenes/loginPage';
import ProfilePage from './scenes/profilePage';
import {useMemo} from "react";
import {useSelector} from 'react-redux';
import {CssBaseline, ThemeProvider} from "@mui/material";
import {createTheme } from "@mui/material/styles";
import {themeSettings } from "./theme";

function App() {

  const mode = useSelector((state)=> state.mode); //grab the value at the initial state
  const theme = useMemo(()=> createTheme(themeSettings(mode)), [mode]); //set up theme


  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme = {theme}>
          <CssBaseline/>
          <Routes>
            <Route path="/" element = {<LoginPage />}/> 
            <Route path="/home" element = {<HomePage />}/> 
            <Route path="/profile/:userId" element = {<ProfilePage />}/> 
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
