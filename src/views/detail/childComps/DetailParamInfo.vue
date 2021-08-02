<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length != 0">
    <table v-for="(item, index) in paramInfo.sizes" :key="index">
      <tr v-for="tr in item" :key="tr">
        <td v-for="td in tr" :key="td">{{ td }}</td>
      </tr>
    </table>
    <table class="info-set">
      <tr v-for="(info, index) in paramInfo.infos" :key="index">
        <td class="info-set-key">{{ info.key }}</td>
        <td class="info-set-value">{{ info.value }}</td>
      </tr>
    </table>
    <div class="info-img" v-if="paramInfo.image.length !== 0">
      <img :src="paramInfo.image" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props: {
    paramInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.param-info {
  padding: 20px 10px;
  font-size: 12px;
  border-bottom: 5px solid #f2f5f8;
}
.param-info table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}
.param-info table tr {
  height: 40px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}
.info-set {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.info-set-key {
  width: 100px;
}
.info-set-value {
  color: #eb4868;
}
.info-img img{
  width: 100%;
}
</style>