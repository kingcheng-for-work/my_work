import React,{Component} from 'react'
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom'

import Header from './contents/Header.js'
import Banner from './contents/Banner.js'
import Commend from './contents/commend.js'
import AddressCom from './AddressCom.js'
import SearchCom from './SearchCom.js'
import DetailCom from './DetailCom.js'

import 'whatwg-fetch'
import api from '../../common/api.js'

import './css/takeout.css'

export default class TakeoutCom extends Component{
	constructor(){
		super();
		this.state={
			weather:{},
			address:'',
			hotwords:[],
			bannerData:[],
			offset: 0,
			limit:20,
			listData:[],
			homeScroll: null,
			l:null,
			t:null,
			positionInfo: {}
		}
	}
	
	componentWillMount(){
		
//		console.log(this.props);
		let positionInfo = this.props.positionInfo;
		if(positionInfo == undefined){
			positionInfo = this.props.location.state.positionInfo;
		}//这个地方为什么这么写
		
		this.setState({positionInfo: positionInfo})
		
		
		//解析longitude 和 latitude信息
		let {longitude:l , latitude:t} = positionInfo;
		this.setState({l:l,t:t});
//		console.log(l)

		
		
		//获取天气信息
		fetch(`${api.weatherApi}?longitude=${l}&latitude=${t}`)
		.then((response)=>{
			return response.json();
		})
		.then((jsonData)=>{
			this.setState({weather: jsonData})
		})
		
		//获取地址信息
		fetch(`${api.geoApi}?longitude=${l}&latitude=${t}`)
		.then((response)=>{
			return response.json();
		})
		.then((jsonData)=>{
			this.setState({address: jsonData.address})
		})
		
		
		//获取热搜词的数据
		fetch(`${api.hotwordsApi}?longitude=${l}&latitude=${t}`)
		.then((response)=>{
			return response.json();
		})
		.then((jsonData)=>{
			this.setState({hotwords: jsonData})
		})
		
		//请求banner处的数据
		fetch(`${api.bannerApi}?longitude=${l}&latitude=${t}&templates[]=main_template`)
		.then((response)=>{
			return response.json();
		})
		.then((jsonData)=>{
			this.setState({bannerData: jsonData[0].entries})
		})
		
		//请求推荐商家的数据
		fetch(`${api.listApi}?longitude=${l}&latitude=${t}&offset=${this.state.offset}&limit=${this.state.limit}`)
		.then((response)=>{
			return response.json();
		})
		.then((jsonData)=>{
			this.setState({listData: jsonData})
//			console.log(jsonData)
			
		})
		
	}
	
	componentDidMount(){
		const homeEle = this.refs.home;
		
		const homeScroll = new IScroll(homeEle,{
			propTypes:3
		});
		
		this.setState({homeScroll: homeScroll});
		let this_1 = this;
		
		//上下拉刷新的判断
		homeScroll.scrollTo(0, -50);
		var isAddDown = false;
		homeScroll.on('scroll', function(){
		
			//加载更多箭头图标换方向
			var y = this.y;
			var maxY = this.maxScrollY;
			var disY = maxY - y;
			if(disY >= 0 && !isAddDown){
				isAddDown = true;
				$('.foot').addClass('down');
			}
			else if(disY < 0 && isAddDown){
				isAddDown = false;
				$('.foot').removeClass('down');
			}
		});
	
		homeScroll.on('scrollEnd', function(){
			
			
			var y = this.y;
			var maxY = this.maxScrollY;
			var disY = maxY - y;
			
			
			if(disY>=0){
				//加载更多
				console.log('loadmore....');
				//换图片
				$('.foot img').attr('src', '/src/components/takeout/img/ajax-loader.gif');
				
				this_1.setState({offset: this_1.state.offset + this_1.state.limit})
				//请求下一页数据
				//请求推荐商家的数据
				fetch(`${api.listApi}?longitude=${this_1.state.l}&latitude=${this_1.state.t}&offset=${this_1.state.offset}&limit=${this_1.state.limit}`)
				.then((response)=>{
					return response.json();
				})
				.then((jsonData)=>{
					this_1.setState({listData: this_1.state.listData.concat(jsonData) })
					
				})
				
				//请求成功
				setTimeout(function(){
				
					colseLoadMore()
				}, 2000)
			}
			else if(disY<0 && disY>-50){
				this.scrollTo(0, maxY+50, 300);
			}
		});
	
		function colseRefresh(){
			$('.head img').attr('src', '/src/components/takeout/img/arrow.png');
			homeScroll.scrollTo(0, -50, 300);
		}
		function colseLoadMore(){
			$('.foot img').attr('src', '/src/components/takeout/img/arrow.png');
			homeScroll.scrollTo(0, homeScroll.maxScrollY+50, 300);
		}
	}
	
	render(){
		return (
			<div>
				<div ref="home" id="home">
					<div class="home-wrap">
						<Header {...{
							weather: this.state.weather,
							address: this.state.address,
							hotwords: this.state.hotwords
				
						}}/>
						<Banner bannerData={this.state.bannerData}/>
						<Commend refresh={this.scrollRefresh.bind(this)} listData = {this.state.listData}/>
					
						
						<div class="foot">
							<img src="/src/components/takeout/img/arrow.png" />
							<span>加载更多...</span>
						</div>
					</div>
				</div>
				<Route path="/takeout/address" component={AddressCom}/>
				<Route path="/takeout/search" component={SearchCom}/>
				<Route path="/takeout/detail/&id=:id"  component={DetailCom}/>
			
			</div>
			
		)
	}
	
	scrollRefresh(){
		if(this.state.homeScroll){
			this.state.homeScroll.refresh();
		}
		
	}
}

