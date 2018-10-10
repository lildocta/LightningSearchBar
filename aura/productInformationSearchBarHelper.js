/*********************** 
@CreatedDate     12/8/2017
*********************/
({
	//returns the list of fields for a specific filter
	getFilters: function(filterVal, componentElement, component, event, helper){
		var action = component.get('c.getFilterOptions');
        action.setParams({
            filterType: filterVal
        });
        action.setCallback(this, function(response){
            component.set(componentElement, response.getReturnValue());
        });
        $A.enqueueAction(action);
	},

	//activates and deactivates the spinner when the API is being called
    toggle: function (component, event) {
        var spinner = component.find("mySpinner");
        $A.util.toggleClass(spinner, "slds-hide");
    },

    //gathers all of the search criteria and then returns a list of search results
    search : function(component, event, helper) {
    	var country = null;
    	var type = null;
    	var language = null;
    	var division = null;
    	//if the filter button was pressed it updates all of the filterable fields to the user selected values
    	if(component.get('v.filterResults') == true){
    		country = component.find('country').get('v.value');
    		type = component.find('type').get('v.value');
    		language = component.find('language').get('v.value');
    		division = component.find('division').get('v.value');
    	}
    	helper.toggle(component, event);
    	//removes the old search results
    	component.set("v.body", '');
    	var action = component.get("c.celumAPICallout");
    	var search = component.find("searchInput").get("v.value");
    	//if the user entered nothing into the search bar the search won't happen
    	if(search == null){
    		return;
    	}

    	action.setParams({
    		searchString : search,
    		countryFilter: country,
    		languageFilter: language,
    		typeFilter: type,
    		divisionFilter: division
    	});
    	
    	action.setCallback(this, function(response){
    		//creates a list of results from the returned JSON
    		var results = JSON.parse(response.getReturnValue());
    		console.log(results);
    		//if there are no results the no results found page is shown to the user
    		if(results != null){
    			component.set('v.filterResults', false);
    			component.set('v.noResults', false);
    			component.set('v.resultNum', results.length);
    			
    			//creates a set of elements to display each result in series (max of 10)
    			for(i = 0; i < results.length; i++){
		    		var fileName = results[i].originalFileName;
		    		var dateModified = results[i].lastModifiedDate;
		    		var dateVal = dateModified.substring(0,10);
		    		var description = results[i].descriptions[0].value;
		    		var urlVal = results[i].Download_urls[2].original;
		    		helper.createComponents(component, event, helper, fileName, urlVal, description, dateVal);
		    	}
		    	//reveals results to the user
	    		component.set("v.hasSearched", true);
			} else {
				//shows users the no results page
				component.set('v.noResults', true);
				component.set("v.hasSearched", false);
			}
    		
    	helper.toggle(component, event); 
    	});
    	$A.enqueueAction(action);
    	
    },

    createComponents : function(component, event, helper, fileName, urlVal, description, dateVal){
    	$A.createComponents([
	    //outlines the divs you want to put the elements you will create below into
	    ["div",{
	        "class":"slds-m-top_small"
	    }],
	    ["div",{
	    	"class":""
	    }],
	    ["div",{
	    	"class":""
	    }],
	    //outlines the elements you want to put the results into
	    ["ui:outputURL",{
	        "label" : fileName,
	        "value" : urlVal,
	        "target" : "_blank"
	    }],
	    ["ui:outputText",{
	        "label" : "Information about",
	        "value" : description
	    }],
	    ["ui:outputText",{
	        "label" : "Information about",
	        "value" : dateVal,
	        "class" : 'slds-text-body--small'
	    }],
	    ],
	    
		    function(components, status, errorMessage){
		        if (status === "SUCCESS") {
		        	//set variables equal to the divs you created above
		            var div = components[0];
		            var div2 = components[1];
		            var div3 = components[2];
		            //set variables equal to the elements you created above
		            var fileNameOutputText = components[3];
		            var descriptOutputText = components[4];
		            var dateOutputText = components[5];
		            //sets the body of each div to be the appropriate piece of information from each result
		            div.set("v.body", fileNameOutputText);
		            div2.set("v.body", descriptOutputText);
		            div3.set("v.body", dateOutputText);

		            //pushes each updated element to the view
		            var body = component.get("v.body");
                    body.push(div);
                    body.push(div2);
                    body.push(div3);
                    component.set("v.body", body);
		        }
		    }
		);
    },
})
