function loadDoc() {
  document.getElementById("status").innerHTML = "Starting...";
  loadJSON(function(info) {
    document.getElementById("status").innerHTML = "Reading File...";
    var gameList = JSON.parse(info).ArrayOfGameInfo.GameInfo;
    console.log(gameList);
    var table = document.getElementById("game-table");
    
    document.getElementById("status").innerHTML = "Adding Games...";
    
    var length = gameList.length;
    
    var game = 0;
    var interv = window.setInterval(function() {
      var row = table.insertRow(game + 1);
      insertCell(row, 0, gameList[game].ID);
      insertCell(row, 1, gameList[game].GameTitle);
      if (gameList[game].ProcessNames == null) {
        insertCell(row, 2, "");
      } else {
        insertCell(row, 2, gameList[game].ProcessNames.string[0]);
      }
      insertCell(row, 3, gameList[game].DisplayName);
      if (gameList[game].LuancherNames == null) {
        insertCell(row, 2, "");
      } else {
        insertCell(row, 2, gameList[game].LuancherNames.string[0]);
      }
      insertCell(row, 5, gameList[game].GameRenderers);
      insertCell(row, 6, gameList[game].InjectionDecision);
      insertCell(row, 7, gameList[game].RunElevated);
      insertCell(row, 8, gameList[game].LauncherDirectoryRegistryKey);
      insertCell(row, 9, gameList[game].GameGenres);
      insertCell(row, 10, gameList[game].UnsupportedScheme);
      insertCell(row, 11, gameList[game].FixResolutionChange);
      insertCell(row, 12, gameList[game].FixInputBlock);
      insertCell(row, 13, gameList[game].Input);
      insertCell(row, 14, gameList[game].FixDIFocus);
      insertCell(row, 15, gameList[game].UseLongHook);
      insertCell(row, 16, gameList[game].Client_GameControlMode);
      insertCell(row, 17, gameList[game].DisableFeature_TS3);
      insertCell(row, 18, gameList[game].Launchable);
      insertCell(row, 19, gameList[game].FixRCEx);
      insertCell(row, 20, gameList[game].UseMCH);
      
      if (gameList.length - 1 == game) {
        document.getElementById("status").innerHTML = "Done!";
        document.getElementById("poster").style.display = "none";
        document.getElementById("game-table").style.opacity = "1";
        document.getElementById("body").style.overflow = "scroll";
        window.clearInterval(interv);
      }
      
      document.getElementById("game-amount").innerHTML = game + "/" + length;
      game += 1;
    }, 20);
    
    document.getElementById("stopbutton").setAttribute("interval", interv);
    
  });
}

document.getElementById("stopbutton").onclick = function() {
  var ele = document.getElementById("stopbutton");
  var inter = ele.getAttribute("interval");
  window.clearInterval(inter);
  document.getElementById("status").innerHTML = "Stopped!";
  window.setTimeout(function() {
    document.getElementById("poster").style.display = "none";
    document.getElementById("game-table").style.opacity = "1";
        document.getElementById("body").style.overflow = "scroll";
  }, 1000);
};

function insertCell(row, index, content) {
  var tmp = row.insertCell(index);
  if (content == null || content == undefined) {
    tmp.innerHTML = "";
  } else {
    tmp.innerHTML = content;
  }
}

function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'res/gameList.json', true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

window.onload = loadDoc();