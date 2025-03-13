// 引入 Matter.js
const {
  Engine,
  Render,
  Runner,
  World,
  Bodies,
  Mouse,
  MouseConstraint,
  Events,
} = Matter;

// 找到 #particle-animate 容器
const container = document.getElementById("particle-animate");

// 設定 Canvas 尺寸
const canvasWidth = container.clientWidth;
const canvasHeight = container.clientHeight;

// 檢查視窗寬度
const windowWidth = window.innerWidth;

// 根據寬度決定是否需要放大元素
let scaleFactor = 1;
if (windowWidth > 1280) {
  scaleFactor = 1.2; // 放大1.2倍
}

// 根據寬度決定元素生成的數量
let objectCount = Math.floor(Math.random() * 24) + 12; // 預設隨機數量
if (windowWidth < 992) {
  objectCount = 12; // 裝置寬度小於992時，固定為12個
}

// 建立 Matter.js 物理引擎
const engine = Engine.create();
const world = engine.world;

// 創建渲染器
const render = Render.create({
  element: container, // 讓 Canvas 放進 #particle-animate
  engine: engine,
  options: {
    width: canvasWidth,
    height: canvasHeight,
    wireframes: false,
    background: "transparent", // 讓背景透明
  },
});

// 隨機位置和角度創建掉落物件
function createImageObject() {
  // 隨機位置和角度
  const x = Math.random() * (canvasWidth - 60 * scaleFactor) + 30 * scaleFactor; // 隨機 X 位置，確保物體不會超出左右邊界
  const y = Math.random() * (canvasHeight / 2) + 30 * scaleFactor; // 隨機 Y 位置，確保物體從畫布的上方生成
  const angle = Math.random() * Math.PI * 2; // 隨機角度

  return Bodies.circle(x, y, 30 * scaleFactor, {
    restitution: 0.7, // 彈性係數 (讓物體彈跳)
    friction: 0.1, // 低摩擦
    frictionAir: 0.02, // 降低空氣阻力，避免物體卡住
    density: 0.005, // 控制質量
    angle: angle, // 設定隨機角度
    render: {
      sprite: {
        texture: "../images/Logo_Coin.svg", // 圖片載入
        xScale: 0.5 * scaleFactor, // 圖片縮放 (適應物理碰撞)
        yScale: 0.5 * scaleFactor,
      },
    },
  });
}

// 創建掉落物件
const objects = [];
for (let i = 0; i < objectCount; i++) {
  objects.push(createImageObject()); // 生成隨機位置和角度的物件
}

// 加入物理世界
World.add(world, objects);

// 增加滑鼠拖曳互動
const mouse = Mouse.create(render.canvas);
let mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.1, // 降低 stiffness 讓拖曳不會太快
    damping: 0.1, // 增加 damping 使物件停止更快
    render: { visible: false },
  },
});
World.add(world, mouseConstraint);

// 邊界處理：確保物件不會超出範圍
Events.on(engine, "beforeUpdate", function () {
  objects.forEach((obj) => {
    // 如果物件超出 canvas 邊界，讓它反彈
    if (obj.position.x - 30 * scaleFactor < 0) {
      Matter.Body.setPosition(obj, { x: 30 * scaleFactor, y: obj.position.y });
      Matter.Body.setVelocity(obj, { x: -obj.velocity.x, y: obj.velocity.y });
    }
    if (obj.position.x + 30 * scaleFactor > canvasWidth) {
      Matter.Body.setPosition(obj, {
        x: canvasWidth - 30 * scaleFactor,
        y: obj.position.y,
      });
      Matter.Body.setVelocity(obj, { x: -obj.velocity.x, y: obj.velocity.y });
    }
    if (obj.position.y - 30 * scaleFactor < 0) {
      Matter.Body.setPosition(obj, { x: obj.position.x, y: 30 * scaleFactor });
      Matter.Body.setVelocity(obj, { x: obj.velocity.x, y: -obj.velocity.y });
    }
    if (obj.position.y + 30 * scaleFactor > canvasHeight) {
      Matter.Body.setPosition(obj, {
        x: obj.position.x,
        y: canvasHeight - 30 * scaleFactor,
      });
      Matter.Body.setVelocity(obj, { x: obj.velocity.x, y: -obj.velocity.y });
    }
  });
});

// 啟動掉落效果的函數
function startDropEffect() {
  // 啟動 Runner (確保物理模擬運行)
  const runner = Runner.create();
  Runner.run(runner, engine);

  // 啟動渲染
  Render.run(render);
}

// 建立 IntersectionObserver
const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      startDropEffect();
      observer.unobserve(container); // 觀察完成後停止觀察
    }
  },
  {
    threshold: 0.5, // 當元素至少50%進入視窗時觸發
  }
);
observer.observe(container);

// 監聽滑鼠離開事件
container.addEventListener("mouseout", function () {
  // 移除滑鼠約束
  World.remove(world, mouseConstraint);
});

// 監聽滑鼠進入事件，以便在滑鼠進入時重新添加約束
container.addEventListener("mouseover", function () {
  // 重新添加滑鼠約束
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.1, // 降低 stiffness 讓拖曳不會太快
      damping: 0.1, // 增加 damping 使物件停止更快
      render: { visible: false },
    },
  });
  World.add(world, mouseConstraint);
});
