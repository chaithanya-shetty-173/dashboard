import './index.css'

const FaqItem = props => {
  const {each} = props

  return (
    <li className="faq-list-item" key={each.qno}>
      <p className="question">{each.question}</p>
      <p className="answer">{each.answer}</p>
    </li>
  )
}

export default FaqItem
