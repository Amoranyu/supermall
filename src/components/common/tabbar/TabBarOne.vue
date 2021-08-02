<template>
  <div class="tab-bar-one" @click="oneClick">
    <div v-if="!isActive">
      <slot name="one-icon"></slot>
    </div>
    <div v-else>
      <slot name="one-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="one-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarOne",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "#fe5f7e",
    },
  },
  data() {
    return {
      // isActive:true
    };
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor} : {}
    }
  },
  methods: {
    oneClick() {
      this.$router.replace(this.path);
    },
  },
};
</script>

<style>
.tab-bar-one {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-one img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
/* .active {
  color: red;
} */
</style>
