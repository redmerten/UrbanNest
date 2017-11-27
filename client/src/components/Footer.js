/**
 * Created by AndreaMerten on 10/19/17.
 */

import React from 'react'

export default () => {

  const footerMenuStyle = {
    float: 'left',
    width: '300px',
    marginRight: '20px',
    listStyle: 'none'
  }

  const csItems = ['Order Status', 'Returns', 'Provide Feedback']
  const aboutUs = ['Careers', 'Blogs']
  const legal = ['Terms and Conditions', 'Privacy Rights', 'CA Supply Chain Act']

  const footerMenu= (which)=> {
    return which.map(e =>
      <li key={e}>{e}</li>
    )
  }


  return(
    <div style = {{'clear':'both','paddingTop':'30px', 'marginLeft':'10px', 'width':'960px'}}>
      <ul style={footerMenuStyle}>
        <strong>Customer Service</strong>
        {footerMenu(csItems)}
      </ul>


      <ul style={footerMenuStyle}>
        <strong>About Us</strong>
        {footerMenu(aboutUs)}
      </ul>


      <ul style={footerMenuStyle}>
        <strong>Legal</strong>
        {footerMenu(legal)}
      </ul>
    </div>

  )}

