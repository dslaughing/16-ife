/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;//返回月份，但从0开始表示1月，所以加1.
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);//获得1到seed的数（包括seed）
    dat.setDate(dat.getDate() + 1);//获取dat的下一天
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}
var colors=["#5be7ea","#8eed89","#a27dff","#cd8c61","#f45b89","#fcb90a","#00ff00","#56a5f3"];


/*跨浏览器添加事件*/
function addHandler(element,type,handler){
	if(element.addEventListener){
		element.addEventListener(type,handler,false);
	} else if(element.attachEvent){
		element.attachEvent("on"+type,handler);
	}else{
		element["on"+type]=handler;
	}
}

function getTime(time,count){
	var todate=Object.getOwnPropertyNames(aqiSourceData["上海"]);
	switch(time){
		case "day":
				return todate[count];
		case "week":
				return "2016年1到3月第"+(count+1)+"周";
		case "month":
				return "2016年第"+(count+1)+"月";
	}
}



/**
 * 渲染图表                    
 */
function renderChart(city,time) {
	var aqiChart=document.getElementsByClassName("aqi-chart-wrap")[0];
	var data=chartData[city][time];
	var toadd="";
	for (var i=0;i<data.length;i++){
		var color=colors[Math.floor(Math.random()*colors.length)];
		var a=0.4/data.length*1200-60;
		toadd=toadd+"<div style='height:"+data[i]/500*100+"%;flex-basis:"+0.8/data.length*100+"%;background:"+color+";'><span style='left:"+a+"px;'>[AQI]:"+Math.round(data[i])+"<br>"+getTime(time,i)+"</span></div>";                                                              
		
	}
	aqiChart.innerHTML=toadd;
}


/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
	console.log(this);
  // 设置对应数据
	var time=this.value;
	if(time !== pageState["nowGraTime"]){
		pageState["nowGraTime"]=time;
	}
  // 调用图表渲染函数
  renderChart(pageState["nowSelectCity"],pageState["nowGraTime"]);
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
	var city=this.value;
	if (city !== pageState["nowSelectCity"]){
		pageState["nowSelectCity"]=city;
	}
  // 设置对应数据
	renderChart(pageState["nowSelectCity"],pageState["nowGraTime"]);
  // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
	var radios=document.getElementsByName("gra-time");
	console.log(radios);
	for (var i=0;i<radios.length;i++){
		addHandler(radios[i],"click",graTimeChange);
}
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
	var cities=document.getElementById("city-select");
	var citydata=Object.getOwnPropertyNames(aqiSourceData);
	var toadd="";
	for(var i=0;i<citydata.length;i++){
		toadd=toadd+"<option>"+citydata[i]+"</option>";
	}
	cities.innerHTML=toadd;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
	addHandler(cities,"change",citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function dayData(cityname){
	var saveData=[];
	var SourceData=aqiSourceData[cityname];
		for(var x in SourceData){
			saveData.push(SourceData[x]);
		}
		return saveData;
	}
		
function monAverData(cityname){
	var todata=dayData(cityname);
	var saveData=[];
	var month=[31,29,31];   //如果日子数可以再这里添加多余的日子，例如多两天加两天，毕竟一开始生成的数据也是具体地的91数字。
	var count=0;
	for (var i=0;i<month.length;i++){
			saveData[i]=0;
		for (var j=0;j<month[i];j++){
			saveData[i]=saveData[i]+todata[count];
			count++;
		}
		saveData[i]=saveData[i]/month[i];
	}
	return saveData;
}

function weekAverData(cityname){
	var saveData=[];
	var todata=dayData(cityname);
	var count=1,toadd=0;
	for(var i=0;i<todata.length;i++){
				toadd=toadd+todata[i];
				if(count==7)
				{
					toadd=toadd/7;
					saveData.push(toadd);
					toadd=0;
					count=1;
				}
				else{count++}
				if(i==todata.length-1 && todata.length%7 !=0)
				{
					toadd=toadd/(todata.length%7);
					saveData.push(toadd);
				}
	}
	return saveData;
}

function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中  
 for (x in aqiSourceData){
	chartData[x]={
		"day":dayData(x),
		"week":weekAverData(x),
		"month":monAverData(x)
	}
}
}

/**
 * 初始化函数
 */
function init() {
initGraTimeForm()
initCitySelector();
initAqiChartData();
var aqiChart=document.getElementsByClassName("aqi-chart-wrap")[0];
   addHandler(aqiChart,"mouseover",function(event){
		var ele=event.target;
		ele.className += " show";
})
    addHandler(aqiChart, 'mouseout', function(event){
        var ele = event.target;
        ele.className = ele.className.replace(/show/, "");
    });

}

window.onload=function(){
	init();
}
