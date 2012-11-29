(function () {
  var Widget = require("widget").Widget;
  var tabs = require('tabs');
  var self = require("self");
  var contextMenu = require("context-menu");
  var hotkeys = require ("hotkeys");

  exports.main = function() {
    var loadCachedPage = function () {
      var currentUrl = tabs.activeTab.url;
      var gCacheUrlPrefix = "http://webcache.googleusercontent.com/search?q=cache:";
      var cacheUrl = gCacheUrlPrefix + currentUrl;
      tabs.activeTab.url = cacheUrl;
      tabs.activeTab.reload();
    };

    var createMenuItemFor = function (kontext) {
      return  contextMenu.Item({
        label: "View Google's cache",
        image: self.data.url ("images/icon.png"),
        context: kontext,
        contentScript: 'self.on("click", function () {' +
          '  self.postMessage();' +
          '});',
        onMessage: function () {
          loadCachedPage ();
        }
      });
    };

    var createWidget = function () {
      new Widget({
        id: "sdqali-getcache",
        label: "Get Google's cached version of the current page..",
        contentURL: self.data.url ("images/icon.png"),
        onClick: function(event) {
          loadCachedPage ();
        }
      });
    };

    var assignHotKeys = function () {
      return hotkeys.Hotkey({
        combo: "accel-alt-shift-c",
        onPress: function() {
          loadCachedPage ();
        }
      });
    };

    createMenuItemFor (contextMenu.SelectionContext ());
    createMenuItemFor (contextMenu.PageContext ());
    createWidget ();
    assignHotKeys ();
  };
}) ();
