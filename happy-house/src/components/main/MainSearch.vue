<template>
  <div class="content">
    <div class="main">
      <div class="search-area">
        <div class="search">
          <!-- 드롭다운 수정 필요 -->
          <div class="dropdown">
            <button>지역별</button>
            <div class="category">
              <a>건물명별</a>
            </div>
          </div>
          <input placeholder="지역명, 건물명을 검색해주세요." />
          <!-- 검색 아이콘으로 변경 필요 -->
          <button><font-awesome-icon icon="fa-solid fa-magnifying-glass" class="fa-2x" /></button>
        </div>
      </div>
      <div class="bg"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainSearch",
};
</script>

<style scoped>
.content {
  position: relative;
  width: 100%;
  z-index: 0;
}

.main {
  background: #000;
  height: 720px;
  overflow: hidden;
  z-index: 2;
}

.bg {
  background: #000 url("@/assets/images/bg-main1.jpg") center no-repeat;
  background-size: cover;
  opacity: 0.3;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.search-area {
  position: relative;
  width: 850px;
  margin: 0 auto;
  padding-top: 150px;
  z-index: 2;
  display: flex;
  justify-content: center;
}

.search {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 850px;
  height: 70px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 35px;
}

.dropdown {
  width: 150px;
  height: 100%;
  position: relative;
  display: inline-block;
  display: flex;
}

.dropdown > button {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
}

.category {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 150px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  cursor: pointer;
}

.category > a {
  display: block;
  color: black;
  padding: 10px;
  text-decoration: none;
}

.category > a:hover {
  background-color: #ddd;
}

.dropdown:hover .category {
  display: block;
}

.search > input {
  width: 580px;
  height: 100%;
  padding: 0 10px;
  background: none;
  border: none;
  outline: 0;
  font-size: 1.5rem;
  color: white;
  font-weight: bold;
}

.search > input::placeholder {
  color: white;
  font-weight: bold;
}

.search > button {
  background: none;
  border: none;
  color: white;
  font-weight: bold;
}
</style>
