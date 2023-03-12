<template>
    <div class="toast-mess" ref="toast" v-if="toastAlive">
        <div class="success-toast" v-if="success" >
            <div class="toast-icon"></div>
            <div class="toast-title">Thành công! </div>
            <div class="toast-message">{{ toastMess }}</div>
            <div class="toast-action">Hoàn tác</div>
            <div class="toast-close" @click="this.closeToast()"></div>
        </div>

        <div class="warning-toast" v-if="warning" >
            <div class="toast-icon"></div>
            <div class="toast-title">Cảnh báp! </div>
            <div class="toast-message">{{ toastMess }}</div>
            <div class="toast-action">Hoàn tác</div>
            <div class="toast-close" @click="this.closeToast()"></div>
        </div>

        <div class="error-toast" v-if="error" >
            <div class="toast-icon"></div>
            <div class="toast-title">Lỗi! </div>
            <div class="toast-message">{{toastMess}}</div>
            <div class="toast-action">Hoàn tác</div>
            <div class="toast-close" @click="this.closeToast()"></div>
        </div>

        <div class="info-toast" v-if="info" >
            <div class="toast-icon"></div>
            <div class="toast-title">Thông tin! </div>
            <div class="toast-message">{{toastMess}}</div>
            <div class="toast-action">Hoàn tác</div>
            <div class="toast-close" @click="this.closeToast()"></div>
        </div>
    </div>
</template>
<script>
export default {
  name: "MToastItem",
  props: {
    kindOfToast: {
      type: String,
      required: true,
      default: "success",
    },
    toastMess: {
      type: String,
      required: true,
      default: " ",
    },
  },
  created(){
    if (this.kindOfToast === "success"){
        this.success = true;
    } else if (this.kindOfToast === "error"){
        this.error = true;
    }
  },

  mounted(){
    setTimeout(() => {
        this.toastAlive = false
    },5000)
  },
  data() {
    return {
        success: false,
        warning: false,
        error: false,
        info: false,
        toastAlive: true,
    }
  },
  methods:{
    closeToast(){
        this.success = false;
        this.toastAlive = false;
    }
  }
};
</script>
<style scoped>
.toast-mess{
    height: 56px;
    width: 450px;
    background-color: #FFF;
    box-shadow: 2px 2px 2px 2px rgba(10,10,10,0.178);
    position: fixed;
    right: 0px;
    bottom: 10px;
    animation-name: showToast;
    animation-duration: 1s;
    animation-fill-mode: forwards;
}

.success-toast, .info-toast, .error-toast, .info-toast{
    display: flex;
    align-items: center;
    height: 100%;
}

.success-toast .toast-icon{
    height: 20px;
    width: 20px;
    background: url('../../assets/img/Sprites.64af8f61.svg') no-repeat -512px -408px;
    margin-left: 18px;
}

.warning-toast .toast-icon{
    height: 20px;
    width: 20px;
    background: url('../../assets/img/Sprites.64af8f61.svg') no-repeat -512px -408px;
    margin-left: 18px;
}

.error-toast .toast-icon{
    height: 20px;
    width: 20px;
    background: url('../../assets/img/Sprites.64af8f61.svg') no-repeat -538px -146px;
    margin-left: 18px;
}

.info-toast .toast-icon{
    height: 20px;
    width: 20px;
    background: url('../../assets/img/Sprites.64af8f61.svg') no-repeat -482px -146px;
    margin-left: 18px;
}   

.success-toast .toast-title{
    color: #50B83C;
    height: 20px;
    margin-left: 10px;
    font-weight: 600;
}

.warning-toast .toast-title{
    color: orange;
    height: 20px;
    margin-left: 10px;
    font-weight: 600;
}

.error-toast .toast-title{
    color: #ff0000;
    height: 20px;
    margin-left: 10px;
    font-weight: 600;
}

.info-toast .toast-title{
    color: rgb(52, 52, 255);
    height: 20px;
    margin-left: 10px;
    font-weight: 600;
}

.toast-message{
    height: 20px;
    width: 250px;
    overflow: hidden;
    margin-left: 5px;
}

.toast-action{
    position: absolute;
    right: calc(16px + 16px + 18px);
    font-weight: 600;
    text-decoration: underline;
}

.toast-close{
    height: 16px;
    width: 16px;
    background: url('../../assets/img/Sprites.64af8f61.svg') no-repeat -1178px -362px;
    position: absolute;
    right: 20px;
    top: 23px
}

.toast-action, .toast-close{
    cursor: pointer;
}

@keyframes showToast {
    from{
        right: -500px;
    }
    to{
        right: 0px;
    }
}

@keyframes closeToast {
    from{
        right: 0px;
    }
    to{
        right: -500px;
    }
}
</style>