<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <span name="header" @click="moveBoardDetail">{{ modalInfo.title }}</span>
        </div>

        <div class="modal-body">
          <span name="body">{{ modalInfo.content }}</span>
        </div>

        <div class="modal-footer">
          <span name="footer">
            글쓴이 : {{ modalInfo.nickName }}
            <button class="modal-default-button" @click="$emit('close')">확인</button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AptBoardModal",
  props: {
    modalInfo: {},
  },
  methods: {
    moveBoardDetail() {
      this.$router.push({ name: "boarddetail", params: { id: this.modalInfo.id } });
    },
  },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 600px;
  height: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
}

.modal-header {
  color: #42b983;
  font-size: 1.5rem;
  font-weight: bold;
}

.modal-header > span {
  cursor: pointer;
}

.modal-body {
  margin: 20px 0;
  font-size: 1.1rem;
  height: 160px;
  overflow-y: scroll;
}

.modal-body::-webkit-scrollbar {
  width: 8px;
}

.modal-body::-webkit-scrollbar-thumb {
  height: 30%;
  background: #696c73;
  border-radius: 10px;
}

.modal-body::-webkit-scrollbar-track {
  background: none;
}

.modal-default-button {
  float: right;
  border: none;
  background: none;
  font-size: 1.1rem;
  font-weight: bold;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
