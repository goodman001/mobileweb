/*
 *  Starter code for University of Waterloo CS349 - Spring 2017 - A3.
 *	Refer to the JS examples shown in lecture for further reference.
 *  Note: this code uses ECMAScript 6.
 */
	
"use strict";

// Get your own API key from https://uwaterloo.ca/api/register
var apiKey = '5884f08401ed5110fe86869d137d628a';

(function(exports) {

	/* A Model class */
    class AppModel {
		constructor() {
			this.that = this;
		}

        // You can add attributes / functions here to store the data

		// Call this function to retrieve data from a UW API endpoint
        loadData(div,endpointUrl,flag,paths) {
			//console.log(this.that);
			var that = this.that;
            $.getJSON(endpointUrl + "key=" + apiKey,
				function (data) {
					// Do something with the data; probably store it
					// in the Model to be later read by the View.
					//console.log(this);
		            that.notify(div,data,flag,paths); // Notify View(s)
				}
			);
        }
		
		// Add observer functionality to AppModel objects:
		
		// Add an observer to the list
		addObserver(observer) {
			//console.log(this);
            if (_.isUndefined(this._observers)) {
                this._observers = [];
            }
            this._observers.push(observer);
            observer(this, null,-1,'index');
        }
		
		// Notify all the observers on the list
		notify(div,args,flag,paths) {
			//console.log(this);
			var obj = this;
            if (_.isUndefined(this._observers)) {
                this._observers = [];
            }
            _.forEach(this._observers, function(obs) {
				//console.log(this);
                obs($(div), args,flag,paths);
            });
        }
    }

    /*
     * A view class.
     * model:  the model we're observing
     * div:  the HTML div where the content goes
     */
    class AppView {
		constructor(model, div) {
			this.that = this;
			this.model = model;
			this.div = div;	
		}
		startindex(url,flag,path){
			this.model.addObserver(this.updateView); // Add this View as an Observer
			this.model.loadData(this.div,url,flag,path);
		}
		startother(url,flag,path){
			//this.model.addObserver(this.updateView); // Add this View as an Observer
			this.model.loadData(this.div,url,flag,path);
		}
        updateView(obs, args,flag,path) {
			console.log(path);
			if(args == null)
			{
				console.log("null");
				//var data = args.data;
				
				
			}else
			{
				if(path == 'course'){
					console.log("view course");
					
					var data = args.data;
					console.log(data);
					var loadimgdiv = $(".loading");
					var titles = $(".co-div-inline-center");
					titles.eq(0).text(data.subject +" " + data.catalog_number);
					var texts = $(".co-text");
					console.log(texts[0]);
					
					texts.eq(0).text(data.course_id);
					texts.eq(1).text(data.title);
					texts.eq(2).text(data.units);
					texts.eq(3).text(data.description);
					texts.eq(4).text(data.instructions[0]);
					loadimgdiv.hide();
					//coursediv.show();
					//var btns = $(".footer-btn");
					//texts.eq(0).attr("href",)
					
				}else if(path == 'schedule'){
					var loadimgdiv = $(".loading");
					
					console.log("view schedule");
					//console.log(args);
					//console.log(obs);
					var data = args.data;
					console.log(data);
					$("#schesec").html("");
					/**/
					for(var i=0;i< data.length;i++){
						var divcap = $('<div class="sche-title">COMPONENT SECTION</div>');
						$("#schesec").append(divcap);
						var divcontent = $('<div class="sche-text"><table class="sche-table"><tr><td class="scheleft">Section:</td><td class="scheright">' +data[i].section + '</td></tr><tr><td class="scheleft">Campus:</td><td class="scheright">' +data[i].campus + '</td></tr><tr><td class="scheleft">Enrollment Capacity:</td><td class="scheright">' +data[i].enrollment_capacity + '</td></tr><tr><td class="scheleft">Enrollment Total:</td><td class="scheright">' +data[i].enrollment_total + '</td></tr><tr><td class="scheleft">Waiting Capacity:</td><td class="scheright">' +data[i].waiting_capacity + '</td></tr><tr><td class="scheleft">Waiting Total:</td><td class="scheright">' +data[i].waiting_total + '</td></tr><tr><td class="scheleft">Time:</td><td class="scheright">' +data[i].classes[0].date.start_time + '-' + data[i].classes[0].date.end_time + data[i].classes[0].date.weekdays + '</td></tr><tr><td class="scheleft">Location:</td><td class="scheright">' +data[i].classes[0].location.building + ' ' + data[i].classes[0].location.room + '</td></tr><tr><td class="scheleft">Instruction:</td><td class="scheright">' +data[i].classes[0].instructors[0] + '</td></tr></table></div>');
						$("#schesec").append(divcontent);
								
								
								
					}
					loadimgdiv.hide();
					
					//coursediv.show();
					//var btns = $(".footer-btn");
					//texts.eq(0).attr("href",)
					
				}
				else
				{
					var startindex=0;
					var endindex = 0;
					if(flag == 10100)
					{
						startindex = 0;
						endindex = 100;
					}else if(flag == 100200)
					{
						startindex = 101;
						endindex = 200;
					}else if(flag == 200300)
					{
						startindex = 201;
						endindex = 300;
					}else if(flag == 300400)
					{
						startindex = 301;
						endindex = 400;
					}
					else if(flag == 400)
					{
						startindex = 401;
						endindex = -2;
					}
					console.log(args.data);
					console.log(startindex);
					console.log(endindex);
					var data = args.data;
					var loadimgdiv = $(".loading");
					//console.log(loadimgdiv);
					loadimgdiv.hide();
					$(".ui-tbody").html("");
					for(var i=0;i< data.length;i++){

						if(flag == -1){
							var trc =  $('<td class="firstCol"><a class="courselink" href="course.html?courseid='+ data[i].course_id + '&catalog_number='+data[i].catalog_number + '&subject=' +data[i].subject +  '" >'+data[i].subject +" " + data[i].catalog_number +'</a></td>'+ '<td class="lastCol"><a class="courselink" hhref="course.html?courseid='+ data[i].course_id + '&catalog_number='+data[i].catalog_number + '&subject=' +data[i].subject +  '" >'+data[i].title+' </a></td>');
							//var tr = $("<td></td>")
							//var li = $("<td>abc</td>");
							$(".ui-tbody").append($("<tr></tr>").append(trc));
						}else if(endindex == -2)
						{
							if(data[i].catalog_number >=startindex){
								var trc =  $('<td class="firstCol"><a class="courselink" href="course.html?courseid='+ data[i].course_id + '&catalog_number='+data[i].catalog_number + '&subject=' +data[i].subject +  '" >'+data[i].subject +" " + data[i].catalog_number +'</a></td>'+ '<td class="lastCol"><a class="courselink" hhref="course.html?courseid='+ data[i].course_id + '&catalog_number='+data[i].catalog_number + '&subject=' +data[i].subject +  '" >'+data[i].title+' </a></td>');
								$(".ui-tbody").append($("<tr></tr>").append(trc));
							}
						}else{
							if(data[i].catalog_number >=startindex && data[i].catalog_number <= endindex){
								var trc =  $('<td class="firstCol"><a class="courselink" href="course.html?courseid='+ data[i].course_id + '&catalog_number='+data[i].catalog_number + '&subject=' +data[i].subject +  '" >'+data[i].subject +" " + data[i].catalog_number +'</a></td>'+ '<td class="lastCol"><a class="courselink" hhref="course.html?courseid='+ data[i].course_id + '&catalog_number='+data[i].catalog_number + '&subject=' +data[i].subject +  '" >'+data[i].title+' </a></td>');
								$(".ui-tbody").append($("<tr></tr>").append(trc));
							}
						}

					}
				}
				
				
			}
			//console.log(args);
			//obs.loadData("https://api.uwaterloo.ca/v2/courses.json");
            // Add code here to update the View
			
        };        
    }

	/*
		Function that will be called to start the app.
		Complete it with any additional initialization.
	*/
    exports.startApp = function(path) {
		console.log(path);
		var model = new AppModel();
		var view = new AppView(model, "div#viewContents");
		if(path == 'index'){
			
			view.startindex("https://api.uwaterloo.ca/v2/courses.json?",-1,path);
			$(".ui-btn").click(function(){
				var course = $("select[name='course']").val();
				var number = $("select[name='number']").val();
				var term = $("select[name='term']").val();
				console.log(course);
				console.log(number);
				console.log(term);
				if(course !='' ){
					if(term !=''){
						console.log("c !=null,term !=null");
						var url = "https://api.uwaterloo.ca/v2/terms/"+term+ "/" + course +  "/schedule.json?";
						console.log(url);
						view.startindex(url,number,path);
					}else
					{
						var url = "https://api.uwaterloo.ca/v2/courses/"+course+ ".json?";
						console.log(url);
						view.startindex(url,number,path);
					}
				}
				//if(course !='course' && term == 'term')
			});
			$(".ui-courselist").on("click","a", function() {
				console.log("click");
			});
			//window.location.href=
			//$("#viewContent").click(function(){alert("cc")});	
		}else if(path == 'course')
		{
			var targeturl = location.search; //
			console.log(targeturl);
    		var resObj = new Object();
			$('#coursediv').show();
			$('#schedulediv').hide();
			if (targeturl.indexOf("?") != -1)
			{
				
				var str = targeturl.substr(1);   
				var strs = str.split("&");   
				for(var i = 0; i < strs.length; i ++) {   
					resObj[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);   
				}
				console.log(resObj);
				if(resObj['courseid'] !=undefined && resObj['catalog_number'] !=undefined && resObj['subject'] !=undefined){
					/*var btns = $(".footer-btn");
					//console.log(targeturl);
					btns.eq(0).attr("href","course.html"+targeturl);
					btns.eq(1).attr("href","schedule.html"+targeturl);*/
					view.startindex("https://api.uwaterloo.ca/v2/courses/" + resObj['courseid'] + ".json?",-1,path);
					$(".footer-btn-sec").click(function() {
						$('#coursediv').hide();
						$('#schedulediv').show();
						$(".loading").show();
						var tt = "https://api.uwaterloo.ca/v2/courses/" + resObj['subject'] + "/" + resObj['catalog_number'] + "/schedule.json?";
						console.log(tt);
						view.startother(tt,-1,'schedule');
						$('.sche-btn-back').attr("href","course.html?"+str);
						//alert($(".footer-btn").attr("href"));
					});
					$(".sche-btn").click(function(){
						var term = $("select[name='scheterm']").val();
						console.log(term);
						$(".loading").show();
						var tt = "https://api.uwaterloo.ca/v2/courses/" + resObj['subject'] + "/" + resObj['catalog_number'] + "/schedule.json?term="+term + "&";
						console.log(tt);
						view.startother(tt,-1,'schedule');
					});
					$(".footer-btn-one").click(function(){
						$('#coursediv').show();
						$('#schedulediv').hide();
						$(".loading").show();
						view.startindex("https://api.uwaterloo.ca/v2/courses/" + resObj['courseid'] + ".json?",-1,path);
						//$('.co-btn-back').attr("href","index.html");
					});
					
				}else
				{
					window.location.href="index.html";
				}
				/*
				var aTmp = aQuery[1].split("="); 
				console.log(aTmp);
				if(aTmp[0] == "courseid"){
					console.log(aTmp[1]);
					if(aTmp[1] != undefined || aTmp[1] != ''){
						console.log("https://api.uwaterloo.ca/v2/courses/" + aTmp[1] + ".json");
						view.startindex("https://api.uwaterloo.ca/v2/courses/" + aTmp[1] + ".json",-1,path);
					}
				}else
				{
					window.location.href="index.html";
				}*/
			 }else{
				 window.location.href="index.html";
			 }
			
		}
		else
		{
			window.location.href="index.html";
		}
		
		//$("#viewContent").click(function(){alert("cc")});
    }

})(window);
