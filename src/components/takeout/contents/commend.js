import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

import api from '../../../common/api.js'

class Commend extends Component{
	render(){
		return(
			<div class="commend">
				<div class="rmd_title">推荐商家</div>	
				<section class="shoplist">
					{
						this.props.listData.map((item, index)=>{
							const hz = item.image_path.endsWith('png')? 'png': 'jpeg';
							const imgSrc = `${api.imghost}/${item.image_path}.${hz}`;
							return(
								<Link key={index} class="shop_link" to={`/takeout/detail/&id=${item.id}`}>
									<section class="shop_container" >
										<div class="container_wrapper">
											<img src={imgSrc}/>
											<div class="shop_info">
												<li class="shop_name_brand">
													<span class="brand">品牌</span>	
													<span class="shop_name">{item.name}</span>
												</li>
												<li class="shop_customer">
													<span class="rating">评分:{item.rating}</span>
													<span class="recent_order_num">月送{item.recent_order_num}单</span>
												</li>
												<li class="fee">
													<span>
														<span>¥{item.float_minimum_order_amount}起送/</span>
														<span>{item.piecewise_agent_fee.description}/</span>
														<span>{item.average_cost}</span>
													</span>
													<span>
														<span class="distance">{item.distance}m/</span>
														<span class="lead_time">{item.order_lead_time}min</span>
													</span>
												</li>
											</div>
										</div>
									</section>
								</Link>
							)
						})
					}
				</section>
			</div>
		)
	}
	
	componentDidMount(){
		this.props.refresh();
	}
	
	componentDidUpdate(){
		this.props.refresh();
	}
}

export default Commend;
