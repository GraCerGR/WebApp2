(function() {

    var buffer, context, drawMap, map, size;
  
    buffer = document.createElement("canvas").getContext("2d");
    context = document.querySelector("canvas").getContext("2d");
  
    map = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
           [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
           [1,0,1,1,1,0,0,1,0,0,1,0,0,1,0,1],
           [1,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
           [1,0,0,1,0,0,0,1,0,1,1,1,0,1,0,1],
           [1,0,0,1,0,1,0,1,0,1,0,0,0,0,0,1],
           [1,0,0,1,0,1,0,1,0,0,1,1,0,1,0,1],
           [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
           [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
           [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
           [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
           [1,0,1,1,1,0,0,1,0,0,1,0,0,1,0,1],
           [1,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
           [1,0,0,1,0,0,0,1,0,1,1,1,0,1,0,1],
           [1,0,0,1,0,1,0,1,0,1,0,0,0,0,0,1],
           [1,0,0,1,0,1,0,1,0,0,1,1,0,1,0,1]];
  
    size = 32;
  
    buffer.canvas.width = 16 * size;
    buffer.canvas.height = 16 * size;
  
    drawMap = function() {
  
      for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[i].length; j++) {
  
        buffer.fillStyle = (map[i][j] == 1)?"#000000":"#ffffff";
        buffer.fillRect(j * size, i * size, size, size);
  
      }}
  
      context.drawImage(buffer.canvas, 0, 0, buffer.canvas.width, buffer.canvas.height, 0, 0, context.canvas.width, context.canvas.height);
  
    };
  
    // just keeps the canvas element sized appropriately
    resize = function(event) {
  
      context.canvas.width = Math.floor(document.documentElement.clientWidth - 32);
  
      if (context.canvas.width > document.documentElement.clientHeight) {
  
        context.canvas.width = Math.floor(document.documentElement.clientHeight);
  
      }
  
      context.canvas.height = Math.floor(context.canvas.width);
  
      drawMap();
  
    };
  
    window.addEventListener("resize", resize, {passive:true});
  
    resize();
  
  })();