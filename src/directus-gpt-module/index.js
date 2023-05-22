import ModuleComponent from "./module.vue";

export default {
  id: "directus-gpt",
  name: "DirectusGPT",
  icon: "extension",
  routes: [
    {
      path: "/directus-gpt",
      component: ModuleComponent,
    },
  ],
};
