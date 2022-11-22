<template>
  <div class="interest-list-wrapper">
    <table>
      <thead>
        <tr>
          <th>No.</th>
          <th>지역</th>
          <th>관심지역 해제</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(interest, index) in interests" :key="index">
          <td>
            <b>{{ index + 1 }}</b>
          </td>
          <td>
            <a @click="(dongcode) => moveInterestLocationMap(interest.dongCode)"
              >{{ interest.sidoName }} {{ interest.gugunName }}</a
            >
          </td>
          <td>
            <button class="delete-interest-btn" @click="(dongcode) => deleteInterestFunc(interest.dongCode)">
              <font-awesome-icon icon="fa-solid fa-ban" class="fa-lg" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script type="module">
import { getInterestList, deleteInterest } from "@/api/interest";
import { getLatLngFromDongcode } from "@/api/apt";
import { mapState, mapMutations } from "vuex";

const aptStore = "aptStore";

export default {
  name: "InterestList",
  data() {
    return {
      importedInterests: [],
      interests: [],
    };
  },

  created() {
    const userId = JSON.parse(localStorage.getItem("loginUser")).userId;

    getInterestList(
      userId,
      ({ data }) => {
        if (data.flag === "success") {
          this.importedInterests = data.data;

          this.importedInterests.map((interest) =>
            getLatLngFromDongcode(
              interest.dongCode,
              ({ data }) => {
                if (data.flag === "success") {
                  this.interests.push(data.data[0]);
                }
              },
              (error) => {
                console.log("동코드로 좌표 얻기 오류 : " + error);
              }
            )
          );
        }
      },
      (error) => {
        console.log("관심지역 리스트 불러오기 오류 : " + error);
      }
    );
  },
  computed: {
    ...mapState(aptStore, ["searchedLocation"]),
  },
  methods: {
    ...mapMutations(aptStore, ["SET_SEARCHED_LOCATION"]),

    deleteInterestFunc(dongcode) {
      const [filtered] = this.importedInterests.filter((interest) => interest.dongCode === dongcode);

      deleteInterest(
        filtered.id,
        ({ data }) => {
          if (data.flag === "success") {
            this.$router.go();
          }
        },
        (error) => {
          console.log("관심지역 삭제 오류 : " + error);
        }
      );
    },

    moveInterestLocationMap(dongcode) {
      const [filtered] = this.interests.filter((interest) => interest.dongCode === dongcode);
      const x = filtered.lat;
      const y = filtered.lng;

      const location = {
        x,
        y,
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
.interest-list-wrapper {
  margin-top: 50px;
  margin-bottom: 130px;
  width: 100%;
}

table {
  font-size: 0.9em;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  width: 100%;
  border-collapse: collapse;
  border-radius: 5px;
  overflow: hidden;
}

th {
  text-align: left;
  font-size: 1rem;
}

thead {
  font-weight: bold;
  color: #fff;
  background: #0069d9;
}

td,
th {
  padding: 15px 30px;
  vertical-align: middle;
}

td {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: #fff;
}

a {
  color: #73685d;
}

@media all and (max-width: 768px) {
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  th {
    text-align: right;
  }

  table {
    position: relative;
    padding-bottom: 0;
    border: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  thead {
    float: left;
    white-space: nowrap;
  }

  tbody {
    overflow-x: auto;
    overflow-y: hidden;
    position: relative;
    white-space: nowrap;
  }

  tr {
    display: inline-block;
    vertical-align: top;
  }

  th {
    border-bottom: 1px solid #a39485;
  }

  td {
    border-bottom: 1px solid #e5e5e5;
  }
}

tr:hover td {
  cursor: pointer;
  background: #e7e5e5;
}

.delete-interest-btn {
  border: none;
  background: none;
  color: #c82333;
}
</style>
