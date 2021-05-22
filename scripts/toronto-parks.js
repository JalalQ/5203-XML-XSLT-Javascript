var xml = new XMLHttpRequest();
var xmldocument;

//the actual lines to request the XML
xml.open("POST", "toronto-parks.xml"); //request to open file
xml.responseType = "document"; //return the response as a DOM tree
xml.send(); //send the request

xml.onload = function() {
	//stuff you want to do after the XML has been loaded
	xmldocument = xml.responseXML;
	
	generateDropDown();
	
	let formHandle = document.forms.selectPark;
	
	//When the user clicks on the "View Detail" submit button. Calls the processForm function.
	formHandle.onsubmit = processForm;
}

xml.onerror = function() {
  console.log("Error while loading XML...");
}

//this function is called whenever the user clicks on the "View Detail" button.
function processForm() {
	
	let parkName = document.getElementById("parkOptions");	
	
	let parkValue = parkName.value;
	populateDetails(parkValue);
		
	return false;
}

//generates the drop down list using the elements <option ...> ... </option>
function generateDropDown() {
	let parks = xmldocument.getElementsByTagName("Location");
	let selectList = '';
	for (let i=0; i < parks.length; i++) {
		
		let parkName = parks[i].getElementsByTagName("LocationName")[0].textContent;
		let parkID = parks[i].getElementsByTagName("LocationID")[0].textContent;
		
		selectList += "<option value=\"" + parkID + "\">" + parkName + "</option>";
	}
	
	document.getElementById("parkOptions").innerHTML = selectList;
}

//After the user has clicked on "View Details". This function shows the user
//details about the park. Called by the processForm() function.
function populateDetails(parkID) {
	let parks = xmldocument.getElementsByTagName("Location");
		
	//details stored in this variable are output in the <div> element of the HTML.
	let parkDetail = "";
	
	for (let i=0; i < parks.length; i++) {
		
		if (parks[i].getElementsByTagName("LocationID")[0].textContent==parseInt(parkID)) {
			//heading with the Name of the Park.
			parkDetail += "<h2>" + parks[i].getElementsByTagName("LocationName")[0].textContent + "</h2>";
			
			//the address of the park embedded inside the <p></p> html tag.
			parkDetail += "<p>Location: " + parks[i].getElementsByTagName("Address")[0].textContent + "</p>";

			parkDetail += "<ul>";
			for (let j=0; j < parks[i].getElementsByTagName("FacilityDisplayName").length; j++) {
				parkDetail += "<li>" + parks[i].getElementsByTagName("FacilityDisplayName")[j].textContent + "</li>";
			}
			parkDetail += "</ul>";
			
			break;
		}
		
	}
	
	document.getElementById("parkDetail").innerHTML = parkDetail;
}



