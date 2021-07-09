import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/system/Home.vue")
  },
  {
    path: "/users/login",
    name: "login",
    component: () => import("@/views/users/Login.vue")
  },
  {
    path: "/users/register",
    name: "register",
    component: () => import("@/views/users/Register.vue")
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/views/system/Admin.vue")
  },
  {
    path: "/admin/perfil",
    name: "perfilAdmin",
    component: () => import("@/views/users/Perfil.vue"),
    meta: {
      rule: "user"
    }
  },
  {
    path: "/admin/contratos/add",
    name: "addContrato",
    component: () => import("@/views/contratos/AddContrato.vue")
  },
  {
    path: "/admin/contratos/:contratoId",
    name: "editContrato",
    component: () => import("@/views/contratos/EditContrato.vue")
  },
  {
    path: "/admin/clausulas",
    name: "listClausulas",
    component: () => import("@/views/clausulas/ListClausulas.vue")
  },
  {
    path: "/admin/contratos",
    name: "manageContratos",
    component: () => import("@/views/contratos/ManageContratos.vue")
  },
  {
    path: "/admin/clausulas/add",
    name: "addClausulas",
    component: () => import("@/views/clausulas/AddClausula.vue")
  },
  {
    path: "/admin/clausulas/:clausulaId",
    name: "editClausulas",
    component: () => import("@/views/clausulas/EditClausula.vue")
  },
  {
    path: "/admin/users",
    name: "listUsers",
    component: () => import("@/views/users/ListUsers.vue")
  },
  {
    path: "/admin/users/add",
    name: "addUser",
    component: () => import("@/views/users/AddUser.vue")
  },
  {
    path: "/admin/users/:userId",
    name: "editUser",
    component: () => import("@/views/users/EditUser.vue")
  },
  {
    path: "/admin/terrenos",
    name: "manageTerrenos",
    component: () => import("@/views/terrenos/ManageTerrenos.vue")
  },
  {
    path: "/admin/parcerias",
    name: "listParcerias",
    component: () => import("@/views/terrenos/ManageTerrenos.vue")
  },
  {
    path: "/admin/terrenos/:terrenoId",
    name: "editTerreno",
    component: () => import("@/views/terrenos/EditTerreno.vue")
  },
  {
    path: "/admin/terrenos/add",
    name: "addTerreno",
    component: () => import("@/views/terrenos/AddTerreno.vue")
  },
  {
    path: "/users/perfil",
    name: "perfil",
    component: () => import("@/views/users/Perfil.vue"),
    meta: {
      rule: "user"
    }
  },
  {
    path: "/users/perfilLogout",
    name: "logout",
    component: () => import("@/views/users/Perfil.vue"),
    meta: {
      rule: "user"
    }
  },
  {
    path: "/users/perfil/edit",
    name: "editPerfil",
    component: () => import("@/views/users/EditPerfil.vue"),
    meta: {
      rule: "user"
    }
  },
  {
    path: "/parcerias",
    name: "parcerias",
    component: () => import("@/views/Parcerias.vue"),
    meta: {
      rule: "user"
    }
  },
  {
    path: "/contratos",
    name: "contratos",
    component: () => import("@/views/contratos/ListContratos.vue"),
    meta: {
      rule: "user"
    }
  },
  {
    path: "/contratos/:contratoId",
    name: "contrato",
    component: () => import("@/views/contratos/Contrato.vue"),
    meta: {
      rule: "user"
    }
  },
  {
    path: "/terrenos",
    name: "terrenos",
    component: () => import("@/views/terrenos/ListTerrenos.vue"),
    meta: {
      rule: "user"
    }
  },
  {
    path: "/terrenos/:terrenoId",
    name: "terreno",
    component: () => import("@/views/terrenos/Terreno.vue"),
    meta: {
      rule: "user"
    }
  },
  {
    path: "/users/email",
    name: "email",
    component: () => import("@/views/system/Email.vue"),
    meta: {
      rule: "user"
    }
  },
  // Redirect to 404 page, if no match found
  {
    path: "*",
    component: () => import("@/views/system/Error404.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
