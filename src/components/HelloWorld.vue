<template>
  <div class="page">
    <div class="module">
      <h4 class="middle">查看 bubbles 属性的值</h4>
      <div class="outer" @click="outerClick">
        <div class="inner" @click="innerClick">
          <button @click="buttonClick">查看只读属性 bubbles 的值</button>
        </div>
      </div>
    </div>
    <div class="module">
      <h4 class="middle">使用 cancelBubble 属性来阻止事件继续冒泡</h4>
      <div class="outer" @click="outerClick">
        <div class="inner" @click="innerClick">
          <button @click="buttonClick">使用 cancelBubble 属性来阻止事件继续冒泡</button>
        </div>
      </div>
    </div>
    <!-- cancelable 事件是否可以取消 -->
    <div class="module">
      <h4 class="middle">事件是否可以取消</h4>
      <button @click="clickHandler">事件是否可以取消</button>
    </div>
    <!-- composed 属性 只读 一个布尔值，表示事件是否可以穿过 Shadow DOM 和常规 DOM 之间的隔阂进行冒泡。 -->
    <div class="module">
      <h4 class="middle">1、Shadow DOM 的结构</h4>
      <iframe src="http://127.0.0.1:5500/shadow/shadow.html" frameborder="0"></iframe>
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
    <!-- Event.defaultPrevented  -->
    <div class="module">
      <h4 class="middle">Event.defaultPrevented 属性</h4>
      <a href="https://vuejs.org" @click="defaultPreventedHandler">Event.defaultPrevented 属性</a>
    </div>
    <!-- eventPhase -->
    <div class="module eventPhase">
      <h4 class="middle">eventPhase 事件传播链</h4>
      <button @click="eventPhaseHandler">eventPhase 事件传播链</button>
      <ul>
        <li>点击'd1'</li>
        <li>分析事件传播链</li>
        <li>单击下一个 div 并重复该体验</li>
        <li>改变捕获模式</li>
        <li>重复这个经历</li>
      </ul>
      <input type="checkbox" id="chCapture" />
      <label for="chCapture">Use Capturing</label>
      <div id="d1" class="eventPhaseDiv">d1
        <div id="d2" class="eventPhaseDiv">d2
          <div id="d3" class="eventPhaseDiv">d3
            <div id="d4" class="eventPhaseDiv">d4</div>
          </div>
        </div>
      </div>
      <div id="divInfo"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  mounted() {
  },
  methods: {
    outerClick(event) {
      console.log('外部div event.bubbles =', event.bubbles);
    },
    innerClick(event) {
      console.log('内部div event.bubbles =', event.bubbles);
      // event.bubbles = false; // 只读属性
      event.cancelBubble = true;// true 为阻止事件继续冒泡 false 为不阻止事件继续冒泡
      console.log('内部div event.bubbles =', event.bubbles);
    },
    buttonClick(event) {
      console.log('点击按钮 event.bubbles =', event.bubbles);
    },
    // 事件是否可以取消
    clickHandler(event) {
      console.log('事件是否可以取消', event.cancelable); // true
      // event.cancelable = false;
      console.log('事件是否可以取消', event.cancelable); // true
    },
    // Event.currentTarget 属性
    currentTargetHandler() {
      function hide(e) {
        e.currentTarget.style.visibility = "hidden";
        console.log(e.currentTarget);
      }
      var ps = document.getElementsByTagName('p');
      for (var i = 0; i < ps.length; i++) {
        ps[i].addEventListener('click', hide, false);
      }
    },
    // Event.defaultPrevented 属性
    defaultPreventedHandler(event) {
      console.log('Event.defaultPrevented 属性', event.defaultPrevented); // false
      event.preventDefault();
      console.log('Event.defaultPrevented 属性', event.defaultPrevented); // true
    },
    // eventPhase 事件传播链
    eventPhaseHandler() {
      var clear = false, divInfo = null, divs = null;
      // 给所有的 div 移除事件
      function RemoveListeners() {
        for (var i = 0; i < divs.length; i++) {
          var d = divs[i];
          if (d.id != "divInfo") {
            d.removeEventListener("click", OnDivClick, true);
            d.removeEventListener("click", OnDivClick, false);
          }
        }
      }
      // 给所有的 div 添加事件
      function AddListeners() {
        for (var i = 0; i < divs.length; i++) {
          var d = divs[i];
          if (d.id != "divInfo") {
            d.addEventListener("click", OnDivClick, false);
            if (chCapture.checked)
              d.addEventListener("click", OnDivClick, true);
            d.onmousemove = function () { clear = true; };
          }
        }
      }

      function OnDivClick(e) {
        if (clear) {
          Clear(); clear = false;
        }
        if (e.eventPhase == 2)
          e.currentTarget.style.backgroundColor = 'red';
        var level = e.eventPhase == 0 ? "none" : e.eventPhase == 1 ? "capturing" : e.eventPhase == 2 ? "target" : e.eventPhase == 3 ? "bubbling" : "error";
        divInfo.innerHTML += e.currentTarget.id + "; eventPhase: " + level + "<br/>";
      }

      function Clear() {
        for (var i = 0; i < divs.length; i++) {
          if (divs[i].id != "divInfo")
            divs[i].style.backgroundColor = (i & 1) ? "#f6eedb" : "#cceeff";
        }
        divInfo.innerHTML = '';
      }
      divInfo = document.getElementById("divInfo");
      divs = document.getElementsByClassName('eventPhaseDiv');
      let chCapture = document.getElementById("chCapture");
      chCapture.onclick = function () {
        RemoveListeners();
        AddListeners();
      }
      Clear();
      AddListeners();
    }
  },
}
</script>
<style scoped lang="scss">
.page {
  display: flex;
  flex-wrap: wrap;
}

.module {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;

  .middle {
    text-align: center;

    .outer {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 400px;
      height: 200px;
      background-color: #C1DBE3;

      .inner {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 100px;
        background-color: #C7DFC5;
      }
    }

  }
}

.eventPhase {
  div {
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

}
</style>
