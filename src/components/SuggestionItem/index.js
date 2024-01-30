import './index.css'

import {BiChevronRightSquare} from 'react-icons/bi'

import {Link} from 'react-router-dom'

// import StateDetails from '../StateDetails'

const SuggestionItem = props => {
  const {
    suggestionDetails,
    //  covidData
  } = props

  const {name, stateCode} = suggestionDetails

  //   const onClickSuggestionItem = () => {
  //     //   console.log('In onClickSuggestionItem()')
  //     // <StateDetails stateCode={stateCode} covidData={covidData} />

  //   }

  return (
    <Link to={`/state/:${stateCode}`} className="link-item">
      <li className="suggestion-item-container">
        <button
          type="button"
          //   onClick={onClickSuggestionItem}
          className="suggestion-item-btn"
        >
          <p className="state-name-text">{name}</p>
          <div className="state-code-container">
            <p className="state-code-text">{stateCode}</p>
            <BiChevronRightSquare className="state-code-btn-icon" />
          </div>
        </button>
      </li>
    </Link>
  )
}

export default SuggestionItem
