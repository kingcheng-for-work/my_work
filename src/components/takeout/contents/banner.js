import React,{Component} from 'react'
import PropTypes from 'prop-types'

import ReactSwipe from 'react-swipe'

import api from '../../../common/api.js'

class Banner extends Component{
	render(){

		let arr = this.props.bannerData.map((item)=>{
			return item;
		});
		let pages = [];
		while(arr.length>0){
			let newArr = arr.splice(0, 8);
			pages.push(newArr);
		}
		return (
			<div class="banner">
				<ReactSwipe key={pages.length} class="banner-wrapper" swipeOptions={{continuous: true}}>
				{
					pages.map((list, i)=>{
						return (
							<ul class="banner-list" key={i}>
								{
									list.map((item, j)=>{
										return(
											<li class="banner-item" key={j}>
												<img src={`${api.imghost}/${item.image_hash}.jpeg`}/>
												<span>{item.name}</span>
											</li>
										)
									})
								}
							</ul>
						)
					})
				}
				</ReactSwipe>
			</div>
		)
	}
}

Banner.propTypes = {
	bannerData: PropTypes.array
}

export default Banner;
