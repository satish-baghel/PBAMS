import React, { Component } from 'react'
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'
import PropTypes from 'prop-types'

import {
  AppAsideToggler,
  AppHeaderDropdown,
  AppNavbarBrand,
  AppSidebarToggler,
} from '@coreui/react'
import logo from '../../assets/img/brand/logo.png'
import miniLogo from '../../assets/img/brand/miniLogo.png'

const propTypes = {
  children: PropTypes.node,
}

const defaultProps = {}

class DefaultHeader extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props

    return (
      <React.Fragment>
        <AppSidebarToggler className='d-lg-none' display='md' mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{
            src: miniLogo,
            width: 30,
            height: 30,
            alt: 'CoreUI Logo',
          }}
        />
        <AppSidebarToggler className='d-md-down-none' display='lg' />

        <Nav className='ml-auto' navbar>
          <AppHeaderDropdown direction='down'>
            <DropdownToggle nav>
              <img
                src={'assets/img/avatars/6.jpg'}
                className='img-avatar'
                alt='admin@bootstrapmaster.com'
              />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem>
                <i className='fa fa-lock'></i> Logout
              </DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        {/* <AppAsideToggler className='d-md-down-none' /> */}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    )
  }
}

DefaultHeader.propTypes = propTypes
DefaultHeader.defaultProps = defaultProps

export default DefaultHeader
