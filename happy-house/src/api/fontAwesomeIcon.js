import Vue from "vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// 직접 쓸 아이콘 가져오기
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

library.add(faCircleArrowRight);

// font awesome 컴포넌트를 전역으로 등록
Vue.component("font-awesome-icon", FontAwesomeIcon);
