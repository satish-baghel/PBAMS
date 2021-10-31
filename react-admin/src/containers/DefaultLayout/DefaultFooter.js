import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const propTypes = {
  children: PropTypes.node,
}

const defaultProps = {}

class DefaultFooter extends Component {
  getYear = () => {
    let d = new Date()
    let nowYear = d.getFullYear()
    let nextYear = d.getFullYear().toString().substr(-2)
    nextYear = parseInt(nextYear) + 1

    return `${nowYear}-${nextYear}`
  }
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props

    return (
      <React.Fragment>
        <span>
          <Link to='#!'>PBAMS</Link> &copy;{this.getYear()}
        </span>
        <span className='ml-auto'>
          Powered by <a href='#!'>PBAMS</a>
        </span>
      </React.Fragment>
    )
  }
}

DefaultFooter.propTypes = propTypes
DefaultFooter.defaultProps = defaultProps

export default DefaultFooter
