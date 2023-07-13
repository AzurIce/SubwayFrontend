<template>
    <header class="header__main">
    <div class="slider">
      <svg class="slider__mask" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1920 1080" width="0" height="0">
        <defs>
          <!-- Slide 1 -->
          <pattern id="pattern1l" patternUnits="userSpaceOnUse" width="562" height="366" viewBox="0 0 562 366">
            <image xlink:href="https://i.postimg.cc/Ss6pDzPN/p1.png" width="600px" height="600px"/>
          </pattern>
          <pattern id="pattern1r" patternUnits="userSpaceOnUse" x="365px" width="562" height="366" viewBox="0 0 562 366">
            <image xlink:href="https://i.postimg.cc/B6YCWmkh/p2.png" width="600px" height="600px"/>
          </pattern>
          
          <!-- Slide 2 -->
          <pattern id="pattern2l" patternUnits="userSpaceOnUse" width="562" height="366" viewBox="0 0 562 366">
            <image xlink:href="https://i.postimg.cc/sgj9Xdzn/p3.png" width="600px" height="600px"/>
          </pattern>
          <pattern id="pattern2r" patternUnits="userSpaceOnUse" x="365" width="562" height="366" viewBox="0 0 562 366">
            <image xlink:href="https://i.postimg.cc/X78dtH59/p4.png" width="600px" height="600px"/>
          </pattern>
        </defs>
      </svg>

      <div class="slide" id="slide-1">
        <svg class="slide__bg" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="1920" height="1080">
          <rect x="0" y="0" width="1920" height="1080" fill="url(#bg1)" />
        </svg>
        <div class="slide__images">
          <div class="slide__image slide__image--left">
            <svg viewBox="0 0 900 365" version="1.1"	xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" x="0px" y="0px">
              <path d="M 0 0 L 0 365 L 351.2382 365 L 562 0 L 0 0 Z" fill="url(#pattern1l)"/>
            </svg>
          </div>

          <div class="slide__image slide__image--right">
            <svg viewBox="0 0 900 365" version="1.1"	xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" x="0px" y="0px">
              <path d="M 900 365 L 900 0 L 548.7618 0 L 338 365 L 900 365 Z" fill="url(#pattern1r)"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="slide" id="slide-2">
        <svg class="slide__bg" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="1920" height="1080">
          <rect x="0" y="0" width="1920" height="1080" fill="url(#bg2)" />
        </svg>
        <div class="slide__images">
          <div class="slide__image slide__image--left">
            <svg viewBox="0 0 900 365" version="1.1"	xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" x="0px" y="0px">
              <path d="M 0 0 L 0 365 L 351.2382 365 L 562 0 L 0 0 Z" fill="url(#pattern2l)"/>
            </svg>
          </div>

          <div class="slide__image slide__image--right">
            <svg viewBox="0 0 900 365" version="1.1"	xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" x="0px" y="0px">
              <path d="M 900 365 L 900 0 L 548.7618 0 L 338 365 L 900 365 Z" fill="url(#pattern2r)"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="slider__pagination">
      <a href="#slide-1" class="button">Slide 1</a>
      <a href="#slide-2" class="button">Slide 2</a>
    </div>
  </header>
</template>

<script>
export default {
    mounted() {
    // 在mounted钩子函数中使用JavaScript脚本
    const script = document.createElement('script');
    script.innerHTML = `window.location.href = "#slide-2";`;
    document.head.appendChild(script);
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat:600");
.header__main {
  position: relative;
  min-height: 30vh;
  overflow: hidden;
  text-align: left;
}
.slider {
  width: 100vw;
  height: 30vh;
}
.slide {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30vh;
  position: absolute;
  width: 100%;
}
.slide:target .slide__bg {
  opacity: 1;
}
.slide:target .slide__image {
  transform: translate(0);
  opacity: 1;
  transition-delay: 0.5s;
  filter: blur(0) drop-shadow(0px 10px 30px rgba(0, 0, 0, 0.35));
}
.slide__bg {
  position: absolute;
  z-index: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(2);
  filter: blur(50px);
  opacity: 0;
  transition: opacity 1s ease;
  will-change: opacity;
}
.slide__images {
  position: relative;
  width: 100%;
  max-width: 900px;
  height: 365px;
  margin: 0 20px;
}
.slide__image {
  position: absolute;
  width: 100%;
  opacity: 0;
  transition: all 0.5s ease-in-out 0s;
  filter: blur(10px) drop-shadow(0px 10px 30px rgba(0, 0, 0, 0.35));
  will-change: transform, opacity, filter;
}
.slide__image svg {
  display: block;
}
.slide__image--left {
  transform: translate(0.75%, -10px);
}
.slide__image--right {
  top: 5vmin;
  transform: translate(-0.75%, 10px);
}
.slider__pagination {
  position: absolute;
  bottom: 4vh;
  width: 100%;
  text-align: center;
}
.button {
  position: relative;
  display: inline-block;
  padding: 20px 40px;
  border: 2px solid #fff;
  line-height: 1;
  font: 600 12px "Montserrat", sans-serif;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: white;
  transition: all 0.25s ease;
  appearance: none;
}
.button:hover {
  color: #333;
  background-color: white;
}
</style>