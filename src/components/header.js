import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const headerStyle = {
  background: `rebeccapurple`,
  marginBottom: `1.45rem`
}

const headerWrapStyle = {
  margin: `0 auto`,
  maxWidth: 1200,
  padding: `1.45rem 1.0875rem`
}

const headerLogoStyle = {
  color: `black`,
  textDecoration: `none`
}

const Header = ({ siteTitle }) => (
  <header style={headerStyle}>
    <div style={headerWrapStyle}>
        <Link to="/"style={headerLogoStyle}>
          {siteTitle}
        </Link>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
