import './index.css'

import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'

import SuggestionItem from '../SuggestionItem'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const apiStatusConstants = {
  success: 'SUCCESS',
  loading: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    covidData: [],
    data: [],
    searchInput: '',
    showSuggestions: false,
  }

  componentDidMount() {
    this.getCovidData()
  }

  convertObjectsDataIntoListItemsUsingForInMethod = () => {
    const {data} = this.state
    const resultList = []
    // getting keys of an object object
    const keyNames = Object.keys(data)

    keyNames.forEach(keyName => {
      //   console.log(keyName)

      if (data[keyName]) {
        const {total} = data[keyName]
        // if the state's covid data is available we will store it or we will store 0
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = data[keyName].meta.population
          ? data[keyName].meta.population
          : 0

        resultList.push({
          stateCode: keyName,
          name: statesList.find(state => state.state_code === keyName)
            ? statesList.find(state => state.state_code === keyName).state_name
            : 'undefined',
          confirmed,
          deceased,
          recovered,
          tested,
          population,
          active: confirmed - (deceased + recovered),
        })
      }
    })
    // console.log(resultList)

    return resultList
  }

  getCovidData = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)

    const data = await response.json()
    // console.log(response)
    if (response.ok) {
      //   console.log(data)

      this.setState({data})

      const resultList = this.convertObjectsDataIntoListItemsUsingForInMethod()
      //   console.log(resultList)
      const updatedResultList = resultList.map(eachItem => {
        if (eachItem.name === 'undefined') {
          const newItem = {
            active: 0,
            confirmed: 0,
            deceased: 0,
            name: 'undefined',
            population: 0,
            recovered: 0,
            stateCode: 'TT',
            tested: 0,
          }
          return newItem
        }
        return eachItem
      })
      //   console.log(updatedResultList)
      this.setState({covidData: updatedResultList})

      this.setState({apiStatus: apiStatusConstants.success})
    }
  }

  onClickAscButton = () => {
    const {covidData} = this.state
    const tempCovidData = covidData
    tempCovidData.sort((a, b) => {
      const nameA = a.name.toLowerCase()
      const nameB = b.name.toLowerCase()

      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }
      return 0
    })
    this.setState({covidData: tempCovidData})
  }

  onClickDescButton = () => {
    const {covidData} = this.state
    const tempCovidData = covidData
    tempCovidData.sort((a, b) => {
      const nameA = a.name.toLowerCase()
      const nameB = b.name.toLowerCase()

      if (nameA > nameB) {
        return -1
      }
      if (nameA < nameB) {
        return 1
      }
      return 0
    })
    this.setState({covidData: tempCovidData})
  }

  renderSuccessView = () => {
    const {covidData} = this.state
    // console.log(covidData)
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    const totalConfirmedCasesArr = covidData.map(eachItem => eachItem.confirmed)
    const totalConfirmedCases = totalConfirmedCasesArr.reduce(reducer, 0)
    const totalActiveCasesArr = covidData.map(eachItem => eachItem.active)
    const totalActiveCases = totalActiveCasesArr.reduce(reducer, 0)
    const totalRecoveredCasesArr = covidData.map(eachItem => eachItem.recovered)
    const totalRecoveredCases = totalRecoveredCasesArr.reduce(reducer, 0)
    const totalDeceasedCasesArr = covidData.map(eachItem => eachItem.deceased)
    const totalDeceasedCases = totalDeceasedCasesArr.reduce(reducer, 0)
    return (
      <>
        <ul className="countrywide-cases-container">
          <div
            className="select-card confirmed-card"
            testid="countryWideConfirmedCases"
          >
            <p className="cases-text">Confirmed</p>
            <img
              src="https://res.cloudinary.com/my-cloud123/image/upload/v1679129023/Covid%20Dashboard/small%20devices/check-mark_1_rwcqbx.png"
              alt="country wide confirmed cases pic"
              className="cases-icon"
            />
            <p className="cases-count">{totalConfirmedCases}</p>
          </div>

          <li
            className="select-card active-card"
            testid="countryWideActiveCases"
          >
            <p className="cases-text">Active</p>
            <img
              src="https://res.cloudinary.com/my-cloud123/image/upload/v1679129023/Covid%20Dashboard/small%20devices/protection_2_a0cb7m.png"
              alt="country wide active cases pic"
              className="cases-icon"
            />
            <p className="cases-count">{totalActiveCases}</p>
          </li>

          <li
            className="select-card recovered-card"
            testid="countryWideRecoveredCases"
          >
            <p className="cases-text">Recovered</p>
            <img
              src="https://res.cloudinary.com/my-cloud123/image/upload/v1679129023/Covid%20Dashboard/small%20devices/recovered_1_jclri6.png"
              alt="country wide recovered cases pic"
              className="cases-icon"
            />
            <p className="cases-count">{totalRecoveredCases}</p>
          </li>

          <li
            className="select-card deceased-card"
            testid="countryWideDeceasedCases"
          >
            <p className="cases-text">Deceased</p>
            <img
              src="https://res.cloudinary.com/my-cloud123/image/upload/v1679129023/Covid%20Dashboard/small%20devices/breathing_1_fegdvb.png"
              alt="country wide deceased cases pic"
              className="cases-icon"
            />
            <p className="cases-count">{totalDeceasedCases}</p>
          </li>
        </ul>

        <div
          className="statewise-covid-data-table"
          testid="stateWiseCovidDataTable"
        >
          <div className="heading-row">
            <div className="states-heading-outer-container">
              <h1 className="states-heading-container">States/UT</h1>
              <div className="asc-dec-btn-container">
                <button
                  type="button"
                  className="asc-des-btn"
                  testid="ascendingSort"
                  onClick={this.onClickAscButton}
                  aria-label="asc-button"
                >
                  <FcGenericSortingAsc className="asc-des-icon" />
                </button>

                <button
                  type="button"
                  className="asc-des-btn"
                  testid="descendingSort"
                  onClick={this.onClickDescButton}
                  aria-label="dsc-button"
                >
                  <FcGenericSortingDesc className="asc-des-icon" />
                </button>
              </div>
            </div>
            <p className="heading-container">Confirmed</p>
            <p className="heading-container">Active</p>
            <p className="heading-container">Recovered</p>
            <p className="heading-container">Deceased</p>
            <p className="heading-container">Population</p>
          </div>
          <ul className="statewise-covid-data-unordered-list">
            {covidData.map(eachItem => (
              <ContentRow rowDetails={eachItem} key={eachItem.stateCode} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loading-container" testid="homeRouteLoader">
      <Loader type="TailSpin" color="#0467d4" height={70} width={70} />
    </div>
  )

  renderViewContainer = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchBar = () => {
    this.setState({showSuggestions: true})
  }

  onKeyUpSearchBar = () => {
    const {searchInput} = this.state
    if (searchInput === '') {
      this.setState({showSuggestions: false})
    }
  }

  onMouseLeaveSearchBar = () => {
    const {searchInput} = this.state
    if (searchInput === '') {
      this.setState({showSuggestions: false})
    }
  }

  render() {
    const {searchInput, covidData, showSuggestions} = this.state
    // console.log(`searchInput: ${searchInput}`)

    const searchResults = covidData.filter(eachSuggestion =>
      eachSuggestion.name.toLowerCase().includes(searchInput.toLowerCase()),
    )

    // console.log(searchResults)

    return (
      <>
        <Header />
        <div className="home-container">
          <div className="search-box-container">
            <BsSearch className="search-icon" />
            <input
              type="search"
              className="search-input-container"
              placeholder="Enter the State"
              onChange={this.onChangeSearchInput}
              onClick={this.onClickSearchBar}
              onKeyUp={this.onKeyUpSearchBar}
              //   onMouseLeave={this.onMouseLeaveSearchBar}
            />
          </div>
          {showSuggestions ? (
            <ul
              className="search-results-unordered-list"
              testid="searchResultsUnorderedList"
            >
              {searchResults.map(eachSuggestion => (
                <SuggestionItem
                  key={eachSuggestion.stateCode}
                  suggestionDetails={eachSuggestion}
                  updateSearchInput={this.updateSearchInput}
                  covidData={covidData}
                />
              ))}
            </ul>
          ) : null}

          {this.renderViewContainer()}
        </div>
        <Footer />
      </>
    )
  }
}

export default Home

const ContentRow = props => {
  const {rowDetails} = props
  const {
    active,
    confirmed,
    deceased,
    name,
    population,
    recovered,
    // stateCode,
    // tested,
  } = rowDetails

  return (
    <li className="content-row">
      <p className="name-content-container">{name}</p>
      <p className="content-container confirmed-text">{confirmed}</p>
      <p className="content-container active-text">{active}</p>
      <p className="content-container recovered-text">{recovered}</p>
      <p className="content-container deceased-text">{deceased}</p>
      <p className="content-container population-text">{population}</p>
    </li>
  )
}
