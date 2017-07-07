import React,{Component} from 'react'
import {HashRouter as Router, Route, NavLink} from 'react-router-dom'

import Tabs from './Tabs.js'

import TakeoutCom from './takeout/TakeoutCom.js'
import FindCom from './find/FindCom.js'
import OrderCom from './order/OrderCom.js'
import MineCom from './mine/MineCom.js'

import 'whatwg-fetch'

export default class App extends Component{
	constructor(){
		super();
		this.state ={
			activeIndex: 0,
			data:[
				{title:'外卖',path:'/takeout', com: TakeoutCom, icon:'icon-eleme'},
				{title:'发现',path:'/discover', com: FindCom, icon:'icon-discover'},
				{title:'订单',path:'/order', com: OrderCom, icon:'icon-order'},
				{title:'我的',path:'/mine', com: MineCom, icon:'icon-mine'}
			],
			positionInfo:{}
		}
	}
	
	componentWillMount(){
		
		//如果有原生的接口，H5+
		//H5 定位
//		navigator.geolocation.getCurrentPosition(
//			(location)=>{
//				alert('定位成功');
//				let info = {
//					longitude:location.coords.longitude,
//					latitude:location.coords.latitude
//				}
//				this.setState({positionInfo: info});
//			},
//			(error)=>{
//				//定位失败
//				alert('定位失败');
//				let info = {
//					longitude:114.059563,
//					latitude:22.54286
//				}
//				this.setState({positionInfo: info});
//			}
//		);
		
		let info={
			longitude:114.059563,
			latitude:22.54286
		}
		this.setState({positionInfo: info})
		
		localStorage.setItem('longitude', 114.059563);
		localStorage.setItem('latitude', 22.54286);
	
	}
	
	render(){
		
		return(
			<Router>
				<div>
					<Route exact path='/' render={()=>{
						return <TakeoutCom positionInfo={this.state.positionInfo}/>
					}}/>
					{
						this.state.data.map((item, index)=>{
							return <Route key={index} component={item.com} path={item.path}></Route>
						})
						
					}
					
					<Tabs positionInfo={this.state.positionInfo} tabsData = {this.state.data}/>
				</div>
			</Router>
		)
	}
	
}
