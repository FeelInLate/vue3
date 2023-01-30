import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "./assets/less/index.less";
import "./api/mock";
import { useSelectMenuStore } from "./stores/selectMenu";
// import api from './api/api'

const app = createApp(App);
const pinia = createPinia();

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// app.config.globalProperties.$api = api
app.use(pinia);

const store = useSelectMenuStore();
function checkRouter(path) {
  let hasCheck = router.getRoutes().filter((item) => item.path == path).length;
  if (hasCheck) {
    return true;
  } else {
    return false;
  }
}
router.beforeEach((to, from, next) => {
  store.getToken();
  const token = store.token;
  if (!token && to.name !== "login") {
    next({ name: "login" });
  } else if (!checkRouter(to.path)) {
    next({ name: "home" });
  } else {
    next();
  }
});

store.addMenu(router);
app.use(router);

app.mount("#app");
