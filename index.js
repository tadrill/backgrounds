   const scenes = ["pink-triangles", "stars", "snow-globe", "lasers", "moon", "svg", "pattern-animation"];
   var htmlContent = {};
   var currentSceneIndex = Math.floor(Math.random()*scenes.length); //random start
   var INTERVAL = 10000; // ms seconds between switches
   // Function to load the next scene
   function loadNextScene() {
     // grab new random scene index
     let prev = currentSceneIndex;
     while (prev === currentSceneIndex) currentSceneIndex = Math.floor(Math.random()*scenes.length);
     toast(currentSceneIndex);
     document.getElementById("sceneContainer").innerHTML = htmlContent[scenes[currentSceneIndex]];
   }

   // Initialize the scene cycle
   function initializeSceneCycle() {
     // load first random page
     htmlContent[scenes[currentSceneIndex]] = loadSceneContent(scenes[currentSceneIndex]);
     document.getElementById("sceneContainer").innerHTML = htmlContent[scenes[currentSceneIndex]];
     toast(currentSceneIndex);
     // Start the scene cycle
     setInterval(loadNextScene, INTERVAL); // Change scene every interval seconds
     let firstIndex = currentSceneIndex;
     // load the rest
     for (currentSceneIndex = 0; currentSceneIndex  < scenes.length; currentSceneIndex++) {
        if (htmlContent[scenes[currentSceneIndex]]) {
          continue;
        }
        htmlContent[scenes[currentSceneIndex]] = loadSceneContent(scenes[currentSceneIndex]);
    }
    currentSceneIndex = firstIndex;
   }

    // Function to load the content of a scene
    function loadSceneContent(sceneName) {
      // Make an AJAX request to fetch the HTML content of the scene
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "/scenes/" + sceneName + '.html', false);

      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.send();

      if (xhr.status === 200) {
        return xhr.responseText;
      } else {
        console.error("Failed to load scene: " + sceneName);
        return "";
      }
    }

    function toast(index) {
      var file = scenes[index] + '.html';
      document.getElementById("toastText").innerHTML = file;
      document.getElementById("toast").onclick = () => {window.location.href = window.location.href + "scenes/" + file};
      var x = document.getElementById("toast");
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    };
      
    // Call the initialization function when the page finishes loading
    window.addEventListener("load", initializeSceneCycle);