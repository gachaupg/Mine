function section(container, elems) {
	//ex. "div|id=div1|class=whatever|This is the innerHTML which does not need a type specified", "div|id=div2|container=div1|class=whateverElse|This div will be placed inside the previous div"

	for (var i = 0; i < elems.length; i++) {
		var elem = elems[i];
		var type = elem.split("|")[0];
		var atts = elem.split("|").splice(1);

		var arrIcon = [], arrElem = [];
		var elemID = "", elemType = "label";

		var dv = document.createElement(type);
		for (var ii = 0; ii < atts.length; ii++) {
			var att = atts[ii];
			var arrAtt = att.split("=");
			
			elemID = (arrAtt[0] == "id") ? arrAtt[1] : elemID;
			//console.log(elem, att, arrAtt[0], arrAtt[1]);

			if (arrAtt[0] == "container") {
				//This becomes the new container so that you can apply elements within other elements.  
				//The container will remain this until reassigned again.
				container = document.getElementById(arrAtt[1]);

			} else if (type="img" && arrAtt[0] == "src") {
				//specifies the location of file when type is img
				dv.setAttribute(arrAtt[0], "images/" + arrAtt[1]);

			} else if (arrAtt[0] == "elem") {
				//specifies the outer element type when icon is specifies; default=label
				elemType = arrAtt[1];

			} else if (arrAtt[0] == "icon") {
				//creates a block with an icon positioned to the left
				arrIcon.push(arrAtt[1]);

			} else if (arrAtt[0].indexOf("elem.") == 0) {
				//sets attributes for the outer element when icon specified; i.e. elem.class=whatever
				arrElem.push(att);

			} else if (arrAtt[0].indexOf("icon.") == 0) {
				//sets attributes for icon when specified; i.e. icon.class=whatever
				arrIcon.push(att);

			} else if (arrAtt.length == 1) {
				//innerHTML is default when no type is specified
				dv.innerHTML = att;

			} else {
				dv.setAttribute(arrAtt[0], arrAtt[1]);
			}

			//element to append; default dv; else create new element with icon
			var appndMe;

			//choose dv or icon
			if (arrIcon.length == 0) {
				//assign dv to be added to container
				appndMe = dv;

			} else {
				var e = document.createElement(elemType); //outer element
				var eicon = document.createElement("img"); //icon element
				var espacer = document.createElement("label"); //spacer between icon and dv

				//set elem id and other attributes; this ID must be accounted for when using icon if referenced elsewhere
				e.setAttribute("id", "elem_" + elemID);
				arrElem.forEach(function (item) { e.setAttribute(item.split("=")[0].split(".")[1], item.split("=")[1]) });

				//set icon attributes from above
				eicon.src = "images/" + arrIcon[0];
				arrIcon.forEach(function (item) { eicon.setAttribute(item.split("=")[0].split(".")[1], item.split("=")[1]) });

				//set spacer attributes
				espacer.setAttribute("style", "padding-left:10px");
				espacer.innerHTML = " ";

				//put it all together
				e.appendChild(eicon);
				e.appendChild(espacer);
				e.appendChild(dv);

				//assign elem to be added to container
				appndMe = e;
            }
		}

		//add element to container and continue
		container.appendChild(appndMe);
	}
}

