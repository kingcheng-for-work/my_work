import React,{Component} from 'react'
import {Route, Link} from 'react-router-dom'

import 'whatwg-fetch'
import api from '../../common/api.js'

import './css/DetailCom.css'

class DetailCom extends Component{
	
	constructor(){
		super();
		this.state={
			activities:[],
			detail_title:{},
			detail_info:[]
		}
		
	}
	
	
	
	componentWillMount(){
		let l = localStorage.getItem('longitude');
		let t = localStorage.getItem('latitude');
		
		let id = this.props.match.params.id;
	
		
		//获取商品促销及头部信息
		fetch(`${api.shop_saleApi}${id}?extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification&latitude=${t}&longitude=${l}`)
		.then((response)=>{
			return response.json();
		})
		.then((jsonData)=>{
			this.setState({detail_title: jsonData})
			this.setState({activities: jsonData.activities});
			
		})
		
	//获取商店详细信息
		fetch(`${api.shop_detailApi}${id}`)
		.then((response)=>{
			return response.json();
		})
		.then((jsonData)=>{
			
			this.setState({detail_info: jsonData})
			
		})
	}
	
	//将详情页的主内容区的食品数组取出
	
	
	render(){
		let image_path = this.state.detail_title.image_path;
		let imgSrc;
//		let length;
		if(image_path == undefined){
			return false;
		}else{
			const hz = this.state.detail_title.image_path.endsWith('jpeg')? 'jpeg': 'png';
			imgSrc = `${api.imghost}/${this.state.detail_title.image_path}.${hz}`;
			
		}
		
		return (
				<div id="detail">
					<div id="background">
						<img src={imgSrc}/>
					</div>
					<div id="opacity"></div>
					<div class="detail_title">
						<div class="back" onClick={this.goback.bind(this)}>{`<`}</div>
						<div class="detail_title_info">
							<img src={imgSrc}/>
							<div class="info_box">
								<h4>{this.state.detail_title.name}</h4>
								<div class="info_box_1">
									<div>
										<span>商家配送/</span>
										<span>平均{this.state.detail_title.order_lead_time}分钟/</span>
										<span>配送费¥{this.state.detail_title.float_delivery_fee}元/</span>
									</div>
									<div class="detail_go">
										{`>`}
									</div>
								</div>
								<div class="info_box_2">
									<span>公告:{this.state.detail_title.promotion_info}</span>
								</div>
							</div>
						</div>
						<ul class="act_list">
							<span class="act_num">{this.state.activities.length}个活动<span></span></span>
							
							{
								
								this.state.activities.map((item, index)=>{
									
									return (
										<li key={index} class="act_item">
											<span>{item.icon_name}</span>
											<span>{item.description}</span>
										</li>
									)
								})
							}
						</ul>
					</div>
					
					
					<div class="content">
						<div class="content_header">
							<li>商品</li>
							<li>评论</li>
						</div>
						<div class="content_box1">
							<div class="rmd_list">
								{
									this.state.detail_info.map((item, index)=>{
										return (
											<li key={index}>{item.name}</li>
										)
									})
								}
								<li></li>
							</div>
							<div class="rmd_list_item">
								{
									this.state.detail_info.map((item, index)=>{
										return (
											<div key={index}>
												<div class="description">{item.name}</div>
												{
													item.foods.map((item, index)=>{
															const hz_2 = item.image_path.endsWith('jpeg')? 'jpeg': 'png';
															const imgSrc_2 = `${api.imghost}/${item.image_path}.${hz_2}`;
															return (<li class="good_list" key={index}>
																		<img src={imgSrc_2}/>
																		<div class="good_list_info">
																			<h4>{item.name}</h4>
																			<div>
																				<span>月售{item.month_sales}份</span>
																				<span>好评率{item.satisfy_rate}%</span>
																			</div>
																		</div>
																	</li>
															)
													})
		
												}
											</div>
										
										)
									})	
								}	
									
								
							</div>
							<div class="detail_tabs">
								<li class="cart">购物车</li>
								<li class="sum">
									<span></span>
									<span>另需配送费元</span>
								</li>
								<li class="go_account">去结算</li>
								
							</div>
						</div>
						<div class="content_box2"></div>
					</div>
		
				</div>
		)
	}
	
	goback(){
		
		setTimeout(()=>{
			this.props.history.goBack();
		},500)
		
	}
	
}

export default DetailCom;