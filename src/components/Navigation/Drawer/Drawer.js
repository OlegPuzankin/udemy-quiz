import React, {Component} from 'react'
import classes from './Drawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import cn from 'classnames'
import {NavLink} from 'react-router-dom'

// const links = [
//   {to:'/', label: 'Quiz list', exact:true },
//   {to:'/quiz-creator', label: 'Quiz creator', exact:false },
//   {to:'/auth', label: 'Authorization', exact:false }
// ];

class Drawer extends Component {

  renderLinks(links) {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
              to={link.to}
              exact={link.exact}
              onClick={this.props.onClose}
              activeClassName={classes.active}>
            {link.label}
          </NavLink>
        </li>
      )
    })
  }

  render() {

    const links = [
      {to:'/', label: 'Quiz list', exact:true },
    ];

    if (this.props.isAuthenticated){
      links.push({to:'/quiz-creator', label: 'Quiz creator', exact:false });
      links.push({to:'/quiz-creator-redux', label: 'Quiz creator redux', exact:false });
      links.push({to:'/logout', label: 'Logout', exact:false });
    }
    else{
      links.push({to:'/auth', label: 'Authorization', exact:false })
    }

    return (
      <React.Fragment>
        <nav className={cn({[classes.Drawer]:true, [classes.close]:!this.props.isOpen})}>
          <ul>
            { this.renderLinks(links) }
          </ul>
        </nav>
        { this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null }
      </React.Fragment>
    )
  }
}



export default Drawer