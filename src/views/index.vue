<template>
  <div class="page">
    <div class="module">
      <h4 class="bubbles middle">1、查看 bubbles / cancelable</h4>
      <div class="outer" @click="outerBubblesClick">
        <div class="inner" @click="innerBubblesClick">
          <button @click="buttonBubblesClick">click事件</button>
        </div>
      </div>
      <input type="text" @focus="focusBubbles" placeholder="focus事件">
    </div>
    <!-- cancelable 事件是否可以取消 -->
    <div class="module">
      <h4 class="middle">2、用户在提交表单之前输入了错误的数据，我们使用preventDefault()方法来取消事件</h4>
      <!-- @submit来监听表单提交事件 prevent防止表单提交时刷新页面 -->
      <form action="/home" method="get" @submit="onSubmit">
        <input type="text" name="name" v-model="name" />
        <button type="submit">提交</button>
      </form>
    </div>
    <!-- composed 属性 只读 一个布尔值，表示事件是否可以穿过 Shadow DOM 和常规 DOM 之间的隔阂进行冒泡。 -->
    <div class="module">
      <h4 class="middle">1、Shadow DOM 的结构</h4>
      <iframe src="http://127.0.0.1:5500/shadow/index.html" frameborder="0"></iframe>
    </div>
    <!-- Event.currentTarget 属性 -->
    <div class="module">
      <h4 class="middle">Event.currentTarget 属性</h4>
      <p>后羿射日</p>
      <p>昔日天上十日炽，烧枯山川万物悲。</p>
      <p>后羿英雄持神弓，射落九日救苍生。</p>
      <p>一日留存照四海，人间复见清明时。</p>
      <p>后羿归来欢聚妻，嫦娥美貌如玉姿。</p>
      <p>王母赐予不死药，后羿藏匿不敢服。</p>
      <p>嫦娥偷吞意欲升，化作月光飞上天。</p>
      <p>后羿望月空叹息，思念妻子泪沾衣。</p>
      <p>月中有兔有桂树，寂寞嫦娥自怜悲。</p>
      <button @click="currentTargetHandler">Event.currentTarget 属性</button>
    </div>
    <div class="module">
      <h4 class="middle">Event.target 属性</h4>
      <button @click="eventTargetDelegation">事件委托</button>
      <ul class="uldom">
        <li>11111</li>
        <li>2222</li>
        <li>33333</li>
      </ul>
    </div>
    <!-- Event.defaultPrevented  -->
    <div class="module">
      <h4 class="middle">Event.defaultPrevented 属性</h4>
      <a href="https://vuejs.org" target="_blank" @click="defaultPreventedHandler">Event.defaultPrevented 属性</a>
    </div>
    <!-- eventPhase -->
    <div class="module">
      <h4 class="middle">eventPhase 事件传播链</h4>
      <button @click="eventPhaseHandler">eventPhase 事件传播链</button>
      <input type="checkbox" id="chCapture" />
      <label for="chCapture">同时监听冒泡和捕获阶段</label>
      <div id="d1" class="eventPhaseDiv">d1
        <div id="d2" class="eventPhaseDiv">d2
          <div id="d3" class="eventPhaseDiv">d3
            <div id="d4" class="eventPhaseDiv">d4</div>
          </div>
        </div>
      </div>
      <div id="divInfo"></div>
    </div>
    <div class="module">
      <h4 class="middle">Event.timestamp 属性</h4>
      <button @click="timestampHandler">点击获取timestamp 属性值</button>
      <div id="timer"></div>
      <div class="timestampdom">事件创建时的时间戳</div>
    </div>
    <div class="module">
      <h4 class="middle">Event.type 属性</h4>
      <button @click="typeHandler">按任意键或单击鼠标以获取事件类型</button>
      <div>
        <p>事件类型: <span id="Etype" style="color:red">-</span></p>
      </div>
    </div>
    <div class="module">
      <h4 class="middle">Event.isTrusted 属性</h4>
      <button @click="isTrustedHandler">添加监听</button>
      <button @click="isTrustedTouch">new event触发</button>
      <div class="isTrusted">isTrusted</div>
    </div>
    <div class="module">
      <h4 class="middle">Event.stopImmediatePropagation 方法</h4>
      <button @click="stopImmediatePropagationHandler">stopImmediatePropagation</button>
      <div class="stopImmediatePropagationdiv">
        <p class="stopImmediatePropagationp">paragraph</p>
      </div>
    </div>
    <div class="module">
      <h4 class="middle">自定义事件游戏</h4>
      <button @click="gameHandler">开始游戏</button>
      <div class="area">
        <div class="person tom">tom</div>
        <div class="person jack">jack</div>
      </div>
    </div>
    <!-- <a href="https://flatuicolors.com/">颜色搭配网站</a> -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      name: "",
      top: 0,
      left: 0,
    };
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeyDown);
    // timestampHandler
    window.onload = () => {
      this.startTimer();
      setTimeout(() => {
        this.stopTimer()
      }, 5000);
    }
  },
  methods: {
    // 例子1 bubbles cancelable
    outerBubblesClick(event) {
      console.log(event.currentTarget);//变
      console.log(event.target);//不变
      // console.log('外部div event.bubbles =', event.bubbles);
      // console.log('event.cancelable', event.cancelable);
    },
    innerBubblesClick(event) {
      console.log(event.currentTarget);
      console.log(event.target);
      // console.log('内部div event.bubbles =', event.bubbles);
      // console.log('event.cancelable', event.cancelable);
    },
    buttonBubblesClick(event) {
      console.log(event.currentTarget);
      console.log(event.target);
      // event.preventDefault();
      // console.log('点击按钮 event.bubbles =', event.bubbles);
      // console.log('event.cancelable', event.cancelable);
    },
    focusBubbles(event) {
      // event.preventDefault();
      console.log('focus event.bubbles =', event.bubbles);
      // console.log('event.cancelable', event.cancelable);
    },
    // 例子2
    // 用户在提交表单之前输入了错误的数据，我们使用preventDefault()方法来取消事件。如果事件不可取消，则preventDefault()方法将无效。
    onSubmit(event) {
      if (this.name === "") {
        if (event.cancelable) {
          event.preventDefault();
        }
        alert("请输入名字");
      }
    },
    // Event.currentTarget 属性
    currentTargetHandler() {
      function hide(e) {
        // e.currentTarget.style.visibility = "hidden";
        // e.target.style.visibility = "hidden";
        console.log(e.currentTarget);
        console.log(e.target);
      }
      let ps = document.getElementsByTagName('p');
      for (let i = 0; i < ps.length; i++) {
        ps[i].addEventListener('click', hide, false);
      }
    },
    // Event.defaultPrevented 属性
    defaultPreventedHandler(event) {
      console.log('Event.defaultPrevented 属性', event.defaultPrevented); // false 没用调用preventDefault()方法
      event.preventDefault();
      console.log('Event.defaultPrevented 属性', event.defaultPrevented); // true 调用了preventDefault()方法
    },
    // eventPhase 事件传播链
    eventPhaseHandler() {
      let clear = false;
      let divInfo = null;
      let divs = null;
      // 显示板
      divInfo = document.getElementById("divInfo");
      // divs d1 d2 d3 d4
      divs = document.getElementsByClassName("eventPhaseDiv");
      // 冒泡/捕获
      let chCapture = document.getElementById("chCapture");
      chCapture.onclick = function () {
        RemoveListeners();
        AddListeners();
      }
      Clear();
      AddListeners();
      function RemoveListeners() {
        // 移除所有的事件监听
        for (let i = 0; i < divs.length; i++) {
          let d = divs[i];
          d.removeEventListener("click", OnDivClick, true);
          d.removeEventListener("click", OnDivClick, false);
        }
      }
      // 核心代码
      function AddListeners() {
        for (let i = 0; i < divs.length; i++) {
          let d = divs[i];
          d.addEventListener("click", OnDivClick, false);// 冒泡
          if (chCapture.checked) {
            d.addEventListener("click", OnDivClick, true);// 捕获
          }
          d.onmousemove = function () { clear = true; };
        }
      }

      function OnDivClick(e) {
        if (clear) {
          // 之前有点击过，重新设置颜色
          Clear();
          clear = false;
        }
        if (e.eventPhase == 2) {
          e.currentTarget.style.backgroundColor = 'red';
        }
        divInfo.innerHTML += e.currentTarget.id + "; eventPhase: " + e.eventPhase + "<br/>";
      }

      function Clear() {
        // 重新设置颜色
        for (let i = 0; i < divs.length; i++) {
          divs[i].style.backgroundColor = (i & 1) ? "#f6eedb" : "#cceeff";
        }
        // 清空divInfo
        divInfo.innerHTML = '';
      }
    },
    eventTargetDelegation() {
      // uldom
      let ul = document.querySelector('.uldom');
      ul.addEventListener('click', (e) => {
        e.target.style.visibility = 'hidden';
      }, false);

    },
    updateTimer() {
      var elapsedTime = Date.now() - this.startTime;
      document.getElementById("timer").innerHTML = elapsedTime;
    },
    startTimer() {
      this.startTime = Date.now();
      this.timer = setInterval(this.updateTimer, 100);
    },
    stopTimer() {
      clearInterval(this.timer);
    },
    timestampHandler(e) {
      // 获取当前的时间戳 
      // 打印当前的时间戳
      // 1、当我们点击的时候就创建了点击事件。
      // 2、将时间写到页面上。
      document.querySelector('.timestampdom').innerHTML = e.timeStamp;
      // 停止5s计时器
      this.stopTimer();
    },
    typeHandler() {
      // let currEvent = null;
      // 处理函数
      function getEvtType(evt) {
        // currEvent = evt.type;
        // document.getElementById("Etype").innerHTML = currEvent;
        document.getElementById("Etype").innerHTML = evt.type;
      }
      //Keyboard events
      document.addEventListener("keypress", getEvtType, false); //[second]
      document.addEventListener("keydown", getEvtType, false); //first
      document.addEventListener("keyup", getEvtType, false); //third

      //Mouse events
      document.addEventListener("click", getEvtType, false); // third
      document.addEventListener("mousedown", getEvtType, false); //first
      document.addEventListener("mouseup", getEvtType, false); //second
    },
    isTrustedTouch() {
      // var event = new Event('click');
      // let elem = 
      document.querySelector('.isTrusted').click();
      // elem.dispatchEvent(event);
    },
    isTrustedHandler() {
      let elem = document.querySelector('.isTrusted');
      elem.addEventListener('click', function (e) {
        if (e.isTrusted) {
          console.log('e.type:', e.type, 'e.isTrusted:', e.isTrusted);
          e.target.style.color = 'green';
        } else {
          console.log('e.type:', e.type, 'e.isTrusted:', e.isTrusted);
          e.target.style.color = 'red';
        }
      }, false);
    },
    stopImmediatePropagationHandler() {
      const p = document.querySelector('.stopImmediatePropagationp')
      p.addEventListener("click", () => {
        alert("我是 p 元素上被绑定的第一个监听函数");
      }, false);

      p.addEventListener("click", (event) => {
        alert("我是 p 元素上被绑定的第二个监听函数");
        // 执行 stopImmediatePropagation 方法，阻止 click 事件冒泡，并且阻止 p 元素上绑定的其他 click 事件的事件监听函数的执行。
        // event.stopImmediatePropagation();//第一个和第二个会执行 
        // Propagation 传播
        event.stopPropagation();//只会阻止冒泡
      }, false);

      p.addEventListener("click", () => {
        alert("我是 p 元素上被绑定的第三个监听函数");
        // 该监听函数排在上个函数后面，该函数不会被执行
      }, false);

      document.querySelector(".stopImmediatePropagationdiv").addEventListener("click", () => {
        alert("我是 div 元素，我是 p 元素的上层元素");
        // p 元素的 click 事件没有向上冒泡，该函数不会被执行
      }, false);
    },
    gameHandler() {
      let persons = document.getElementsByClassName('person');
      for (let index = 0; index < persons.length; index++) {
        let person = persons[index];
        person.addEventListener('change-color', (e) => {
          if (e.detail && e.detail.color && person.style.backgroundColor !== e.detail.color) {
            person.style.backgroundColor = e.detail.color;
          } else {
            person.style.backgroundColor = 'red';
          }
        });
        person.addEventListener('move-left', () => {
          person.style.left = person.offsetLeft - 10 + 'px';
        });
        person.addEventListener('move-up', () => {
          person.style.top = person.offsetTop - 10 + 'px';
        });
        person.addEventListener('move-right', () => {
          person.style.left = person.offsetLeft + 10 + 'px';
        });
        person.addEventListener('move-down', () => {
          person.style.top = person.offsetTop + 10 + 'px';
        });
      }
    },
    handleKeyDown(event) {
      let tom = document.querySelector('.tom');
      let jack = document.querySelector('.jack');
      switch (event.keyCode) {
        // Q
        case 81:
          // tom可以变色
          tom.dispatchEvent(new CustomEvent('change-color', {
            "bubbles": true,
            "cancelable": true,
            "detail": {
              color: 'green'
            }
          }));
          break;
        // 左
        case 37:
          tom.dispatchEvent(new CustomEvent('move-left'));
          break;
        // 上
        case 38:
          tom.dispatchEvent(new CustomEvent('move-up'));
          break;
        // 右
        case 39:
          tom.dispatchEvent(new CustomEvent('move-right'));
          break;
        // 下
        case 40:
          tom.dispatchEvent(new CustomEvent('move-down'));
          break;
        // A
        case 65:
          jack.dispatchEvent(new CustomEvent('move-left'));
          break;
        // W
        case 87:
          jack.dispatchEvent(new CustomEvent('move-up'));
          break;
        // D
        case 68:
          jack.dispatchEvent(new CustomEvent('move-right'));
          break;
        // S
        case 83:
          jack.dispatchEvent(new CustomEvent('move-down'));
          break;
      }
    },


  },
}
</script>
<style scoped lang="scss">
.page {
  display: flex;
  flex-wrap: wrap;

  .module {
    margin: 20px;
    padding: 20px;
    border: 1px solid #ccc;

    .outer {
      width: 240px;
      height: 100px;
      background-color: #eccc68;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;


      .inner {
        width: 220px;
        height: 50px;
        background-color: #ff7f50;
        display: flex;
        align-items: center;
        justify-content: center;


        button {
          width: 200px;
        }
      }
    }

    .eventPhaseDiv {
      margin: 20px;
      padding: 4px;
      border: thin black solid;
    }

    #divInfo {
      margin: 18px;
      padding: 8px;
      background-color: white;
      font-size: 80%;
    }

    .stopImmediatePropagationdiv {
      height: 30px;
      width: 150px;
      background-color: #cfc;

      .stopImmediatePropagationp {
        height: 30px;
        width: 150px;
        background-color: #ccf;
      }
    }

    .area {
      position: relative;
      width: 300px;
      height: 300px;
      background-color: #cfc;

      .person {
        position: absolute;

        width: 10px;
        height: 10px;
        background-color: #ff7f50;
      }

      .tom {
        left: 10px;
        top: 10px;
      }

      .jack {
        right: 10px;
        top: 10px;
      }
    }


  }
}
</style>
