var
canv = document.getElementById('canvas'),
ctx = canv.getContext('2d');

canv.width = 500;//window.innerWidth;//400;
canv.height = 500;//window.innerHeight;//400;
n=10;
map = new Array();
map.lenght = n;
XBegin= -1;
YBegin= -1;
XEnd= -1;
YEnd= -1;
X=1;
Y=1;
Xe=1;
Ye=1;
size = canv.width/n;
isMouseDown = false;
isDelDown = false;
isBeginDown = false;
isEndDown = false;
isEnterDown = false;

// ---------------------------- Рисование карты ------------------
map.length = n;
for(var i=0; i<n; i++){
    map[i] = new Array();
    map[i].length = n;
}
for (var i=0; i<map.length; i++){
  for (var j=0; j<map[i].length; j++)
    map[i][j] = 0;}


canv.addEventListener('mousedown',function() {
    isMouseDown = true;
});

canv.addEventListener('mouseup',function() {
    isMouseDown = false;
});

document.addEventListener('keydown',function(e){
    if(e.keyCode == 46)isDelDown = true;
    if(e.keyCode == 66)isBeginDown = true;
    if(e.keyCode == 69)isEndDown = true;
    if (e.keyCode == 13) isEnterDown = true;
   // console.log(isEnterDown);
    //console.log(e.keyCode);
    
})

document.addEventListener('keyup',function(e){
    if(e.keyCode == 46)isDelDown = false;
    if(e.keyCode == 66)isBeginDown = false;
    if(e.keyCode == 69)isEndDown = false;
    if (e.keyCode == 13) isEnterDown = false;
})

canv.addEventListener('mousemove',function(e) {
    x = Math.floor(e.offsetX/size);
    y = Math.floor(e.offsetY/size);

    if((isMouseDown)&&(isDelDown)){
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.fillRect(x*size,y*size, size, size);
        ctx.fill();
       map[x][y]=0;
    }
    if((isMouseDown)&&(isDelDown==false)){
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.fillRect(x*size,y*size, size, size);
        ctx.fill();
        map[x][y]=1; 
    }
    if((isMouseDown)&&(isBeginDown)){
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.fillRect(x*size,y*size, size, size);
        ctx.fill();
        X1=x;
        Y1=y;
        if((X!=X1)||(Y!=Y1)){
            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.fillRect(X*size,Y*size, size, size);
            ctx.fill();
           map[X][Y]=0; 
        }
        XBegin=x;X=x;
        YBegin=y;Y=y;
        map[x][y]=0;
    }
    if((isMouseDown)&&(isEndDown)){
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.fillRect(x*size,y*size, size, size);
        ctx.fill();
        Xe1=x;
        Ye1=y;
        if((Xe!=Xe1)||(Ye!=Ye1)){
            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.fillRect(Xe*size,Ye*size, size, size);
            ctx.fill();
           map[Xe][Ye]=0; 
        }

        XEnd=x;Xe=x;
        YEnd=y;Ye=y;
        map[x][y]=0;
    }

        
    
    //console.log(Math.floor(e.offsetX/n)*n);
});

canv.addEventListener('mousedown',function(e) {
    x = Math.floor(e.offsetX/size);
    y = Math.floor(e.offsetY/size);

    if((isMouseDown)&&(isDelDown)){
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.fillRect(x*size,y*size, size, size);
        ctx.fill();
       map[x][y]=0;
    }
    if((isMouseDown)&&(isDelDown==false)){
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.fillRect(x*size,y*size, size, size);
        ctx.fill();
        map[x][y]=1; 
    }
    if((isMouseDown)&&(isBeginDown)){
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.fillRect(x*size,y*size, size, size);
        ctx.fill();
        X1=x;
        Y1=y;
        if((X!=X1)||(Y!=Y1)){
            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.fillRect(X*size,Y*size, size, size);
            ctx.fill();
           map[X][Y]=0; 
        }
        XBegin=x;X=x;
        YBegin=y;Y=y;
        map[x][y]=0;
    }
    if((isMouseDown)&&(isEndDown)){
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.fillRect(x*size,y*size, size, size);
        ctx.fill();
        Xe1=x;
        Ye1=y;
        if((Xe!=Xe1)||(Ye!=Ye1)){
            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.fillRect(Xe*size,Ye*size, size, size);
            ctx.fill();
           map[Xe][Ye]=0; 
        }

        XEnd=x;Xe=x;
        YEnd=y;Ye=y;
        map[x][y]=0;
    }

        
    
    //console.log(Math.floor(e.offsetX/n)*n);
});
// -------------------------------------------------------------------------------------


const bfs = function(map, fromRow, fromColumn, toRow, toColumn) {
    const pack = (row, column) => `${row}:${column}`;
    const unpack = cell => cell.split(':').map(x => parseInt(x, 10));
  
    const visited = new Set();
    const isValidNeighbour = function(row, column) {
      if (row < 0 || row >= map.length) {
        return false;
      }
  
      if (column < 0 || column >= map[row].length) {
        return false;
      }
  
      const cell = pack(row, column);
      if (visited.has(cell)) {
        return false;
      }
  
      return map[row][column] === 0;
    };
  
    let step = new Map();
    const initialCell = pack(fromRow, fromColumn);
    step.set(initialCell, [initialCell]);
    while (step.size > 0) {
      const nextStep = new Map();
      const tryAddCell = function(row, column, path) {
        if (isValidNeighbour(row, column)) {
          const cell = pack(row, column);
          const newPath = [...path];
          newPath.push(cell);
          nextStep.set(cell, newPath);
          visited.add(cell);
        }
      };
  // -------- Функция вывода ----
      for (const [cell, path] of step) {
        const [row, column] = unpack(cell);
        if (row === toRow && column === toColumn) {
            let arr = new Array();;
            for (i=0;i<path.length-1; i++){
                if(i!=path.length){
                    arr[i] = path[i].split(':', 2);
                    arr[i+1] = path[i+1].split(':', 2);
                    xi=arr[i][0];
                    yi=arr[i][1];
                    xj=arr[i+1][0];
                    yj=arr[i+1][1];
                }
                ctx.moveTo(xi*size+size/2,yi*size+size/2);
                ctx.lineTo(xj*size+size/2,yj*size+size/2);
                ctx.strokeStyle = "yellow"; //цвет линии
                ctx.lineWidth = size/5; //толщина линии
                ctx.stroke();
            }
            return path;
        }
  
        tryAddCell(row - 1, column, path);
        tryAddCell(row + 1, column, path);
        tryAddCell(row, column - 1, path);
        tryAddCell(row, column + 1, path);
      }
  
      step = nextStep;
    }
  
    return null;
  };

//-------------Вывод пути при нажатии enter
  document.addEventListener('keydown',function(e){
if(isEnterDown){
    bfs(map, XBegin, YBegin, XEnd, YEnd
   // console.log(isEnterDown);
   //console.log(YBegin, XBegin, YEnd, XEnd);
   /* document.write("map:<br>")
   for (var i=0; i<map.length; i++)
{
  for (var j=0; j<map[i].length; j++)
    document.write(map[j][i]+" ")
  document.write("<br>")
}*/);
if(bfs(map, XBegin, YBegin, XEnd, YEnd)==null){
    console.log("Выхода нет") 
}
}})