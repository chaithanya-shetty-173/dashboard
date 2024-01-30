import React from 'react'

import Header from '../Header'
import Footer from '../Footer'
import LoadingView from '../LoadingView'
import CovidContext from '../../Context/CovidContext'
import StateItem from '../StateItem'
import ChartsList from '../ChartsList'
import './index.css'
// eslint-disable-next-line import/order
import Loader from 'react-loader-spinner'

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

const apiStatusList = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'IN_PROGRESS',
}

const tabsList = {
  confirmed: 'confirmed',
  active: 'active',
  recovered: 'recovered',
  deceased: 'deceased',
}

class SpecificState extends React.Component {
  state = {
    apiStatus: apiStatusList.initial,
    stateData: {},
    stateName: '',
    stateCode: '',
    activeTab: tabsList.confirmed,
  }

  componentDidMount() {
    this.getStateDetails()
  }

  getStateDetails = async () => {
    this.setState({apiStatus: apiStatusList.inprogress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    console.log(apiUrl)
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      const stateObj = data[id]
      console.log(stateObj)
      const state = statesList.find(each => each.state_code === id)

      this.setState({
        apiStatus: apiStatusList.success,
        stateData: stateObj,
        stateName: state.state_name,
        stateCode: state.state_code,
      })
    } else {
      this.setState({apiStatus: apiStatusList.failure})
    }
  }

  onClickTab = tabId => {
    this.setState({activeTab: tabId})
  }

  renderStateRouteContainer = isThemeLight => {
    const {stateData, stateName, stateCode, activeTab} = this.state
    const {total, meta, districts} = stateData
    const districtNameList = Object.keys(districts)
    const districtDataList = districtNameList.map(each => ({
      districtName: each,
      districtCaseCount:
        activeTab === tabsList.active
          ? total.confirmed - total.recovered - total.deceased
          : total[activeTab],
    }))
    console.log(districtDataList)
    districtDataList.sort((a, b) => a.districtCaseCount - b.districtCaseCount)

    return (
      <>
        <div className="data-update-details">
          <h1 className="state-name-heading">{stateName}</h1>
          <div className="state-tested-data">
            <p>Tested</p>
            <p>{meta.population}</p>
          </div>
        </div>
        <p className="date-para">
          Last updated on {`${new Date(meta.last_updated)}`}
        </p>
        <ul className="state-covid-total-detail-box">
          <li
            onClick={() => this.onClickTab(tabsList.confirmed)}
            type="button"
            className="state-covid-details-box-1"
            style={{
              backgroundColor:
                activeTab === tabsList.confirmed ? 'rgba(255,0,0,.2)' : null,
            }}
            testid="stateSpecificConfirmedCasesContainer"
          >
            <p>Confirmed</p>
            <img
              className="state-covid-details-icon"
              alt="state specific confirmed cases pic"
              src="https://res.cloudinary.com/dniq4wbom/image/upload/v1695199292/check-mark_1_je8igd.png"
            />
            <p>{total.confirmed}</p>
          </li>
          <li
            onClick={() => this.onClickTab(tabsList.active)}
            type="button"
            className="state-covid-details-box-2"
            style={{
              backgroundColor:
                activeTab === tabsList.active ? 'rgba(0,150,255,.2)' : null,
            }}
            testid="stateSpecificActiveCasesContainer"
          >
            <p>Active</p>
            <img
              className="state-covid-details-icon"
              alt="state specific active cases pic"
              src="https://res.cloudinary.com/dniq4wbom/image/upload/v1695199306/protection_1_qtlacm.png"
            />
            <p>{total.confirmed - (total.deceased + total.recovered)}</p>
          </li>
          <li
            type="button"
            onClick={() => this.onClickTab(tabsList.recovered)}
            className="state-covid-details-box-3"
            style={{
              backgroundColor:
                activeTab === tabsList.recovered ? 'rgba(0,250,0,.2)' : null,
            }}
            testid="stateSpecificRecoveredCasesContainer"
          >
            <p>Recovered</p>
            <img
              className="state-covid-details-icon"
              alt="state specific recovered cases pic"
              src="https://res.cloudinary.com/dniq4wbom/image/upload/v1695199313/recovered_1_gwsiyn.png"
            />
            <p>{total.recovered}</p>
          </li>
          <li
            onClick={() => this.onClickTab(tabsList.deceased)}
            className="state-covid-details-box-4"
            style={{
              backgroundColor:
                activeTab === tabsList.deceased ? 'rgba(100,100,100,.3)' : null,
            }}
            type="button"
            testid="stateSpecificDeceasedCasesContainer"
          >
            <p>Deceased</p>
            <img
              className="state-covid-details-icon"
              alt="state specific deceased cases pic"
              src="https://res.cloudinary.com/dniq4wbom/image/upload/v1695199300/breathing_1_f5oqyd.png"
            />
            <p>{total.deceased}</p>
          </li>
        </ul>
        <h1>Top Districts</h1>
        {/* <ul
          className="district-with-count-list-container"
          testid="topDistrictsUnorderedList"
        >
          {districtDataList.map(each => (
            <StateItem each={each} key={each.districtName} />
          ))}
        </ul>
        <div>
          <ChartsList activeTab={activeTab} stateCode={stateCode} />
        </div> */}
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loading-container" testid="stateDetailsLoader">
      <Loader type="TailSpin" color="#0467d4" height={70} width={70} />
    </div>
  )

  renderView = isThemeLight => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusList.inprogress:
        return this.renderLoadingView(isThemeLight)
      case apiStatusList.success:
        return this.renderStateRouteContainer(isThemeLight)
      default:
        return null
    }
  }

  render() {
    return (
      <CovidContext.Consumer>
        {value => {
          const {isThemeLight} = value
          const routeClassName = isThemeLight
            ? 'state-route-light'
            : 'state-route'
          return (
            <div className={routeClassName}>
              <Header />
              <div className="state-route-container">
                <div className="state-details">
                  {this.renderView(isThemeLight)}
                </div>
              </div>
              <Footer />
            </div>
          )
        }}
      </CovidContext.Consumer>
    )
  }
}

export default SpecificState
