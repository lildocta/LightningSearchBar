/*********************** 
@CreatedDate     12/8/2017
@Author          Calvin O'Keefe - Slalom
@Description     This class takes in a user search query calls an API and 
				 returns a list of results and returns the filter criteria a user can search on
*********************/
public with sharing class ProductInformationSearchBarController {

	@AuraEnabled
	//takes in a field to get all of the filter results for and then parses the associated custom label and returns a list of fields to filter by
	//to use this function create a custom lable and seperate the values with a comma example: English, Spanish, French etc.
	public static List<String> getFilterOptions(String filterType){
		List<String> filterList = new List<String>();
		if(filterType == 'Country'){
			filterList.addall(System.Label.CelumCountries.split(','));
		} else if(filterType == 'Language'){
			filterList.addall(System.Label.CelumLanguages.split(','));
		} else if(filterType == 'Type'){
			filterList.addall(System.Label.CelumType.split(','));
		} else if(filterType == 'Division'){
			filterList.addall(System.Label.CelumDivisions.split(','));
		}
		return filterList;
	}

	@AuraEnabled
	//takes in a the search paramaters a user is searching on, adds the search parameters to the http request and then returns a list of search results
	//if there is more then one filter change 'String filter' to 'List<String> filter' below
	public static String apiCallout(String searchString, String filter){
		Http http = new Http();
		List<Object> resultList = new List<Object>();
		HttpRequest request = new HttpRequest();
		List<String> responseList = new List<String>();

		//Generate http string to be used as the request endpoint and replace spaces with %20
		searchString = searchString.replace(' ', '%20');

		//replaces blank spaces with %20 for the filter results and adds them to the http request if they are not left blank by the user
		String httpString = //Enter the url of the API you are calling;
		if(filter != null && filter != 'None'){
			filter = filter.replace(' ', '%20');
			//this assumes you can set a filter in the URL
			httpString += '&country=' + filter;
		}
		System.debug('httpRequest:' + httpString);

		request.setEndpoint(httpString);
		request.setMethod('GET');
		HttpResponse response = http.send(request);

		//if the callout is successful deserialize the response 
		if (response.getStatusCode() == 200) {
			System.debug('json: ' + response.getBody());
			// Deserialize the JSON string into collections of jsonResults (you will have to change this based on the JSON response you get back)
		    jsonResults results = (jsonResults) JSON.deserialize(response.getBody(), jsonResults.class);
		  	
		    for(Asset a : results.search_results.assets.asset){
		    	resultList.add(a);
		    }
		    //reserialize the results to pass to javascript
		    return JSON.serialize(resultList);
		}
	//if the api call fails it returns null
	return null;
	}

	//JSON classes (you will have to change this based on teh JSON response you get back)
	public class jsonResults {
		public Search_results search_results {get;set;}
		public String numFound {get;set;} 
	}

	public class Search_results {
		public Assets assets {get;set;}
	}

	public class Assets {
		public List<Asset> asset {get;set;} 
	}
	
	public class Asset {
		public String originalFileName {get;set;} 
		public String lastModifiedDate {get;set;} 
		public List<Languages> descriptions {get;set;} 
		public List<Download_urls> Download_urls {get;set;} 
	}
	
	public class Languages {
		public String locale {get;set;} 
		public String value {get;set;} 

	}
	
	public class Download_urls {
		public String preview {get;set;} 
		public String thumbnail {get;set;} 
		public String original {get;set;} 

	}
}
	