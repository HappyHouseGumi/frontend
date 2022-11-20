<template>
  <div class="search-result-wrapper">
    <span
      ><font-awesome-icon icon="fa-solid fa-location-dot" class="fa-lg"
    /></span>
    <span @click="moveLocationMap">{{ loc.address_name }}</span>
  </div>
</template>

<script type="module">
import { mapState, mapMutations } from "vuex";

const aptStore = "aptStore";

export default {
  name: "MainSearchResultItem",
  props: {
    loc: Object,
  },
  computed: {
    ...mapState(aptStore, ["searchedLocation"]),
  },
  methods: {
    ...mapMutations(aptStore, ["SET_SEARCHED_LOCATION"]),

    moveLocationMap() {
      const location = {
        x: this.loc.y,
        y: this.loc.x,
        level: 6,
      };
      this.SET_SEARCHED_LOCATION(location);

      this.$router.push({
        name: "apt",
      });
    },
  },
};
</script>

<style scoped>
.search-result-wrapper {
  width: 100%;
  height: 30px;
  padding: 25px 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
}

.search-result-wrapper:hover {
  background: #272e35;
}

.search-result-wrapper > span:nth-child(1) {
  color: white;
  margin-right: 20px;
}

.search-result-wrapper > span:nth-child(2) {
  color: white;
  cursor: pointer;
}
</style>
