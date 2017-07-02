// ==UserScript==
// @name        CnC TA: Crucial Reservations
// @description Allows a player to reserve a layout to a list that can be managed by the alliance CiC
// @version     0.50b
// @author      DebitoSphere
// @homepage    https://www.allyourbasesbelong2us.com
// @namespace   AllYourBasesbelong2UsCrucialLayoutReserver
// @include     http*://*alliances*.com/*
// @include     https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include     http*://*.cncreserver.com/*
// @include     http*://cncreserver.com/*
// @grant       GM_log
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_openInTab
// @grant       GM_registerMenuCommand
// @grant       GM_xmlhttpRequest
// @grant       GM_updatingEnabled
// @grant       unsafeWindow
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==



/*
Start of cncreserver Link Button
*/

try {
  unsafeWindow.__cncreserver_version = "0.49beta";
  (function () {

    var crucial_reserver_main = function () {

	

      function cncreserver_create() {
		var WorldID = ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
		console.log("cncreserver WorldID: " + WorldID);
		
        console.log("cncreserver Link Button v" + window.__cncreserver_version + " loaded");
		var OpenWindow = false;
		var ReservedBase = null;
		var BaseXCoord = null;
		var BaseYCoord = null;
		var ReservedBaseLayout = null;
		var BaseCnCOptLink = null;

		var mcvTimer = null;
		
        var cncreserver = {
          selected_base: null,

		  SatCodeWindow: function (openSatWindow) {
            try {
						cncreserver_create.BaseXCoord = cncreserver_create.ReservedBase.get_RawX();
						cncreserver_create.BaseYCoord = cncreserver_create.ReservedBase.get_RawY();
						var ReserveItWindowCaption = cncreserver_create.BaseXCoord + ":" + cncreserver_create.BaseYCoord + " Reserve It - Sat Code"
			var ReserveSatCodeWindow = new qx.ui.window.Window(ReserveItWindowCaption, "https://www.allyourbasesbelong2us.com/CrucialScripts/images/Reserver/favicon.png").set({
					contentPaddingTop : 1,
					contentPaddingBottom : 8,
					contentPaddingRight : 8,
					contentPaddingLeft : 8,
					width : 300,
					height : 150,
					showMaximize : false,
					showMinimize : false,
					allowMaximize : false,
					allowMinimize : false,
					allowClose : false,
					resizable : false
				});

				ReserveSatCodeWindow.setLayout(new qx.ui.layout.VBox());

					var buttonContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
						alignX: 'center'
					}));

				ReserveSatCodeWindow.add(new qx.ui.core.Spacer(70, 10));
				ReserveSatCodeWindow.add(new qx.ui.basic.Label('<p><b><font size="3" color="#FFFF00">Would you like to reserve the Satelite Code Zone at ' +  cncreserver_create.BaseXCoord + ':' + cncreserver_create.BaseYCoord + '?</font></b></p>').set({
						rich: true,
						maxWidth: 250,
						wrap: true,
						font: 'bold',
						textColor: 'white',
						alignX: 'center'
					}));
	
				
	function SD3(){
	
			var WorldID = ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
			var WorldName = ClientLib.Data.MainData.GetInstance().get_Server().get_Name();
			var AllianceID = ClientLib.Data.MainData.GetInstance().get_Alliance().get_Id();
			var AllianceName = ClientLib.Data.MainData.GetInstance().get_Alliance().get_Name(); 
			var PlayerID = ClientLib.Data.MainData.GetInstance().get_Player().get_Id();
			var PlayerName = ClientLib.Data.MainData.GetInstance().get_Player().get_Name();

			var CoordsX = cncreserver_create.BaseXCoord;
			var CoordsY = cncreserver_create.BaseYCoord;

			var Completed = "false";
				console.log("PlayerID="+PlayerID+"&WorldID="+WorldID+"&WorldName="+WorldName+"&AllianceID="+AllianceID+"&AllianceName="+AllianceName+"&PlayerName="+PlayerName+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY);
				var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=saveSatCodeRecord&PlayerID="+PlayerID+"&WorldID="+WorldID+"&WorldName="+WorldName+"&AllianceID="+AllianceID+"&AllianceName="+AllianceName+"&PlayerName="+PlayerName+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("CompletedTask" + CompletedTask);
								} else {
									//console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);

				if (CompletedTask === "Yes"){
							webfrontend.gui.MessageBox.messageBox({
								modal: true,
								textRich: true,
								cancelButton: false,
								title: 'Your Sat Code Reservation - Success',
								text: '<b>Your Satelite location you tried to claim has been successfully reserved.</b><br><br><i>If you decide that you do not want this reservation, you must contact your CiC</i><br>',
								okText: 'Done',
								cancelText: 'Close'
							});
				} else {
							webfrontend.gui.MessageBox.messageBox({
								modal: false,
								textRich: true,
								title: 'Your Sat Code Reservation - Failed',
								text: '<b>This Satelite location you tried to claim has already been reserved by someone else. <br><br>Please keep searching because more will appear</b>',
								okText: 'OK :(',
							});
				}
				
	}
	

				function SendSatCodeRequest() {
					SD3();

				}
				
				function CloseResW() {
					cncreserver_create.OpenWindow = false;	
				}
				
				ReserveSatCodeWindow.add(new qx.ui.core.Spacer(70, 10));
					var yesButton = new webfrontend.ui.SoundButton('Reserve It').set({width: 90, height: 25, appearance: "button-notif-cat", center: true, allowGrowX: false});

					yesButton.addListener("click", function () {
							SendSatCodeRequest();
					}, this);

					
					var noButton = new webfrontend.ui.SoundButton('Close').set({width: 50, height: 30, appearance: "button-notif-cat", center: true, allowGrowX: true});
					
					
					noButton.addListener("click", function () {
						cncreserver_create.OpenWindow = false;
							ReserveSatCodeWindow.close();
					}, this);

					var cancelButton = new webfrontend.ui.SoundButton('Cancel').set({width: 90, height: 60, appearance: "button-notif-cat", center: true, allowGrowX: false});

					cancelButton.addListener("click", function () {
						cncreserver_create.OpenWindow = true;
							ReserveSatCodeWindow.close();
					}, this);

					var CnCOptButton = new webfrontend.ui.SoundButton('View CnCOpt').set({width: 90, height: 30, appearance: "button-notif-cat", center: true, allowGrowX: false});
					
					CnCOptButton.addListener("click", function () {
							window.open(cncOptURL,'_blank');
					}, this);

					buttonContainer.add(yesButton);
					buttonContainer.add(new qx.ui.core.Spacer(40));
					buttonContainer.add(noButton);
					ReserveSatCodeWindow.add(buttonContainer);
					cncreserver_create.OpenWindow = true;
				ReserveSatCodeWindow.open();

				ReserveSatCodeWindow.center();

			    } catch (e) {
              console.log("cncreserver [1]: ", e);
            }
		  },
		  
		  LayoutWindow: function (openResWindow) {
            try {
						cncreserver_create.BaseXCoord = cncreserver_create.ReservedBase.get_RawX();
						cncreserver_create.BaseYCoord = cncreserver_create.ReservedBase.get_RawY();
						var ReserveItWindowCaption = cncreserver_create.BaseXCoord + ":" + cncreserver_create.BaseYCoord + " Reserve It"
			var ReserveLayoutWindow = new qx.ui.window.Window(ReserveItWindowCaption, "https://www.allyourbasesbelong2us.com/CrucialScripts/images/Reserver/favicon.png").set({
					contentPaddingTop : 1,
					contentPaddingBottom : 8,
					contentPaddingRight : 8,
					contentPaddingLeft : 8,
					width : 400,
					height : 400,
					showMaximize : false,
					showMinimize : false,
					allowMaximize : false,
					allowMinimize : false,
					allowClose : false,
					resizable : false
				});

				ReserveLayoutWindow.setLayout(new qx.ui.layout.VBox());


							var _MainData = ClientLib.Data.MainData.GetInstance();
							var fileManager = ClientLib.File.FileManager.GetInstance();
							var images = {
									0 : "https://www.allyourbasesbelong2us.com/CrucialScripts/images/Reserver/emp.png",
									1 : "https://www.allyourbasesbelong2us.com/CrucialScripts/images/Reserver/cry.png",
									2 : "https://www.allyourbasesbelong2us.com/CrucialScripts/images/Reserver/tib.png"
								}
												//getLayout
							var resourceLayout = "";
							for (var y = 0; y < 16; y++) {
								for (var x = 0; x < 9; x++) {
									resourceLayout += _MainData.get_Cities().get_CurrentCity().GetResourceType(x, y);
									
								}
							}

							cncreserver_create.ReservedBaseLayout = resourceLayout;
							var currenLayout = resourceLayout;
							var tibCount = currenLayout.match(/2/g).length;
							switch (_MainData.get_Player().get_Faction()) {
							case ClientLib.Base.EFactionType.GDIFaction:
								var playerFaction = "G";
								break;
							case ClientLib.Base.EFactionType.NODFaction:
								var playerFaction = "N";
								break;
							}

							var str = ".ct-jhlk";
							var data = currenLayout;
							for (var i = 0; i < 8; i++) {
								var re = new RegExp(i, 'g');
								var char = str.charAt(i);
								data = data.replace(re, char);
							}
							
							var cncOptURL = "http://cncopt.com/?map=2|" + playerFaction + "|" + playerFaction + "||" + data + "....................................|newEconomy";
							cncreserver_create.BaseCnCOptLink = cncOptURL;
							var html = '<table border="1" bgcolor="#f5f5f5" cellspacing="0" cellpadding="0" bordercolor="#f5f5f5">';

							for (var i = 0; i < 72; i++) {
								var row = Math.floor(i / 9);
								var column = i - Math.floor(i / 9) * 9;
								if (column == 0) html += '<tr>';
								html += '<td><img width="32" height="34" src="' + images[currenLayout.charAt(i)] + '"></td>';
								if (column == 8) html += '</tr>';
							}

							html += '</table>';

					ReserveLayoutWindow.add(new qx.ui.basic.Label(html).set({
						rich: true,
						maxWidth: 400,
						wrap: true,
						font: 'font_size_18',
						font: 'bold',
						textColor: 'white',
						alignX: 'center'
					}));
					

					var buttonContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
						alignX: 'center'
					}));

				ReserveLayoutWindow.add(new qx.ui.core.Spacer(70, 10));
				ReserveLayoutWindow.add(new qx.ui.basic.Label('<p><b><font size="3" color="#FFFF00">Would you like to reserve this layout?</font></b></p>').set({
						rich: true,
						maxWidth: 400,
						wrap: true,
						font: 'bold',
						textColor: 'white',
						alignX: 'center'
					}));
	
				
	function SD(){
	
			var WorldID = ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
			var WorldName = ClientLib.Data.MainData.GetInstance().get_Server().get_Name();
			var AllianceID = ClientLib.Data.MainData.GetInstance().get_Alliance().get_Id();
			var AllianceName = ClientLib.Data.MainData.GetInstance().get_Alliance().get_Name();
			var PlayerID = ClientLib.Data.MainData.GetInstance().get_Player().get_Id();
			var PlayerName = ClientLib.Data.MainData.GetInstance().get_Player().get_Name();
			var ResearchLeft;
			var MCVTime;
			var CoordsX = cncreserver_create.BaseXCoord;
			var CoordsY = cncreserver_create.BaseYCoord;
			var LayoutReserved = cncreserver_create.ReservedBaseLayout;
			var CnCOptLink = cncreserver_create.BaseCnCOptLink;
			var Completed = "false";
			var PercentageOfResearchPoints;
			var BaseCount = 0;
			
			var Bases = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
			for (var selectedBaseID in Bases) {
				if (!Bases.hasOwnProperty(selectedBaseID)) {
					continue;
				}
				BaseCount = BaseCount + 1;
				var selectedBase = Bases[selectedBaseID];
				if (selectedBase === undefined) {
					throw new Error('can not find the base: ' + selectedBaseID);
				}
			}
			BaseCount = BaseCount + 1;
		        var player = ClientLib.Data.MainData.GetInstance().get_Player();
				var playerRank = player.get_OverallRank();
                var PlayerFaction = player.get_Faction();
				
				switch (player.get_Faction()) {
							case ClientLib.Base.EFactionType.GDIFaction:
								var playerFactionD = "GDI";
								break;
							case ClientLib.Base.EFactionType.NODFaction:
								var playerFactionD = "NOD";
								break;
							}

				var PlayerFaction = player.get_Faction();				
                var McvR = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Research_BaseFound, PlayerFaction);
                var PlayerResearch = player.get_PlayerResearch();
				var PlayerCP = player.GetCommandPointCount();
                var MCVNext = PlayerResearch.GetResearchItemFomMdbId(McvR);
				var nextLevelInfo = MCVNext.get_NextLevelInfo_Obj();
                var resourcesNeeded = [];
                for (var i in nextLevelInfo.rr) {
                  if (nextLevelInfo.rr[i].t > 0) {
                    resourcesNeeded[nextLevelInfo.rr[i].t] = nextLevelInfo.rr[i].c;
                  }
                }
                var researchNeeded = resourcesNeeded[ClientLib.Base.EResourceType.ResearchPoints];
                var currentResearchPoints = player.get_ResearchPoints();
				XY = 100 / researchNeeded;
				XYX = currentResearchPoints;
				PercentageOfResearchPoints = XYX * XY;
				if (PercentageOfResearchPoints > 100){
					PercentageOfResearchPoints = "100";
				}
              if (PerforceChangelist >= 387751) { //new
                ResearchLeft = phe.cnc.gui.util.Numbers.formatNumbersCompact(researchNeeded - currentResearchPoints);
              } else { //old
                ResearchLeft = webfrontend.gui.Util.formatNumbersCompact(researchNeeded - currentResearchPoints);
              }
                var creditsNeeded = resourcesNeeded[ClientLib.Base.EResourceType.Gold];
                var creditsResourceData = player.get_Credits();
                var creditGrowthPerHour = (creditsResourceData.Delta + creditsResourceData.ExtraBonusDelta) * ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour();
                var creditTimeLeftInHours = (creditsNeeded - player.GetCreditsCount()) / creditGrowthPerHour;
				var MCVTime = ClientLib.Vis.VisMain.FormatTimespan(creditTimeLeftInHours * 60 * 60);
				cncreserver_create.mcvTimer = MCVTime;
			ResearchLeft = PercentageOfResearchPoints;
			PlayerFaction = playerFactionD;

				var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=saveReserveRecord&PlayerID="+PlayerID+"&WorldID="+WorldID+"&WorldName="+WorldName+"&AllianceID="+AllianceID+"&AllianceName="+AllianceName+"&PlayerName="+PlayerName+"&MCVTime="+MCVTime+"&ResearchLeft="+ResearchLeft+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY+"&LayoutReserved="+LayoutReserved+"&CnCOptLink="+CnCOptLink+"&Completed="+Completed+"&BaseCount="+BaseCount;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
								}
							}
		        xmlhttp.send(params);

				if (CompletedTask === "Yes"){
							webfrontend.gui.MessageBox.messageBox({
								modal: true,
								textRich: true,
								cancelButton: false,
								title: 'Your Layout Reservation - Success',
								text: '<b>Your Layout you found has been successfully reserved.</b><br><br><i>If you decide that you do not want this reservation, you must contact your CiC</i><br>',
								okText: 'Done',
								cancelText: 'Close'
							});
				} else {
							webfrontend.gui.MessageBox.messageBox({
								modal: false,
								textRich: true,
								title: 'Your Layout Reservation - Failed',
								text: '<b>This layout has already been reserved. <br><br>Please keep searching or look in the Free Layouts tab</b>',
								okText: 'OK :(',
							});
				}
				
	}
	
function SD2(){
	
			var WorldID = ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
			var WorldName = ClientLib.Data.MainData.GetInstance().get_Server().get_Name();
			var AllianceID = ClientLib.Data.MainData.GetInstance().get_Alliance().get_Id();
			var AllianceName = ClientLib.Data.MainData.GetInstance().get_Alliance().get_Name();
			var CoordsX = cncreserver_create.BaseXCoord;
			var CoordsY = cncreserver_create.BaseYCoord;
			var LayoutReserved = cncreserver_create.ReservedBaseLayout;
			var CnCOptLink = cncreserver_create.BaseCnCOptLink;


				var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=saveFreeRecord&WorldID="+WorldID+"&WorldName="+WorldName+"&AllianceID="+AllianceID+"&AllianceName="+AllianceName+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY+"&LayoutReserved="+LayoutReserved+"&CnCOptLink="+CnCOptLink;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
								}
							}
		        xmlhttp.send(params);

				if (CompletedTask === "Yes"){
							webfrontend.gui.MessageBox.messageBox({
								modal: true,
								textRich: true,
								cancelButton: false,
								title: 'Free Layout',
								text: '<b>Your Layout you found has been successfully added to the Free Layouts section so other players who need a layout can claim it.</b><br><br>><br>',
								okText: 'Done',
								cancelText: 'Close'
							});
				} else {
							webfrontend.gui.MessageBox.messageBox({
								modal: false,
								textRich: true,
								title: 'Your Layout Reservation',
								text: '<b>There seems to be a problem adding your layout layout to the Free Layouts List. <br><br>Please wait a few minutes and try adding it again.</b>',
								okText: 'OK :(',
							});
				}
				
	}
				function SendReservationRequest() {
					SD();

				}
				function SendFreeRequest() {
					SD2();

				}				
				function CloseResW() {
					cncreserver_create.OpenWindow = false;	
				}
				
				ReserveLayoutWindow.add(new qx.ui.core.Spacer(70, 10));
					var yesButton = new webfrontend.ui.SoundButton('Reserve It').set({width: 90, height: 25, appearance: "button-notif-cat", center: true, allowGrowX: false});

					yesButton.addListener("click", function () {
							SendReservationRequest();
					}, this);
					
					var freeButton = new webfrontend.ui.SoundButton('Add to Free Layouts').set({width: 130, height: 30, appearance: "button-notif-cat", center: true, allowGrowX: true});
					
					
					freeButton.addListener("click", function () {
						SendFreeRequest();
					}, this);
					
					var noButton = new webfrontend.ui.SoundButton('Close').set({width: 50, height: 30, appearance: "button-notif-cat", center: true, allowGrowX: true});
					
					
					noButton.addListener("click", function () {
						cncreserver_create.OpenWindow = false;
							ReserveLayoutWindow.close();
					}, this);

					var cancelButton = new webfrontend.ui.SoundButton('Cancel').set({width: 90, height: 60, appearance: "button-notif-cat", center: true, allowGrowX: false});

					cancelButton.addListener("click", function () {
						cncreserver_create.OpenWindow = true;
							ReserveLayoutWindow.close();
					}, this);

					var CnCOptButton = new webfrontend.ui.SoundButton('View CnCOpt').set({width: 90, height: 30, appearance: "button-notif-cat", center: true, allowGrowX: false});
					
					CnCOptButton.addListener("click", function () {
							window.open(cncOptURL,'_blank');
					}, this);

					buttonContainer.add(yesButton);
					buttonContainer.add(freeButton);
					buttonContainer.add(CnCOptButton);
					buttonContainer.add(new qx.ui.core.Spacer(40));
					buttonContainer.add(noButton);
					ReserveLayoutWindow.add(buttonContainer);
					cncreserver_create.OpenWindow = true;
				ReserveLayoutWindow.open();

				ReserveLayoutWindow.center();

			    } catch (e) {
              console.log("cncreserver [1]: ", e);
            }
		  }
        };
        if (!webfrontend.gui.region.RegionCityMenu.prototype.__cncreserver_real_showMenu) {
          webfrontend.gui.region.RegionCityMenu.prototype.__cncreserver_real_showMenu = webfrontend.gui.region.RegionCityMenu.prototype.showMenu;
        }
		
        var check_ct = 0;
        var check_timer = null;
        var button_enabled = 1234567;
        /* Wrap showMenu so we can inject our Sharelink at the end of menus and
         * sync Base object to our cncreserver.selected_base variable  */
        webfrontend.gui.region.RegionCityMenu.prototype.showMenu = function (selected_base) {
          try {
            var self = this;
            //console.log(selected_base);
            cncreserver.selected_base = selected_base;
			cncreserver_create.ReservedBase = selected_base;
            if (this.__cncreserver_initialized != 1) {
              this.__cncreserver_initialized = 1;
			  this.__cncreserver_links = [];
              for (var i in this) {
                try {
/* 				if (selected_base.get_VisObjectType() == 29){
					if (this[i] && this[i].basename == "Composite") {
                    var link = new qx.ui.form.Button("eserve It", "https://www.allyourbasesbelong2us.com/CrucialScripts/images/Reserver/favicon.png");
                    link.addListener("execute", function () {
                    var bt = qx.core.Init.getApplication();
                    bt.getBackgroundArea().closeCityInfo();
					// open a window to prompt reserve the layout
					
					cncreserver.SatCodeWindow();
                    });
                    this[i].add(link);
                    this.__cncreserver_links.push(link)
                  }
				} else { */
                  if (this[i] && this[i].basename == "Composite") {
                    var link = new qx.ui.form.Button("eserve It", "https://www.allyourbasesbelong2us.com/CrucialScripts/images/Reserver/favicon.png");
                    link.addListener("execute", function () {
                    var bt = qx.core.Init.getApplication();
                    bt.getBackgroundArea().closeCityInfo();
					// open a window to prompt reserve the layout
					
					cncreserver.LayoutWindow();
                    });
                    this[i].add(link);
                    this.__cncreserver_links.push(link)
                  }
				/* } */
                } catch (e) {
                  console.log("cncreserver [2]: ", e);
                }
              }
            }
			console.log("Selected Object: " + selected_base.get_VisObjectType());
			//console.log("Selected Object Type: " + selected_base.get_Type());
            var tf = false;
            switch (selected_base.get_VisObjectType()) {
/*               case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
                switch (selected_base.get_Type()) {
                  case ClientLib.Vis.Region.RegionCity.ERegionCityType.Own:
                    tf = false;
                    break;
                  case ClientLib.Vis.Region.RegionCity.ERegionCityType.Alliance:
				    tf = false;
                    break;
                  case ClientLib.Vis.Region.RegionCity.ERegionCityType.Enemy:
                    tf = false;
                    break;
                }
                break; */
              case ClientLib.Vis.VisObject.EObjectType.RegionGhostCity:
                tf = false;

                break;
              case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
			  if (cncreserver_create.OpenWindow === true){
				  tf = false;
			  }else{
                tf = true;
			  };
				
                break;
              case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
			  if (cncreserver_create.OpenWindow === true){
				  tf = false;
			  }else{
                tf = true;
			  };
                break;
/* 			case 29:
			  if (cncreserver_create.OpenWindow === true){

				  tf = false;
			  }else{
				  console.log("YEP");
                tf = true;
			  };
                break; */
            }

            var orig_tf = tf;

            function check_if_button_should_be_enabled() {
              try {
                tf = orig_tf;
                var selected_base = cncreserver.selected_base;
                var still_loading = false;
                if (check_timer != null) {
                  clearTimeout(check_timer);
                }

                /* When a city is selected, the data for the city is loaded in the background.. once the 
                 * data arrives, this method is called again with these fields set, but until it does
                 * we can't actually generate the link.. so this section of the code grays out the button
                 * until the data is ready, then it'll light up. */
                if (selected_base && selected_base.get_Id) {
                  var city_id = selected_base.get_Id();
                  var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(city_id);

                  if (!city || city.get_OwnerId() == 0) {
                    still_loading = true;
                    tf = false;
                  }
                } else {
                  tf = false;
                }
/* 				if (selected_base.get_VisObjectType() == 29){
					tf = true;
				} */
                if (tf != button_enabled) {
                  button_enabled = tf;
                  for (var i = 0; i < self.__cncreserver_links.length; ++i) {
                    self.__cncreserver_links[i].setEnabled(tf);
                  }
                }
                if (!still_loading) {
                  check_ct = 0;
                } else {
                  if (check_ct > 0) {
                    check_ct--;
                    check_timer = setTimeout(check_if_button_should_be_enabled, 100);
                  } else {
                    check_timer = null;
                  }
                }
              } catch (e) {
                console.log("cncreserver [3]: ", e);
                tf = false;
              }
            }

            check_ct = 50;
            check_if_button_should_be_enabled();
          } catch (e) {
            console.log("cncreserver [3]: ", e);
          }
          this.__cncreserver_real_showMenu(selected_base);
        }
      }


      /* Nice load check (ripped from AmpliDude's LoU Tweak script) */
      function cnc_check_if_loaded() {
        try {
          //if (typeof qx != 'undefined') {
			if (typeof qx !== 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().initDone) {
            a = qx.core.Init.getApplication(); // application
            if (a) {
				//var WorldIDea = ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
				//if (WorldIDea == 368){	
					cncreserver_create();
				//}
            } else {
              window.setTimeout(cnc_check_if_loaded, 1000);
            }
          } else {
            window.setTimeout(cnc_check_if_loaded, 1000);
          }
        } catch (e) {
          if (typeof console != 'undefined') console.log(e);
          else if (window.opera) opera.postError(e);
          else GM_log(e);
        }
      }
      if (/commandandconquer\.com/i.test(document.domain)) window.setTimeout(cnc_check_if_loaded, 1000);
    }
  
    // injecting because we can't seem to hook into the game interface via unsafeWindow 
    //   (Ripped from AmpliDude's LoU Tweak script)
    var script_block = document.createElement("script");
    txt = crucial_reserver_main.toString();
    script_block.innerHTML = "(" + txt + ")();";
    script_block.type = "text/javascript";
    if (/commandandconquer\.com/i.test(document.domain)) document.getElementsByTagName("head")[0].appendChild(script_block);
  
	})();

} catch (e) {
  GM_log(e);
}

(function() {
	var main = function() {
		'use strict';

		function createCnCReserverWindow() {
			console.log('CnCReserver loaded');

			qx.Class.define('CnCReserverLink', {
				type: 'singleton',
				extend: qx.core.Object,
				members: {
					window: null,

					initialize: function() {
						this.initializeEntryPoints();
					},

					initializeEntryPoints: function() {
						
						var ScriptsButton = qx.core.Init.getApplication().getMenuBar().getScriptsButton();

						ScriptsButton.Add('Layout Reservations', 'https://www.allyourbasesbelong2us.com/CrucialScripts/images/Reserver/favicon.png');

						var children = ScriptsButton.getMenu().getChildren();
						var lastChild = children[children.length - 1];
						lastChild.addListener('execute', this.onClickReserve, this);

						var ReservationsButton = new qx.ui.form.Button('CnCReservations').set({
							appearance: 'button-text-small',
							toolTipText: 'Opens Layout Reservations List',
							width: 80
						});

						ReservationsButton.addListener('execute', this.onClickReserve, this);

					},

					onClickReserve: function() {
					//OpenReservationsList();
					SD6();
					OpenReservationsListSlim();
					},
				}
			});
			
			
		};
		
	function SD6(){
	console.log("Crucial Reservations: Updating MCV Timer");
			var WorldID = ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();

			var AllianceID = ClientLib.Data.MainData.GetInstance().get_Alliance().get_Id();

			var PlayerID = ClientLib.Data.MainData.GetInstance().get_Player().get_Id();

			var ResearchLeft;
			var MCVTime;
			var Completed = "false";
			var PercentageOfResearchPoints;
			var BaseCount = 0;
			
			var Bases = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
			for (var selectedBaseID in Bases) {
				if (!Bases.hasOwnProperty(selectedBaseID)) {
					continue;
				}
				BaseCount = BaseCount + 1;
				var selectedBase = Bases[selectedBaseID];
				if (selectedBase === undefined) {
					throw new Error('can not find the base: ' + selectedBaseID);
				}
			}
			BaseCount = BaseCount + 1;
		        var player = ClientLib.Data.MainData.GetInstance().get_Player();
				var playerRank = player.get_OverallRank();
                var PlayerFaction = player.get_Faction();
				
				switch (player.get_Faction()) {
							case ClientLib.Base.EFactionType.GDIFaction:
								var playerFactionD = "GDI";
								break;
							case ClientLib.Base.EFactionType.NODFaction:
								var playerFactionD = "NOD";
								break;
							}

				var PlayerFaction = player.get_Faction();				
                var McvR = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Research_BaseFound, PlayerFaction);
                var PlayerResearch = player.get_PlayerResearch();
				var PlayerCP = player.GetCommandPointCount();
                var MCVNext = PlayerResearch.GetResearchItemFomMdbId(McvR);
				var nextLevelInfo = MCVNext.get_NextLevelInfo_Obj();
                var resourcesNeeded = [];
                for (var i in nextLevelInfo.rr) {
                  if (nextLevelInfo.rr[i].t > 0) {
                    resourcesNeeded[nextLevelInfo.rr[i].t] = nextLevelInfo.rr[i].c;
                  }
                }
                var researchNeeded = resourcesNeeded[ClientLib.Base.EResourceType.ResearchPoints];
                var currentResearchPoints = player.get_ResearchPoints();
				XY = 100 / researchNeeded;
				XYX = currentResearchPoints;
				PercentageOfResearchPoints = XYX * XY;
				if (PercentageOfResearchPoints > 100){
					PercentageOfResearchPoints = "100";
				}
              if (PerforceChangelist >= 387751) { //new
                ResearchLeft = phe.cnc.gui.util.Numbers.formatNumbersCompact(researchNeeded - currentResearchPoints);
              } else { //old
                ResearchLeft = webfrontend.gui.Util.formatNumbersCompact(researchNeeded - currentResearchPoints);
              }
                var creditsNeeded = resourcesNeeded[ClientLib.Base.EResourceType.Gold];
                var creditsResourceData = player.get_Credits();
                var creditGrowthPerHour = (creditsResourceData.Delta + creditsResourceData.ExtraBonusDelta) * ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour();
                var creditTimeLeftInHours = (creditsNeeded - player.GetCreditsCount()) / creditGrowthPerHour;
				var MCVTime = ClientLib.Vis.VisMain.FormatTimespan(creditTimeLeftInHours * 60 * 60);

			ResearchLeft = PercentageOfResearchPoints;
			PlayerFaction = playerFactionD;

				var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=UpdateStatusReserveRecord&PlayerID="+PlayerID+"&WorldID="+WorldID+"&AllianceID="+AllianceID+"&MCVTime="+MCVTime+"&ResearchLeft="+ResearchLeft+"&BaseCount="+BaseCount;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
								}
							}
		        xmlhttp.send(params);


				
	}
	
function OpenReservationsList(){
				var ReservationsListWindow = new qx.ui.window.Window("Reserve It - Reservations List", "https://www.allyourbasesbelong2us.com/CrucialScripts/images/Reserver/favicon.png").set({
					contentPaddingTop : 1,
					contentPaddingBottom : 8,
					contentPaddingRight : 8,
					contentPaddingLeft : 8,
					width : 440,
					height : 600,
					showMaximize : false,
					showMinimize : false,
					allowMaximize : false,
					allowMinimize : false,
					allowClose : true,
					resizable : false
				});


				ReservationsListWindow.setLayout(new qx.ui.layout.VBox());


							var _MainData = ClientLib.Data.MainData.GetInstance();
							var fileManager = ClientLib.File.FileManager.GetInstance();
							var images = {
									0 : "https://www.allyourbasesbelong2us.com/CrucialScripts/images/Reserver/empsm.png",
									1 : "https://www.allyourbasesbelong2us.com/CrucialScripts/images/Reserver/crysm.png",
									2 : "https://www.allyourbasesbelong2us.com/CrucialScripts/images/Reserver/tibsm.png"
								}
							var cellbgcolor = {
								0 : "#FFFFFF",
								1 : "#00A2E8",
								2 : "#31A245"
							}
							var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
							var return_data;
							var xmlhttp = new XMLHttpRequest();
							var params = "functionname=ReservationsList&WorldID="+WorldID;
							xmlhttp.open("POST", "https://www.allyourbasesbelong2us.com/DbService/Service.php", false);
							xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									return_data= eval(xmlhttp.responseText);
								}
							};
							xmlhttp.send(params);
                            var html = ""; 
							for (var index=0;index < return_data.length;index++)
							{
							var ReservedLayout = return_data[index].LayoutReserved;
							var rtPlayerName = return_data[index].PlayerName;
							var rtMCVTime = return_data[index].MCVTime;
							var rtResearchLevel = return_data[index].ResearchLeft + "%";
							var CoordsJoined = return_data[index].CoordsX + ":" + return_data[index].CoordsY;
							var currenLayout = ReservedLayout;

							var str = ".ct-jhlk";
							var data = currenLayout;
							for (var i = 0; i < 8; i++) {
								var re = new RegExp(i, 'g');
								var char = str.charAt(i);
								data = data.replace(re, char);
							}
							
							
							html += '<table border="1" width="350" cellspacing="0" cellpadding="0" bgcolor="#FFFFFF" height="120"><tr><td align="left" valign="top"><table border="1" width="350" height="120" align="left" cellspacing="0" cellpadding="0" bordercolor="#CCCCCC"><tr><td height="14" width="159">';
							html += 'Player: ' + rtPlayerName + '</td><td rowspan="4" width="140"><div align="left"><table border="1" width="135" cellspacing="0" cellpadding="0" align="left" bordercolor="#C0C0C0" style="border-collapse: collapse" height="120">';

							for (var i = 0; i < 72; i++) {
								var row = Math.floor(i / 9);
								var column = i - Math.floor(i / 9) * 9;
								if (column == 0) html += '<tr>';
								html += '<th width="9" height="9" align="center" valign="middle" nowrap border="2" bordercolor="#CCCCCC" bgcolor="' + cellbgcolor[currenLayout.charAt(i)] + '"><img border="0" src="' + images[currenLayout.charAt(i)] + '" width="8" height="8" align="middle"></th>';
								if (column == 8) html += '</tr>';
							}
							html += '</table></div></td></tr><tr><td height="14"  width="159">Coords ' + CoordsJoined + '</td></tr><tr><td height="14" width="159">MCV Time: ' + rtMCVTime + '</td></tr><tr><td height="14" width="159">Research at: ' + rtResearchLevel + '</td></tr></table></td></tr></table>';
						}

						var scrollBox = new qx.ui.container.Scroll().set({
							width: 410,
							height: 550
						});	
						
						
					scrollBox.add(new qx.ui.basic.Label(html).set({
						rich: true,
						maxWidth: 360,
						wrap: true,
						font: 'font_size_15',
						font: 'bold',
						textColor: 'black',
						alignX: 'center'
					}));
					

					var buttonContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
						alignX: 'center'
					}));
				ReservationsListWindow.add(scrollBox);
				ReservationsListWindow.add(new qx.ui.core.Spacer(70));
					var RefreshButton = new webfrontend.ui.SoundButton('Refresh').set({width: 90, height: 30, appearance: "button-notif-cat", center: true, allowGrowX: false});

					RefreshButton.addListener("click", function () {
							ReservationsListWindow.close();
							OpenReservationsList();
					}, this);

					buttonContainer.add(RefreshButton);
					ReservationsListWindow.add(buttonContainer);
				ReservationsListWindow.open();

				ReservationsListWindow.center();
			}
function getClib(){
    var clib;
    try{
        clib = ClientLib.Data.MainData.GetInstance();
    }catch(e)
    {
        alert("can't get clientLib");
        return null;
    }

    if(!clib)
    {
        alert("clib is undefined");
    }
    return clib;
}

function getData(){
    return getClib().Data.MainData.GetInstance();
}


function getVis(){
    var clib = getClib();
    return clib.Vis.VisMain.GetInstance();
}
			
function OpenReservationsListSlim() {


	var _MainData = ClientLib.Data.MainData.GetInstance();
	var fileManager = ClientLib.File.FileManager.GetInstance();
	var images = {
		0 : "https://www.allyourbasesbelong2us.com/CrucialScripts/images/Reserver/empsm.png",
		1 : "https://www.allyourbasesbelong2us.com/CrucialScripts/images/Reserver/crysm.png",
		2 : "https://www.allyourbasesbelong2us.com/CrucialScripts/images/Reserver/tibsm.png"
	}
	
	var cellbgcolor = {
		0 : "#FFFFFF",
		1 : "#00A2E8",
		2 : "#31A245"
	}

    var ReservationsListWindow = new qx.ui.window.Window("Reserve It - Reservations List", "https://www.allyourbasesbelong2us.com/CrucialScripts/images/Reserver/favicon.png").set({
        contentPaddingTop: 1,
        contentPaddingBottom: 8,
        contentPaddingRight: 8,
        contentPaddingLeft: 8,
        width: 595,
        height: 600,
        showMaximize: false,
        showMinimize: false,
        allowMaximize: false,
        allowMinimize: false,
        allowClose: true,
        resizable: false
    });

    ReservationsListWindow.setLayout(new qx.ui.layout.VBox());
    var box = new qx.ui.container.Composite().set({
        decorator: "main",
 //       backgroundColor: "white",
        allowGrowX: false,
        allowGrowY: false
    });
	

	
	var pageLayout = new qx.ui.layout.VBox();
	var pageLayout2 = new qx.ui.layout.VBox();
	var pageLayout3 = new qx.ui.layout.VBox();
	var ReservationsListTabView = new qx.ui.tabview.TabView();
	var page1 = new qx.ui.tabview.Page("Reserved Layouts");
	var page2 = new qx.ui.tabview.Page("Free Layouts");
	var page3 = new qx.ui.tabview.Page("Sat Code Claims");
	page1.setLayout(pageLayout);
	page2.setLayout(pageLayout2);
	page3.setLayout(pageLayout3);
	ReservationsListTabView.add(page1);
	ReservationsListTabView.add(page2);
	ReservationsListTabView.add(page3);
	var scrollBox1 = new qx.ui.container.Scroll().set({
		width: 590,
		height: 550
	});
	
	var scrollBox2 = new qx.ui.container.Scroll().set({
		width: 590,
		height: 550
	});	

	var scrollBox3 = new qx.ui.container.Scroll().set({
		width: 590,
		height: 550
	});	
/*         page2.add(new qx.ui.basic.Label('www.allyourbasesbelong2us.com - - LOADING DATA').set({
            rich: true,
            maxWidth: 200,
            wrap: false,
            font: 'font_size_15',
            font: 'bold',
            textColor: 'black',
            alignX: 'left'
        }), {row: 0, column: 1 });
		
        page3.add(new qx.ui.basic.Label('www.allyourbasesbelong2us.com - - LOADING DATA').set({
            rich: true,
            maxWidth: 200,
            wrap: false,
            font: 'font_size_15',
            font: 'bold',
            textColor: 'black',
            alignX: 'left'
        }), {row: 0, column: 1 }); */
		
    var layout = new qx.ui.layout.Grid();
    layout.setSpacing(10);
    layout.setColumnAlign(0, "left", "middle"); //player name
    layout.setColumnAlign(1, "left", "middle"); //base no.
    layout.setColumnAlign(2, "left", "middle"); //mcv timer
    layout.setColumnAlign(3, "left", "middle"); //rp percent
    layout.setColumnAlign(4, "left", "middle"); //layout button
    layout.setColumnAlign(5, "left", "middle"); //cncopt button
    layout.setColumnAlign(6, "left", "middle"); //coords button
	layout.setColumnAlign(7, "left", "middle"); //admin delete button
    box.setLayout(layout);
	
	
	

	

	
    
	var btnTab = page2.getChildControl("button");
	btnTab.addListener("click", function() {
	page2._removeAll();
    var box2 = new qx.ui.container.Composite().set({
        decorator: "main",
 //       backgroundColor: "white",
        allowGrowX: false,
        allowGrowY: false
    });
	
    var layout2 = new qx.ui.layout.Grid();
    layout2.setSpacing(10);
    layout2.setColumnAlign(0, "left", "middle"); //layout button
    layout2.setColumnAlign(1, "left", "middle"); //cncopt button
    layout2.setColumnAlign(2, "left", "middle"); //coords button
	layout2.setColumnAlign(3, "left", "middle"); //Claim button
	layout2.setColumnAlign(4, "left", "middle"); //admin delete button
	box2.setLayout(layout2);
	
        box2.add(new qx.ui.basic.Label('Coords').set({
            rich: true,
            maxWidth: 200,
            wrap: false,
            font: 'font_size_15',
            font: 'bold',
            textColor: 'black',
            alignX: 'left'
        }), {row: 0, column: 0 });		
		
        box2.add(new qx.ui.basic.Label('View Layout').set({
            rich: true,
            maxWidth: 200,
            wrap: false,
            font: 'font_size_15',
            font: 'bold',
            textColor: 'black',
            alignX: 'left'
        }), {row: 0, column: 1 });
		
		
        box2.add(new qx.ui.basic.Label('CnCOpt Link').set({
            rich: true,
            maxWidth: 200,
            wrap: false,
            font: 'font_size_15',
            font: 'bold',
            textColor: 'black',
            alignX: 'left'
        }), {row: 0, column: 2 });
		
	var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
	var return_data2;
    var xmlhttp2 = new XMLHttpRequest();
    var params2 = "functionname=FreeLayoutsList&WorldID="+WorldID;
    xmlhttp2.open("POST", "https://www.allyourbasesbelong2us.com/DbService/Service.php", false);
    xmlhttp2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp2.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            return_data2 = eval(xmlhttp2.responseText);
        }
    };
    xmlhttp2.send(params2);

	var X2 = [];
	var Y2 = [];
	var X2int = [];
	var Y2int = [];
	var rtCnCOptlink2 = [];
	var ReservedLayout2 = [];
	var id3 = 1;
    var y2 = 2;
    for (var index2 = 0; index2 < return_data2.length; index2++) {
		var html2 = "";
        ReservedLayout2[id3] = return_data2[index2].LayoutReserved;
		rtCnCOptlink2[id3] = return_data2[index2].CnCOptLink;
        var CoordsJoined2 = return_data2[index2].CoordsX + ":" + return_data2[index2].CoordsY;
		X2int[id3] = return_data2[index2].CoordsX;
		Y2int[id3] = return_data2[index2].CoordsY;
		X2[id3] = parseInt(return_data2[index2].CoordsX);
		Y2[id3] = parseInt(return_data2[index2].CoordsY);
        var currenLayout2 = ReservedLayout2[id3];
		
		var str2 = ".ct-jhlk";
		var data2 = currenLayout2;
		for (var i = 0; i < 8; i++) {
			var re = new RegExp(i, 'g');
			var char = str2.charAt(i);
			data2 = data2.replace(re, char);
		}

		html2 += '<table border="1" width="135" cellspacing="0" cellpadding="0" align="left" bordercolor="#C0C0C0" style="border-collapse: collapse" height="120">';

		for (var i = 0; i < 72; i++) {
			var row = Math.floor(i / 9);
			var column = i - Math.floor(i / 9) * 9;
			if (column == 0) html2 += '<tr>';
			html2 += '<th width="9" height="9" align="center" valign="middle" nowrap border="2" bordercolor="#CCCCCC" bgcolor="' + cellbgcolor[currenLayout2.charAt(i)] + '"><img border="0" src="' + images[currenLayout2.charAt(i)] + '" width="8" height="8" align="middle"></th>';
			if (column == 8) html2 += '</tr>';
		}
		
		html2 += '</table>';
	
		var LayoutBtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		
		var layoutTip2 = new qx.ui.tooltip.ToolTip(html2, null);
	
			var layoutButton2 = new qx.ui.form.Button("    View     ", "");
		layoutTip2.setRich(true);
		layoutButton2.setToolTip(layoutTip2);
		layoutButton2.setBlockToolTip(false);
		
		layoutButton2.addListener("click", function() {

        }, this);	
		
			var WorldID = ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
			var WorldID2 = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
			var WorldName = ClientLib.Data.MainData.GetInstance().get_Server().get_Name();
			var AllianceID = ClientLib.Data.MainData.GetInstance().get_Alliance().get_Id();
			var AllianceName = ClientLib.Data.MainData.GetInstance().get_Alliance().get_Name();
			var PlayerID = ClientLib.Data.MainData.GetInstance().get_Player().get_Id();
			var PlayerName = ClientLib.Data.MainData.GetInstance().get_Player().get_Name();
			var ResearchLeft;
			var MCVTime;
			var Completed = "false";
			var PercentageOfResearchPoints;
			var BaseCount = 0;
			
			var Bases = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
			for (var selectedBaseID in Bases) {
				if (!Bases.hasOwnProperty(selectedBaseID)) {
					continue;
				}
				BaseCount = BaseCount + 1;
				var selectedBase = Bases[selectedBaseID];
				if (selectedBase === undefined) {
					throw new Error('can not find the base: ' + selectedBaseID);
				}
			}
			BaseCount = BaseCount + 1;
		        var player = ClientLib.Data.MainData.GetInstance().get_Player();
				var playerRank = player.get_OverallRank();
                var PlayerFaction = player.get_Faction();
				
				switch (player.get_Faction()) {
							case ClientLib.Base.EFactionType.GDIFaction:
								var playerFactionD = "GDI";
								break;
							case ClientLib.Base.EFactionType.NODFaction:
								var playerFactionD = "NOD";
								break;
							}

				var PlayerFaction = player.get_Faction();				
                var McvR = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Research_BaseFound, PlayerFaction);
                var PlayerResearch = player.get_PlayerResearch();
				var PlayerCP = player.GetCommandPointCount();
                var MCVNext = PlayerResearch.GetResearchItemFomMdbId(McvR);
				var nextLevelInfo = MCVNext.get_NextLevelInfo_Obj();
                var resourcesNeeded = [];
                for (var i in nextLevelInfo.rr) {
                  if (nextLevelInfo.rr[i].t > 0) {
                    resourcesNeeded[nextLevelInfo.rr[i].t] = nextLevelInfo.rr[i].c;
                  }
                }
                var researchNeeded = resourcesNeeded[ClientLib.Base.EResourceType.ResearchPoints];
                var currentResearchPoints = player.get_ResearchPoints();
				XY = 100 / researchNeeded;
				XYX = currentResearchPoints;
				PercentageOfResearchPoints = XYX * XY;
				if (PercentageOfResearchPoints > 100){
					PercentageOfResearchPoints = "100";
				}
              if (PerforceChangelist >= 387751) { //new
                ResearchLeft = phe.cnc.gui.util.Numbers.formatNumbersCompact(researchNeeded - currentResearchPoints);
              } else { //old
                ResearchLeft = webfrontend.gui.Util.formatNumbersCompact(researchNeeded - currentResearchPoints);
              }
                var creditsNeeded = resourcesNeeded[ClientLib.Base.EResourceType.Gold];
                var creditsResourceData = player.get_Credits();
                var creditGrowthPerHour = (creditsResourceData.Delta + creditsResourceData.ExtraBonusDelta) * ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour();
                var creditTimeLeftInHours = (creditsNeeded - player.GetCreditsCount()) / creditGrowthPerHour;
				var MCVTime = ClientLib.Vis.VisMain.FormatTimespan(creditTimeLeftInHours * 60 * 60);

				ResearchLeft = PercentageOfResearchPoints;
				PlayerFaction = playerFactionD;
		//=========================================================================================================================================================
		switch(id3){
		case 1:
		var Xs2001 = X2[1];
		var Ys2001 = Y2[1];
		var Xs2001b = X2int[1];
		var Ys2001b = Y2int[1];
		
		var rtCnCOptlink2001 = rtCnCOptlink2[1];
		
		var coords001BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		
		var CnCOpt001BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));

		var Claim001BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		

		var coords001Button2 = new qx.ui.form.Button("  " + CoordsJoined2 + "  ", "");
		var cncopt001Button2 = new qx.ui.form.Button("    CnCOpt    ", "");	
		var Claim001Button2 = new qx.ui.form.Button("    Claim it    ", "");
		
        coords001Button2.addListener("click", function() {
			ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs2001,Ys2001);
        }, this);
		
        cncopt001Button2.addListener("click", function() {
			window.open(rtCnCOptlink2001,'_blank');
        }, this);

        Claim001Button2.addListener("click", function() {
			var LayoutReserved = ReservedLayout2[1];
			var CnCOptLink = rtCnCOptlink2001;
			

					var CoordsX = Xs2001b;
					var CoordsY = Ys2001b;

					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
					var params = "functionname=ClaimLayoutRecord&PlayerID="+PlayerID+"&WorldID="+WorldID+"&WorldName="+WorldName+"&AllianceID="+AllianceID+"&AllianceName="+AllianceName+"&PlayerName="+PlayerName+"&MCVTime="+MCVTime+"&ResearchLeft="+ResearchLeft+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY+"&LayoutReserved="+LayoutReserved+"&CnCOptLink="+CnCOptLink+"&Completed="+Completed+"&BaseCount="+BaseCount;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
        }, this);		
		coords001BtnContainer2.add(coords001Button2);
		CnCOpt001BtnContainer2.add(cncopt001Button2);
		LayoutBtnContainer2.add(layoutButton2);
		Claim001BtnContainer2.add(Claim001Button2);
	
		box2.add((coords001BtnContainer2), {row: y2, column: 0 });
		box2.add((LayoutBtnContainer2), {row: y2, column: 1 });        
        box2.add((CnCOpt001BtnContainer2), {row: y2, column: 2 });
		box2.add((Claim001BtnContainer2), {row: y2, column: 3 });
				if (ad_priv == true){
				var del001BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del001Button2 = new qx.ui.form.Button("Delete", "");
				del001Button2.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs2001b;
					var CoordsY = Ys2001b;
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delFreeRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del001BtnContainer2.add(del001Button2);
				box2.add((del001BtnContainer2), {row: y2, column: 4 });
			}
		break;
		case 2:
		var Xs2002 = X2[2];
		var Ys2002 = Y2[2];
		var Xs2002b = X2int[2];
		var Ys2002b = Y2int[2];
		
		var rtCnCOptlink2002 = rtCnCOptlink2[2];
		
		var coords002BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		
		var CnCOpt002BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));

		var Claim002BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		

		var coords002Button2 = new qx.ui.form.Button("  " + CoordsJoined2 + "  ", "");
		var cncopt002Button2 = new qx.ui.form.Button("    CnCOpt    ", "");	
		var Claim002Button2 = new qx.ui.form.Button("    Claim it    ", "");
		
        coords002Button2.addListener("click", function() {
			ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs2002,Ys2002);
        }, this);
		
        cncopt002Button2.addListener("click", function() {
			window.open(rtCnCOptlink2002,'_blank');
        }, this);

        Claim002Button2.addListener("click", function() {
			var LayoutReserved = ReservedLayout2[2];
			var CnCOptLink = rtCnCOptlink2002;
			

					var CoordsX = Xs2002b;
					var CoordsY = Ys2002b;

					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
					var params = "functionname=ClaimLayoutRecord&PlayerID="+PlayerID+"&WorldID="+WorldID+"&WorldName="+WorldName+"&AllianceID="+AllianceID+"&AllianceName="+AllianceName+"&PlayerName="+PlayerName+"&MCVTime="+MCVTime+"&ResearchLeft="+ResearchLeft+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY+"&LayoutReserved="+LayoutReserved+"&CnCOptLink="+CnCOptLink+"&Completed="+Completed+"&BaseCount="+BaseCount;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
        }, this);		
		coords002BtnContainer2.add(coords002Button2);
		CnCOpt002BtnContainer2.add(cncopt002Button2);
		LayoutBtnContainer2.add(layoutButton2);
		Claim002BtnContainer2.add(Claim002Button2);
	
		box2.add((coords002BtnContainer2), {row: y2, column: 0 });
		box2.add((LayoutBtnContainer2), {row: y2, column: 1 });        
        box2.add((CnCOpt002BtnContainer2), {row: y2, column: 2 });
		box2.add((Claim002BtnContainer2), {row: y2, column: 3 });
				if (ad_priv == true){
				var del002BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del002Button2 = new qx.ui.form.Button("Delete", "");
				del002Button2.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs2002b;
					var CoordsY = Ys2002b;
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delFreeRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del002BtnContainer2.add(del002Button2);
				box2.add((del002BtnContainer2), {row: y2, column: 4 });
			}
		break;
		case 3:
		var Xs2003 = X2[3];
		var Ys2003 = Y2[3];
		var Xs2003b = X2int[3];
		var Ys2003b = Y2int[3];
		
		var rtCnCOptlink2003 = rtCnCOptlink2[3];
		
		var coords003BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		
		var CnCOpt003BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));

		var Claim003BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		

		var coords003Button2 = new qx.ui.form.Button("  " + CoordsJoined2 + "  ", "");
		var cncopt003Button2 = new qx.ui.form.Button("    CnCOpt    ", "");	
		var Claim003Button2 = new qx.ui.form.Button("    Claim it    ", "");
		
        coords003Button2.addListener("click", function() {
			ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs2003,Ys2003);
        }, this);
		
        cncopt003Button2.addListener("click", function() {
			window.open(rtCnCOptlink2003,'_blank');
        }, this);

        Claim003Button2.addListener("click", function() {
			var LayoutReserved = ReservedLayout2[3];
			var CnCOptLink = rtCnCOptlink2003;
			

					var CoordsX = Xs2003b;
					var CoordsY = Ys2003b;

					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
					var params = "functionname=ClaimLayoutRecord&PlayerID="+PlayerID+"&WorldID="+WorldID+"&WorldName="+WorldName+"&AllianceID="+AllianceID+"&AllianceName="+AllianceName+"&PlayerName="+PlayerName+"&MCVTime="+MCVTime+"&ResearchLeft="+ResearchLeft+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY+"&LayoutReserved="+LayoutReserved+"&CnCOptLink="+CnCOptLink+"&Completed="+Completed+"&BaseCount="+BaseCount;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
        }, this);		
		coords003BtnContainer2.add(coords003Button2);
		CnCOpt003BtnContainer2.add(cncopt003Button2);
		LayoutBtnContainer2.add(layoutButton2);
		Claim003BtnContainer2.add(Claim003Button2);
	
		box2.add((coords003BtnContainer2), {row: y2, column: 0 });
		box2.add((LayoutBtnContainer2), {row: y2, column: 1 });        
        box2.add((CnCOpt003BtnContainer2), {row: y2, column: 2 });
		box2.add((Claim003BtnContainer2), {row: y2, column: 3 });
				if (ad_priv == true){
				var del003BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del003Button2 = new qx.ui.form.Button("Delete", "");
				del003Button2.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs2003b;
					var CoordsY = Ys2003b;
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delFreeRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del003BtnContainer2.add(del003Button2);
				box2.add((del003BtnContainer2), {row: y2, column: 4 });
			}
		break;
		case 4:
		var Xs2004 = X2[4];
		var Ys2004 = Y2[4];
		var Xs2004b = X2int[4];
		var Ys2004b = Y2int[4];
		
		var rtCnCOptlink2004 = rtCnCOptlink2[4];
		
		var coords004BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		
		var CnCOpt004BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));

		var Claim004BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		

		var coords004Button2 = new qx.ui.form.Button("  " + CoordsJoined2 + "  ", "");
		var cncopt004Button2 = new qx.ui.form.Button("    CnCOpt    ", "");	
		var Claim004Button2 = new qx.ui.form.Button("    Claim it    ", "");
		
        coords004Button2.addListener("click", function() {
			ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs2004,Ys2004);
        }, this);
		
        cncopt004Button2.addListener("click", function() {
			window.open(rtCnCOptlink2004,'_blank');
        }, this);

        Claim004Button2.addListener("click", function() {
			var LayoutReserved = ReservedLayout2[4];
			var CnCOptLink = rtCnCOptlink2004;
			

					var CoordsX = Xs2004b;
					var CoordsY = Ys2004b;

					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
					var params = "functionname=ClaimLayoutRecord&PlayerID="+PlayerID+"&WorldID="+WorldID+"&WorldName="+WorldName+"&AllianceID="+AllianceID+"&AllianceName="+AllianceName+"&PlayerName="+PlayerName+"&MCVTime="+MCVTime+"&ResearchLeft="+ResearchLeft+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY+"&LayoutReserved="+LayoutReserved+"&CnCOptLink="+CnCOptLink+"&Completed="+Completed+"&BaseCount="+BaseCount;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
        }, this);		
		coords004BtnContainer2.add(coords004Button2);
		CnCOpt004BtnContainer2.add(cncopt004Button2);
		LayoutBtnContainer2.add(layoutButton2);
		Claim004BtnContainer2.add(Claim004Button2);
	
		box2.add((coords004BtnContainer2), {row: y2, column: 0 });
		box2.add((LayoutBtnContainer2), {row: y2, column: 1 });        
        box2.add((CnCOpt004BtnContainer2), {row: y2, column: 2 });
		box2.add((Claim004BtnContainer2), {row: y2, column: 3 });
				if (ad_priv == true){
				var del004BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del004Button2 = new qx.ui.form.Button("Delete", "");
				del004Button2.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs2004b;
					var CoordsY = Ys2004b;
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delFreeRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del004BtnContainer2.add(del004Button2);
				box2.add((del004BtnContainer2), {row: y2, column: 4 });
			}
		break;
		case 5:
		var Xs2005 = X2[5];
		var Ys2005 = Y2[5];
		var Xs2005b = X2int[5];
		var Ys2005b = Y2int[5];
		
		var rtCnCOptlink2005 = rtCnCOptlink2[5];
		
		var coords005BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		
		var CnCOpt005BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));

		var Claim005BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		

		var coords005Button2 = new qx.ui.form.Button("  " + CoordsJoined2 + "  ", "");
		var cncopt005Button2 = new qx.ui.form.Button("    CnCOpt    ", "");	
		var Claim005Button2 = new qx.ui.form.Button("    Claim it    ", "");
		
        coords005Button2.addListener("click", function() {
			ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs2005,Ys2005);
        }, this);
		
        cncopt005Button2.addListener("click", function() {
			window.open(rtCnCOptlink2005,'_blank');
        }, this);

        Claim005Button2.addListener("click", function() {
			var LayoutReserved = ReservedLayout2[5];
			var CnCOptLink = rtCnCOptlink2005;
			

					var CoordsX = Xs2005b;
					var CoordsY = Ys2005b;

					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
					var params = "functionname=ClaimLayoutRecord&PlayerID="+PlayerID+"&WorldID="+WorldID+"&WorldName="+WorldName+"&AllianceID="+AllianceID+"&AllianceName="+AllianceName+"&PlayerName="+PlayerName+"&MCVTime="+MCVTime+"&ResearchLeft="+ResearchLeft+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY+"&LayoutReserved="+LayoutReserved+"&CnCOptLink="+CnCOptLink+"&Completed="+Completed+"&BaseCount="+BaseCount;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
        }, this);		
		coords005BtnContainer2.add(coords005Button2);
		CnCOpt005BtnContainer2.add(cncopt005Button2);
		LayoutBtnContainer2.add(layoutButton2);
		Claim005BtnContainer2.add(Claim005Button2);
	
		box2.add((coords005BtnContainer2), {row: y2, column: 0 });
		box2.add((LayoutBtnContainer2), {row: y2, column: 1 });        
        box2.add((CnCOpt005BtnContainer2), {row: y2, column: 2 });
		box2.add((Claim005BtnContainer2), {row: y2, column: 3 });
				if (ad_priv == true){
				var del005BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del005Button2 = new qx.ui.form.Button("Delete", "");
				del005Button2.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs2005b;
					var CoordsY = Ys2005b;
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delFreeRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del005BtnContainer2.add(del005Button2);
				box2.add((del005BtnContainer2), {row: y2, column: 4 });
			}
		break;
		case 6:
		var Xs2006 = X2[6];
		var Ys2006 = Y2[6];
		var Xs2006b = X2int[6];
		var Ys2006b = Y2int[6];
		
		var rtCnCOptlink2006 = rtCnCOptlink2[6];
		
		var coords006BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		
		var CnCOpt006BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));

		var Claim006BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		

		var coords006Button2 = new qx.ui.form.Button("  " + CoordsJoined2 + "  ", "");
		var cncopt006Button2 = new qx.ui.form.Button("    CnCOpt    ", "");	
		var Claim006Button2 = new qx.ui.form.Button("    Claim it    ", "");
		
        coords006Button2.addListener("click", function() {
			ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs2006,Ys2006);
        }, this);
		
        cncopt006Button2.addListener("click", function() {
			window.open(rtCnCOptlink2006,'_blank');
        }, this);

        Claim006Button2.addListener("click", function() {
			var LayoutReserved = ReservedLayout2[6];
			var CnCOptLink = rtCnCOptlink2006;
			

					var CoordsX = Xs2006b;
					var CoordsY = Ys2006b;

					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
					var params = "functionname=ClaimLayoutRecord&PlayerID="+PlayerID+"&WorldID="+WorldID+"&WorldName="+WorldName+"&AllianceID="+AllianceID+"&AllianceName="+AllianceName+"&PlayerName="+PlayerName+"&MCVTime="+MCVTime+"&ResearchLeft="+ResearchLeft+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY+"&LayoutReserved="+LayoutReserved+"&CnCOptLink="+CnCOptLink+"&Completed="+Completed+"&BaseCount="+BaseCount;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
        }, this);		
		coords006BtnContainer2.add(coords006Button2);
		CnCOpt006BtnContainer2.add(cncopt006Button2);
		LayoutBtnContainer2.add(layoutButton2);
		Claim006BtnContainer2.add(Claim006Button2);
	
		box2.add((coords006BtnContainer2), {row: y2, column: 0 });
		box2.add((LayoutBtnContainer2), {row: y2, column: 1 });        
        box2.add((CnCOpt006BtnContainer2), {row: y2, column: 2 });
		box2.add((Claim006BtnContainer2), {row: y2, column: 3 });
				if (ad_priv == true){
				var del006BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del006Button2 = new qx.ui.form.Button("Delete", "");
				del006Button2.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs2006b;
					var CoordsY = Ys2006b;
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delFreeRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del006BtnContainer2.add(del006Button2);
				box2.add((del006BtnContainer2), {row: y2, column: 4 });
			}
		break;
		case 7:
		var Xs2007 = X2[7];
		var Ys2007 = Y2[7];
		var Xs2007b = X2int[7];
		var Ys2007b = Y2int[7];
		
		var rtCnCOptlink2007 = rtCnCOptlink2[7];
		
		var coords007BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		
		var CnCOpt007BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));

		var Claim007BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		

		var coords007Button2 = new qx.ui.form.Button("  " + CoordsJoined2 + "  ", "");
		var cncopt007Button2 = new qx.ui.form.Button("    CnCOpt    ", "");	
		var Claim007Button2 = new qx.ui.form.Button("    Claim it    ", "");
		
        coords007Button2.addListener("click", function() {
			ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs2007,Ys2007);
        }, this);
		
        cncopt007Button2.addListener("click", function() {
			window.open(rtCnCOptlink2007,'_blank');
        }, this);

        Claim007Button2.addListener("click", function() {
			var LayoutReserved = ReservedLayout2[7];
			var CnCOptLink = rtCnCOptlink2007;
			

					var CoordsX = Xs2007b;
					var CoordsY = Ys2007b;

					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
					var params = "functionname=ClaimLayoutRecord&PlayerID="+PlayerID+"&WorldID="+WorldID+"&WorldName="+WorldName+"&AllianceID="+AllianceID+"&AllianceName="+AllianceName+"&PlayerName="+PlayerName+"&MCVTime="+MCVTime+"&ResearchLeft="+ResearchLeft+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY+"&LayoutReserved="+LayoutReserved+"&CnCOptLink="+CnCOptLink+"&Completed="+Completed+"&BaseCount="+BaseCount;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
        }, this);		
		coords007BtnContainer2.add(coords007Button2);
		CnCOpt007BtnContainer2.add(cncopt007Button2);
		LayoutBtnContainer2.add(layoutButton2);
		Claim007BtnContainer2.add(Claim007Button2);
	
		box2.add((coords007BtnContainer2), {row: y2, column: 0 });
		box2.add((LayoutBtnContainer2), {row: y2, column: 1 });        
        box2.add((CnCOpt007BtnContainer2), {row: y2, column: 2 });
		box2.add((Claim007BtnContainer2), {row: y2, column: 3 });
				if (ad_priv == true){
				var del007BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del007Button2 = new qx.ui.form.Button("Delete", "");
				del007Button2.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs2007b;
					var CoordsY = Ys2007b;
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delFreeRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del007BtnContainer2.add(del007Button2);
				box2.add((del007BtnContainer2), {row: y2, column: 4 });
			}
		break;
		case 8:
		var Xs2008 = X2[8];
		var Ys2008 = Y2[8];
		var Xs2008b = X2int[8];
		var Ys2008b = Y2int[8];
		
		var rtCnCOptlink2008 = rtCnCOptlink2[8];
		
		var coords008BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		
		var CnCOpt008BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));

		var Claim008BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		

		var coords008Button2 = new qx.ui.form.Button("  " + CoordsJoined2 + "  ", "");
		var cncopt008Button2 = new qx.ui.form.Button("    CnCOpt    ", "");	
		var Claim008Button2 = new qx.ui.form.Button("    Claim it    ", "");
		
        coords008Button2.addListener("click", function() {
			ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs2008,Ys2008);
        }, this);
		
        cncopt008Button2.addListener("click", function() {
			window.open(rtCnCOptlink2008,'_blank');
        }, this);

        Claim008Button2.addListener("click", function() {
			var LayoutReserved = ReservedLayout2[8];
			var CnCOptLink = rtCnCOptlink2008;
			

					var CoordsX = Xs2008b;
					var CoordsY = Ys2008b;

					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
					var params = "functionname=ClaimLayoutRecord&PlayerID="+PlayerID+"&WorldID="+WorldID+"&WorldName="+WorldName+"&AllianceID="+AllianceID+"&AllianceName="+AllianceName+"&PlayerName="+PlayerName+"&MCVTime="+MCVTime+"&ResearchLeft="+ResearchLeft+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY+"&LayoutReserved="+LayoutReserved+"&CnCOptLink="+CnCOptLink+"&Completed="+Completed+"&BaseCount="+BaseCount;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
        }, this);		
		coords008BtnContainer2.add(coords008Button2);
		CnCOpt008BtnContainer2.add(cncopt008Button2);
		LayoutBtnContainer2.add(layoutButton2);
		Claim008BtnContainer2.add(Claim008Button2);
	
		box2.add((coords008BtnContainer2), {row: y2, column: 0 });
		box2.add((LayoutBtnContainer2), {row: y2, column: 1 });        
        box2.add((CnCOpt008BtnContainer2), {row: y2, column: 2 });
		box2.add((Claim008BtnContainer2), {row: y2, column: 3 });
				if (ad_priv == true){
				var del008BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del008Button2 = new qx.ui.form.Button("Delete", "");
				del008Button2.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs2008b;
					var CoordsY = Ys2008b;
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delFreeRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del008BtnContainer2.add(del008Button2);
				box2.add((del008BtnContainer2), {row: y2, column: 4 });
			}
		break;
		case 9:
		var Xs2009 = X2[9];
		var Ys2009 = Y2[9];
		var Xs2009b = X2int[9];
		var Ys2009b = Y2int[9];
		
		var rtCnCOptlink2009 = rtCnCOptlink2[9];
		
		var coords009BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		
		var CnCOpt009BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));

		var Claim009BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		

		var coords009Button2 = new qx.ui.form.Button("  " + CoordsJoined2 + "  ", "");
		var cncopt009Button2 = new qx.ui.form.Button("    CnCOpt    ", "");	
		var Claim009Button2 = new qx.ui.form.Button("    Claim it    ", "");
		
        coords009Button2.addListener("click", function() {
			ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs2009,Ys2009);
        }, this);
		
        cncopt009Button2.addListener("click", function() {
			window.open(rtCnCOptlink2009,'_blank');
        }, this);

        Claim009Button2.addListener("click", function() {
			var LayoutReserved = ReservedLayout2[9];
			var CnCOptLink = rtCnCOptlink2009;
			

					var CoordsX = Xs2009b;
					var CoordsY = Ys2009b;

					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
					var params = "functionname=ClaimLayoutRecord&PlayerID="+PlayerID+"&WorldID="+WorldID+"&WorldName="+WorldName+"&AllianceID="+AllianceID+"&AllianceName="+AllianceName+"&PlayerName="+PlayerName+"&MCVTime="+MCVTime+"&ResearchLeft="+ResearchLeft+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY+"&LayoutReserved="+LayoutReserved+"&CnCOptLink="+CnCOptLink+"&Completed="+Completed+"&BaseCount="+BaseCount;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
        }, this);		
		coords009BtnContainer2.add(coords009Button2);
		CnCOpt009BtnContainer2.add(cncopt009Button2);
		LayoutBtnContainer2.add(layoutButton2);
		Claim009BtnContainer2.add(Claim009Button2);
	
		box2.add((coords009BtnContainer2), {row: y2, column: 0 });
		box2.add((LayoutBtnContainer2), {row: y2, column: 1 });        
        box2.add((CnCOpt009BtnContainer2), {row: y2, column: 2 });
		box2.add((Claim009BtnContainer2), {row: y2, column: 3 });
				if (ad_priv == true){
				var del009BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del009Button2 = new qx.ui.form.Button("Delete", "");
				del009Button2.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs2009b;
					var CoordsY = Ys2009b;
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delFreeRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del009BtnContainer2.add(del009Button2);
				box2.add((del009BtnContainer2), {row: y2, column: 4 });
			}
		break;
		case 10:
		var Xs2010 = X2[10];
		var Ys2010 = Y2[10];
		var Xs2010b = X2int[10];
		var Ys2010b = Y2int[10];
		
		var rtCnCOptlink2010 = rtCnCOptlink2[10];
		
		var coords010BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		
		var CnCOpt010BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));

		var Claim010BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		

		var coords010Button2 = new qx.ui.form.Button("  " + CoordsJoined2 + "  ", "");
		var cncopt010Button2 = new qx.ui.form.Button("    CnCOpt    ", "");	
		var Claim010Button2 = new qx.ui.form.Button("    Claim it    ", "");
		
        coords010Button2.addListener("click", function() {
			ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs2010,Ys2010);
        }, this);
		
        cncopt010Button2.addListener("click", function() {
			window.open(rtCnCOptlink2010,'_blank');
        }, this);

        Claim010Button2.addListener("click", function() {
			var LayoutReserved = ReservedLayout2[10];
			var CnCOptLink = rtCnCOptlink2010;
			

					var CoordsX = Xs2010b;
					var CoordsY = Ys2010b;

					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
					var params = "functionname=ClaimLayoutRecord&PlayerID="+PlayerID+"&WorldID="+WorldID+"&WorldName="+WorldName+"&AllianceID="+AllianceID+"&AllianceName="+AllianceName+"&PlayerName="+PlayerName+"&MCVTime="+MCVTime+"&ResearchLeft="+ResearchLeft+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY+"&LayoutReserved="+LayoutReserved+"&CnCOptLink="+CnCOptLink+"&Completed="+Completed+"&BaseCount="+BaseCount;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
        }, this);		
		coords010BtnContainer2.add(coords010Button2);
		CnCOpt010BtnContainer2.add(cncopt010Button2);
		LayoutBtnContainer2.add(layoutButton2);
		Claim010BtnContainer2.add(Claim010Button2);
	
		box2.add((coords010BtnContainer2), {row: y2, column: 0 });
		box2.add((LayoutBtnContainer2), {row: y2, column: 1 });        
        box2.add((CnCOpt010BtnContainer2), {row: y2, column: 2 });
		box2.add((Claim010BtnContainer2), {row: y2, column: 3 });
				if (ad_priv == true){
				var del010BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del010Button2 = new qx.ui.form.Button("Delete", "");
				del010Button2.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs2010b;
					var CoordsY = Ys2010b;
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delFreeRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del010BtnContainer2.add(del010Button2);
				box2.add((del010BtnContainer2), {row: y2, column: 4 });
			}
		break;
		case 11:
		var Xs2011 = X2[11];
		var Ys2011 = Y2[11];
		var Xs2011b = X2int[11];
		var Ys2011b = Y2int[11];
		
		var rtCnCOptlink2011 = rtCnCOptlink2[11];
		
		var coords011BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		
		var CnCOpt011BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));

		var Claim011BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		

		var coords011Button2 = new qx.ui.form.Button("  " + CoordsJoined2 + "  ", "");
		var cncopt011Button2 = new qx.ui.form.Button("    CnCOpt    ", "");	
		var Claim011Button2 = new qx.ui.form.Button("    Claim it    ", "");
		
        coords011Button2.addListener("click", function() {
			ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs2011,Ys2011);
        }, this);
		
        cncopt011Button2.addListener("click", function() {
			window.open(rtCnCOptlink2011,'_blank');
        }, this);

        Claim011Button2.addListener("click", function() {
			var LayoutReserved = ReservedLayout2[11];
			var CnCOptLink = rtCnCOptlink2011;
			

					var CoordsX = Xs2011b;
					var CoordsY = Ys2011b;

					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
					var params = "functionname=ClaimLayoutRecord&PlayerID="+PlayerID+"&WorldID="+WorldID+"&WorldName="+WorldName+"&AllianceID="+AllianceID+"&AllianceName="+AllianceName+"&PlayerName="+PlayerName+"&MCVTime="+MCVTime+"&ResearchLeft="+ResearchLeft+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY+"&LayoutReserved="+LayoutReserved+"&CnCOptLink="+CnCOptLink+"&Completed="+Completed+"&BaseCount="+BaseCount;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
        }, this);		
		coords011BtnContainer2.add(coords011Button2);
		CnCOpt011BtnContainer2.add(cncopt011Button2);
		LayoutBtnContainer2.add(layoutButton2);
		Claim011BtnContainer2.add(Claim011Button2);
	
		box2.add((coords011BtnContainer2), {row: y2, column: 0 });
		box2.add((LayoutBtnContainer2), {row: y2, column: 1 });        
        box2.add((CnCOpt011BtnContainer2), {row: y2, column: 2 });
		box2.add((Claim011BtnContainer2), {row: y2, column: 3 });
				if (ad_priv == true){
				var del011BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del011Button2 = new qx.ui.form.Button("Delete", "");
				del011Button2.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs2011b;
					var CoordsY = Ys2011b;
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delFreeRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del011BtnContainer2.add(del011Button2);
				box2.add((del011BtnContainer2), {row: y2, column: 4 });
			}
		break;
		case 12:
		var Xs2012 = X2[12];
		var Ys2012 = Y2[12];
		var Xs2012b = X2int[12];
		var Ys2012b = Y2int[12];
		
		var rtCnCOptlink2012 = rtCnCOptlink2[12];
		
		var coords012BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		
		var CnCOpt012BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));

		var Claim012BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		

		var coords012Button2 = new qx.ui.form.Button("  " + CoordsJoined2 + "  ", "");
		var cncopt012Button2 = new qx.ui.form.Button("    CnCOpt    ", "");	
		var Claim012Button2 = new qx.ui.form.Button("    Claim it    ", "");
		
        coords012Button2.addListener("click", function() {
			ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs2012,Ys2012);
        }, this);
		
        cncopt012Button2.addListener("click", function() {
			window.open(rtCnCOptlink2012,'_blank');
        }, this);

        Claim012Button2.addListener("click", function() {
			var LayoutReserved = ReservedLayout2[12];
			var CnCOptLink = rtCnCOptlink2012;
			

					var CoordsX = Xs2012b;
					var CoordsY = Ys2012b;

					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
					var params = "functionname=ClaimLayoutRecord&PlayerID="+PlayerID+"&WorldID="+WorldID+"&WorldName="+WorldName+"&AllianceID="+AllianceID+"&AllianceName="+AllianceName+"&PlayerName="+PlayerName+"&MCVTime="+MCVTime+"&ResearchLeft="+ResearchLeft+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY+"&LayoutReserved="+LayoutReserved+"&CnCOptLink="+CnCOptLink+"&Completed="+Completed+"&BaseCount="+BaseCount;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
        }, this);		
		coords012BtnContainer2.add(coords012Button2);
		CnCOpt012BtnContainer2.add(cncopt012Button2);
		LayoutBtnContainer2.add(layoutButton2);
		Claim012BtnContainer2.add(Claim012Button2);
	
		box2.add((coords012BtnContainer2), {row: y2, column: 0 });
		box2.add((LayoutBtnContainer2), {row: y2, column: 1 });        
        box2.add((CnCOpt012BtnContainer2), {row: y2, column: 2 });
		box2.add((Claim012BtnContainer2), {row: y2, column: 3 });
				if (ad_priv == true){
				var del012BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del012Button2 = new qx.ui.form.Button("Delete", "");
				del012Button2.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs2012b;
					var CoordsY = Ys2012b;
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delFreeRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del012BtnContainer2.add(del012Button2);
				box2.add((del012BtnContainer2), {row: y2, column: 4 });
			}
		break;
		case 13:
		var Xs2013 = X2[13];
		var Ys2013 = Y2[13];
		var Xs2013b = X2int[13];
		var Ys2013b = Y2int[13];
		
		var rtCnCOptlink2013 = rtCnCOptlink2[13];
		
		var coords013BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		
		var CnCOpt013BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));

		var Claim013BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		

		var coords013Button2 = new qx.ui.form.Button("  " + CoordsJoined2 + "  ", "");
		var cncopt013Button2 = new qx.ui.form.Button("    CnCOpt    ", "");	
		var Claim013Button2 = new qx.ui.form.Button("    Claim it    ", "");
		
        coords013Button2.addListener("click", function() {
			ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs2013,Ys2013);
        }, this);
		
        cncopt013Button2.addListener("click", function() {
			window.open(rtCnCOptlink2013,'_blank');
        }, this);

        Claim013Button2.addListener("click", function() {
			var LayoutReserved = ReservedLayout2[13];
			var CnCOptLink = rtCnCOptlink2013;
			

					var CoordsX = Xs2013b;
					var CoordsY = Ys2013b;

					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
					var params = "functionname=ClaimLayoutRecord&PlayerID="+PlayerID+"&WorldID="+WorldID+"&WorldName="+WorldName+"&AllianceID="+AllianceID+"&AllianceName="+AllianceName+"&PlayerName="+PlayerName+"&MCVTime="+MCVTime+"&ResearchLeft="+ResearchLeft+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY+"&LayoutReserved="+LayoutReserved+"&CnCOptLink="+CnCOptLink+"&Completed="+Completed+"&BaseCount="+BaseCount;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
        }, this);		
		coords013BtnContainer2.add(coords013Button2);
		CnCOpt013BtnContainer2.add(cncopt013Button2);
		LayoutBtnContainer2.add(layoutButton2);
		Claim013BtnContainer2.add(Claim013Button2);
	
		box2.add((coords013BtnContainer2), {row: y2, column: 0 });
		box2.add((LayoutBtnContainer2), {row: y2, column: 1 });        
        box2.add((CnCOpt013BtnContainer2), {row: y2, column: 2 });
		box2.add((Claim013BtnContainer2), {row: y2, column: 3 });
				if (ad_priv == true){
				var del013BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del013Button2 = new qx.ui.form.Button("Delete", "");
				del013Button2.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs2013b;
					var CoordsY = Ys2013b;
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delFreeRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del013BtnContainer2.add(del013Button2);
				box2.add((del013BtnContainer2), {row: y2, column: 4 });
			}
		break;
		case 14:
		var Xs2014 = X2[14];
		var Ys2014 = Y2[14];
		var Xs2014b = X2int[14];
		var Ys2014b = Y2int[14];
		
		var rtCnCOptlink2014 = rtCnCOptlink2[14];
		
		var coords014BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		
		var CnCOpt014BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));

		var Claim014BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		

		var coords014Button2 = new qx.ui.form.Button("  " + CoordsJoined2 + "  ", "");
		var cncopt014Button2 = new qx.ui.form.Button("    CnCOpt    ", "");	
		var Claim014Button2 = new qx.ui.form.Button("    Claim it    ", "");
		
        coords014Button2.addListener("click", function() {
			ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs2014,Ys2014);
        }, this);
		
        cncopt014Button2.addListener("click", function() {
			window.open(rtCnCOptlink2014,'_blank');
        }, this);

        Claim014Button2.addListener("click", function() {
			var LayoutReserved = ReservedLayout2[14];
			var CnCOptLink = rtCnCOptlink2014;
			

					var CoordsX = Xs2014b;
					var CoordsY = Ys2014b;

					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
					var params = "functionname=ClaimLayoutRecord&PlayerID="+PlayerID+"&WorldID="+WorldID+"&WorldName="+WorldName+"&AllianceID="+AllianceID+"&AllianceName="+AllianceName+"&PlayerName="+PlayerName+"&MCVTime="+MCVTime+"&ResearchLeft="+ResearchLeft+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY+"&LayoutReserved="+LayoutReserved+"&CnCOptLink="+CnCOptLink+"&Completed="+Completed+"&BaseCount="+BaseCount;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
        }, this);		
		coords014BtnContainer2.add(coords014Button2);
		CnCOpt014BtnContainer2.add(cncopt014Button2);
		LayoutBtnContainer2.add(layoutButton2);
		Claim014BtnContainer2.add(Claim014Button2);
	
		box2.add((coords014BtnContainer2), {row: y2, column: 0 });
		box2.add((LayoutBtnContainer2), {row: y2, column: 1 });        
        box2.add((CnCOpt014BtnContainer2), {row: y2, column: 2 });
		box2.add((Claim014BtnContainer2), {row: y2, column: 3 });
				if (ad_priv == true){
				var del014BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del014Button2 = new qx.ui.form.Button("Delete", "");
				del014Button2.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs2014b;
					var CoordsY = Ys2014b;
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delFreeRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del014BtnContainer2.add(del014Button2);
				box2.add((del014BtnContainer2), {row: y2, column: 4 });
			}
		break;
		case 15:
		var Xs2015 = X2[15];
		var Ys2015 = Y2[15];
		var Xs2015b = X2int[15];
		var Ys2015b = Y2int[15];
		
		var rtCnCOptlink2015 = rtCnCOptlink2[15];
		
		var coords015BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		
		var CnCOpt015BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));

		var Claim015BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		

		var coords015Button2 = new qx.ui.form.Button("  " + CoordsJoined2 + "  ", "");
		var cncopt015Button2 = new qx.ui.form.Button("    CnCOpt    ", "");	
		var Claim015Button2 = new qx.ui.form.Button("    Claim it    ", "");
		
        coords015Button2.addListener("click", function() {
			ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs2015,Ys2015);
        }, this);
		
        cncopt015Button2.addListener("click", function() {
			window.open(rtCnCOptlink2015,'_blank');
        }, this);

        Claim015Button2.addListener("click", function() {
			var LayoutReserved = ReservedLayout2[15];
			var CnCOptLink = rtCnCOptlink2015;
			

					var CoordsX = Xs2015b;
					var CoordsY = Ys2015b;

					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
					var params = "functionname=ClaimLayoutRecord&PlayerID="+PlayerID+"&WorldID="+WorldID+"&WorldName="+WorldName+"&AllianceID="+AllianceID+"&AllianceName="+AllianceName+"&PlayerName="+PlayerName+"&MCVTime="+MCVTime+"&ResearchLeft="+ResearchLeft+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY+"&LayoutReserved="+LayoutReserved+"&CnCOptLink="+CnCOptLink+"&Completed="+Completed+"&BaseCount="+BaseCount;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
        }, this);		
		coords015BtnContainer2.add(coords015Button2);
		CnCOpt015BtnContainer2.add(cncopt015Button2);
		LayoutBtnContainer2.add(layoutButton2);
		Claim015BtnContainer2.add(Claim015Button2);
	
		box2.add((coords015BtnContainer2), {row: y2, column: 0 });
		box2.add((LayoutBtnContainer2), {row: y2, column: 1 });        
        box2.add((CnCOpt015BtnContainer2), {row: y2, column: 2 });
		box2.add((Claim015BtnContainer2), {row: y2, column: 3 });
				if (ad_priv == true){
				var del015BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del015Button2 = new qx.ui.form.Button("Delete", "");
				del015Button2.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs2015b;
					var CoordsY = Ys2015b;
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delFreeRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del015BtnContainer2.add(del015Button2);
				box2.add((del015BtnContainer2), {row: y2, column: 4 });
			}
		break;
		case 16:
		var Xs2016 = X2[16];
		var Ys2016 = Y2[16];
		var Xs2016b = X2int[16];
		var Ys2016b = Y2int[16];
		
		var rtCnCOptlink2016 = rtCnCOptlink2[16];
		
		var coords016BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		
		var CnCOpt016BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));

		var Claim016BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		

		var coords016Button2 = new qx.ui.form.Button("  " + CoordsJoined2 + "  ", "");
		var cncopt016Button2 = new qx.ui.form.Button("    CnCOpt    ", "");	
		var Claim016Button2 = new qx.ui.form.Button("    Claim it    ", "");
		
        coords016Button2.addListener("click", function() {
			ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs2016,Ys2016);
        }, this);
		
        cncopt016Button2.addListener("click", function() {
			window.open(rtCnCOptlink2016,'_blank');
        }, this);

        Claim016Button2.addListener("click", function() {
			var LayoutReserved = ReservedLayout2[16];
			var CnCOptLink = rtCnCOptlink2016;
			

					var CoordsX = Xs2016b;
					var CoordsY = Ys2016b;

					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
					var params = "functionname=ClaimLayoutRecord&PlayerID="+PlayerID+"&WorldID="+WorldID+"&WorldName="+WorldName+"&AllianceID="+AllianceID+"&AllianceName="+AllianceName+"&PlayerName="+PlayerName+"&MCVTime="+MCVTime+"&ResearchLeft="+ResearchLeft+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY+"&LayoutReserved="+LayoutReserved+"&CnCOptLink="+CnCOptLink+"&Completed="+Completed+"&BaseCount="+BaseCount;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
        }, this);		
		coords016BtnContainer2.add(coords016Button2);
		CnCOpt016BtnContainer2.add(cncopt016Button2);
		LayoutBtnContainer2.add(layoutButton2);
		Claim016BtnContainer2.add(Claim016Button2);
	
		box2.add((coords016BtnContainer2), {row: y2, column: 0 });
		box2.add((LayoutBtnContainer2), {row: y2, column: 1 });        
        box2.add((CnCOpt016BtnContainer2), {row: y2, column: 2 });
		box2.add((Claim016BtnContainer2), {row: y2, column: 3 });
				if (ad_priv == true){
				var del016BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del016Button2 = new qx.ui.form.Button("Delete", "");
				del016Button2.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs2016b;
					var CoordsY = Ys2016b;
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delFreeRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del016BtnContainer2.add(del016Button2);
				box2.add((del016BtnContainer2), {row: y2, column: 4 });
			}
		break;
		case 17:
		var Xs2017 = X2[17];
		var Ys2017 = Y2[17];
		var Xs2017b = X2int[17];
		var Ys2017b = Y2int[17];
		
		var rtCnCOptlink2017 = rtCnCOptlink2[17];
		
		var coords017BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		
		var CnCOpt017BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));

		var Claim017BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		

		var coords017Button2 = new qx.ui.form.Button("  " + CoordsJoined2 + "  ", "");
		var cncopt017Button2 = new qx.ui.form.Button("    CnCOpt    ", "");	
		var Claim017Button2 = new qx.ui.form.Button("    Claim it    ", "");
		
        coords017Button2.addListener("click", function() {
			ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs2017,Ys2017);
        }, this);
		
        cncopt017Button2.addListener("click", function() {
			window.open(rtCnCOptlink2017,'_blank');
        }, this);

        Claim017Button2.addListener("click", function() {
			var LayoutReserved = ReservedLayout2[17];
			var CnCOptLink = rtCnCOptlink2017;
			

					var CoordsX = Xs2017b;
					var CoordsY = Ys2017b;

					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
					var params = "functionname=ClaimLayoutRecord&PlayerID="+PlayerID+"&WorldID="+WorldID+"&WorldName="+WorldName+"&AllianceID="+AllianceID+"&AllianceName="+AllianceName+"&PlayerName="+PlayerName+"&MCVTime="+MCVTime+"&ResearchLeft="+ResearchLeft+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY+"&LayoutReserved="+LayoutReserved+"&CnCOptLink="+CnCOptLink+"&Completed="+Completed+"&BaseCount="+BaseCount;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
        }, this);		
		coords017BtnContainer2.add(coords017Button2);
		CnCOpt017BtnContainer2.add(cncopt017Button2);
		LayoutBtnContainer2.add(layoutButton2);
		Claim017BtnContainer2.add(Claim017Button2);
	
		box2.add((coords017BtnContainer2), {row: y2, column: 0 });
		box2.add((LayoutBtnContainer2), {row: y2, column: 1 });        
        box2.add((CnCOpt017BtnContainer2), {row: y2, column: 2 });
		box2.add((Claim017BtnContainer2), {row: y2, column: 3 });
				if (ad_priv == true){
				var del017BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del017Button2 = new qx.ui.form.Button("Delete", "");
				del017Button2.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs2017b;
					var CoordsY = Ys2017b;
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delFreeRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del017BtnContainer2.add(del017Button2);
				box2.add((del017BtnContainer2), {row: y2, column: 4 });
			}
		break;
		case 18:
		var Xs2018 = X2[18];
		var Ys2018 = Y2[18];
		var Xs2018b = X2int[18];
		var Ys2018b = Y2int[18];
		
		var rtCnCOptlink2018 = rtCnCOptlink2[18];
		
		var coords018BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		
		var CnCOpt018BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));

		var Claim018BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		

		var coords018Button2 = new qx.ui.form.Button("  " + CoordsJoined2 + "  ", "");
		var cncopt018Button2 = new qx.ui.form.Button("    CnCOpt    ", "");	
		var Claim018Button2 = new qx.ui.form.Button("    Claim it    ", "");
		
        coords018Button2.addListener("click", function() {
			ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs2018,Ys2018);
        }, this);
		
        cncopt018Button2.addListener("click", function() {
			window.open(rtCnCOptlink2018,'_blank');
        }, this);

        Claim018Button2.addListener("click", function() {
			var LayoutReserved = ReservedLayout2[18];
			var CnCOptLink = rtCnCOptlink2018;
			

					var CoordsX = Xs2018b;
					var CoordsY = Ys2018b;

					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
					var params = "functionname=ClaimLayoutRecord&PlayerID="+PlayerID+"&WorldID="+WorldID+"&WorldName="+WorldName+"&AllianceID="+AllianceID+"&AllianceName="+AllianceName+"&PlayerName="+PlayerName+"&MCVTime="+MCVTime+"&ResearchLeft="+ResearchLeft+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY+"&LayoutReserved="+LayoutReserved+"&CnCOptLink="+CnCOptLink+"&Completed="+Completed+"&BaseCount="+BaseCount;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
        }, this);		
		coords018BtnContainer2.add(coords018Button2);
		CnCOpt018BtnContainer2.add(cncopt018Button2);
		LayoutBtnContainer2.add(layoutButton2);
		Claim018BtnContainer2.add(Claim018Button2);
	
		box2.add((coords018BtnContainer2), {row: y2, column: 0 });
		box2.add((LayoutBtnContainer2), {row: y2, column: 1 });        
        box2.add((CnCOpt018BtnContainer2), {row: y2, column: 2 });
		box2.add((Claim018BtnContainer2), {row: y2, column: 3 });
				if (ad_priv == true){
				var del018BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del018Button2 = new qx.ui.form.Button("Delete", "");
				del018Button2.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs2018b;
					var CoordsY = Ys2018b;
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delFreeRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del018BtnContainer2.add(del018Button2);
				box2.add((del018BtnContainer2), {row: y2, column: 4 });
			}
		break;
		case 19:
		var Xs2019 = X2[19];
		var Ys2019 = Y2[19];
		var Xs2019b = X2int[19];
		var Ys2019b = Y2int[19];
		
		var rtCnCOptlink2019 = rtCnCOptlink2[19];
		
		var coords019BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		
		var CnCOpt019BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));

		var Claim019BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		

		var coords019Button2 = new qx.ui.form.Button("  " + CoordsJoined2 + "  ", "");
		var cncopt019Button2 = new qx.ui.form.Button("    CnCOpt    ", "");	
		var Claim019Button2 = new qx.ui.form.Button("    Claim it    ", "");
		
        coords019Button2.addListener("click", function() {
			ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs2019,Ys2019);
        }, this);
		
        cncopt019Button2.addListener("click", function() {
			window.open(rtCnCOptlink2019,'_blank');
        }, this);

        Claim019Button2.addListener("click", function() {
			var LayoutReserved = ReservedLayout2[19];
			var CnCOptLink = rtCnCOptlink2019;
			

					var CoordsX = Xs2019b;
					var CoordsY = Ys2019b;

					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
					var params = "functionname=ClaimLayoutRecord&PlayerID="+PlayerID+"&WorldID="+WorldID+"&WorldName="+WorldName+"&AllianceID="+AllianceID+"&AllianceName="+AllianceName+"&PlayerName="+PlayerName+"&MCVTime="+MCVTime+"&ResearchLeft="+ResearchLeft+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY+"&LayoutReserved="+LayoutReserved+"&CnCOptLink="+CnCOptLink+"&Completed="+Completed+"&BaseCount="+BaseCount;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
        }, this);		
		coords019BtnContainer2.add(coords019Button2);
		CnCOpt019BtnContainer2.add(cncopt019Button2);
		LayoutBtnContainer2.add(layoutButton2);
		Claim019BtnContainer2.add(Claim019Button2);
	
		box2.add((coords019BtnContainer2), {row: y2, column: 0 });
		box2.add((LayoutBtnContainer2), {row: y2, column: 1 });        
        box2.add((CnCOpt019BtnContainer2), {row: y2, column: 2 });
		box2.add((Claim019BtnContainer2), {row: y2, column: 3 });
				if (ad_priv == true){
				var del019BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del019Button2 = new qx.ui.form.Button("Delete", "");
				del019Button2.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs2019b;
					var CoordsY = Ys2019b;
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delFreeRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del019BtnContainer2.add(del019Button2);
				box2.add((del019BtnContainer2), {row: y2, column: 4 });
			}
		break;
		case 20:
		var Xs2020 = X2[20];
		var Ys2020 = Y2[20];
		var Xs2020b = X2int[20];
		var Ys2020b = Y2int[20];
		
		var rtCnCOptlink2020 = rtCnCOptlink2[20];
		
		var coords020BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		
		var CnCOpt020BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));

		var Claim020BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		

		var coords020Button2 = new qx.ui.form.Button("  " + CoordsJoined2 + "  ", "");
		var cncopt020Button2 = new qx.ui.form.Button("    CnCOpt    ", "");	
		var Claim020Button2 = new qx.ui.form.Button("    Claim it    ", "");
		
        coords020Button2.addListener("click", function() {
			ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs2020,Ys2020);
        }, this);
		
        cncopt020Button2.addListener("click", function() {
			window.open(rtCnCOptlink2020,'_blank');
        }, this);

        Claim020Button2.addListener("click", function() {
			var LayoutReserved = ReservedLayout2[20];
			var CnCOptLink = rtCnCOptlink2020;
			

					var CoordsX = Xs2020b;
					var CoordsY = Ys2020b;

					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
					var params = "functionname=ClaimLayoutRecord&PlayerID="+PlayerID+"&WorldID="+WorldID+"&WorldName="+WorldName+"&AllianceID="+AllianceID+"&AllianceName="+AllianceName+"&PlayerName="+PlayerName+"&MCVTime="+MCVTime+"&ResearchLeft="+ResearchLeft+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY+"&LayoutReserved="+LayoutReserved+"&CnCOptLink="+CnCOptLink+"&Completed="+Completed+"&BaseCount="+BaseCount;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
        }, this);		
		coords020BtnContainer2.add(coords020Button2);
		CnCOpt020BtnContainer2.add(cncopt020Button2);
		LayoutBtnContainer2.add(layoutButton2);
		Claim020BtnContainer2.add(Claim020Button2);
	
		box2.add((coords020BtnContainer2), {row: y2, column: 0 });
		box2.add((LayoutBtnContainer2), {row: y2, column: 1 });        
        box2.add((CnCOpt020BtnContainer2), {row: y2, column: 2 });
		box2.add((Claim020BtnContainer2), {row: y2, column: 3 });
				if (ad_priv == true){
				var del020BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del020Button2 = new qx.ui.form.Button("Delete", "");
				del020Button2.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs2020b;
					var CoordsY = Ys2020b;
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delFreeRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del020BtnContainer2.add(del020Button2);
				box2.add((del020BtnContainer2), {row: y2, column: 4 });
			}
		break;
		case 21:
		var Xs2021 = X2[21];
		var Ys2021 = Y2[21];
		var Xs2021b = X2int[21];
		var Ys2021b = Y2int[21];
		
		var rtCnCOptlink2021 = rtCnCOptlink2[21];
		
		var coords021BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		
		var CnCOpt021BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));

		var Claim021BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		

		var coords021Button2 = new qx.ui.form.Button("  " + CoordsJoined2 + "  ", "");
		var cncopt021Button2 = new qx.ui.form.Button("    CnCOpt    ", "");	
		var Claim021Button2 = new qx.ui.form.Button("    Claim it    ", "");
		
        coords021Button2.addListener("click", function() {
			ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs2021,Ys2021);
        }, this);
		
        cncopt021Button2.addListener("click", function() {
			window.open(rtCnCOptlink2021,'_blank');
        }, this);

        Claim021Button2.addListener("click", function() {
			var LayoutReserved = ReservedLayout2[21];
			var CnCOptLink = rtCnCOptlink2021;
			

					var CoordsX = Xs2021b;
					var CoordsY = Ys2021b;

					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
					var params = "functionname=ClaimLayoutRecord&PlayerID="+PlayerID+"&WorldID="+WorldID+"&WorldName="+WorldName+"&AllianceID="+AllianceID+"&AllianceName="+AllianceName+"&PlayerName="+PlayerName+"&MCVTime="+MCVTime+"&ResearchLeft="+ResearchLeft+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY+"&LayoutReserved="+LayoutReserved+"&CnCOptLink="+CnCOptLink+"&Completed="+Completed+"&BaseCount="+BaseCount;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
        }, this);		
		coords021BtnContainer2.add(coords021Button2);
		CnCOpt021BtnContainer2.add(cncopt021Button2);
		LayoutBtnContainer2.add(layoutButton2);
		Claim021BtnContainer2.add(Claim021Button2);
	
		box2.add((coords021BtnContainer2), {row: y2, column: 0 });
		box2.add((LayoutBtnContainer2), {row: y2, column: 1 });        
        box2.add((CnCOpt021BtnContainer2), {row: y2, column: 2 });
		box2.add((Claim021BtnContainer2), {row: y2, column: 3 });
				if (ad_priv == true){
				var del021BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del021Button2 = new qx.ui.form.Button("Delete", "");
				del021Button2.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs2021b;
					var CoordsY = Ys2021b;
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delFreeRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del021BtnContainer2.add(del021Button2);
				box2.add((del021BtnContainer2), {row: y2, column: 4 });
			}
		break;
		case 22:
		var Xs2022 = X2[22];
		var Ys2022 = Y2[22];
		var Xs2022b = X2int[22];
		var Ys2022b = Y2int[22];
		
		var rtCnCOptlink2022 = rtCnCOptlink2[22];
		
		var coords022BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		
		var CnCOpt022BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));

		var Claim022BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		

		var coords022Button2 = new qx.ui.form.Button("  " + CoordsJoined2 + "  ", "");
		var cncopt022Button2 = new qx.ui.form.Button("    CnCOpt    ", "");	
		var Claim022Button2 = new qx.ui.form.Button("    Claim it    ", "");
		
        coords022Button2.addListener("click", function() {
			ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs2022,Ys2022);
        }, this);
		
        cncopt022Button2.addListener("click", function() {
			window.open(rtCnCOptlink2022,'_blank');
        }, this);

        Claim022Button2.addListener("click", function() {
			var LayoutReserved = ReservedLayout2[22];
			var CnCOptLink = rtCnCOptlink2022;
			

					var CoordsX = Xs2022b;
					var CoordsY = Ys2022b;

					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
					var params = "functionname=ClaimLayoutRecord&PlayerID="+PlayerID+"&WorldID="+WorldID+"&WorldName="+WorldName+"&AllianceID="+AllianceID+"&AllianceName="+AllianceName+"&PlayerName="+PlayerName+"&MCVTime="+MCVTime+"&ResearchLeft="+ResearchLeft+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY+"&LayoutReserved="+LayoutReserved+"&CnCOptLink="+CnCOptLink+"&Completed="+Completed+"&BaseCount="+BaseCount;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
        }, this);		
		coords022BtnContainer2.add(coords022Button2);
		CnCOpt022BtnContainer2.add(cncopt022Button2);
		LayoutBtnContainer2.add(layoutButton2);
		Claim022BtnContainer2.add(Claim022Button2);
	
		box2.add((coords022BtnContainer2), {row: y2, column: 0 });
		box2.add((LayoutBtnContainer2), {row: y2, column: 1 });        
        box2.add((CnCOpt022BtnContainer2), {row: y2, column: 2 });
		box2.add((Claim022BtnContainer2), {row: y2, column: 3 });
				if (ad_priv == true){
				var del022BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del022Button2 = new qx.ui.form.Button("Delete", "");
				del022Button2.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs2022b;
					var CoordsY = Ys2022b;
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delFreeRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del022BtnContainer2.add(del022Button2);
				box2.add((del022BtnContainer2), {row: y2, column: 4 });
			}
		break;
		case 23:
		var Xs2023 = X2[23];
		var Ys2023 = Y2[23];
		var Xs2023b = X2int[23];
		var Ys2023b = Y2int[23];
		
		var rtCnCOptlink2023 = rtCnCOptlink2[23];
		
		var coords023BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		
		var CnCOpt023BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));

		var Claim023BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		

		var coords023Button2 = new qx.ui.form.Button("  " + CoordsJoined2 + "  ", "");
		var cncopt023Button2 = new qx.ui.form.Button("    CnCOpt    ", "");	
		var Claim023Button2 = new qx.ui.form.Button("    Claim it    ", "");
		
        coords023Button2.addListener("click", function() {
			ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs2023,Ys2023);
        }, this);
		
        cncopt023Button2.addListener("click", function() {
			window.open(rtCnCOptlink2023,'_blank');
        }, this);

        Claim023Button2.addListener("click", function() {
			var LayoutReserved = ReservedLayout2[23];
			var CnCOptLink = rtCnCOptlink2023;
			

					var CoordsX = Xs2023b;
					var CoordsY = Ys2023b;

					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
					var params = "functionname=ClaimLayoutRecord&PlayerID="+PlayerID+"&WorldID="+WorldID+"&WorldName="+WorldName+"&AllianceID="+AllianceID+"&AllianceName="+AllianceName+"&PlayerName="+PlayerName+"&MCVTime="+MCVTime+"&ResearchLeft="+ResearchLeft+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY+"&LayoutReserved="+LayoutReserved+"&CnCOptLink="+CnCOptLink+"&Completed="+Completed+"&BaseCount="+BaseCount;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
        }, this);		
		coords023BtnContainer2.add(coords023Button2);
		CnCOpt023BtnContainer2.add(cncopt023Button2);
		LayoutBtnContainer2.add(layoutButton2);
		Claim023BtnContainer2.add(Claim023Button2);
	
		box2.add((coords023BtnContainer2), {row: y2, column: 0 });
		box2.add((LayoutBtnContainer2), {row: y2, column: 1 });        
        box2.add((CnCOpt023BtnContainer2), {row: y2, column: 2 });
		box2.add((Claim023BtnContainer2), {row: y2, column: 3 });
				if (ad_priv == true){
				var del023BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del023Button2 = new qx.ui.form.Button("Delete", "");
				del023Button2.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs2023b;
					var CoordsY = Ys2023b;
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delFreeRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del023BtnContainer2.add(del023Button2);
				box2.add((del023BtnContainer2), {row: y2, column: 4 });
			}
		break;
		case 24:
		var Xs2024 = X2[24];
		var Ys2024 = Y2[24];
		var Xs2024b = X2int[24];
		var Ys2024b = Y2int[24];
		
		var rtCnCOptlink2024 = rtCnCOptlink2[24];
		
		var coords024BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		
		var CnCOpt024BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));

		var Claim024BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		

		var coords024Button2 = new qx.ui.form.Button("  " + CoordsJoined2 + "  ", "");
		var cncopt024Button2 = new qx.ui.form.Button("    CnCOpt    ", "");	
		var Claim024Button2 = new qx.ui.form.Button("    Claim it    ", "");
		
        coords024Button2.addListener("click", function() {
			ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs2024,Ys2024);
        }, this);
		
        cncopt024Button2.addListener("click", function() {
			window.open(rtCnCOptlink2024,'_blank');
        }, this);

        Claim024Button2.addListener("click", function() {
			var LayoutReserved = ReservedLayout2[24];
			var CnCOptLink = rtCnCOptlink2024;
			

					var CoordsX = Xs2024b;
					var CoordsY = Ys2024b;

					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
					var params = "functionname=ClaimLayoutRecord&PlayerID="+PlayerID+"&WorldID="+WorldID+"&WorldName="+WorldName+"&AllianceID="+AllianceID+"&AllianceName="+AllianceName+"&PlayerName="+PlayerName+"&MCVTime="+MCVTime+"&ResearchLeft="+ResearchLeft+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY+"&LayoutReserved="+LayoutReserved+"&CnCOptLink="+CnCOptLink+"&Completed="+Completed+"&BaseCount="+BaseCount;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
        }, this);		
		coords024BtnContainer2.add(coords024Button2);
		CnCOpt024BtnContainer2.add(cncopt024Button2);
		LayoutBtnContainer2.add(layoutButton2);
		Claim024BtnContainer2.add(Claim024Button2);
	
		box2.add((coords024BtnContainer2), {row: y2, column: 0 });
		box2.add((LayoutBtnContainer2), {row: y2, column: 1 });        
        box2.add((CnCOpt024BtnContainer2), {row: y2, column: 2 });
		box2.add((Claim024BtnContainer2), {row: y2, column: 3 });
				if (ad_priv == true){
				var del024BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del024Button2 = new qx.ui.form.Button("Delete", "");
				del024Button2.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs2024b;
					var CoordsY = Ys2024b;
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delFreeRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del024BtnContainer2.add(del024Button2);
				box2.add((del024BtnContainer2), {row: y2, column: 4 });
			}
		break;
		case 25:
		var Xs2025 = X2[25];
		var Ys2025 = Y2[25];
		var Xs2025b = X2int[25];
		var Ys2025b = Y2int[25];
		
		var rtCnCOptlink2025 = rtCnCOptlink2[25];
		
		var coords025BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		
		var CnCOpt025BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));

		var Claim025BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		

		var coords025Button2 = new qx.ui.form.Button("  " + CoordsJoined2 + "  ", "");
		var cncopt025Button2 = new qx.ui.form.Button("    CnCOpt    ", "");	
		var Claim025Button2 = new qx.ui.form.Button("    Claim it    ", "");
		
        coords025Button2.addListener("click", function() {
			ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs2025,Ys2025);
        }, this);
		
        cncopt025Button2.addListener("click", function() {
			window.open(rtCnCOptlink2025,'_blank');
        }, this);

        Claim025Button2.addListener("click", function() {
			var LayoutReserved = ReservedLayout2[25];
			var CnCOptLink = rtCnCOptlink2025;
			

					var CoordsX = Xs2025b;
					var CoordsY = Ys2025b;

					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
					var params = "functionname=ClaimLayoutRecord&PlayerID="+PlayerID+"&WorldID="+WorldID+"&WorldName="+WorldName+"&AllianceID="+AllianceID+"&AllianceName="+AllianceName+"&PlayerName="+PlayerName+"&MCVTime="+MCVTime+"&ResearchLeft="+ResearchLeft+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY+"&LayoutReserved="+LayoutReserved+"&CnCOptLink="+CnCOptLink+"&Completed="+Completed+"&BaseCount="+BaseCount;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
        }, this);		
		coords025BtnContainer2.add(coords025Button2);
		CnCOpt025BtnContainer2.add(cncopt025Button2);
		LayoutBtnContainer2.add(layoutButton2);
		Claim025BtnContainer2.add(Claim025Button2);
	
		box2.add((coords025BtnContainer2), {row: y2, column: 0 });
		box2.add((LayoutBtnContainer2), {row: y2, column: 1 });        
        box2.add((CnCOpt025BtnContainer2), {row: y2, column: 2 });
		box2.add((Claim025BtnContainer2), {row: y2, column: 3 });
				if (ad_priv == true){
				var del025BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del025Button2 = new qx.ui.form.Button("Delete", "");
				del025Button2.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs2025b;
					var CoordsY = Ys2025b;
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delFreeRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del025BtnContainer2.add(del025Button2);
				box2.add((del025BtnContainer2), {row: y2, column: 4 });
			}
		break;
		case 26:
		var Xs2026 = X2[26];
		var Ys2026 = Y2[26];
		var Xs2026b = X2int[26];
		var Ys2026b = Y2int[26];
		
		var rtCnCOptlink2026 = rtCnCOptlink2[26];
		
		var coords026BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		
		var CnCOpt026BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));

		var Claim026BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		

		var coords026Button2 = new qx.ui.form.Button("  " + CoordsJoined2 + "  ", "");
		var cncopt026Button2 = new qx.ui.form.Button("    CnCOpt    ", "");	
		var Claim026Button2 = new qx.ui.form.Button("    Claim it    ", "");
		
        coords026Button2.addListener("click", function() {
			ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs2026,Ys2026);
        }, this);
		
        cncopt026Button2.addListener("click", function() {
			window.open(rtCnCOptlink2026,'_blank');
        }, this);

        Claim026Button2.addListener("click", function() {
			var LayoutReserved = ReservedLayout2[26];
			var CnCOptLink = rtCnCOptlink2026;
			

					var CoordsX = Xs2026b;
					var CoordsY = Ys2026b;

					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
					var params = "functionname=ClaimLayoutRecord&PlayerID="+PlayerID+"&WorldID="+WorldID+"&WorldName="+WorldName+"&AllianceID="+AllianceID+"&AllianceName="+AllianceName+"&PlayerName="+PlayerName+"&MCVTime="+MCVTime+"&ResearchLeft="+ResearchLeft+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY+"&LayoutReserved="+LayoutReserved+"&CnCOptLink="+CnCOptLink+"&Completed="+Completed+"&BaseCount="+BaseCount;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
        }, this);		
		coords026BtnContainer2.add(coords026Button2);
		CnCOpt026BtnContainer2.add(cncopt026Button2);
		LayoutBtnContainer2.add(layoutButton2);
		Claim026BtnContainer2.add(Claim026Button2);
	
		box2.add((coords026BtnContainer2), {row: y2, column: 0 });
		box2.add((LayoutBtnContainer2), {row: y2, column: 1 });        
        box2.add((CnCOpt026BtnContainer2), {row: y2, column: 2 });
		box2.add((Claim026BtnContainer2), {row: y2, column: 3 });
				if (ad_priv == true){
				var del026BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del026Button2 = new qx.ui.form.Button("Delete", "");
				del026Button2.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs2026b;
					var CoordsY = Ys2026b;
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delFreeRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del026BtnContainer2.add(del026Button2);
				box2.add((del026BtnContainer2), {row: y2, column: 4 });
			}
		break;
		case 27:
		var Xs2027 = X2[27];
		var Ys2027 = Y2[27];
		var Xs2027b = X2int[27];
		var Ys2027b = Y2int[27];
		
		var rtCnCOptlink2027 = rtCnCOptlink2[27];
		
		var coords027BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		
		var CnCOpt027BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));

		var Claim027BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		

		var coords027Button2 = new qx.ui.form.Button("  " + CoordsJoined2 + "  ", "");
		var cncopt027Button2 = new qx.ui.form.Button("    CnCOpt    ", "");	
		var Claim027Button2 = new qx.ui.form.Button("    Claim it    ", "");
		
        coords027Button2.addListener("click", function() {
			ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs2027,Ys2027);
        }, this);
		
        cncopt027Button2.addListener("click", function() {
			window.open(rtCnCOptlink2027,'_blank');
        }, this);

        Claim027Button2.addListener("click", function() {
			var LayoutReserved = ReservedLayout2[27];
			var CnCOptLink = rtCnCOptlink2027;
			

					var CoordsX = Xs2027b;
					var CoordsY = Ys2027b;

					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
					var params = "functionname=ClaimLayoutRecord&PlayerID="+PlayerID+"&WorldID="+WorldID+"&WorldName="+WorldName+"&AllianceID="+AllianceID+"&AllianceName="+AllianceName+"&PlayerName="+PlayerName+"&MCVTime="+MCVTime+"&ResearchLeft="+ResearchLeft+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY+"&LayoutReserved="+LayoutReserved+"&CnCOptLink="+CnCOptLink+"&Completed="+Completed+"&BaseCount="+BaseCount;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
        }, this);		
		coords027BtnContainer2.add(coords027Button2);
		CnCOpt027BtnContainer2.add(cncopt027Button2);
		LayoutBtnContainer2.add(layoutButton2);
		Claim027BtnContainer2.add(Claim027Button2);
	
		box2.add((coords027BtnContainer2), {row: y2, column: 0 });
		box2.add((LayoutBtnContainer2), {row: y2, column: 1 });        
        box2.add((CnCOpt027BtnContainer2), {row: y2, column: 2 });
		box2.add((Claim027BtnContainer2), {row: y2, column: 3 });
				if (ad_priv == true){
				var del027BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del027Button2 = new qx.ui.form.Button("Delete", "");
				del027Button2.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs2027b;
					var CoordsY = Ys2027b;
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delFreeRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del027BtnContainer2.add(del027Button2);
				box2.add((del027BtnContainer2), {row: y2, column: 4 });
			}
		break;
		case 28:
		var Xs2028 = X2[28];
		var Ys2028 = Y2[28];
		var Xs2028b = X2int[28];
		var Ys2028b = Y2int[28];
		
		var rtCnCOptlink2028 = rtCnCOptlink2[28];
		
		var coords028BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		
		var CnCOpt028BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));

		var Claim028BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		

		var coords028Button2 = new qx.ui.form.Button("  " + CoordsJoined2 + "  ", "");
		var cncopt028Button2 = new qx.ui.form.Button("    CnCOpt    ", "");	
		var Claim028Button2 = new qx.ui.form.Button("    Claim it    ", "");
		
        coords028Button2.addListener("click", function() {
			ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs2028,Ys2028);
        }, this);
		
        cncopt028Button2.addListener("click", function() {
			window.open(rtCnCOptlink2028,'_blank');
        }, this);

        Claim028Button2.addListener("click", function() {
			var LayoutReserved = ReservedLayout2[28];
			var CnCOptLink = rtCnCOptlink2028;
			

					var CoordsX = Xs2028b;
					var CoordsY = Ys2028b;

					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
					var params = "functionname=ClaimLayoutRecord&PlayerID="+PlayerID+"&WorldID="+WorldID+"&WorldName="+WorldName+"&AllianceID="+AllianceID+"&AllianceName="+AllianceName+"&PlayerName="+PlayerName+"&MCVTime="+MCVTime+"&ResearchLeft="+ResearchLeft+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY+"&LayoutReserved="+LayoutReserved+"&CnCOptLink="+CnCOptLink+"&Completed="+Completed+"&BaseCount="+BaseCount;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
        }, this);		
		coords028BtnContainer2.add(coords028Button2);
		CnCOpt028BtnContainer2.add(cncopt028Button2);
		LayoutBtnContainer2.add(layoutButton2);
		Claim028BtnContainer2.add(Claim028Button2);
	
		box2.add((coords028BtnContainer2), {row: y2, column: 0 });
		box2.add((LayoutBtnContainer2), {row: y2, column: 1 });        
        box2.add((CnCOpt028BtnContainer2), {row: y2, column: 2 });
		box2.add((Claim028BtnContainer2), {row: y2, column: 3 });
				if (ad_priv == true){
				var del028BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del028Button2 = new qx.ui.form.Button("Delete", "");
				del028Button2.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs2028b;
					var CoordsY = Ys2028b;
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delFreeRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del028BtnContainer2.add(del028Button2);
				box2.add((del028BtnContainer2), {row: y2, column: 4 });
			}
		break;
		case 29:
		var Xs2029 = X2[29];
		var Ys2029 = Y2[29];
		var Xs2029b = X2int[29];
		var Ys2029b = Y2int[29];
		
		var rtCnCOptlink2029 = rtCnCOptlink2[29];
		
		var coords029BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		
		var CnCOpt029BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));

		var Claim029BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		

		var coords029Button2 = new qx.ui.form.Button("  " + CoordsJoined2 + "  ", "");
		var cncopt029Button2 = new qx.ui.form.Button("    CnCOpt    ", "");	
		var Claim029Button2 = new qx.ui.form.Button("    Claim it    ", "");
		
        coords029Button2.addListener("click", function() {
			ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs2029,Ys2029);
        }, this);
		
        cncopt029Button2.addListener("click", function() {
			window.open(rtCnCOptlink2029,'_blank');
        }, this);

        Claim029Button2.addListener("click", function() {
			var LayoutReserved = ReservedLayout2[29];
			var CnCOptLink = rtCnCOptlink2029;
			

					var CoordsX = Xs2029b;
					var CoordsY = Ys2029b;

					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
					var params = "functionname=ClaimLayoutRecord&PlayerID="+PlayerID+"&WorldID="+WorldID+"&WorldName="+WorldName+"&AllianceID="+AllianceID+"&AllianceName="+AllianceName+"&PlayerName="+PlayerName+"&MCVTime="+MCVTime+"&ResearchLeft="+ResearchLeft+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY+"&LayoutReserved="+LayoutReserved+"&CnCOptLink="+CnCOptLink+"&Completed="+Completed+"&BaseCount="+BaseCount;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
        }, this);		
		coords029BtnContainer2.add(coords029Button2);
		CnCOpt029BtnContainer2.add(cncopt029Button2);
		LayoutBtnContainer2.add(layoutButton2);
		Claim029BtnContainer2.add(Claim029Button2);
	
		box2.add((coords029BtnContainer2), {row: y2, column: 0 });
		box2.add((LayoutBtnContainer2), {row: y2, column: 1 });        
        box2.add((CnCOpt029BtnContainer2), {row: y2, column: 2 });
		box2.add((Claim029BtnContainer2), {row: y2, column: 3 });
				if (ad_priv == true){
				var del029BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del029Button2 = new qx.ui.form.Button("Delete", "");
				del029Button2.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs2029b;
					var CoordsY = Ys2029b;
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delFreeRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del029BtnContainer2.add(del029Button2);
				box2.add((del029BtnContainer2), {row: y2, column: 4 });
			}
		break;
		case 30:
		var Xs2030 = X2[30];
		var Ys2030 = Y2[30];
		var Xs2030b = X2int[30];
		var Ys2030b = Y2int[30];
		
		var rtCnCOptlink2030 = rtCnCOptlink2[30];
		
		var coords030BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		
		var CnCOpt030BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));

		var Claim030BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
		

		var coords030Button2 = new qx.ui.form.Button("  " + CoordsJoined2 + "  ", "");
		var cncopt030Button2 = new qx.ui.form.Button("    CnCOpt    ", "");	
		var Claim030Button2 = new qx.ui.form.Button("    Claim it    ", "");
		
        coords030Button2.addListener("click", function() {
			ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs2030,Ys2030);
        }, this);
		
        cncopt030Button2.addListener("click", function() {
			window.open(rtCnCOptlink2030,'_blank');
        }, this);

        Claim030Button2.addListener("click", function() {
			var LayoutReserved = ReservedLayout2[30];
			var CnCOptLink = rtCnCOptlink2030;
			

					var CoordsX = Xs2030b;
					var CoordsY = Ys2030b;

					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
					var params = "functionname=ClaimLayoutRecord&PlayerID="+PlayerID+"&WorldID="+WorldID+"&WorldName="+WorldName+"&AllianceID="+AllianceID+"&AllianceName="+AllianceName+"&PlayerName="+PlayerName+"&MCVTime="+MCVTime+"&ResearchLeft="+ResearchLeft+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY+"&LayoutReserved="+LayoutReserved+"&CnCOptLink="+CnCOptLink+"&Completed="+Completed+"&BaseCount="+BaseCount;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
        }, this);		
		coords030BtnContainer2.add(coords030Button2);
		CnCOpt030BtnContainer2.add(cncopt030Button2);
		LayoutBtnContainer2.add(layoutButton2);
		Claim030BtnContainer2.add(Claim030Button2);
	
		box2.add((coords030BtnContainer2), {row: y2, column: 0 });
		box2.add((LayoutBtnContainer2), {row: y2, column: 1 });        
        box2.add((CnCOpt030BtnContainer2), {row: y2, column: 2 });
		box2.add((Claim030BtnContainer2), {row: y2, column: 3 });
				if (ad_priv == true){
				var del030BtnContainer2 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del030Button2 = new qx.ui.form.Button("Delete", "");
				del030Button2.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs2030b;
					var CoordsY = Ys2030b;
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delFreeRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del030BtnContainer2.add(del030Button2);
				box2.add((del030BtnContainer2), {row: y2, column: 4 });
			}
		break;


}

		scrollBox2.add(box2);
		page2.add(scrollBox2);
		
		
		id3 = id3 + 1;
		y2 = y2 + 1;			
	}//==============end page 2
	}, this);

	var btnTab2 = page3.getChildControl("button");
	btnTab2.addListener("click", function() {
	page3._removeAll();
    var box3 = new qx.ui.container.Composite().set({
        decorator: "main",
 //       backgroundColor: "white",
        allowGrowX: false,
        allowGrowY: false
    });	
	
    var layout3 = new qx.ui.layout.Grid();
    layout3.setSpacing(10);
    layout3.setColumnAlign(0, "left", "middle"); //Player
    layout3.setColumnAlign(1, "left", "middle"); //Alliance
    layout3.setColumnAlign(2, "left", "middle"); //coords button
	layout3.setColumnAlign(3, "left", "middle"); //admin delete button
	box3.setLayout(layout3);
        box3.add(new qx.ui.basic.Label('Player').set({
            rich: true,
            maxWidth: 200,
            wrap: false,
            font: 'font_size_15',
            font: 'bold',
            textColor: 'black',
            alignX: 'left'
        }), {row: 0, column: 0 });		
		
        box3.add(new qx.ui.basic.Label('Alliance').set({
            rich: true,
            maxWidth: 200,
            wrap: false,
            font: 'font_size_15',
            font: 'bold',
            textColor: 'black',
            alignX: 'left'
        }), {row: 0, column: 1 });
		
		
        box3.add(new qx.ui.basic.Label('Coords').set({
            rich: true,
            maxWidth: 200,
            wrap: false,
            font: 'font_size_15',
            font: 'bold',
            textColor: 'black',
            alignX: 'left'
        }), {row: 0, column: 2 }); 	
	var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
	var return_data3;
    var xmlhttp3 = new XMLHttpRequest();
    var params3 = "functionname=SatCodeList&WorldID="+WorldID;
    xmlhttp3.open("POST", "https://www.allyourbasesbelong2us.com/DbService/Service.php", false);
    xmlhttp3.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp3.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            return_data3 = eval(xmlhttp3.responseText);
        }
    };
    xmlhttp3.send(params3);

	var X3 = [];
	var Y3 = [];
	var X3int = [];
	var Y3int = [];
	var id4 = 1;
    var y3 = 2;
	var WorldID = ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
	var WorldID2 = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
	var AllianceID = ClientLib.Data.MainData.GetInstance().get_Alliance().get_Id();
    for (var index3 = 0; index3 < return_data3.length; index3++) {
        var CoordsJoined3 = return_data3[index3].CoordsX + ":" + return_data3[index3].CoordsY;
		var rtAllianceName = return_data3[index3].AllianceName;
		var rtPlayerName = return_data3[index3].PlayerName;
		X3int[id4] = return_data3[index3].CoordsX;
		Y3int[id4] = return_data3[index3].CoordsY;
		X3[id4] = parseInt(return_data3[index3].CoordsX);
		Y3[id4] = parseInt(return_data3[index3].CoordsY);

        box3.add(new qx.ui.basic.Label(rtPlayerName).set({
            rich: true,
            maxWidth: 200,
            wrap: false,
            font: 'font_size_15',
            font: 'bold',
            textColor: 'black',
            alignX: 'left'
        }), {row: y3, column: 0 });
		
        box3.add(new qx.ui.basic.Label(rtAllianceName).set({
            rich: true,
            maxWidth: 200,
            wrap: false,
            font: 'font_size_15',
            font: 'bold',
            textColor: 'black',
            alignX: 'left'
        }), {row: y3, column: 1 });
		
		
		
		
		//=========================================================================================================================================================
		switch(id4){
		case 1:
		var Xs3001 = X3[1];
		var Ys3001 = Y3[1];
		var Xs3001b = X3int[1];
		var Ys3001b = Y3int[1];
		

		
		var coords001BtnContainer3 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));

		var coords001Button3 = new qx.ui.form.Button("  " + CoordsJoined3 + "  ", "");

		
        coords001Button3.addListener("click", function() {
			ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs3001,Ys3001);
        }, this);
		
		coords001BtnContainer3.add(coords001Button3);
	
		box3.add((coords001BtnContainer3), {row: y3, column: 2 });
      

				if (ad_priv == true){
				var del001BtnContainer3 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del001Button3 = new qx.ui.form.Button("Delete", "");
				del001Button3.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs3001b;
					var CoordsY = Ys3001b;
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delSatCodeRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del001BtnContainer3.add(del001Button3);
				box3.add((del001BtnContainer3), {row: y3, column: 3 });
			}
		break;
		case 2:
		var Xs3002 = X3[2];
		var Ys3002 = Y3[2];
		var Xs3002b = X3int[2];
		var Ys3002b = Y3int[2];
		

		
		var coords002BtnContainer3 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));

		var coords002Button3 = new qx.ui.form.Button("  " + CoordsJoined3 + "  ", "");

		
        coords002Button3.addListener("click", function() {
			ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs3002,Ys3002);
        }, this);
		
		coords002BtnContainer3.add(coords002Button3);
	
		box3.add((coords002BtnContainer3), {row: y3, column: 2 });
      

				if (ad_priv == true){
				var del002BtnContainer3 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del002Button3 = new qx.ui.form.Button("Delete", "");
				del002Button3.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs3002b;
					var CoordsY = Ys3002b;
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delSatCodeRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del002BtnContainer3.add(del002Button3);
				box3.add((del002BtnContainer3), {row: y3, column: 3 });
			}
		break;
		case 3:
		var Xs3003 = X3[3];
		var Ys3003 = Y3[3];
		var Xs3003b = X3int[3];
		var Ys3003b = Y3int[3];
		

		
		var coords003BtnContainer3 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));

		var coords003Button3 = new qx.ui.form.Button("  " + CoordsJoined3 + "  ", "");

		
        coords003Button3.addListener("click", function() {
			ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs3003,Ys3003);
        }, this);
		
		coords003BtnContainer3.add(coords003Button3);
	
		box3.add((coords003BtnContainer3), {row: y3, column: 2 });
      

				if (ad_priv == true){
				var del003BtnContainer3 = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del003Button3 = new qx.ui.form.Button("Delete", "");
				del003Button3.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs3003b;
					var CoordsY = Ys3003b;
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delSatCodeRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del003BtnContainer3.add(del003Button3);
				box3.add((del003BtnContainer3), {row: y3, column: 3 });
			}
		break;
		
	}
	
	
		scrollBox3.add(box3);
		page3.add(scrollBox3);
	
		id4 = id4 + 1;
		y3 = y3 + 1;
	}
	}, this);

         box.add(new qx.ui.basic.Label('Player').set({
            rich: true,
            maxWidth: 200,
            wrap: false,
            font: 'font_size_15',
            font: 'bold',
            textColor: 'black',
            alignX: 'left'
        }), {row: 0, column: 0 });


        box.add(new qx.ui.basic.Label('Base').set({
            rich: true,
            maxWidth: 200,
            wrap: false,
            font: 'font_size_15',
            font: 'bold',
            textColor: 'black',
            alignX: 'left'
        }), {row: 0, column: 1 });


        box.add(new qx.ui.basic.Label('MCV Timer').set({
            rich: true,
            maxWidth: 200,
            wrap: false,
            font: 'font_size_15',
            font: 'bold',
            textColor: 'black',
            alignX: 'left'
        }), {row: 0, column: 2 });

        box.add(new qx.ui.basic.Label('Research').set({
            rich: true,
            maxWidth: 200,
            wrap: false,
            font: 'font_size_15',
            font: 'bold',
            textColor: 'black',
            alignX: 'left'
        }), {row: 0, column: 3 });
		
        box.add(new qx.ui.basic.Label('Coords').set({
            rich: true,
            maxWidth: 200,
            wrap: false,
            font: 'font_size_15',
            font: 'bold',
            textColor: 'black',
            alignX: 'left'
        }), {row: 0, column: 4 });		
		
        box.add(new qx.ui.basic.Label('View Layout').set({
            rich: true,
            maxWidth: 200,
            wrap: false,
            font: 'font_size_15',
            font: 'bold',
            textColor: 'black',
            alignX: 'left'
        }), {row: 0, column: 5 });
		
		
        box.add(new qx.ui.basic.Label('CnCOpt Link').set({
            rich: true,
            maxWidth: 200,
            wrap: false,
            font: 'font_size_15',
            font: 'bold',
            textColor: 'black',
            alignX: 'left'
        }), {row: 0, column: 6 });	
		
		
	var WorldID = ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();	
    var return_data;
    var xmlhttp = new XMLHttpRequest();
    var params = "functionname=ReservationsList&WorldID="+WorldID;
    xmlhttp.open("POST", "https://www.allyourbasesbelong2us.com/DbService/Service.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            return_data = eval(xmlhttp.responseText);
        }
    };
    xmlhttp.send(params);
	
var c_chk = [];
var s_chk = [];
var Player_ID = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_PlayerId();
c_chk = ClientLib.Data.MainData.GetInstance().get_Alliance().get_FirstLeaders().l;
s_chk = ClientLib.Data.MainData.GetInstance().get_Alliance().get_SecondLeaders().l;

var ad_priv = false;

for (var i=0; i<c_chk.length; i++) {
	if (c_chk[i] == Player_ID) {
		ad_priv = true;
	}
}

for (var i=0; i<s_chk.length; i++) {
	if (s_chk[i] == Player_ID){
		ad_priv = true;
	}

}
	var X1 = [];
	var Y1 = [];
	var Xint = [];
	var Yint = [];
	var rtCnCOptlink = [];
	var id2 = 1;
    var y = 1;
    for (var index = 0; index < return_data.length; index++) {
		var html = "";
        var ReservedLayout = return_data[index].LayoutReserved;
        var rtPlayerName = return_data[index].PlayerName;
        var rtMCVTime = return_data[index].MCVTime;
		rtCnCOptlink[id2] = return_data[index].CnCOptLink;
        var rtResearchLevel = return_data[index].ResearchLeft + "%";
        var CoordsJoined = return_data[index].CoordsX + ":" + return_data[index].CoordsY;
		Yint[id2] = return_data[index].CoordsY;
		Xint[id2] = return_data[index].CoordsX;
		X1[id2] = parseInt(return_data[index].CoordsX);
		Y1[id2] = parseInt(return_data[index].CoordsY);
        var currenLayout = ReservedLayout;
        var rtBaseNumber = return_data[index].BaseCount;
		
		var str = ".ct-jhlk";
		var data = currenLayout;
		for (var i = 0; i < 8; i++) {
			var re = new RegExp(i, 'g');
			var char = str.charAt(i);
			data = data.replace(re, char);
		}

		html += '<table border="1" width="135" cellspacing="0" cellpadding="0" align="left" bordercolor="#C0C0C0" style="border-collapse: collapse" height="120">';

		for (var i = 0; i < 72; i++) {
			var row = Math.floor(i / 9);
			var column = i - Math.floor(i / 9) * 9;
			if (column == 0) html += '<tr>';
			html += '<th width="9" height="9" align="center" valign="middle" nowrap border="2" bordercolor="#CCCCCC" bgcolor="' + cellbgcolor[currenLayout.charAt(i)] + '"><img border="0" src="' + images[currenLayout.charAt(i)] + '" width="8" height="8" align="middle"></th>';
			if (column == 8) html += '</tr>';
		}
		
		html += '</table>';

        box.add(new qx.ui.basic.Label(rtPlayerName).set({
            rich: true,
            maxWidth: 200,
            wrap: false,
            font: 'font_size_15',
            font: 'bold',
            textColor: 'black',
            alignX: 'left'
        }), {row: y, column: 0 });


        box.add(new qx.ui.basic.Label(rtBaseNumber).set({
            rich: true,
            maxWidth: 200,
            wrap: false,
            font: 'font_size_15',
            font: 'bold',
            textColor: 'black',
            alignX: 'left'
        }), {row: y, column: 1 });


        box.add(new qx.ui.basic.Label(rtMCVTime).set({
            rich: true,
            maxWidth: 200,
            wrap: false,
            font: 'font_size_15',
            font: 'bold',
            textColor: 'black',
            alignX: 'left'
        }), {row: y, column: 2 });

        box.add(new qx.ui.basic.Label(rtResearchLevel).set({
            rich: true,
            maxWidth: 200,
            wrap: false,
            font: 'font_size_15',
            font: 'bold',
            textColor: 'black',
            alignX: 'left'
        }), {row: y, column: 3 });

		var LayoutBtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
			alignX: 'left'
		}));
	
		var layoutTip = new qx.ui.tooltip.ToolTip(html, null);

		var layoutButton = new qx.ui.form.Button("Show", "");
		layoutTip.setRich(true);
		layoutButton.setToolTip(layoutTip);
		layoutButton.setBlockToolTip(false);

		switch(y){
			case 1:
				var Xs001 = X1[1];
				var Ys001 = Y1[1];
				var Xs001b = Xint[1];
				var Ys001b = Yint[1];
				
				var rtCnCOptlink001 = rtCnCOptlink[1];
				var coords001BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var CnCOpt001BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var coords001Button = new qx.ui.form.Button(CoordsJoined, "");
				var cncopt001Button = new qx.ui.form.Button("CnCOpt", "");
				
				coords001Button.addListener("execute", function() {
					ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs001,Ys001);
				}, this);
				cncopt001Button.addListener("click", function() {
					window.open(rtCnCOptlink001,'_blank');
				}, this);
				layoutButton.addListener("click", function() {
					
				}, this);
	
				coords001BtnContainer.add(coords001Button);
				LayoutBtnContainer.add(layoutButton);
				CnCOpt001BtnContainer.add(cncopt001Button);
				
			    box.add((coords001BtnContainer), {row: y, column: 4 });
				box.add((LayoutBtnContainer), {row: y, column: 5 });        
				box.add((CnCOpt001BtnContainer), {row: y, column: 6 });
				if (ad_priv == true){
				var del001BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del001Button = new qx.ui.form.Button("Delete", "");
				del001Button.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs001b;
					var CoordsY = Ys001b;
					
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delReserveRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del001BtnContainer.add(del001Button);
				box.add((del001BtnContainer), {row: y, column: 7 });
				}
				break;
			case 2:
				var Xs002 = X1[2];
				var Ys002 = Y1[2];
				var Xs002b = Xint[2];
				var Ys002b = Yint[2];
				
				var rtCnCOptlink002 = rtCnCOptlink[2];
				var coords002BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var CnCOpt002BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var coords002Button = new qx.ui.form.Button(CoordsJoined, "");
				var cncopt002Button = new qx.ui.form.Button("CnCOpt", "");
				
				coords002Button.addListener("execute", function() {
					ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs002,Ys002);
				}, this);
				cncopt002Button.addListener("click", function() {
					window.open(rtCnCOptlink002,'_blank');
				}, this);
				layoutButton.addListener("click", function() {
					
				}, this);
	
				coords002BtnContainer.add(coords002Button);
				LayoutBtnContainer.add(layoutButton);
				CnCOpt002BtnContainer.add(cncopt002Button);
				
			    box.add((coords002BtnContainer), {row: y, column: 4 });
				box.add((LayoutBtnContainer), {row: y, column: 5 });        
				box.add((CnCOpt002BtnContainer), {row: y, column: 6 });
				if (ad_priv == true){
				var del002BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del002Button = new qx.ui.form.Button("Delete", "");
				del002Button.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs002b;
					var CoordsY = Ys002b;
					
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delReserveRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del002BtnContainer.add(del002Button);
				box.add((del002BtnContainer), {row: y, column: 7 });
				}
				break;
			case 3:
				var Xs003 = X1[3];
				var Ys003 = Y1[3];
				var Xs003b = Xint[3];
				var Ys003b = Yint[3];
				
				var rtCnCOptlink003 = rtCnCOptlink[3];
				var coords003BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var CnCOpt003BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var coords003Button = new qx.ui.form.Button(CoordsJoined, "");
				var cncopt003Button = new qx.ui.form.Button("CnCOpt", "");
				
				coords003Button.addListener("execute", function() {
					ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs003,Ys003);
				}, this);
				cncopt003Button.addListener("click", function() {
					window.open(rtCnCOptlink003,'_blank');
				}, this);
				layoutButton.addListener("click", function() {
					
				}, this);
	
				coords003BtnContainer.add(coords003Button);
				LayoutBtnContainer.add(layoutButton);
				CnCOpt003BtnContainer.add(cncopt003Button);
				
			    box.add((coords003BtnContainer), {row: y, column: 4 });
				box.add((LayoutBtnContainer), {row: y, column: 5 });        
				box.add((CnCOpt003BtnContainer), {row: y, column: 6 });
				if (ad_priv == true){
				var del003BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del003Button = new qx.ui.form.Button("Delete", "");
				del003Button.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs003b;
					var CoordsY = Ys003b;
					
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delReserveRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del003BtnContainer.add(del003Button);
				box.add((del003BtnContainer), {row: y, column: 7 });
				}
				break;
			case 4:
				var Xs004 = X1[4];
				var Ys004 = Y1[4];
				var Xs004b = Xint[4];
				var Ys004b = Yint[4];
				
				var rtCnCOptlink004 = rtCnCOptlink[4];
				var coords004BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var CnCOpt004BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var coords004Button = new qx.ui.form.Button(CoordsJoined, "");
				var cncopt004Button = new qx.ui.form.Button("CnCOpt", "");
				
				coords004Button.addListener("execute", function() {
					ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs004,Ys004);
				}, this);
				cncopt004Button.addListener("click", function() {
					window.open(rtCnCOptlink004,'_blank');
				}, this);
				layoutButton.addListener("click", function() {
					
				}, this);
	
				coords004BtnContainer.add(coords004Button);
				LayoutBtnContainer.add(layoutButton);
				CnCOpt004BtnContainer.add(cncopt004Button);
				
			    box.add((coords004BtnContainer), {row: y, column: 4 });
				box.add((LayoutBtnContainer), {row: y, column: 5 });        
				box.add((CnCOpt004BtnContainer), {row: y, column: 6 });
				if (ad_priv == true){
				var del004BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del004Button = new qx.ui.form.Button("Delete", "");
				del004Button.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs004b;
					var CoordsY = Ys004b;
					
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delReserveRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del004BtnContainer.add(del004Button);
				box.add((del004BtnContainer), {row: y, column: 7 });
				}
				break;
			case 5:
				var Xs005 = X1[5];
				var Ys005 = Y1[5];
				var Xs005b = Xint[5];
				var Ys005b = Yint[5];
				
				var rtCnCOptlink005 = rtCnCOptlink[5];
				var coords005BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var CnCOpt005BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var coords005Button = new qx.ui.form.Button(CoordsJoined, "");
				var cncopt005Button = new qx.ui.form.Button("CnCOpt", "");
				
				coords005Button.addListener("execute", function() {
					ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs005,Ys005);
				}, this);
				cncopt005Button.addListener("click", function() {
					window.open(rtCnCOptlink005,'_blank');
				}, this);
				layoutButton.addListener("click", function() {
					
				}, this);
	
				coords005BtnContainer.add(coords005Button);
				LayoutBtnContainer.add(layoutButton);
				CnCOpt005BtnContainer.add(cncopt005Button);
				
			    box.add((coords005BtnContainer), {row: y, column: 4 });
				box.add((LayoutBtnContainer), {row: y, column: 5 });        
				box.add((CnCOpt005BtnContainer), {row: y, column: 6 });
				if (ad_priv == true){
				var del005BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del005Button = new qx.ui.form.Button("Delete", "");
				del005Button.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs005b;
					var CoordsY = Ys005b;
					
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delReserveRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del005BtnContainer.add(del005Button);
				box.add((del005BtnContainer), {row: y, column: 7 });
				}
				break;
			case 6:
				var Xs006 = X1[6];
				var Ys006 = Y1[6];
				var Xs006b = Xint[6];
				var Ys006b = Yint[6];
				
				var rtCnCOptlink006 = rtCnCOptlink[6];
				var coords006BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var CnCOpt006BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var coords006Button = new qx.ui.form.Button(CoordsJoined, "");
				var cncopt006Button = new qx.ui.form.Button("CnCOpt", "");
				
				coords006Button.addListener("execute", function() {
					ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs006,Ys006);
				}, this);
				cncopt006Button.addListener("click", function() {
					window.open(rtCnCOptlink006,'_blank');
				}, this);
				layoutButton.addListener("click", function() {
					
				}, this);
	
				coords006BtnContainer.add(coords006Button);
				LayoutBtnContainer.add(layoutButton);
				CnCOpt006BtnContainer.add(cncopt006Button);
				
			    box.add((coords006BtnContainer), {row: y, column: 4 });
				box.add((LayoutBtnContainer), {row: y, column: 5 });        
				box.add((CnCOpt006BtnContainer), {row: y, column: 6 });
				if (ad_priv == true){
				var del006BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del006Button = new qx.ui.form.Button("Delete", "");
				del006Button.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs006b;
					var CoordsY = Ys006b;
					
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delReserveRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del006BtnContainer.add(del006Button);
				box.add((del006BtnContainer), {row: y, column: 7 });
				}
				break;
			case 7:
				var Xs007 = X1[7];
				var Ys007 = Y1[7];
				var Xs007b = Xint[7];
				var Ys007b = Yint[7];
				
				var rtCnCOptlink007 = rtCnCOptlink[7];
				var coords007BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var CnCOpt007BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var coords007Button = new qx.ui.form.Button(CoordsJoined, "");
				var cncopt007Button = new qx.ui.form.Button("CnCOpt", "");
				
				coords007Button.addListener("execute", function() {
					ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs007,Ys007);
				}, this);
				cncopt007Button.addListener("click", function() {
					window.open(rtCnCOptlink007,'_blank');
				}, this);
				layoutButton.addListener("click", function() {
					
				}, this);
	
				coords007BtnContainer.add(coords007Button);
				LayoutBtnContainer.add(layoutButton);
				CnCOpt007BtnContainer.add(cncopt007Button);
				
			    box.add((coords007BtnContainer), {row: y, column: 4 });
				box.add((LayoutBtnContainer), {row: y, column: 5 });        
				box.add((CnCOpt007BtnContainer), {row: y, column: 6 });
				if (ad_priv == true){
				var del007BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del007Button = new qx.ui.form.Button("Delete", "");
				del007Button.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs007b;
					var CoordsY = Ys007b;
					
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delReserveRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del007BtnContainer.add(del007Button);
				box.add((del007BtnContainer), {row: y, column: 7 });
				}
				break;
			case 8:
				var Xs008 = X1[8];
				var Ys008 = Y1[8];
				var Xs008b = Xint[8];
				var Ys008b = Yint[8];
				
				var rtCnCOptlink008 = rtCnCOptlink[8];
				var coords008BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var CnCOpt008BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var coords008Button = new qx.ui.form.Button(CoordsJoined, "");
				var cncopt008Button = new qx.ui.form.Button("CnCOpt", "");
				
				coords008Button.addListener("execute", function() {
					ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs008,Ys008);
				}, this);
				cncopt008Button.addListener("click", function() {
					window.open(rtCnCOptlink008,'_blank');
				}, this);
				layoutButton.addListener("click", function() {
					
				}, this);
	
				coords008BtnContainer.add(coords008Button);
				LayoutBtnContainer.add(layoutButton);
				CnCOpt008BtnContainer.add(cncopt008Button);
				
			    box.add((coords008BtnContainer), {row: y, column: 4 });
				box.add((LayoutBtnContainer), {row: y, column: 5 });        
				box.add((CnCOpt008BtnContainer), {row: y, column: 6 });
				if (ad_priv == true){
				var del008BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del008Button = new qx.ui.form.Button("Delete", "");
				del008Button.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs008b;
					var CoordsY = Ys008b;
					
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delReserveRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del008BtnContainer.add(del008Button);
				box.add((del008BtnContainer), {row: y, column: 7 });
				}
				break;
			case 9:
				var Xs009 = X1[9];
				var Ys009 = Y1[9];
				var Xs009b = Xint[9];
				var Ys009b = Yint[9];
				
				var rtCnCOptlink009 = rtCnCOptlink[9];
				var coords009BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var CnCOpt009BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var coords009Button = new qx.ui.form.Button(CoordsJoined, "");
				var cncopt009Button = new qx.ui.form.Button("CnCOpt", "");
				
				coords009Button.addListener("execute", function() {
					ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs009,Ys009);
				}, this);
				cncopt009Button.addListener("click", function() {
					window.open(rtCnCOptlink009,'_blank');
				}, this);
				layoutButton.addListener("click", function() {
					
				}, this);
	
				coords009BtnContainer.add(coords009Button);
				LayoutBtnContainer.add(layoutButton);
				CnCOpt009BtnContainer.add(cncopt009Button);
				
			    box.add((coords009BtnContainer), {row: y, column: 4 });
				box.add((LayoutBtnContainer), {row: y, column: 5 });        
				box.add((CnCOpt009BtnContainer), {row: y, column: 6 });
				if (ad_priv == true){
				var del009BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del009Button = new qx.ui.form.Button("Delete", "");
				del009Button.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs009b;
					var CoordsY = Ys009b;
					
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delReserveRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del009BtnContainer.add(del009Button);
				box.add((del009BtnContainer), {row: y, column: 7 });
				}
				break;
			case 10:
				var Xs010 = X1[10];
				var Ys010 = Y1[10];
				var Xs010b = Xint[10];
				var Ys010b = Yint[10];
				
				var rtCnCOptlink010 = rtCnCOptlink[10];
				var coords010BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var CnCOpt010BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var coords010Button = new qx.ui.form.Button(CoordsJoined, "");
				var cncopt010Button = new qx.ui.form.Button("CnCOpt", "");
				
				coords010Button.addListener("execute", function() {
					ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs010,Ys010);
				}, this);
				cncopt010Button.addListener("click", function() {
					window.open(rtCnCOptlink010,'_blank');
				}, this);
				layoutButton.addListener("click", function() {
					
				}, this);
	
				coords010BtnContainer.add(coords010Button);
				LayoutBtnContainer.add(layoutButton);
				CnCOpt010BtnContainer.add(cncopt010Button);
				
			    box.add((coords010BtnContainer), {row: y, column: 4 });
				box.add((LayoutBtnContainer), {row: y, column: 5 });        
				box.add((CnCOpt010BtnContainer), {row: y, column: 6 });
				if (ad_priv == true){
				var del010BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del010Button = new qx.ui.form.Button("Delete", "");
				del010Button.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs010b;
					var CoordsY = Ys010b;
					
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delReserveRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del010BtnContainer.add(del010Button);
				box.add((del010BtnContainer), {row: y, column: 7 });
				}
				break;
			case 11:
				var Xs011 = X1[11];
				var Ys011 = Y1[11];
				var Xs011b = Xint[11];
				var Ys011b = Yint[11];
				
				var rtCnCOptlink011 = rtCnCOptlink[11];
				var coords011BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var CnCOpt011BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var coords011Button = new qx.ui.form.Button(CoordsJoined, "");
				var cncopt011Button = new qx.ui.form.Button("CnCOpt", "");
				
				coords011Button.addListener("execute", function() {
					ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs011,Ys011);
				}, this);
				cncopt011Button.addListener("click", function() {
					window.open(rtCnCOptlink011,'_blank');
				}, this);
				layoutButton.addListener("click", function() {
					
				}, this);
	
				coords011BtnContainer.add(coords011Button);
				LayoutBtnContainer.add(layoutButton);
				CnCOpt011BtnContainer.add(cncopt011Button);
				
			    box.add((coords011BtnContainer), {row: y, column: 4 });
				box.add((LayoutBtnContainer), {row: y, column: 5 });        
				box.add((CnCOpt011BtnContainer), {row: y, column: 6 });
				if (ad_priv == true){
				var del011BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del011Button = new qx.ui.form.Button("Delete", "");
				del011Button.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs011b;
					var CoordsY = Ys011b;
					
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delReserveRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del011BtnContainer.add(del011Button);
				box.add((del011BtnContainer), {row: y, column: 7 });
				}
				break;
			case 12:
				var Xs012 = X1[12];
				var Ys012 = Y1[12];
				var Xs012b = Xint[12];
				var Ys012b = Yint[12];
				
				var rtCnCOptlink012 = rtCnCOptlink[12];
				var coords012BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var CnCOpt012BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var coords012Button = new qx.ui.form.Button(CoordsJoined, "");
				var cncopt012Button = new qx.ui.form.Button("CnCOpt", "");
				
				coords012Button.addListener("execute", function() {
					ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs012,Ys012);
				}, this);
				cncopt012Button.addListener("click", function() {
					window.open(rtCnCOptlink012,'_blank');
				}, this);
				layoutButton.addListener("click", function() {
					
				}, this);
	
				coords012BtnContainer.add(coords012Button);
				LayoutBtnContainer.add(layoutButton);
				CnCOpt012BtnContainer.add(cncopt012Button);
				
			    box.add((coords012BtnContainer), {row: y, column: 4 });
				box.add((LayoutBtnContainer), {row: y, column: 5 });        
				box.add((CnCOpt012BtnContainer), {row: y, column: 6 });
				if (ad_priv == true){
				var del012BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del012Button = new qx.ui.form.Button("Delete", "");
				del012Button.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs012b;
					var CoordsY = Ys012b;
					
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delReserveRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del012BtnContainer.add(del012Button);
				box.add((del012BtnContainer), {row: y, column: 7 });
				}
				break;
			case 13:
				var Xs013 = X1[13];
				var Ys013 = Y1[13];
				var Xs013b = Xint[13];
				var Ys013b = Yint[13];
				
				var rtCnCOptlink013 = rtCnCOptlink[13];
				var coords013BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var CnCOpt013BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var coords013Button = new qx.ui.form.Button(CoordsJoined, "");
				var cncopt013Button = new qx.ui.form.Button("CnCOpt", "");
				
				coords013Button.addListener("execute", function() {
					ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs013,Ys013);
				}, this);
				cncopt013Button.addListener("click", function() {
					window.open(rtCnCOptlink013,'_blank');
				}, this);
				layoutButton.addListener("click", function() {
					
				}, this);
	
				coords013BtnContainer.add(coords013Button);
				LayoutBtnContainer.add(layoutButton);
				CnCOpt013BtnContainer.add(cncopt013Button);
				
			    box.add((coords013BtnContainer), {row: y, column: 4 });
				box.add((LayoutBtnContainer), {row: y, column: 5 });        
				box.add((CnCOpt013BtnContainer), {row: y, column: 6 });
				if (ad_priv == true){
				var del013BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del013Button = new qx.ui.form.Button("Delete", "");
				del013Button.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs013b;
					var CoordsY = Ys013b;
					
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delReserveRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del013BtnContainer.add(del013Button);
				box.add((del013BtnContainer), {row: y, column: 7 });
				}
				break;
			case 14:
				var Xs014 = X1[14];
				var Ys014 = Y1[14];
				var Xs014b = Xint[14];
				var Ys014b = Yint[14];
				
				var rtCnCOptlink014 = rtCnCOptlink[14];
				var coords014BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var CnCOpt014BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var coords014Button = new qx.ui.form.Button(CoordsJoined, "");
				var cncopt014Button = new qx.ui.form.Button("CnCOpt", "");
				
				coords014Button.addListener("execute", function() {
					ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs014,Ys014);
				}, this);
				cncopt014Button.addListener("click", function() {
					window.open(rtCnCOptlink014,'_blank');
				}, this);
				layoutButton.addListener("click", function() {
					
				}, this);
	
				coords014BtnContainer.add(coords014Button);
				LayoutBtnContainer.add(layoutButton);
				CnCOpt014BtnContainer.add(cncopt014Button);
				
			    box.add((coords014BtnContainer), {row: y, column: 4 });
				box.add((LayoutBtnContainer), {row: y, column: 5 });        
				box.add((CnCOpt014BtnContainer), {row: y, column: 6 });
				if (ad_priv == true){
				var del014BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del014Button = new qx.ui.form.Button("Delete", "");
				del014Button.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs014b;
					var CoordsY = Ys014b;
					
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delReserveRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del014BtnContainer.add(del014Button);
				box.add((del014BtnContainer), {row: y, column: 7 });
				}
				break;
			case 15:
				var Xs015 = X1[15];
				var Ys015 = Y1[15];
				var Xs015b = Xint[15];
				var Ys015b = Yint[15];
				
				var rtCnCOptlink015 = rtCnCOptlink[15];
				var coords015BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var CnCOpt015BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var coords015Button = new qx.ui.form.Button(CoordsJoined, "");
				var cncopt015Button = new qx.ui.form.Button("CnCOpt", "");
				
				coords015Button.addListener("execute", function() {
					ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs015,Ys015);
				}, this);
				cncopt015Button.addListener("click", function() {
					window.open(rtCnCOptlink015,'_blank');
				}, this);
				layoutButton.addListener("click", function() {
					
				}, this);
	
				coords015BtnContainer.add(coords015Button);
				LayoutBtnContainer.add(layoutButton);
				CnCOpt015BtnContainer.add(cncopt015Button);
				
			    box.add((coords015BtnContainer), {row: y, column: 4 });
				box.add((LayoutBtnContainer), {row: y, column: 5 });        
				box.add((CnCOpt015BtnContainer), {row: y, column: 6 });
				if (ad_priv == true){
				var del015BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del015Button = new qx.ui.form.Button("Delete", "");
				del015Button.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs015b;
					var CoordsY = Ys015b;
					
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delReserveRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del015BtnContainer.add(del015Button);
				box.add((del015BtnContainer), {row: y, column: 7 });
				}
				break;
			case 16:
				var Xs016 = X1[16];
				var Ys016 = Y1[16];
				var Xs016b = Xint[16];
				var Ys016b = Yint[16];
				
				var rtCnCOptlink016 = rtCnCOptlink[16];
				var coords016BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var CnCOpt016BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var coords016Button = new qx.ui.form.Button(CoordsJoined, "");
				var cncopt016Button = new qx.ui.form.Button("CnCOpt", "");
				
				coords016Button.addListener("execute", function() {
					ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs016,Ys016);
				}, this);
				cncopt016Button.addListener("click", function() {
					window.open(rtCnCOptlink016,'_blank');
				}, this);
				layoutButton.addListener("click", function() {
					
				}, this);
	
				coords016BtnContainer.add(coords016Button);
				LayoutBtnContainer.add(layoutButton);
				CnCOpt016BtnContainer.add(cncopt016Button);
				
			    box.add((coords016BtnContainer), {row: y, column: 4 });
				box.add((LayoutBtnContainer), {row: y, column: 5 });        
				box.add((CnCOpt016BtnContainer), {row: y, column: 6 });
				if (ad_priv == true){
				var del016BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del016Button = new qx.ui.form.Button("Delete", "");
				del016Button.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs016b;
					var CoordsY = Ys016b;
					
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delReserveRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del016BtnContainer.add(del016Button);
				box.add((del016BtnContainer), {row: y, column: 7 });
				}
				break;
			case 17:
				var Xs017 = X1[17];
				var Ys017 = Y1[17];
				var Xs017b = Xint[17];
				var Ys017b = Yint[17];
				
				var rtCnCOptlink017 = rtCnCOptlink[17];
				var coords017BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var CnCOpt017BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var coords017Button = new qx.ui.form.Button(CoordsJoined, "");
				var cncopt017Button = new qx.ui.form.Button("CnCOpt", "");
				
				coords017Button.addListener("execute", function() {
					ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs017,Ys017);
				}, this);
				cncopt017Button.addListener("click", function() {
					window.open(rtCnCOptlink017,'_blank');
				}, this);
				layoutButton.addListener("click", function() {
					
				}, this);
	
				coords017BtnContainer.add(coords017Button);
				LayoutBtnContainer.add(layoutButton);
				CnCOpt017BtnContainer.add(cncopt017Button);
				
			    box.add((coords017BtnContainer), {row: y, column: 4 });
				box.add((LayoutBtnContainer), {row: y, column: 5 });        
				box.add((CnCOpt017BtnContainer), {row: y, column: 6 });
				if (ad_priv == true){
				var del017BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del017Button = new qx.ui.form.Button("Delete", "");
				del017Button.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs017b;
					var CoordsY = Ys017b;
					
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delReserveRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del017BtnContainer.add(del017Button);
				box.add((del017BtnContainer), {row: y, column: 7 });
				}
				break;
			case 18:
				var Xs018 = X1[18];
				var Ys018 = Y1[18];
				var Xs018b = Xint[18];
				var Ys018b = Yint[18];
				
				var rtCnCOptlink018 = rtCnCOptlink[18];
				var coords018BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var CnCOpt018BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var coords018Button = new qx.ui.form.Button(CoordsJoined, "");
				var cncopt018Button = new qx.ui.form.Button("CnCOpt", "");
				
				coords018Button.addListener("execute", function() {
					ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs018,Ys018);
				}, this);
				cncopt018Button.addListener("click", function() {
					window.open(rtCnCOptlink018,'_blank');
				}, this);
				layoutButton.addListener("click", function() {
					
				}, this);
	
				coords018BtnContainer.add(coords018Button);
				LayoutBtnContainer.add(layoutButton);
				CnCOpt018BtnContainer.add(cncopt018Button);
				
			    box.add((coords018BtnContainer), {row: y, column: 4 });
				box.add((LayoutBtnContainer), {row: y, column: 5 });        
				box.add((CnCOpt018BtnContainer), {row: y, column: 6 });
				if (ad_priv == true){
				var del018BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del018Button = new qx.ui.form.Button("Delete", "");
				del018Button.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs018b;
					var CoordsY = Ys018b;
					
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delReserveRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del018BtnContainer.add(del018Button);
				box.add((del018BtnContainer), {row: y, column: 7 });
				}
				break;
			case 19:
				var Xs019 = X1[19];
				var Ys019 = Y1[19];
				var Xs019b = Xint[19];
				var Ys019b = Yint[19];
				
				var rtCnCOptlink019 = rtCnCOptlink[19];
				var coords019BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var CnCOpt019BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var coords019Button = new qx.ui.form.Button(CoordsJoined, "");
				var cncopt019Button = new qx.ui.form.Button("CnCOpt", "");
				
				coords019Button.addListener("execute", function() {
					ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs019,Ys019);
				}, this);
				cncopt019Button.addListener("click", function() {
					window.open(rtCnCOptlink019,'_blank');
				}, this);
				layoutButton.addListener("click", function() {
					
				}, this);
	
				coords019BtnContainer.add(coords019Button);
				LayoutBtnContainer.add(layoutButton);
				CnCOpt019BtnContainer.add(cncopt019Button);
				
			    box.add((coords019BtnContainer), {row: y, column: 4 });
				box.add((LayoutBtnContainer), {row: y, column: 5 });        
				box.add((CnCOpt019BtnContainer), {row: y, column: 6 });
				if (ad_priv == true){
				var del019BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del019Button = new qx.ui.form.Button("Delete", "");
				del019Button.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs019b;
					var CoordsY = Ys019b;
					
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delReserveRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del019BtnContainer.add(del019Button);
				box.add((del019BtnContainer), {row: y, column: 7 });
				}
				break;
			case 20:
				var Xs020 = X1[20];
				var Ys020 = Y1[20];
				var Xs020b = Xint[20];
				var Ys020b = Yint[20];
				
				var rtCnCOptlink020 = rtCnCOptlink[20];
				var coords020BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var CnCOpt020BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var coords020Button = new qx.ui.form.Button(CoordsJoined, "");
				var cncopt020Button = new qx.ui.form.Button("CnCOpt", "");
				
				coords020Button.addListener("execute", function() {
					ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs020,Ys020);
				}, this);
				cncopt020Button.addListener("click", function() {
					window.open(rtCnCOptlink020,'_blank');
				}, this);
				layoutButton.addListener("click", function() {
					
				}, this);
	
				coords020BtnContainer.add(coords020Button);
				LayoutBtnContainer.add(layoutButton);
				CnCOpt020BtnContainer.add(cncopt020Button);
				
			    box.add((coords020BtnContainer), {row: y, column: 4 });
				box.add((LayoutBtnContainer), {row: y, column: 5 });        
				box.add((CnCOpt020BtnContainer), {row: y, column: 6 });
				if (ad_priv == true){
				var del020BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del020Button = new qx.ui.form.Button("Delete", "");
				del020Button.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs020b;
					var CoordsY = Ys020b;
					
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delReserveRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del020BtnContainer.add(del020Button);
				box.add((del020BtnContainer), {row: y, column: 7 });
				}
				break;
			case 21:
				var Xs021 = X1[21];
				var Ys021 = Y1[21];
				var Xs021b = Xint[21];
				var Ys021b = Yint[21];
				
				var rtCnCOptlink021 = rtCnCOptlink[21];
				var coords021BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var CnCOpt021BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var coords021Button = new qx.ui.form.Button(CoordsJoined, "");
				var cncopt021Button = new qx.ui.form.Button("CnCOpt", "");
				
				coords021Button.addListener("execute", function() {
					ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs021,Ys021);
				}, this);
				cncopt021Button.addListener("click", function() {
					window.open(rtCnCOptlink021,'_blank');
				}, this);
				layoutButton.addListener("click", function() {
					
				}, this);
	
				coords021BtnContainer.add(coords021Button);
				LayoutBtnContainer.add(layoutButton);
				CnCOpt021BtnContainer.add(cncopt021Button);
				
			    box.add((coords021BtnContainer), {row: y, column: 4 });
				box.add((LayoutBtnContainer), {row: y, column: 5 });        
				box.add((CnCOpt021BtnContainer), {row: y, column: 6 });
				if (ad_priv == true){
				var del021BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del021Button = new qx.ui.form.Button("Delete", "");
				del021Button.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs021b;
					var CoordsY = Ys021b;
					
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delReserveRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del021BtnContainer.add(del021Button);
				box.add((del021BtnContainer), {row: y, column: 7 });
				}
				break;
			case 22:
				var Xs022 = X1[22];
				var Ys022 = Y1[22];
				var Xs022b = Xint[22];
				var Ys022b = Yint[22];
				
				var rtCnCOptlink022 = rtCnCOptlink[22];
				var coords022BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var CnCOpt022BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var coords022Button = new qx.ui.form.Button(CoordsJoined, "");
				var cncopt022Button = new qx.ui.form.Button("CnCOpt", "");
				
				coords022Button.addListener("execute", function() {
					ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs022,Ys022);
				}, this);
				cncopt022Button.addListener("click", function() {
					window.open(rtCnCOptlink022,'_blank');
				}, this);
				layoutButton.addListener("click", function() {
					
				}, this);
	
				coords022BtnContainer.add(coords022Button);
				LayoutBtnContainer.add(layoutButton);
				CnCOpt022BtnContainer.add(cncopt022Button);
				
			    box.add((coords022BtnContainer), {row: y, column: 4 });
				box.add((LayoutBtnContainer), {row: y, column: 5 });        
				box.add((CnCOpt022BtnContainer), {row: y, column: 6 });
				if (ad_priv == true){
				var del022BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del022Button = new qx.ui.form.Button("Delete", "");
				del022Button.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs022b;
					var CoordsY = Ys022b;
					
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delReserveRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del022BtnContainer.add(del022Button);
				box.add((del022BtnContainer), {row: y, column: 7 });
				}
				break;
			case 23:
				var Xs023 = X1[23];
				var Ys023 = Y1[23];
				var Xs023b = Xint[23];
				var Ys023b = Yint[23];
				
				var rtCnCOptlink023 = rtCnCOptlink[23];
				var coords023BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var CnCOpt023BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var coords023Button = new qx.ui.form.Button(CoordsJoined, "");
				var cncopt023Button = new qx.ui.form.Button("CnCOpt", "");
				
				coords023Button.addListener("execute", function() {
					ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs023,Ys023);
				}, this);
				cncopt023Button.addListener("click", function() {
					window.open(rtCnCOptlink023,'_blank');
				}, this);
				layoutButton.addListener("click", function() {
					
				}, this);
	
				coords023BtnContainer.add(coords023Button);
				LayoutBtnContainer.add(layoutButton);
				CnCOpt023BtnContainer.add(cncopt023Button);
				
			    box.add((coords023BtnContainer), {row: y, column: 4 });
				box.add((LayoutBtnContainer), {row: y, column: 5 });        
				box.add((CnCOpt023BtnContainer), {row: y, column: 6 });
				if (ad_priv == true){
				var del023BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del023Button = new qx.ui.form.Button("Delete", "");
				del023Button.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs023b;
					var CoordsY = Ys023b;
					
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delReserveRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del023BtnContainer.add(del023Button);
				box.add((del023BtnContainer), {row: y, column: 7 });
				}
				break;
			case 24:
				var Xs024 = X1[24];
				var Ys024 = Y1[24];
				var Xs024b = Xint[24];
				var Ys024b = Yint[24];
				
				var rtCnCOptlink024 = rtCnCOptlink[24];
				var coords024BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var CnCOpt024BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var coords024Button = new qx.ui.form.Button(CoordsJoined, "");
				var cncopt024Button = new qx.ui.form.Button("CnCOpt", "");
				
				coords024Button.addListener("execute", function() {
					ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs024,Ys024);
				}, this);
				cncopt024Button.addListener("click", function() {
					window.open(rtCnCOptlink024,'_blank');
				}, this);
				layoutButton.addListener("click", function() {
					
				}, this);
	
				coords024BtnContainer.add(coords024Button);
				LayoutBtnContainer.add(layoutButton);
				CnCOpt024BtnContainer.add(cncopt024Button);
				
			    box.add((coords024BtnContainer), {row: y, column: 4 });
				box.add((LayoutBtnContainer), {row: y, column: 5 });        
				box.add((CnCOpt024BtnContainer), {row: y, column: 6 });
				if (ad_priv == true){
				var del024BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del024Button = new qx.ui.form.Button("Delete", "");
				del024Button.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs024b;
					var CoordsY = Ys024b;
					
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delReserveRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del024BtnContainer.add(del024Button);
				box.add((del024BtnContainer), {row: y, column: 7 });
				}
				break;
			case 25:
				var Xs025 = X1[25];
				var Ys025 = Y1[25];
				var Xs025b = Xint[25];
				var Ys025b = Yint[25];
				
				var rtCnCOptlink025 = rtCnCOptlink[25];
				var coords025BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var CnCOpt025BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var coords025Button = new qx.ui.form.Button(CoordsJoined, "");
				var cncopt025Button = new qx.ui.form.Button("CnCOpt", "");
				
				coords025Button.addListener("execute", function() {
					ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs025,Ys025);
				}, this);
				cncopt025Button.addListener("click", function() {
					window.open(rtCnCOptlink025,'_blank');
				}, this);
				layoutButton.addListener("click", function() {
					
				}, this);
	
				coords025BtnContainer.add(coords025Button);
				LayoutBtnContainer.add(layoutButton);
				CnCOpt025BtnContainer.add(cncopt025Button);
				
			    box.add((coords025BtnContainer), {row: y, column: 4 });
				box.add((LayoutBtnContainer), {row: y, column: 5 });        
				box.add((CnCOpt025BtnContainer), {row: y, column: 6 });
				if (ad_priv == true){
				var del025BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del025Button = new qx.ui.form.Button("Delete", "");
				del025Button.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs025b;
					var CoordsY = Ys025b;
					
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delReserveRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del025BtnContainer.add(del025Button);
				box.add((del025BtnContainer), {row: y, column: 7 });
				}
				break;
			case 26:
				var Xs026 = X1[26];
				var Ys026 = Y1[26];
				var Xs026b = Xint[26];
				var Ys026b = Yint[26];
				
				var rtCnCOptlink026 = rtCnCOptlink[26];
				var coords026BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var CnCOpt026BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var coords026Button = new qx.ui.form.Button(CoordsJoined, "");
				var cncopt026Button = new qx.ui.form.Button("CnCOpt", "");
				
				coords026Button.addListener("execute", function() {
					ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs026,Ys026);
				}, this);
				cncopt026Button.addListener("click", function() {
					window.open(rtCnCOptlink026,'_blank');
				}, this);
				layoutButton.addListener("click", function() {
					
				}, this);
	
				coords026BtnContainer.add(coords026Button);
				LayoutBtnContainer.add(layoutButton);
				CnCOpt026BtnContainer.add(cncopt026Button);
				
			    box.add((coords026BtnContainer), {row: y, column: 4 });
				box.add((LayoutBtnContainer), {row: y, column: 5 });        
				box.add((CnCOpt026BtnContainer), {row: y, column: 6 });
				if (ad_priv == true){
				var del026BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del026Button = new qx.ui.form.Button("Delete", "");
				del026Button.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs026b;
					var CoordsY = Ys026b;
					
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delReserveRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del026BtnContainer.add(del026Button);
				box.add((del026BtnContainer), {row: y, column: 7 });
				}
				break;
			case 27:
				var Xs027 = X1[27];
				var Ys027 = Y1[27];
				var Xs027b = Xint[27];
				var Ys027b = Yint[27];
				
				var rtCnCOptlink027 = rtCnCOptlink[27];
				var coords027BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var CnCOpt027BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var coords027Button = new qx.ui.form.Button(CoordsJoined, "");
				var cncopt027Button = new qx.ui.form.Button("CnCOpt", "");
				
				coords027Button.addListener("execute", function() {
					ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs027,Ys027);
				}, this);
				cncopt027Button.addListener("click", function() {
					window.open(rtCnCOptlink027,'_blank');
				}, this);
				layoutButton.addListener("click", function() {
					
				}, this);
	
				coords027BtnContainer.add(coords027Button);
				LayoutBtnContainer.add(layoutButton);
				CnCOpt027BtnContainer.add(cncopt027Button);
				
			    box.add((coords027BtnContainer), {row: y, column: 4 });
				box.add((LayoutBtnContainer), {row: y, column: 5 });        
				box.add((CnCOpt027BtnContainer), {row: y, column: 6 });
				if (ad_priv == true){
				var del027BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del027Button = new qx.ui.form.Button("Delete", "");
				del027Button.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs027b;
					var CoordsY = Ys027b;
					
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delReserveRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del027BtnContainer.add(del027Button);
				box.add((del027BtnContainer), {row: y, column: 7 });
				}
				break;
			case 28:
				var Xs028 = X1[28];
				var Ys028 = Y1[28];
				var Xs028b = Xint[28];
				var Ys028b = Yint[28];
				
				var rtCnCOptlink028 = rtCnCOptlink[28];
				var coords028BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var CnCOpt028BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var coords028Button = new qx.ui.form.Button(CoordsJoined, "");
				var cncopt028Button = new qx.ui.form.Button("CnCOpt", "");
				
				coords028Button.addListener("execute", function() {
					ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs028,Ys028);
				}, this);
				cncopt028Button.addListener("click", function() {
					window.open(rtCnCOptlink028,'_blank');
				}, this);
				layoutButton.addListener("click", function() {
					
				}, this);
	
				coords028BtnContainer.add(coords028Button);
				LayoutBtnContainer.add(layoutButton);
				CnCOpt028BtnContainer.add(cncopt028Button);
				
			    box.add((coords028BtnContainer), {row: y, column: 4 });
				box.add((LayoutBtnContainer), {row: y, column: 5 });        
				box.add((CnCOpt028BtnContainer), {row: y, column: 6 });
				if (ad_priv == true){
				var del028BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del028Button = new qx.ui.form.Button("Delete", "");
				del028Button.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs028b;
					var CoordsY = Ys028b;
					
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delReserveRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del028BtnContainer.add(del028Button);
				box.add((del028BtnContainer), {row: y, column: 7 });
				}
				break;
			case 29:
				var Xs029 = X1[29];
				var Ys029 = Y1[29];
				var Xs029b = Xint[29];
				var Ys029b = Yint[29];
				
				var rtCnCOptlink029 = rtCnCOptlink[29];
				var coords029BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var CnCOpt029BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var coords029Button = new qx.ui.form.Button(CoordsJoined, "");
				var cncopt029Button = new qx.ui.form.Button("CnCOpt", "");
				
				coords029Button.addListener("execute", function() {
					ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs029,Ys029);
				}, this);
				cncopt029Button.addListener("click", function() {
					window.open(rtCnCOptlink029,'_blank');
				}, this);
				layoutButton.addListener("click", function() {
					
				}, this);
	
				coords029BtnContainer.add(coords029Button);
				LayoutBtnContainer.add(layoutButton);
				CnCOpt029BtnContainer.add(cncopt029Button);
				
			    box.add((coords029BtnContainer), {row: y, column: 4 });
				box.add((LayoutBtnContainer), {row: y, column: 5 });        
				box.add((CnCOpt029BtnContainer), {row: y, column: 6 });
				if (ad_priv == true){
				var del029BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del029Button = new qx.ui.form.Button("Delete", "");
				del029Button.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs029b;
					var CoordsY = Ys029b;
					
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delReserveRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del029BtnContainer.add(del029Button);
				box.add((del029BtnContainer), {row: y, column: 7 });
				}
				break;
			case 30:
				var Xs030 = X1[30];
				var Ys030 = Y1[30];
				var Xs030b = Xint[30];
				var Ys030b = Yint[30];
				
				var rtCnCOptlink030 = rtCnCOptlink[30];
				var coords030BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var CnCOpt030BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));
				var coords030Button = new qx.ui.form.Button(CoordsJoined, "");
				var cncopt030Button = new qx.ui.form.Button("CnCOpt", "");
				
				coords030Button.addListener("execute", function() {
					ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(Xs030,Ys030);
				}, this);
				cncopt030Button.addListener("click", function() {
					window.open(rtCnCOptlink030,'_blank');
				}, this);
				layoutButton.addListener("click", function() {
					
				}, this);
	
				coords030BtnContainer.add(coords030Button);
				LayoutBtnContainer.add(layoutButton);
				CnCOpt030BtnContainer.add(cncopt030Button);
				
			    box.add((coords030BtnContainer), {row: y, column: 4 });
				box.add((LayoutBtnContainer), {row: y, column: 5 });        
				box.add((CnCOpt030BtnContainer), {row: y, column: 6 });
				if (ad_priv == true){
				var del030BtnContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: 'left'
				}));				
				var del030Button = new qx.ui.form.Button("Delete", "");
				del030Button.addListener("execute", function() {
					var WorldID = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					var CoordsX = Xs030b;
					var CoordsY = Ys030b;
					
					var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=delReserveRecord&WorldID="+WorldID+"&CoordsX="+CoordsX+"&CoordsY="+CoordsY;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
									//console.log("Error", xmlhttp.statusText);
								} else {
									console.log("Error", xmlhttp.statusText);
								}
							}
		        xmlhttp.send(params);
				ReservationsListWindow.close();
				OpenReservationsListSlim();
				}, this);
				del030BtnContainer.add(del030Button);
				box.add((del030BtnContainer), {row: y, column: 7 });
				}
				break;

		}
		
		scrollBox1.add(box);
		page1.add(scrollBox1);
		

		id2 = id2 + 1;
		y = y + 1;
	} //==============end page 1

	ReservationsListWindow.add(ReservationsListTabView);
	ReservationsListWindow.open();

	ReservationsListWindow.center();
}
			
			
			
		function waitForGame() {
			try {
				if (typeof qx !== 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().initDone) {
                    //var WorldIDea = "" + ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
					//if (WorldIDea == 368){
					createCnCReserverWindow();
					CnCReserverLink.getInstance().initialize();
					//}
				}
				else {
					setTimeout(waitForGame, 1000);
				}
			}
			catch (e) {
				console.log('CnCReserverLink: ', e.toString());
			}
		};

		setTimeout(waitForGame, 1000);
	};

	var script = document.createElement('script');
	script.innerHTML = '(' + main.toString() + ')();';
	script.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(script);
})();

(function (){
	var CSBI_main =  function() {
	try {
			function createCSBI() {


                console.log('CSBI createCSBI');
                var e = function(){};
											
                qx.Class.define("CSBI.Main", {
                    type: "singleton",
                    extend: qx.core.Object,
                    members: {
                        main_button : null,
						UpdateInstallbutton : null,
                        main_popup : null,
                        Label01 : null,
                        Label02 : null,
                        Label04 : null,
                        initialize: function() {


												
								SendDataButton = new qx.ui.form.Button("Send Data" , null).set({
                                toolTipText: "Send the latest data to the Server",
                                width: 190,
                                height: 30,
                                maxWidth: 190,
                                maxHeight: 30,
                                appearance: ("button-text-small"),
                                center: true,
								});
 
								Label01 = new qx.ui.basic.Atom("<b><font size = \"3\">" + "Crucial Script Base Info Data"+"</font></b>").set({rich: true});
							
								Label02 = new qx.ui.basic.Label().set({
                                value: "Send your main Base offense and defense",
                                rich : true,
                                width: 190
								});
							
								Label03 = new qx.ui.basic.Label("www.allyourbasesbelong2us.com");

								main_button = new qx.ui.form.Button(" Data");

								main_popup = new qx.ui.popup.Popup(new qx.ui.layout.Grid(5)).set({
                                width: 192,
                                height: 130,
                                allowGrowY: false,
                                allowGrowX: false,
                                padding: 5,
                                position: "top-left",
                                //appearance: ("button-text-small")
								});

								main_popup.add( Label01, {row: 0, column: 1});
								main_popup.add( Label02, {row: 1, column: 1});
								main_popup.add( SendDataButton, {row: 2, column: 1});
								main_popup.add( Label03, {row: 3, column: 1});
							
												  
								SendDataButton.addListener("click", function(e)
                                                  {
														SD4();
                                                  }, this);

								main_button.addListener("click", function(e)
                                                    {
                                                        main_popup.placeToMouse(e);
                                                        main_popup.show();
                                                    }, this);

                                console.log('CSBI Loaded');
						
                        }
                    }
				});
			}
        } catch (e) {
            console.log("createCSBI: ", e);
        }

	function SD4(){
	console.log("Crucial Reservations: Updating MCV Timer");
			var WorldID = ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();

			var AllianceID = ClientLib.Data.MainData.GetInstance().get_Alliance().get_Id();

			var PlayerID = ClientLib.Data.MainData.GetInstance().get_Player().get_Id();

			var ResearchLeft;
			var MCVTime;
			var Completed = "false";
			var PercentageOfResearchPoints;
			var BaseCount = 0;
			
			var Bases = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
			for (var selectedBaseID in Bases) {
				if (!Bases.hasOwnProperty(selectedBaseID)) {
					continue;
				}
				BaseCount = BaseCount + 1;
				var selectedBase = Bases[selectedBaseID];
				if (selectedBase === undefined) {
					throw new Error('can not find the base: ' + selectedBaseID);
				}
			}
			BaseCount = BaseCount + 1;
		        var player = ClientLib.Data.MainData.GetInstance().get_Player();
				var playerRank = player.get_OverallRank();
                var PlayerFaction = player.get_Faction();
				
				switch (player.get_Faction()) {
							case ClientLib.Base.EFactionType.GDIFaction:
								var playerFactionD = "GDI";
								break;
							case ClientLib.Base.EFactionType.NODFaction:
								var playerFactionD = "NOD";
								break;
							}

				var PlayerFaction = player.get_Faction();				
                var McvR = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Research_BaseFound, PlayerFaction);
                var PlayerResearch = player.get_PlayerResearch();
				var PlayerCP = player.GetCommandPointCount();
                var MCVNext = PlayerResearch.GetResearchItemFomMdbId(McvR);
				var nextLevelInfo = MCVNext.get_NextLevelInfo_Obj();
                var resourcesNeeded = [];
                for (var i in nextLevelInfo.rr) {
                  if (nextLevelInfo.rr[i].t > 0) {
                    resourcesNeeded[nextLevelInfo.rr[i].t] = nextLevelInfo.rr[i].c;
                  }
                }
                var researchNeeded = resourcesNeeded[ClientLib.Base.EResourceType.ResearchPoints];
                var currentResearchPoints = player.get_ResearchPoints();
				XY = 100 / researchNeeded;
				XYX = currentResearchPoints;
				PercentageOfResearchPoints = XYX * XY;
				if (PercentageOfResearchPoints > 100){
					PercentageOfResearchPoints = "100";
				}
              if (PerforceChangelist >= 387751) { //new
                ResearchLeft = phe.cnc.gui.util.Numbers.formatNumbersCompact(researchNeeded - currentResearchPoints);
              } else { //old
                ResearchLeft = webfrontend.gui.Util.formatNumbersCompact(researchNeeded - currentResearchPoints);
              }
                var creditsNeeded = resourcesNeeded[ClientLib.Base.EResourceType.Gold];
                var creditsResourceData = player.get_Credits();
                var creditGrowthPerHour = (creditsResourceData.Delta + creditsResourceData.ExtraBonusDelta) * ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour();
                var creditTimeLeftInHours = (creditsNeeded - player.GetCreditsCount()) / creditGrowthPerHour;
				var MCVTime = ClientLib.Vis.VisMain.FormatTimespan(creditTimeLeftInHours * 60 * 60);

			ResearchLeft = PercentageOfResearchPoints;
			PlayerFaction = playerFactionD;

				var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=UpdateStatusReserveRecord&PlayerID="+PlayerID+"&WorldID="+WorldID+"&AllianceID="+AllianceID+"&MCVTime="+MCVTime+"&ResearchLeft="+ResearchLeft+"&BaseCount="+BaseCount;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
								}
							}
		        xmlhttp.send(params);


				
	}
		
		function SD5(){

		}
		
		function CSBI_checkIfLoaded() {
            try {
                if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible()) {
						window.setTimeout(SD5, 60000);
						SD4();
						window.setTimeout(CSBI_checkIfLoaded, 1200000);
						
                } else {
                    window.setTimeout(CSBI_checkIfLoaded, 60000);
                }
            } catch (e) {
                console.log("CSBI_checkIfLoaded: ", e);
            }
		}

        if (/commandandconquer\.com/i.test(document.domain)) {
            window.setTimeout(CSBI_checkIfLoaded, 60000);
        }
    }
    try
    {
        var CSBIScript = document.createElement("script");
        CSBIScript.innerHTML = "(" + CSBI_main.toString() + ")();";
        CSBIScript.type = "text/javascript";
        if (/commandandconquer\.com/i.test(document.domain)) {
            document.getElementsByTagName("head")[0].appendChild(CSBIScript);
        }
    } catch (e) {
        console.log("CrucialScript: init error: ", e);
    }
})();

/*
End of cncreserver Link Button
*/
