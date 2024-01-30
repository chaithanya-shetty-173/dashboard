import {FaTwitter} from 'react-icons/fa'
import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {Link, withRouter} from 'react-router-dom'
import CovidContext from '../../Context/CovidContext'

import './index.css'

const Footer = () => (
  <CovidContext.Consumer>
    {value => {
      const {isThemeLight} = value
      const footerClassName = isThemeLight ? 'footer footer-light' : 'footer'
      return (
        <div className={footerClassName}>
          <h1 className="footer-logo-title">COVID19INDIA</h1>
          <p className="footer-paragraph">
            we stand with everyone fighting on the front lines
          </p>
          <div className="footer-icon-container">
            <VscGithubAlt size="30" className="footer-icon" />
            <FiInstagram size="30" className="footer-icon" />
            <FaTwitter size="30" className="footer-icon" />
          </div>
        </div>
      )
    }}
  </CovidContext.Consumer>
)

export default withRouter(Footer)
