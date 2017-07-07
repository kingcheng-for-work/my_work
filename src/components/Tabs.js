import React,{Component} from 'react'
import {NavLink} from 'react-router-dom' 

class Tabs extends Component{
	constructor(){
		super();
		this.state = {
			positionInfo:{}
		}
	}
	
	render(){
		return (
			<nav class="tabs">
				{
					this.props.tabsData.map((item, index)=>{
						const name = 'iconfont ' + item.icon;
						return (
//							console.log(this)
							<NavLink key={index} to={{
													pathname: item.path,
													state:{
															positionInfo: this.props.positionInfo
														}
													}} isActive={this.getTabsActive.bind(this, index)}>
								<em className={name}></em>
								<span>{item.title}</span>
							</NavLink>
						)
						
					})
				}
			</nav>
		)	
	}
	
	getTabsActive(index, match, location){
		
		if(location.pathname =='/' && index==0){
			return true;
		}
		else if(!match){
			return false;
		}
		else{
			return true;
		}
	}
	
}

export default Tabs;