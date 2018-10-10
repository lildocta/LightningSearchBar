/*********************** 
@CreatedDate     12/8/2017
*********************/
({
    doInit : function(component, event, helper){
        var language = 'Language';
        var langFilter = 'v.languageFilters';
        var country = 'Country';
        var countryFilter = 'v.countryFilters';
        var type = 'Type';
        var typeFilter = 'v.typeFilters';
        var division = 'Division';
        var divisionFilter = 'v.divisionFilters';
        helper.getFilters(language, langFilter, component, event, helper);
        helper.getFilters(country, countryFilter, component, event, helper);
        helper.getFilters(type, typeFilter, component, event, helper);
        helper.getFilters(division, divisionFilter, component, event, helper);
    },

    searchButton : function(component, event, helper){
	 	if(event.getSource().getLocalId() != "searchButton"){
	 		return;
	 	}
	 	helper.search(component, event, helper);
    },

    searchEnter : function(component, event, helper){
	 	if(event.getParams().domEvent.code != "Enter"){
        	return;
        }
	 	helper.search(component, event, helper);
    },

    toggleFilter : function(component, event, helper){
    	if(component.get('v.filterResults') == false){
    		component.set('v.filterResults', true);
            
    	} else {
    		component.set('v.filterResults', false);
    	}
    }
})
