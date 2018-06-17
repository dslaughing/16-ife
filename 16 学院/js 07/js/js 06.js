
var inputvalue=document.getElementById("showinput");
var toshowarr=new Array();

(function(){
	leftin();
	rightin();
	leftout();
	rightout();
	bubbleSort();
})();

function renderChart(){
	var toshow=document.getElementsByClassName("toshow")[0];
	var showarr=document.getElementsByClassName("showarr")[0];
	var toadd="";
	var arrcont="<span>数组:["+toshowarr.join()+"]</span>";
	toshowarr.forEach(function(item,index,arr){
		toadd=toadd+"<span style=height:"+item+"%;line-height:"+6*item+"px>"+item+"</span>"
	})
	toshow.innerHTML=toadd;
	showarr.innerHTML=arrcont;
}


function leftin(){
	var btn=document.getElementById("leftin");
	btn.onclick=function(){
		var toadd=inputvalue.value;
		toadd=parseInt(toadd);
		if(toadd==""){
			alert("你输入空白值了");
		}
		else{                  
			if((/^(?:[1-9][0-9]|100)$/).test(toadd) &&  toshowarr.length<20){
				toshowarr.unshift(toadd);
				renderChart();
			}
			else if(toshowarr.length==20){
				alert("你输入的数已有20个")
			}
			else
			{
				alert("请输入10到100的数字")
			}
		}
	}
}

function leftout(){
	var btn=document.getElementById("leftout");
	btn.onclick=function(){
		var a=toshowarr.shift();
		renderChart();
		alert(a);
	}
}

function rightin(){
	var btn=document.getElementById("rightin");
	btn.onclick=function(){
		var toadd=inputvalue.value;
		toadd=parseInt(toadd);
		if(toadd==""){
			alert("你输入空白值了");
		}
		else{
			if(/^(?:100|[1-9][0-9])$/.test(toadd) && toshowarr.length<20){
				toshowarr.push(toadd);
				renderChart();
			}
			else if (toshowarr.length==20){
				alert("你输入的数已有20个")
			}
			else{
				alert("请输入10到100的数");
			}
		}
	}
}

function rightout(){
	var btn=document.getElementById("rightout");
	btn.onclick=function(){
		var a=toshowarr.pop();
		renderChart();
		alert(a);
	}
}

function bubbleSort(){
	var btn=document.getElementById("sort");
	btn.onclick=function(){
		var i=0;
		var j=0;
		var temp;
		var flag;
		var timer=setInterval(function(){
			if (i<toshowarr.length-1 && j==toshowarr.length-1-i){
				i++;
				j=0;
				flag=false;
			}
			else if(j<toshowarr.length-1-i){
					if(toshowarr[j]>toshowarr[j+1]){
						temp=toshowarr[j];
						toshowarr[j]=toshowarr[j+1];
						toshowarr[j+1]=temp;
						flag=true;
						renderChart();
						document.querySelectorAll(".toshow span")[j].style.backgroundColor="green";
					}
					j++;
					if(j==toshowarr.length-1-i && flag==false){
						document.querySelectorAll(".toshow span")[j].style.backgroundColor="yellow";
						document.querySelectorAll(".toshow span")[j].style.color="black";
						clearInterval(timer);
					}
			}
			else{
				document.querySelectorAll(".toshow span")[j].style.backgroundColor="yellow";
				document.querySelectorAll(".toshow span")[j].style.color="black";
				clearInterval(timer);
			}
		},250)
	}
}






