import './index.css'

const StateItem = props => {
  const {each} = props
  return (
    <li className="district-count-item" key={each.districtName}>
      <p>{each.districtName === 'Unknown' ? 'Other' : each.districtName}</p>
      <p>{each.districtCaseCount}</p>
    </li>
  )
}

export default StateItem
