import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faCheck, faCircleUser, faLeftLong, faXmark  } from '@fortawesome/free-solid-svg-icons'

library.add(faCircleUser, faLeftLong, faXmark, faCheck)

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router);

app.mount("#app");