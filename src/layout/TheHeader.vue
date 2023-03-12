// Component hiển thị phần header dùng chung của website
// Author: Xuân Đào (05/03/2023)
<template>
  <div class="header">
    <!-- Phần hiển thị option button và nội dung của header -->
    <div class="header-leftside">
      <div class="header-leftside__option">
        <MIcon class="icon option-icon" />
      </div>
      <div class="header-leftside__context">
        <div class="text">{{ companyName }}</div>
        <div class="dropdown">
          <div class="icon dropdown-icon"></div>
        </div>
      </div>
    </div>
    <!-- Phần hiển thị thông báo và các thông tin của người dùng -->
    <div class="header-rightside">
      <div class="header-rightside__notification">
        <div title="Thông báo" class="icon notification-icon"></div>
      </div>
      <div class="header-rightside__account">
        <div class="avatar">
          <div class="icon avatar-icon"></div>
        </div>
        <div class="username">{{ username }}</div>
        <div class="action">
          <div class="icon dropdown-icon-2"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import resources from "../js/resources.js";
import MIcon from "../components/base-component/MIcon.vue";
export default {
  components:{
    MIcon
  },
  data() {
    return {
      companyName: resources.vi.companyName[0],
      username: resources.vi.username[0],
    };
  },
};
</script>
<style scoped>
.header {
  height: 68px;
  width: calc(100% - 200px);
  float: left;
  display: flex;
  background-color: #fff;
}
.header-leftside {
  height: 100%;
  width: 600px;
  display: flex;
  column-gap: 20px;
  align-items: center;
}

.header-leftside__option {
  height: 24px;
  width: 24px;
  margin-left: 16px;
}

.header-leftside__context {
  height: 24px;
  flex: 1;
  display: flex;
  column-gap: 4px;
}

.header-leftside__context .text {
  height: 100%;
}

.header-leftside__context .dropdown {
  height: 24px;
  width: 24px;
}

.header-rightside {
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  column-gap: 26px;
}

.header-rightside__notification {
  height: 24px;
  width: 24px;
}

.header-rightside__account {
  height: 32px;
  width: 200px;
  display: flex;
  align-items: center;
  column-gap: 4px;
}

.header-rightside__account .username {
  height: 24px;
}

.header-rightside__account .action {
  height: 24px;
  width: 24px;
}
</style>