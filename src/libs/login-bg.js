var loginBG = {};

loginBG._main_ = function () {
  var canvasEl = document.getElementById('canvas');
  var ctx = canvasEl.getContext('2d');
  var mousePos = [0, 0];

  var easingFactor = 5.0;
  var gradient = ctx.createLinearGradient(0, 0, canvasEl.width, 0);
  gradient.addColorStop(0, 'rgb(0, 0, 0)');
  gradient.addColorStop(1, 'rgb(41, 42, 43)');
  //var backgroundColor = '#2b2b2b';
  var nodeColor = '#fff';
  var edgeColor = '#fff';

  var nodes = [];  //存储星星和边
  var edges = [];

  function constructNodes() {    //构建了所有节点
    for (var i = 0; i < 100; i++) {
      var node = {
        drivenByMouse: i == 0,   //鼠标跟随的效果
        x: Math.random() * canvasEl.width,
        y: Math.random() * canvasEl.height,
        vx: Math.random() * 1 - 0.5,
        vy: Math.random() * 1 - 0.5,
        radius: Math.random() > 0.9 ? 3 + Math.random() * 3 : 1 + Math.random() * 3  
        //用概率控制点的半径取值，不断调整这个概率阈值就能获取期待的半径随机分布
      };

      nodes.push(node);
    }

    //构建点与点之间的连线，这里用到双重遍历，把两个点捆绑成一组，放到 edges 数组中
    nodes.forEach(function (e) {
      nodes.forEach(function (e2) {
        if (e == e2) {
          return;
        }

        var edge = {
          from: e,
          to: e2
        }

        addEdge(edge);
      });
    });
  }

  function addEdge(edge) {
    var ignore = false;   // ignore 来判断 是否是重复的点  A=>B 和 B=>A

    edges.forEach(function (e) {
      if (e.from == edge.from && e.to == edge.to) {
        ignore = true;
      }

      if (e.to == edge.from && e.from == edge.to) {
        ignore = true;
      }
    });

    if (!ignore) {
      edges.push(edge);
    }
  }

  function step() {      //让点动起来
    nodes.forEach(function (e) {
      if (e.drivenByMouse) {
        return;
      }

      e.x += e.vx;
      e.y += e.vy;

      // 设置最大最小范围
      function clamp(min, max, value) {
        if (value > max) {
          return max;
        } else if (value < min) {
          return min;
        } else {
          return value;
        }
      }

      if (e.x <= 0 || e.x >= canvasEl.width) {
        e.vx *= -1;
        e.x = clamp(0, canvasEl.width, e.x)
      }

      if (e.y <= 0 || e.y >= canvasEl.height) {
        e.vy *= -1;
        e.y = clamp(0, canvasEl.height, e.y)
      }
    });

    adjustNodeDrivenByMouse();
    render();
    window.requestAnimationFrame(step); 
    //此方法告诉浏览器您希望执行动画，并请求浏览器调用指定的函数在下一次重绘之前更新动画。该方法将在重绘之前调用的回调作为参数。
  }

  function adjustNodeDrivenByMouse() {
    nodes[0].x += (mousePos[0] - nodes[0].x) / easingFactor;
    nodes[0].y += (mousePos[1] - nodes[0].y) / easingFactor;
  }

  function lengthOfEdge(edge) {   //计算两点之间的距离
    return Math.sqrt(Math.pow((edge.from.x - edge.to.x), 2) + Math.pow((edge.from.y - edge.to.y), 2));
  }

  function drawImgBg(){
    var yImg = new Image();
    yImg.onload = function(){  
      var bg = ctx.createPattern(this,'repeat');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);   
    };
    yImg.src = 'https://file.iviewui.com/iview-admin/login_bg.jpg';
  }

  function render() {
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);

    edges.forEach(function (e) {
      var l = lengthOfEdge(e);
      var threshold = canvasEl.width / 8;

      if (l > threshold) {  //根据阈值threshold来判断是否要绘制这条边
        return;
      }

      ctx.strokeStyle = edgeColor;
      ctx.lineWidth = (1.0 - l / threshold) * 2.5;
      ctx.globalAlpha = 1.0 - l / threshold;
      ctx.beginPath();
      ctx.moveTo(e.from.x, e.from.y);
      ctx.lineTo(e.to.x, e.to.y);
      ctx.stroke();
    });
    ctx.globalAlpha = 1.0;

    nodes.forEach(function (e) {
      if (e.drivenByMouse) {
        return;
      }

      ctx.fillStyle = nodeColor;
      ctx.beginPath();
      ctx.arc(e.x, e.y, e.radius, 0, 2 * Math.PI);
      ctx.fill();
    });
  }

  window.onresize = function () {    //窗口变化调整自身分辨率
    canvasEl.width = document.body.clientWidth;
    canvasEl.height = canvasEl.clientHeight;

    if (nodes.length == 0) {
      constructNodes();
    }

    render();
  };

  window.onmousemove = function (e) {
    mousePos[0] = e.clientX;
    mousePos[1] = e.clientY;
  }

  window.onresize(); // trigger the event manually.
  window.requestAnimationFrame(step);
}

export default loginBG;