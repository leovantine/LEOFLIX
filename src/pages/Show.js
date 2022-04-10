import React, {Component} from 'react'
import axios from "axios"

const apiSeries = axios.create({
  baseURL: "https://api.themoviedb.org/3/tv/popular?api_key=773d5e05c935efb1cf4945752b137ed7"
})

export default class App extends Component {
  state = {
    seriesList: [],
    filterSeries: []
  }


  async componentDidMount(){
    const response = await apiSeries.get()
    console.log(response.data.results)

    const series = response.data.results.map((item) => {
      return {
        ...item,
        poster_path: `https://image.tmdb.org/t/p/w500/${item.poster_path}`
      }
    })

    this.setState({
      seriesList: series,
      filterSeries: series
    })
  }



  filterTv = (event) => {
    const {seriesList, filterSeries} = this.state
    if (event.target.value === "") {
      this.setState ({
        filterSeries: seriesList
      })
      return
    }
    const Convert = seriesList.filter((item) => {
      if (item.name.toLowerCase().includes(event.target.value.toLowerCase())){
        return true
      }
    })
    this.setState ({
      filterSeries: Convert
    })
  }



  render(){
    return(
      <>
      <h1>SERIES</h1>
      <input type="text" placeholder="SEARCH HERE" onChange={this.filterTv}/>
      {this.state.filterSeries.map((item) => (
        <ul key={item.id}>
          <li>{item.name}</li>
          <p>{item.overview}</p>
          <li>
          <img src={item.poster_path} alt={`Series Banner: ${item.title}`}/>
          </li>
        </ul>
      ))}
      </>
    )
  }
}