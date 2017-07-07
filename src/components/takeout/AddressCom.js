import React,{Component} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import 'whatwg-fetch'
import api from '../../common/api.js'


require('./css/AddressCom.css')

class AddressCom extends Component{
	
	constructor(){
		super();
		this.state = {
			offset:0,
			limit:20,
			keyword:'',
			searchData:[]
		}
	}
	
	render(){
		return (
			<ReactCSSTransitionGroup transitionName={{
				appear: 'slideInRight',
				appearActive: 'slideInRight'
			}} transitionAppear={true} transitionAppearTimeout={500}
			transitionEnter={false} transitionLeave={false}>
				<div id="address_search">
					<div class="address_header">
						<div class="header_wrapper">
							<div class="title">
								<span onClick={this.goback.bind(this)}>&lt;</span>
								<span>选择地址</span>
							</div>
							<input type="text" placeholder="请输入地址" onChange={this.changeActive.bind(this)}/>	
						</div>
					</div>
					
					<ul className="add_list">
						{
							this.state.searchData.map((item,index)=>{
								return(
									<li key={index}>
										<p>{item.name}</p>
										<span>{item.address}</span>
									</li>
								)
							})
						}
					</ul>
					
				</div>
			</ReactCSSTransitionGroup>
		)
	}
	
	goback(){
	
		const addressEle= document.querySelector("#address_search");
		addressEle.className = 'slideOutRight';
		setTimeout(()=>{
			this.props.history.goBack();
		},500)
		
	}
	
	changeActive(event){
		var data = event.target.value;
		this.setState({keyword:data})
		//请求搜索地址数据
		setTimeout(()=>{
			if (this.state.keyword) {
				fetch(`${api.searchApi}?keyword=${this.state.keyword}&offset=${this.state.offset}&limit=${this.state.limit}`)
				.then((response)=>{
					return response.json()
				})
				.then((jsonData)=>{
					this.setState({searchData:jsonData})
					console.log(jsonData)
				});
			}
			
		},1000)
	}
}

export default AddressCom;