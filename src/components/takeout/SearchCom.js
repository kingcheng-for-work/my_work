import React,{Component} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {Route,Link} from 'react-router-dom'

import SearchCom_detail from './SearchCom_detail.js'

import 'whatwg-fetch'
import api from '../../common/api.js'

require('./css/SearchCom.css')

class SearchCom extends Component{
	
	constructor(){
		super();
		this.state={
			hotData:[],
			historyData:[],
			keywords:''
		}
	}
	
	componentWillMount(){
		let longitude = localStorage.getItem('longitude');
		let latitude = localStorage.getItem('latitude');
		let searchHistory = JSON.parse(localStorage.getItem('history'));
			
		fetch(`${api.hotwordsApi}?geohash=ws105rz9smwm&latitude=${latitude}&longitude=${longitude}`)
		.then((response)=>{
			return response.json();
		})
		.then((jsonData)=>{
			this.setState({hotData:jsonData,historyData:searchHistory});
//			console.log("历史记录", this.state.historyData);
		})

	}
	
	componentDidMount(){
		addEventListener('keypress',(event)=>{
			
			if(event.keyCode == '13'){
				let value = this.inputEle.value;
				if(value != ""){
					this.setState({keywords: value},()=>{
						this.props.history.push('/takeout/search/detail');
								
					});
					
					//判断之前是否存入历史搜索的值
					let flag = false;
					let arr =[];
					let his = localStorage.getItem('history');
					
					if(his){
						arr = JSON.parse(his);
						
						arr.map((item, index)=>{
							if(item == value){
								flag = true;
							}
						})
						
						if(!flag){
							arr.push(value);
						}
					}else{
						arr.push(value)
					}
					localStorage.setItem('history', JSON.stringify(arr))
					this.setState({historyData: arr});
				}
			}
		})
	}
	
	render(){
		
		let historyList;
		if(this.state.historyData){
			historyList = this.state.historyData.map((his,i)=>{
				console.log(his);
				return (
					<Link to='/takeout/search/detail' onClick={this.search.bind(this)}  key={i}>
						<li ref={node=>this.liEle = node}>{his}</li>
					</Link>
				)
			})
			historyList = <div class='history_search'>
								<h1>历史搜索</h1>
								<a class='del' onClick={this.delHistory.bind(this)}>删除</a>
								<div class='clear'></div>
								<ul>
									{historyList}
								</ul>
						   </div>
		}
		
		return (
			<ReactCSSTransitionGroup transitionName={{
				appear: 'fadeIn',
				appearActive: 'fadeIn'
			}} transitionAppear={true} transitionAppearTimeout={500}
			transitionEnter={false} transitionLeave={false}>
				<div id="search">
					<div class="search_header">
						<div class="wrapper">
							<span onClick={this.goback.bind(this)}>{`<`}</span>
							<input ref={node => this.inputEle = node} type="text" placeholder="输入商家、商品名称"/>	
						</div>
					</div>
					
					<div className="content">
						{historyList}
						<div class='hot_search'>
							<h1>热门搜索</h1>
							<ul> 
								{
									this.state.hotData.map((item,index)=>{
										return (
											<Link to={{
												pathname:'/takeout/search/detail',
												state:{
													keywords:item.word
												}
											}} key={index}>
												<li key={index}>{item.word}</li>
											</Link>
										)
									})
								}
							</ul>
						</div>
					</div>
					<Route  path="/takeout/search/detail" render={()=>{
						return <SearchCom_detail keywords={this.state.keywords} reload={this.reload.bind(this)}></SearchCom_detail>
					}}/>
				</div>
			</ReactCSSTransitionGroup>
			
			
		)
	}
	
	
	
	
	//返回
	goback(){
		const addressEle= document.querySelector("#search");
		addressEle.className = 'fadeOut';
		setTimeout(()=>{
			this.props.history.goBack();
		},500)
		
	} 
	
	//删除历史搜索
	delHistory(){
		localStorage.removeItem('history');
		this.setState({historyData:[]})
	}
	
	//跳转到搜索详情时，定义一个函数，方便搜索详情返回时，将参数一并返回
	reload(){
		let arr = JSON.parse(localStorage.getItem('history'));
		this.setState({historyData: arr});
	}
	
	//点击历史搜索词搜索
	
	search(){
		console.log('标志')
		
		var value = this.liEle.innerHTML;
		console.log(value);
		
	}
	
}

export default SearchCom;