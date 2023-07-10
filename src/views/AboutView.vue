<template>
  <div class="about">
    <!-- <particles :color="['#ff0000', '#00ff00', '#0000ff']"
                :particleOpacity="0.7"
                :particlesNumber="200"
                :shapeType="'circle'"
                :particleSize="3"
                :linesColor="'#ffffff'"
                :linesWidth="1"
                :lineLinked="true"
                :lineOpacity="0.4"
                :linesDistance="150"
                :moveSpeed="3"
                :hoverEffect="true"
                :hoverMode="'grab'"
                :clickEffect="true"
                :clickMode="'push'"
      ></particles> -->
    <h1 class="green tw-text-center">北京交通大学软件学院2023暑期实训项目</h1>
    <h2 class="green">自来熟小组</h2>
    <h2 class="green">组员有：xyh，xb，cyb，fwh，cjx，zml</h2>
    <v-btn class="green" append-icon="$vuetify" stacked @click="addCount">
      Button
    </v-btn>
    <h1 class="green">你一共点击了{{ count }}次</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
    }
  },
  methods: {
    addCount() {
      this.count++;
    },
  },
}
</script>

<style>
h1 {
  font-weight: 500;
  font-size: 2.3rem;
  position: relative;
  top: -10px;
}

h2 {
  font-weight: 500;
  font-size: 1.5rem;
  position: relative;
  top: -10px;
}

.about {
  background-image: url('../assets/308073.jpg');
  text-align: center;
  align-items: center;
  position: absolute;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
