const host ='https://mainsite-restapi.ele.me'

const imghost = 'http://fuss10.elemecdn.com'

//首页接口Api

//定位
//参数： latitude longitude
const geo = '/bgs/poi/reverse_geo_coding'; 

//地理搜索界面接口
const search = '/bgs/poi/search_poi_nearby';


//天气
//参数： latitude longitude
const weather = '/bgs/weather/current';

//热门词
//参数： latitude longitude
const hotwords = '/shopping/v3/hot_search_words';

//轮播
//参数： latitude longitude  templates[]=main_template
const banner = '/shopping/v2/entries';

//商品推荐
//参数： latitude longitude  offset  limit
const list = '/shopping/restaurants';

//店铺商品详情
//商品主内容区数据
const shop_detail = '/shopping/v2/menu?restaurant_id=';

//商品头部活动信息
const shop_sale = '/shopping/restaurant/';

//商品关键词搜索
const search_shopdetail = '/shopping/v1/restaurants/';

//search?offset=0&limit=20&keyword={%E6%8A%AB%E8%90%A8}&latitude=22.54286&longitude=114.059563&search_item_type=2&extra[]=activities

//https://mainsite-restapi.ele.me/shopping/restaurant/266388?extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification&latitude=22.555259&longitude=113.88402
//https://mainsite-restapi.ele.me/shopping/v1/restaurants/search?offset=0&limit=20&keyword={%E6%8A%AB%E8%90%A8}&latitude=22.54286&longitude=114.059563&search_item_type=2&extra[]=activities

export default {
	geoApi: host+geo,
	weatherApi: host+weather,
	searchApi: host+search,
	hotwordsApi: host+hotwords,
	bannerApi: host+banner,
	listApi: host+list,
	shop_detailApi: host+shop_detail,
	shop_saleApi: host+shop_sale,
	search_shopdetailApi: host+search_shopdetail,
	imghost
}
