<template>
  <div class="container">
    <div class="artboard">
      <div class="background">
        <div class="mountain-left"></div>
        <div class="mountain-right"></div>
        <div class="sun-wrap">
          <div class="sun-main"></div>
          <div class="sun-1"></div>
          <div class="sun-2"></div>
        </div>
        <div class="small-planet"></div>
        <div class="big-planet"></div>
        <div class="cloud-1"></div>
        <div class="cloud-2"></div>
        <div class="cloud-3"></div>
        <div class="shooting-star"></div>

        <div class="star star1"></div>
        <div class="star star2"></div>
        <div class="star star3"></div>
        <div class="star star4"></div>
        <div class="star star5"></div>
        <div class="star star6"></div>
        <div class="star star7"></div>
        <div class="star star8"></div>
        <div class="star star9"></div>
        <div class="star star10"></div>
        <div class="star star11"></div>
        <div class="star star12"></div>
        <div class="star star13"></div>
        <div class="star star14"></div>
        <div class="star star15"></div>
        <div class="star star16"></div>
        <div class="star star17"></div>
        <div class="star star18"></div>
        <div class="star star19"></div>
        <div class="star star20"></div>
        <div class="star star21"></div>
        <div class="star star22"></div>
        <div class="star star23"></div>
        <div class="star star24"></div>
        <div class="star star25"></div>
        <div class="star star26"></div>
        <div class="star star27"></div>
        <div class="star star28"></div>
        <div class="star star29"></div>
        <div class="star star30"></div>
        <div class="star star31"></div>
        <div class="star star32"></div>
        <div class="star star33"></div>
        <div class="star star34"></div>
        <div class="star star35"></div>
        <div class="star star36"></div>
        <div class="star star37"></div>
        <div class="star star38"></div>
        <div class="star star39"></div>
        <div class="star star40"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Star',
  mounted() {
    const artboard = document.querySelector('.artboard')

    artboard.addEventListener('click', this.toggleActive)
  },
  methods: {
    toggleActive() {
      document.body.classList.toggle('active')
    }
  }
}
</script>


<style scoped>
* {
  box-sizing: border-box;
}

.container {
  margin:auto;
  position: relative;
  min-width: 150px;
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.artboard {
  /* width: 100%; */
  /* height: 100%; */
  width:150px;
  height: 150px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 15px 100px rgba(237, 57, 41, 0.7), 0 3px 35px rgba(0, 0, 0, 0.5);
  transform: scale(0.15);
  transition: transform 0.6s, box-shadow 0.2s;
}
.artboard:hover {
  box-shadow: 0 40px 150px rgba(237, 57, 41, 0.5), 0 10px 100px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}
.artboard:active {
  box-shadow: 0 15px 10px rgba(237, 57, 41, 0.5), 0 3px 15px rgba(0, 0, 0, 0.3);
}
.background {
  position: relative;
  top: 5%;
  left: 5%;
  width: 90%;
  height: 90%;
  overflow: hidden;
  background: linear-gradient(200deg, #5d2b36 20%, #f6bc72 80%);
  border-radius: 50%;
  z-index: 10;
  transform: scale(0);
  transition: transform 0.9s;
}
.mountain-left {
  background-image: linear-gradient(92deg, rgba(0, 0, 0, 0) 94%, rgba(78, 20, 8, 0.4) 95%),
    linear-gradient(0deg, #922f4e 65%, #e1654d 90%, #f8ae6d);
  border-radius: 30%;
  width: 120%;
  height: 100%;
  position: absolute;
  transform: skewX(10deg) rotateX(50deg) rotateZ(-40deg);
  top: 100%;
  right: 25%;
  z-index: 15;
  transition: top 0.9s;
}
.mountain-right {
  background-image: linear-gradient(-3deg, rgba(0, 0, 0, 0) 93%, rgba(78, 20, 8, 0.4) 94%),
    linear-gradient(40deg, #a53750 70%, #e1654d 85%, #f8ae6d);
  border-radius: 25%;
  width: 150%;
  height: 120%;
  transform: skewX(40deg) rotateX(50deg) rotateZ(-40deg);
  position: absolute;
  top: 100%;
  left: 30%;
  z-index: 16;
  transition: top 0.7s;
}
.sun-wrap {
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  margin: 0 auto;
  left: 0;
  right: 0;
  width: 50%;
  height: 50%;
  z-index: 6;
}
.sun-main {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  border-radius: 50%;
  z-index: 7;
  transform: scale(0);
  transition: transform 0.7s;
}
.sun-1 {
  position: absolute;
  top: -5%;
  bottom: -5%;
  left: -5%;
  right: -5%;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  z-index: 6;
  animation: growshrink 3s infinite;
  opacity: 0;
  transition: opacity 0.7s;
}
.sun-2 {
  position: absolute;
  top: -11%;
  bottom: -11%;
  left: -11%;
  right: -11%;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  z-index: 5;
  animation: growshrink 2.8s infinite;
  opacity: 0;
  transition: opacity 0.7s;
}
.small-planet {
  position: absolute;
  top: 17%;
  left: -50%;
  background: linear-gradient(
    to top left,
    #363d4d 0%,
    #363d4d 20%,
    #386e8a 32%,
    #386e8a 40%,
    #4c9faf 52%,
    #4c9faf 60%,
    #71beac 68%,
    #71beac 74%,
    #abe084 88%,
    #abe084 100%
  );
  width: 10%;
  height: 10%;
  border-radius: 50%;
  z-index: 3;
  animation: wobble-1 2.5s infinite;
  transition: left 0.7s;
}
.big-planet {
  position: absolute;
  top: 21%;
  right: -50%;
  background: linear-gradient(
    to top left,
    #5d2d39 0%,
    #5d2d39 25%,
    #b7403c 36%,
    #b7403c 42%,
    #ee3a2b 52%,
    #ee3a2b 56%,
    #ffc77d 80%,
    #ffc77d 100%
  );
  width: 19%;
  height: 19%;
  border-radius: 50%;
  z-index: 4;
  animation: wobble-2 2.3s infinite;
  transition: right 0.7s;
}
.star {
  position: absolute;
  top: -10%;
  left: 0;
  right: 0;
  background: white;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  z-index: 0;
}
.cloud-1 {
  z-index: 3;
  position: absolute;
  top: 40%;
  left: 0;
  right: 0;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0));
  width: 100%;
  height: 80px;
  -webkit-clip-path: url(#cloud-1);
  clip-path: url(#cloud-1);
  animation: updown 2s infinite;
  opacity: 0;
  transition: opacity 0.7s;
}
.cloud-2 {
  z-index: 2;
  position: absolute;
  top: 24%;
  left: 0%;
  right: 0;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
  width: 100%;
  height: 80px;
  -webkit-clip-path: url(#cloud-1);
  clip-path: url(#cloud-1);
  animation: updown 2.2s infinite;
  opacity: 0;
  transition: opacity 0.7s;
}
.cloud-3 {
  z-index: 1;
  position: absolute;
  top: 10%;
  left: 0;
  right: 0;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0));
  width: 100%;
  height: 80px;
  -webkit-clip-path: url(#cloud-2);
  clip-path: url(#cloud-2);
  animation: updown 1.8s infinite;
  opacity: 0;
  transition: opacity 0.7s;
}
.shooting-star {
  position: absolute;
  top: -10%;
  right: 60%;
  background: linear-gradient(to left, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0));
  width: 100px;
  height: 3px;
  border-radius: 50%;
  z-index: 0;
  box-shadow: 0px 0px 1px rgba(255, 255, 255, 0.6);
  animation: shoot 6s infinite backwards;
}
.active .artboard {
  box-shadow: 0 15px 40px rgba(237, 57, 41, 0.5), 0 3px 15px rgba(0, 0, 0, 0.2);
  transform: scale(1);
}
.active .artboard:hover {
  box-shadow: 0 20px 50px rgba(237, 57, 41, 0.7), 0 5px 20px rgba(0, 0, 0, 0.4);
}
.active .artboard:active {
  box-shadow: 0 15px 10px rgba(237, 57, 41, 0.5), 0 3px 15px rgba(0, 0, 0, 0.3);
}
.active .background {
  transform: scale(1);
}
.active .mountain-left {
  top: 52%;
  transition: top 1.3s 0.9s;
}
.active .mountain-right {
  top: 48%;
  transition: top 1.5s 1.2s;
}
.active .sun-main {
  transform: scale(1);
  transition: transform 1s 1.8s;
}
.active .sun-1 {
  opacity: 1;
  transition: opacity 1.5s 2s;
}
.active .sun-2 {
  opacity: 1;
  transition: opacity 1.6s 2.2s;
}
.active .small-planet {
  left: 17%;
  transition: left 1.2s 1.5s;
}
.active .big-planet {
  right: 8%;
  transition: right 1s 1.9s;
}
.active .star {
  top: 0;
}
.active .star1 {
  width: 1px;
  height: 1px;
  top: 10%;
  left: 44%;
  box-shadow: 0px 0px 4px rgba(255, 255, 255, 0.6);
  animation: explode 8s infinite;
  transition: top 0.7s 1.7s;
}
.active .star2 {
  width: 6px;
  height: 6px;
  top: 2%;
  left: 57%;
  box-shadow: 0px 0px 8px rgba(255, 255, 255, 0.6);
  animation: explode 9s infinite;
  transition: top 0.7s 1.6s;
}
.active .star3 {
  width: 2px;
  height: 2px;
  top: 3%;
  left: 38%;
  box-shadow: 0px 0px 5px rgba(255, 255, 255, 0.6);
  animation: explode 6s infinite;
  transition: top 1s 2.1s;
}
.active .star4 {
  width: 6px;
  height: 6px;
  top: 3%;
  left: 17%;
  box-shadow: 0px 0px 4px rgba(255, 255, 255, 0.6);
  animation: explode 6s infinite;
  transition: top 0.6s 1.6s;
}
.active .star5 {
  width: 3px;
  height: 3px;
  top: 1%;
  left: 62%;
  box-shadow: 0px 0px 7px rgba(255, 255, 255, 0.6);
  animation: explode 7s infinite;
  transition: top 0.7s 1.6s;
}
.active .star6 {
  width: 6px;
  height: 6px;
  top: 4%;
  left: 79%;
  box-shadow: 0px 0px 4px rgba(255, 255, 255, 0.6);
  animation: explode 9s infinite;
  transition: top 0.8s 2.4s;
}
.active .star7 {
  width: 4px;
  height: 4px;
  top: 5%;
  left: 61%;
  box-shadow: 0px 0px 5px rgba(255, 255, 255, 0.6);
  animation: explode 6s infinite;
  transition: top 0.7s 1.9s;
}
.active .star8 {
  width: 6px;
  height: 6px;
  top: 22%;
  left: 85%;
  box-shadow: 0px 0px 6px rgba(255, 255, 255, 0.6);
  animation: explode 10s infinite;
  transition: top 0.6s 2.1s;
}
.active .star9 {
  width: 2px;
  height: 2px;
  top: 14%;
  left: 78%;
  box-shadow: 0px 0px 4px rgba(255, 255, 255, 0.6);
  animation: explode 7s infinite;
  transition: top 1.1s 1.9s;
}
.active .star10 {
  width: 6px;
  height: 6px;
  top: 25%;
  left: 93%;
  box-shadow: 0px 0px 8px rgba(255, 255, 255, 0.6);
  animation: explode 6s infinite;
  transition: top 1.3s 1.7s;
}
.active .star11 {
  width: 6px;
  height: 6px;
  top: 9%;
  left: 21%;
  box-shadow: 0px 0px 6px rgba(255, 255, 255, 0.6);
  animation: explode 7s infinite;
  transition: top 1.4s 2.1s;
}
.active .star12 {
  width: 1px;
  height: 1px;
  top: 3%;
  left: 44%;
  box-shadow: 0px 0px 6px rgba(255, 255, 255, 0.6);
  animation: explode 7s infinite;
  transition: top 0.7s 1.7s;
}
.active .star13 {
  width: 2px;
  height: 2px;
  top: 6%;
  left: 42%;
  box-shadow: 0px 0px 4px rgba(255, 255, 255, 0.6);
  animation: explode 8s infinite;
  transition: top 1s 2.4s;
}
.active .star14 {
  width: 3px;
  height: 3px;
  top: 3%;
  left: 92%;
  box-shadow: 0px 0px 7px rgba(255, 255, 255, 0.6);
  animation: explode 10s infinite;
  transition: top 0.7s 1.9s;
}
.active .star15 {
  width: 1px;
  height: 1px;
  top: 10%;
  left: 7%;
  box-shadow: 0px 0px 4px rgba(255, 255, 255, 0.6);
  animation: explode 9s infinite;
  transition: top 1.3s 2s;
}
.active .star16 {
  width: 6px;
  height: 6px;
  top: 2%;
  left: 35%;
  box-shadow: 0px 0px 4px rgba(255, 255, 255, 0.6);
  animation: explode 9s infinite;
  transition: top 0.5s 1.7s;
}
.active .star17 {
  width: 1px;
  height: 1px;
  top: 18%;
  left: 90%;
  box-shadow: 0px 0px 7px rgba(255, 255, 255, 0.6);
  animation: explode 8s infinite;
  transition: top 1.1s 1.7s;
}
.active .star18 {
  width: 4px;
  height: 4px;
  top: 8%;
  left: 27%;
  box-shadow: 0px 0px 5px rgba(255, 255, 255, 0.6);
  animation: explode 10s infinite;
  transition: top 0.8s 2s;
}
.active .star19 {
  width: 5px;
  height: 5px;
  top: 5%;
  left: 80%;
  box-shadow: 0px 0px 6px rgba(255, 255, 255, 0.6);
  animation: explode 9s infinite;
  transition: top 0.7s 2s;
}
.active .star20 {
  width: 1px;
  height: 1px;
  top: 22%;
  left: 49%;
  box-shadow: 0px 0px 7px rgba(255, 255, 255, 0.6);
  animation: explode 8s infinite;
  transition: top 1.1s 1.6s;
}
.active .star21 {
  width: 3px;
  height: 3px;
  top: 17%;
  left: 36%;
  box-shadow: 0px 0px 7px rgba(255, 255, 255, 0.6);
  animation: explode 9s infinite;
  transition: top 0.8s 1.7s;
}
.active .star22 {
  width: 3px;
  height: 3px;
  top: 5%;
  left: 9%;
  box-shadow: 0px 0px 5px rgba(255, 255, 255, 0.6);
  animation: explode 6s infinite;
  transition: top 1.2s 2.3s;
}
.active .star23 {
  width: 4px;
  height: 4px;
  top: 21%;
  left: 64%;
  box-shadow: 0px 0px 6px rgba(255, 255, 255, 0.6);
  animation: explode 6s infinite;
  transition: top 0.5s 1.9s;
}
.active .star24 {
  width: 4px;
  height: 4px;
  top: 12%;
  left: 82%;
  box-shadow: 0px 0px 8px rgba(255, 255, 255, 0.6);
  animation: explode 8s infinite;
  transition: top 0.8s 1.7s;
}
.active .star25 {
  width: 3px;
  height: 3px;
  top: 24%;
  left: 95%;
  box-shadow: 0px 0px 4px rgba(255, 255, 255, 0.6);
  animation: explode 8s infinite;
  transition: top 0.7s 2.2s;
}
.active .star26 {
  width: 1px;
  height: 1px;
  top: 17%;
  left: 44%;
  box-shadow: 0px 0px 5px rgba(255, 255, 255, 0.6);
  animation: explode 10s infinite;
  transition: top 0.8s 2s;
}
.active .star27 {
  width: 6px;
  height: 6px;
  top: 21%;
  left: 36%;
  box-shadow: 0px 0px 8px rgba(255, 255, 255, 0.6);
  animation: explode 8s infinite;
  transition: top 0.6s 1.9s;
}
.active .star28 {
  width: 1px;
  height: 1px;
  top: 11%;
  left: 78%;
  box-shadow: 0px 0px 6px rgba(255, 255, 255, 0.6);
  animation: explode 8s infinite;
  transition: top 0.9s 2s;
}
.active .star29 {
  width: 1px;
  height: 1px;
  top: 14%;
  left: 98%;
  box-shadow: 0px 0px 7px rgba(255, 255, 255, 0.6);
  animation: explode 9s infinite;
  transition: top 0.6s 2.4s;
}
.active .star30 {
  width: 1px;
  height: 1px;
  top: 7%;
  left: 36%;
  box-shadow: 0px 0px 6px rgba(255, 255, 255, 0.6);
  animation: explode 6s infinite;
  transition: top 1s 2.2s;
}
.active .star31 {
  width: 5px;
  height: 5px;
  top: 7%;
  left: 14%;
  box-shadow: 0px 0px 7px rgba(255, 255, 255, 0.6);
  animation: explode 8s infinite;
  transition: top 1.2s 1.6s;
}
.active .star32 {
  width: 6px;
  height: 6px;
  top: 22%;
  left: 80%;
  box-shadow: 0px 0px 6px rgba(255, 255, 255, 0.6);
  animation: explode 9s infinite;
  transition: top 0.8s 2s;
}
.active .star33 {
  width: 5px;
  height: 5px;
  top: 10%;
  left: 79%;
  box-shadow: 0px 0px 7px rgba(255, 255, 255, 0.6);
  animation: explode 9s infinite;
  transition: top 0.7s 1.7s;
}
.active .star34 {
  width: 6px;
  height: 6px;
  top: 19%;
  left: 97%;
  box-shadow: 0px 0px 6px rgba(255, 255, 255, 0.6);
  animation: explode 8s infinite;
  transition: top 1s 2.3s;
}
.active .star35 {
  width: 3px;
  height: 3px;
  top: 19%;
  left: 46%;
  box-shadow: 0px 0px 5px rgba(255, 255, 255, 0.6);
  animation: explode 10s infinite;
  transition: top 1.2s 1.9s;
}
.active .star36 {
  width: 1px;
  height: 1px;
  top: 4%;
  left: 75%;
  box-shadow: 0px 0px 6px rgba(255, 255, 255, 0.6);
  animation: explode 7s infinite;
  transition: top 1.1s 1.9s;
}
.active .star37 {
  width: 6px;
  height: 6px;
  top: 21%;
  left: 52%;
  box-shadow: 0px 0px 6px rgba(255, 255, 255, 0.6);
  animation: explode 7s infinite;
  transition: top 0.9s 2.1s;
}
.active .star38 {
  width: 2px;
  height: 2px;
  top: 5%;
  left: 12%;
  box-shadow: 0px 0px 5px rgba(255, 255, 255, 0.6);
  animation: explode 6s infinite;
  transition: top 1.3s 2.1s;
}
.active .star39 {
  width: 5px;
  height: 5px;
  top: 8%;
  left: 31%;
  box-shadow: 0px 0px 4px rgba(255, 255, 255, 0.6);
  animation: explode 8s infinite;
  transition: top 1.1s 1.6s;
}
.active .star40 {
  width: 4px;
  height: 4px;
  top: 23%;
  left: 5%;
  box-shadow: 0px 0px 8px rgba(255, 255, 255, 0.6);
  animation: explode 7s infinite;
  transition: top 0.8s 1.7s;
}
.active .cloud-1 {
  opacity: 1;
  transition: opacity 1.4s 1.5s;
}
.active .cloud-2 {
  opacity: 1;
  transition: opacity 1.4s 1.7s;
}
.active .cloud-3 {
  opacity: 1;
  transition: opacity 1.4s 1.9s;
}
@keyframes wobble-1 {
  0% {
    transform: translate3d(0, 0, 0);
  }
  25% {
    transform: translate3d(-1px, 1px, 0);
  }
  75% {
    transform: translate3d(1px, -1px, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes wobble-2 {
  0% {
    transform: translate3d(0, 0, 0);
  }
  25% {
    transform: translate3d(-1px, -1px, 0);
  }
  75% {
    transform: translate3d(1px, 1px, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes growshrink {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.01);
  }
  75% {
    transform: scale(0.99);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes explode {
  0% {
    transform: scale(1);
  }
  40% {
    transform: scale(1);
  }
  50% {
    transform: scale(2);
  }
  60% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes updown {
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-1px);
  }
  75% {
    transform: translateY(1px);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes shoot {
  40% {
    transform: rotate(30deg) translateX(0);
  }
  60% {
    transform: rotate(30deg) translateX(400%);
  }
}
</style>