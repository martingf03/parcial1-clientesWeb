import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faCircleCheck, faCircleUser, faLeftLong, faTriangleExclamation  } from '@fortawesome/free-solid-svg-icons'

library.add(faCircleUser, faLeftLong, faCircleCheck, faTriangleExclamation)

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router);

app.mount("#app");