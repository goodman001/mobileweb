/*
 *  Starter code for University of Waterloo CS349 - Spring 2017 - A3.
 *	Refer to the JS examples shown in lecture for further reference.
 *  Note: this code uses ECMAScript 6.
 */
	
"use strict";

// Get your own API key from https://uwaterloo.ca/api/register
var apiKey = '';

(function(exports) {

	/* A Model class */
    class AppModel {
		constructor() {
			this.that = this;
		}

        // You can add attributes / functions here to store the data

		// Call this function to retrieve data from a UW API endpoint
        loadData(endpointUrl) {
            $.getJSON(endpointUrl + "?key=" + apiKey,
				function (data) {
					// Do something with the data; probably store it
					// in the Model to be later read by the View.
					
		            that.notify(); // Notify View(s)
				}
			);
        }
		
		// Add observer functionality to AppModel objects:
		
		// Add an observer to the list
		addObserver(observer) {
            if (_.isUndefined(this._observers)) {
                this._observers = [];
            }
            this._observers.push(observer);
            observer(this, null);
        }
		
		// Notify all the observers on the list
		notify(args) {
            if (_.isUndefined(this._observers)) {
                this._observers = [];
            }
            _.forEach(this._observers, function(obs) {
                obs(this, args);
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
			model.addObserver(this.updateView); // Add this View as an Observer
		}
		
        updateView(obs, args) {
            // Add code here to update the View
			
        };        
    }

	/*
		Function that will be called to start the app.
		Complete it with any additional initialization.
	*/
    exports.startApp = function() {
        var model = new AppModel();
        var view = new AppView(model, "div#viewContent");
    }

})(window);
