// 声母
let shm = [
	'b','p','m','f',
	'd','t','n','l',
	'g','k','h',
	'j','q','x',
	'zh','ch','sh',
	'r','z','c','s','y','w'
];
// 韵母
let yunm = [
	'a','o','e','i','u','v',
	'ai','ei','ui',
	'ao','ou','iu','ie',
	've','er',
	'an','en','in','un',,
	'ang','eng','ing','ong',
	'iang','iong','uan','ian'
]

// 能单独发音的韵母
let soundYArr = ['a','o','e','ai','ei','ao','ou','er','an','en','ang']

// 列举一个组合结果排除选项(排除不存在的字和生僻字读音)
let excludeEles = [
	'undefined',
	'biang','buan','biong','be','bv','bui','bou','biu','bve','ber','bun','bong',
	'puan','piong','piang','pv','pe','pui','piu','pve','per','pun','pong',
	'miang','miong','muan','mv','mui','mve','mer','mun','mong',
	'fian','fiang','fiong','fuan','fe','fi','fv','fai','fui','fao','fiu','fie','fve','fer','fin','fun','fing','fong',
	'dei','diang','diong','dve','do','de','dv','due','der','din',
	'tiang','tiong','tei','to','tv','tiu','tve','ter','ten','tin',
	'niong','no','nv','nui','nou','ner','nun',
	'lo','liong','lui','ler','len',
	'gian','giang','giong','go','gi','gv','giu','gie','gve','ger','gin','ging',
	'ki','kian','kiang','kiong','ko','kv','kei','kiu','kie','kve','ker','kin','king',
	'hian','hiang','hiong','hve','ho','hi','hv','hiu','hie','hue','her','hin','hing',
	'ja','ju','jui','jo','je','jai','jei','jao','jou','jer','jan','jen','jang','jeng','jong',
	'ga','qen','qan','qer','qou','qa','qo','qe','qu','qai','qei','qui','qao','qang','qeng','qong',
	'xong','xeng','xang','xen','xan','xer','xa','xo','xe','xu','xai','xei','xui','xao','xou',
	'zhian','zho','zhv','zhei','zhiu','zhie','zhve','zher','zhin','zhing','zhiong','zhiang',
	'chian','cho','chv','chei','chiu','chie','chve','cher','chin','ching','chiong','chiang',
	'shian','sho','shv','shiu','shie','shve','sher','shin','shing','shiong','shiang','shong',
	'rian','ra','ro','rv','rai','rei','riu','rie','rve','rer','rin','ring','riang','riong',
	'zian','zo','zv','ziu','zie','zve','zer','zin','zing','ziang','ziong',
	'cian','co','cv','ciu','cie','cve','cer','cin','cing','ciang','ciong',
	'sian','so','sv','siu','sie','sve','ser','sin','sing','siang','siong',
	'yo','yian','yai','yu','yeng','yen','yui','yiu','yie','yer','yiang','yiong',
	'wian','we','wi','wv','wui','wao','wou','wiu','wie','wve','wer','win','wun','wing','wong','wiang','wiong','wuan'
]
console.log(excludeEles.length);

// 组合韵母列举
let bcArr = [];

// 列举一个组合函数，然后去掉不符合规则的
function remix(arr1, arr2, excludeArr){
	var resArr = [];
	for(let i=0; i<arr1.length; i++){
		resArr.push([arr1[i]]);
		for(let j=0; j<arr2.length; j++){
			var tempStr = arr1[i]+arr2[j];
			if(!excludeArr.includes(tempStr) && !/undefined$/.test(tempStr)){
				resArr[i].push(resArr[i][0] + arr2[j]);
			}
			
		}
	}
	return resArr;
}

var results = remix(shm, yunm, excludeEles);
// 结果是一个二维数组
console.log(results); 

// dom操作
var genButton = document.querySelector('#genButton');
var soundY = document.querySelector('#soundY');
var remixY = document.querySelector('#remixY');
var getTotal = document.querySelector('#getTotal');
var totalCon = document.querySelector('#totalCon');
console.log(soundY.innerHTML);

getTotal.addEventListener('click',function(){
	totalCon.innerHTML = '';
	var totalCount = 0;
	var totalCountArr = [];
	for(var val of results){
		totalCountArr.push(val.length-1);
	}
	totalCount = totalCountArr.reduce(function(prev, next, index, array){
		return prev + next;
	});
	totalCount += soundYArr.length;
	console.log(totalCount);
	totalCon.innerHTML += totalCount;
});

genButton.addEventListener('click', function(){
	soundY.innerHTML = '';
	remixY.innerHTML = '';
	for(var i=0; i<soundYArr.length; i++){
		soundY.innerHTML += '<span>'+ soundYArr[i] +'</span>'
	}
	for(var i=0; i<results.length; i++){
		var tempLi = document.createElement('li');
		tempLi.innerHTML += '<span style="font-weight: bold; width: 20px;">' + results[i][0] + '：' + '</span>';
		for(var j=1; j<results[i].length; j++){
			tempLi.innerHTML += '<span>'+ results[i][j] +'</span>'
			// console.log(tempLi.innerHTML);
		}
		remixY.appendChild(tempLi);
	}
})