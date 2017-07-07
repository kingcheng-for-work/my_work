import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

class Header extends Component{
	render(){
		let wrapWidth=0;
		const lis = this.props.hotwords.map((item, index)=>{
			wrapWidth += item.word.length*12 + 20;
			return <li key={index}>{item.word}</li>
		})
		
		return (
			<div class="header">
				<div class="header-wrapper">
					<div class="info">
						<span class="address"><Link to="/takeout/address">地址{this.props.address}</Link></span>	
						<span class="arrow"><Link to="/takeout/address"></Link></span>
						<span class="weather">
							<span>{this.props.weather.description}</span>
							<span>{this.props.weather.temperature}℃</span>
						</span>
					</div>
			
					<div class="search">
						<Link to="/takeout/search"><input type="text" placeholder="搜索商家、商品"/></Link>
					</div>
					<div class="hotwords">
						<ul >{lis}</ul>
					</div>
				</div>
			</div>
		)
	}
}

Header.propTypes={
	address: PropTypes.string,
	weather: PropTypes.object,
	hotwords: PropTypes.array
}

export default Header;
