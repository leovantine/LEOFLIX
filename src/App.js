import React, {Component} from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import Movies from "./pages/Movies"
import Show from "./pages/Show"
import Home from "./pages/Home"

import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body{
  background-color: #ED9B2F;
}
`

const TitleTag = styled.div`
margin: 1vh;
`

const Título = styled.h1`
font-family: 'Bebas Neue', cursive;
font-size: 45px;
color: #FF9000;
text-shadow: 2px 2px black;
&:hover{
  cursor: pointer; 
  transform:scale(1.1);
}
`
const Menu = styled.nav`
background-color: #fff;
`
const UlList = styled.ul`
display: flex;
justify-content: space-evenly;
width: 95vw;
font-family: 'Karla', sans-serif;
font-size: 25px;
font-weight: bolder;
list-style: none;
`
const List = styled.li`
margin: 3vh;
&:hover{
  transform:scale(1.2);
}
`

const Linking = styled(Link)`
text-decoration: none;
color: #000;
text-shadow:;
&:hover{
  cursor: pointer;
  color: #FF9000;
}
`

export default class App extends Component {
  render(){
    return(
      <Router>
        <GlobalStyle/>
        <Menu>
          <UlList>
            <TitleTag>
            <Título>LEOFLIX</Título>
            </TitleTag>
            <List><Linking to="/home">HOME</Linking></List>
            <List><Linking to="/movies">MOVIES</Linking></List>
            <List><Linking to="/show">SERIES</Linking></List>
          </UlList>
        </Menu>
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/movies" element={<Movies/>}/>
          <Route path="/show" element={<Show/>}/>
        </Routes>
      </Router>
    )
  }
}