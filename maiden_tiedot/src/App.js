import React from 'react'
import axios from 'axios'

const Country = ({ country, handler }) => {

  return (
    <p onClick={handler.handleClick(country)}>{country.name}</p>
  )
}

const Countries = ({ countries, filter, handler }) => {

  console.log(filter)
  const passedFilter = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
  if (passedFilter.length === 1) {
    return (
      <div>
        {passedFilter.map(country => <CountryInfo key={country.numericCode} country={country} />)}
      </div>
    )
  } else if (passedFilter.length <= 10) {
    return (
      <div>
        {passedFilter.map(country => <Country key={country.numericCode} country={country} handler={handler} />)}
      </div>
    )
  }
  return <div></div>
}

const CountryInfo = ({ country }) => (
  <div>
    <h1>{country.name}</h1>
    <p>capital: {country.capital}</p>
    <p>population: {country.population}</p>
    <img src={country.flag} alt={country.name} style={{ height: 100, width: 200 }} />
  </div>
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: '',
      countries: [],
      currentCountry: -1
    }
  }

  handleClick = (country) => {
    return () => {
      console.log("handled")
      this.setState({ currentCountry: country })
      console.log(this.state.currentCountry)
    }
  }

  componentWillMount = () => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }

  handleFilterChange = (event) => {
    this.setState({
      filter: event.target.value,
      currentCountry: -1
    })
  }

  render() {
    if (this.state.currentCountry !== -1) {
      return (
        <div>
          <form>
            find countries: <input value={this.state.filter} onChange={this.handleFilterChange} />
          </form>
          <CountryInfo country={this.state.currentCountry} />
        </div>
      )
    } else {
      return (
        <div>
          <form>
            find countries: <input value={this.state.filter} onChange={this.handleFilterChange} />
          </form>
          <Countries countries={this.state.countries} filter={this.state.filter} handler={this} />
        </div>
      )
    }
  }
}

export default App
