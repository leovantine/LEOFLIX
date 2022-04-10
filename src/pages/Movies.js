import React, {Component} from 'react'
import axios from "axios"
import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route
} from "react-router-dom"
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
`
const Tag = styled.div`

`

const Title = styled.h1`

`
const Input = styled.input`

`
const MovieCard = styled.div`
position: relative;
display: block;
width: 800px;
height: 350px;
margin: 100px auto;
overflow: hidden;
border-radius: 10px;
transition: all 0.4s;
&:hover{
  cursor: pointer;
  transform: scale(1.02);
  transition: all 0.4s;
}
`
const InfoSection = styled.div`
postion: relative;
width: 100%;
height: 100%;
background-blend-mode: multiply;
z-index: 2;
border-radius: 10px;
`
const MovieHeader = styled.div`
postion: relative;
padding: 25px;
height: 40%;
`
const MovieOverview = styled.div`
padding: 25px;
height: 50%;
`
const Paragraph = styled.p`
font-family: 'Karla', sans-serif;
color: #fff;
`
const Social = styled.div`
height: 10%;
padding-left: 15px;
padding-bottom: 20px;
`
const BackdropImg = styled.img`
position: absolute;
top: 0;
z-index:1;
height: 100%; right: 0;
background-size: cover;
border-radius: 11px;
`

const UlList = styled.ul`
list-style: none;
padding: 0;
`
const List = styled.li`
display: inline-block;
color: rgba(255,255,255,0.4);
transition: 0.3s;
transition-delay: 0.15s;
margin: 0 10px;
&:hover{
  transition: 0.3s;
  cursor: pointer;
  color: rgba(255,255,255,0.8);
}
`
const SpotLight = styled.i`
font-size: 17px;
cursor: pointer;
`

const SeriesTitle = styled.h2`
font-family: 'Karla', sans-serif;
font-weight: 400;
color: #fff;
`
const Date = styled.p`
font-family: 'Karla', sans-serif;
font-weight: 400;
color: #0E64A5;
`
const Vote = styled.p`
display: inline-block;
margin-top: 10px;
font-family: 'Karla', sans-serif;
color: #fff;
padding: 5px;
border-radius: 5px;
border: solid 1px rgba(255,255,255,0.13);
`

const Image = styled.img`
position: relative;
float: left;
margin-right: 20px;
height: 120px;
box-shadow: 0 0 20px -10px rgba(0,0,0,0.5);
`


const apiMovies = axios.create({
  baseURL: "https://api.themoviedb.org/3/movie/popular?api_key=773d5e05c935efb1cf4945752b137ed7"
})


export default class App extends Component{ 

  state ={
    moviesList: [],
    filterMovies: []
  }

  async componentDidMount(){
    const response = await apiMovies.get()
    console.log(response.data.results)

    const movies = response.data.results.map((item) => {
      return{
        ...item,
        poster_path: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
        backdrop_path: `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`
      }
    })

    this.setState({
      moviesList: movies,
      filterMovies: movies
    })

  }

  filterFilm = (event) => {
    const {moviesList, filterMovies} = this.state
    if (event.target.value === "") {
      this.setState ({
        filterMovies: moviesList
      })
      return
    }
    const Convert = moviesList.filter((item) => {
      if (item.title.toLowerCase().includes(event.target.value.toLowerCase())){
        return true
      }
    })
    this.setState ({
      filterMovies: Convert
    })
  }


  render(){
    return(
    <Tag>
    <GlobalStyle/>
    <Input type="text" placeholder="SEARCH HERE" onChange={this.filterFilm}/>
      {this.state.filterMovies.map((item) =>(


      <MovieCard key={item.id}>
        <InfoSection>
          <MovieHeader>
            <Image src={item.poster_path} alt={`Movies Banner: ${item.title}`}/>
            <SeriesTitle>{item.title}</SeriesTitle>
            <Date>{item.release_date}</Date>
            <Vote>{item.vote_average}</Vote>
        </MovieHeader>
        <MovieOverview>
        <Paragraph>{item.overview}</Paragraph>
        </MovieOverview>
        <Social>
          <UlList>
            <List><SpotLight>SHARE</SpotLight></List>
            <List><SpotLight>LIKE</SpotLight></List>
            <List><SpotLight>COMMENT</SpotLight></List>
          </UlList>
        </Social>
        </InfoSection>
        <BackdropImg src={item.backdrop_path} alt={`Movie Backdrop: ${item.title}`}/>
        </MovieCard>
      ))}
      
      
      
      </Tag>



    )
  }
}