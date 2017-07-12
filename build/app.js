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
        loadData(div,endpointUrl) {
			//console.log(this.that);
			var that = this.that;
            $.getJSON(endpointUrl + "?key=" + apiKey,
				function (data) {
					// Do something with the data; probably store it
					// in the Model to be later read by the View.
					//console.log(this);
		            that.notify(div,data); // Notify View(s)
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
            observer(this, null);
        }
		
		// Notify all the observers on the list
		notify(div,args) {
			//console.log(this);
			var obj = this;
            if (_.isUndefined(this._observers)) {
                this._observers = [];
            }
            _.forEach(this._observers, function(obs) {
				//console.log(this);
                obs($(div), args);
            });
        }
    }

    /*
     * A view class.
     * model:  the model we're observing
     * div:  the HTML div where the content goes
     */
    class AppView {
		constructor(model, div, url) {
			this.that = this;
			this.model = model;
			this.div = div;
			
			model.addObserver(this.updateView); // Add this View as an Observer
			model.loadData(div,url);
			
		}
        updateView(obs, args) {
			//console.log(obs);
			if(args == null)
			{
				console.log("null");
				
			}else
			{
				//console.log(args.data);
				var data = args.data;
				var loadimgdiv = $(".loading");
				//console.log(loadimgdiv);
				loadimgdiv.hide();
				$(".ui-tbody").html("");
				for(var i=0;i< data.length;i++){
					var trc = $('<td class="firstCol">'+data[i].subject +" " + data[i].catalog_number +'</td>'+ '<td class="lastCol">'+data[i].title+'</td>');
					//var tr = $("<td></td>")
					//var li = $("<td>abc</td>");
					$(".ui-tbody").append($("<tr></tr>").append(trc));
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
		if(path == 'index'){
			var model = new AppModel();
			var view = new AppView(model, "div#viewContents","https://api.uwaterloo.ca/v2/courses.json");
			
		}
		//$("#viewContent").click(function(){alert("cc")});
    }

})(window);
