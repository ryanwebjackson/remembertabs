var rememberTabs = function() {
	var prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
	var remember; // for scope
	return {
		init : function() {
			gBrowser.addEventListener("load", function() {
				// Set browser preferences, if different from extension preferences
				
				// Obtain current extension preferences
				remember = prefManager.getBoolPref("extensions.remembertabs.remember");
				var showOnToolbar = prefManager.getBoolPref("extensions.remembertabs.toolbar");
				var showOnStatusbar = prefManager.getBoolPref("extensions.remembertabs.statusbar");
				
				// Obtain browser preferences
				var browserStartupPage = prefManager.getIntPref("browser.startup.page");
				
				// Set browser settings
				if ( !(browserStartupPage == 1 && remember == false)
					&& !(browserStartupPage == 3 && remember == true) ) {
					// extension and browser preferences are not equivalent, set accordingly
					setBrowserPref();
				}
				
				// Add buttons to the UI using extension preferences
				
			}, false);
		},
		toggle : function() {
			remember = !remember;
			setBrowserPref();
		},
		setBrowserPref : function() {
			if (remember == true) {
				prefManager.setIntPref("browser.startup.page", 3);
			}
			else {
				prefManager.setIntPref("browser.startup.page", 1);
			}
		}
	
	};

}();
window.addEventListener("load", rememberTabs.init, false);