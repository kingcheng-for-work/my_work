import React,{Component} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import PropTypes from 'prop-types'
import {Route,Link} from 'react-router-dom'

import 'whatwg-fetch'
import api from '../../common/api.js'

require('./css/SearchCom_detail.css')

class SearchCom_detail extends Component{
	
	constructor(){
		super();
		this.state={
			offset:0,
			limit:20,
			restaurantData:[],
			keywords:''
		}
	}
	
	
	componentWillMount(){
//		console.log(this.props.location)
		let keywords_value= this.props.keywords;
		
		this.setState({keywords: keywords_value})
		
		let l = localStorage.getItem('longitude');
		let t = localStorage.getItem('latitude');
		let address = `${api.search_shopdetailApi}search?offset=${this.state.offset}&limit=${this.state.limit}&keyword=${this.props.keywords}&latitude=${t}&longitude=${l}&search_item_type=2&extra[]=activities`;
		
		fetch(address)
		.then((response)=>{
			return response.json();
		})
		.then((jsonData)=>{
//			console.log('jinlai',jsonData)
			//将接口得到的商店的信息存入到数组中,一般在此处做数据处理
			let newArray = [];
			for(let i in jsonData){
				let rest = jsonData[i];
				newArray.push(...rest.restaurant_with_foods);
				
			}
			this.setState({
				restaurantData : newArray
			})
//			console.log(this.state.restaurantData);
			
		})
	}
	
	//历史搜索要放在componentDidMount中
	componentDidMount(){
		let l = localStorage.getItem('longitude');
		let t = localStorage.getItem('latitude');
		
		addEventListener('keypress', (event)=>{
			
			if(event.keyCode == '13'){
				let value = this.inputEle.value;
				if(value != ""){
					
					//判断之前是否存入历史搜索的值，如果未存入就添加进localStorage
					let flag = false;
					let arr =[];
					let his = localStorage.getItem('history');

					arr = JSON.parse(his);
//					console.log('biaozhi', arr)
					arr.map((item, index)=>{
						if(item == value){
							flag = true;
							
						}
					})
				
					if(!flag){
						arr.push(value);
					}
//					console.log(arr)
					localStorage.setItem('history', JSON.stringify(arr))
					/*********************/

						
						if(this.state.keywords){
							this.props.reload();
							let address = `${api.search_shopdetailApi}search?offset=${this.state.offset}&limit=${this.state.limit}&keyword=${this.state.keywords}&latitude=${t}&longitude=${l}&search_item_type=2&extra[]=activities`;
							
							fetch(address)
							.then((response)=>{
								return response.json();
							})
							.then((jsonData)=>{
								//将接口得到的商店的信息存入到数组中,一般在此处做数据处理
								let newArray = [];
								for(let i in jsonData){
									let rest = jsonData[i];
									newArray.push(...rest.restaurant_with_foods);
								}
								this.setState({
									restaurantData : newArray
								})
				
								
							})
						}
					
				}	
			}
		})
	}
	
	render(){
		
		
		return(
			<ReactCSSTransitionGroup transitionName={{
				appear: 'slideInRight',
				appearActive: 'slideInRight'
			}} transitionAppear={true} transitionAppearTimeout={500}
			transitionEnter={false} transitionLeave={false}>
			
			<div id="search_detail">
				<div class="search_header">
					<div class="wrapper">
						<span onClick={this.goback.bind(this)}>{`X`}</span>
						<input ref={node => this.inputEle = node} type="text" placeholder="输入商家、商品名称" value={this.state.keywords} onChange={this.changeValue.bind(this)}/>	
					</div>
				</div>
				<div class="classify">
					<li><span>分类<span class="arrow"></span></span></li>
					<li><span>排序<span class="arrow"></span></span></li>
					<li><span>筛选<span class="arrow"></span></span></li>
				</div>
				<ul>
					{
//						console.log(this.state.restaurantData);
						this.state.restaurantData.map((item, index)=>{
							let delivery_mode = item.restaurant.delivery_mode ?  item.restaurant.delivery_mode.text: '商家配送';
							let supports = item.restaurant.supports[1] ? item.restaurant.supports[1].name:'';
							const hz = item.restaurant.image_path.endsWith('png')? 'png': 'jpeg';
							const imgSrc = `${api.imghost}/${item.restaurant.image_path}.${hz}`;
//							console.log(item.restaurant)	
							return(
									<Link to={`/takeout/detail/&id=${item.restaurant.id}`}  key={index}>	
									<li class="search_shopdetail">
										<img src={imgSrc}/>
										<div class="info_box">
											<div class="title">
												<h4>{item.restaurant.name}</h4>
											</div>
											<div class="info_1">
												<div>
													<span>{item.restaurant.rating}</span>
													<span>月送{item.restaurant.recent_order_num}单</span>
												</div>
												<div>
													<span>{supports}</span>
													<span>{delivery_mode}</span>
												</div>
											</div>
											<div class="info_2">
												<div>
													<span>¥{item.restaurant.float_delivery_fee}起送/</span>
													<span>{item.restaurant.piecewise_agent_fee.description}/</span>
													<span>{item.restaurant.average_cost}</span>
												</div>
												<div>
													<span>{(item.restaurant.distance/1000).toFixed(2)}km</span>
													<span>{item.restaurant.order_lead_time}分钟</span>
												</div>
											</div>
										</div>
									</li>
									</Link>
									
							)

						})
					}
					<li class="search_shopdetail_no">没有更多了哦~</li>
				</ul>
			</div>
			</ReactCSSTransitionGroup>
		)
		
	}
	
	//返回
	goback(){
		const addressEle= document.querySelector("#search_detail");
		addressEle.className = 'slideInLeft';
		window.history.back();
		
		
	} 
	
	//改变搜索框里面的值
	changeValue(){
		
		let l = localStorage.getItem('longitude');
		let t = localStorage.getItem('latitude');
		let value = this.inputEle.value;
		this.setState({keywords: value});
		
		
		
	}
	
}

export default SearchCom_detail;
