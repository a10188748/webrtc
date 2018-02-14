const $ = require('jquery');
function getIceObject(cb) {
	$.ajax({
		url: "https://global.xirsys.net/_turn/MyFirstApp/",
             type: "PUT",
             async: false,
             headers: {
               "Authorization": "Basic " + btoa("seanyeh:842041f2-10a0-11e8-99a3-08adab85f5a0")
             },
             success: function (res){
             	// console.log(res.v);
             	cb(res.v);
               
             }
	});
}

module.exports = getIceObject;