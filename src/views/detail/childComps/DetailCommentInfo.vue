<template>
  <div class="comment-info" v-if="Object.keys(commentInfo).length != 0">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">更多</div>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="" />
      <span>{{ commentInfo.user.uname }}</span>
    </div>
    <div class="info-detail">
      <p>{{ commentInfo.content }}</p>
      <div class="info-other">
        <span class="data">{{ showData }}</span>
        <span>{{ commentInfo.style }}</span>
      </div>
      <div class="info-imgs">
        <img
          :src="item"
          v-for="(item, index) in commentInfo.images"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "common/utils";

export default {
  name: "DetailCommentInfo",
  data() {
    return {
      value:0
    }
  },
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed:{
    showData(){
      this.value = this.commentInfo.created
      const date = new Date(this.value * 1000);
      return formatDate(date,"yyyy-MM-dd hh:mm:ss")
    }
  }
};
</script>

<style scoped>
.comment-info {
  padding: 4px 10px;
  color: #333;
  border-bottom: 5px solid #f2f5f8;
}
.info-header {
  height: 40px;
  line-height: 40px;
  border-bottom: 0.01rem solid rgba(0, 0, 0, 0.1);
}
.header-title {
  float: left;
  font-size: 13px;
}
.header-more {
  float: right;
  font-size: 13px;
  margin-right: 8px;
}
.info-user {
  padding: 10px 0 8px;
}
.info-user img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  vertical-align: middle;
}
.info-user span {
  font-size: 13px;
  margin-left: 10px;
}
.info-detail {
  padding: 0 4px 12px;
}
.info-detail p {
  font-size: 11px;
  color: #777;
  margin-top: 3px;
}
.info-detail .info-other {
  font-size: 10px;
  color: #999;
  margin-top: 10px;
}
.info-other .data {
  margin-right: 8px;
}
.info-imgs{
  margin-top: 10px;
}
.info-imgs img{
  width: 53px;
  height: 53px;
  margin-right: 4px;
}
</style>