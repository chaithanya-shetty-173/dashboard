import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'
import {MdMenuOpen} from 'react-icons/md'
import {IoMdMoon} from 'react-icons/io'
import {BsFillSunFill} from 'react-icons/bs'

import CovidContext from '../../Context/CovidContext'
import './index.css'

class Header extends Component {
  state = {
    showMobileMenu: false,
  }

  toggleMobileMenu = () => {
    this.setState(prevState => ({showMobileMenu: !prevState.showMobileMenu}))
  }

  render() {
    const {showMobileMenu} = this.state
    return (
      <CovidContext.Consumer>
        {value => {
          const {isThemeLight, changeTheme} = value
          const headerClassName = isThemeLight
            ? 'header header-light'
            : 'header'
          const linkClassName = isThemeLight
            ? 'nav-link nav-link-light'
            : 'nav-link'
          return (
            <>
              <div className={headerClassName}>
                <Link to="/" className="logo-link">
                  <h1 className="header-logo-title">
                    COVID19<span>INDIA</span>
                  </h1>
                </Link>

                <ul className="header-link-container">
                  <li className="header-link-item">
                    <Link to="/" className={linkClassName}>
                      <button className="link-button" type="button">
                        Home
                      </button>
                    </Link>
                  </li>
                  <li className="header-link-item">
                    <Link to="/about" className={linkClassName}>
                      <button className="link-button" type="button">
                        About
                      </button>
                    </Link>
                  </li>
                </ul>
                <button
                  className="theme-button"
                  type="button"
                  onClick={() => changeTheme()}
                >
                  {isThemeLight ? (
                    <IoMdMoon size="30" color="#000000" />
                  ) : (
                    <BsFillSunFill size="30" color="#ffffff" />
                  )}
                </button>
                <button
                  type="button"
                  className="mobile-menu-button"
                  onClick={this.toggleMobileMenu}
                  aria-label="close-button"
                >
                  <MdMenuOpen
                    size="30"
                    color={isThemeLight ? '#000000' : '#ffffff'}
                  />
                </button>
              </div>
              {showMobileMenu && (
                <ul className="mobile-header-link-container">
                  <li className="header-link-item">
                    <Link to="/" className={linkClassName}>
                      <button className="link-button" type="button">
                        Home
                      </button>
                    </Link>
                  </li>
                  <li className="header-link-item">
                    <Link to="/about" className={linkClassName}>
                      <button className="link-button" type="button">
                        About
                      </button>
                    </Link>
                  </li>
                </ul>
              )}
            </>
          )
        }}
      </CovidContext.Consumer>
    )
  }
}

export default withRouter(Header)
