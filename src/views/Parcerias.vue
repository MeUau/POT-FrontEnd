<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Hall of Fame" />
      <!-- Top Menu -->
      <b-row class="mb-4">
        <b-col cols="2"></b-col>
        <b-col>
          <b-button class="btn btn-info mr-2 p-2" @click="goBack()">
            <i class="fas fa-arrow-circle-left"></i> VOLTAR À PÁGINA ANTERIOR
          </b-button>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>

      <!-- Table -->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col>
          <table class="table table-striped">
            <thead class="thead-dark">
              <tr>
                <th scope="col">POSIÇÃO</th>
                <th scope="col">NAME</th>
                <th scope="col">NÍVEL</th>
                <th scope="col">ÁREA</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in users" :key="user.name">
                <td class="pt-4">{{ index + 1 }}º</td>
                <td class="pt-4">{{ user.name }}</td>
                <td class="pt-4">
                  {{ getUserLevelByArea(user.level.area).name }}
                </td>
                <td class="pt-4">{{ user.level.area }}</td>
              </tr>
            </tbody>
          </table>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { FETCH_USERS } from "@/store/users/user.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import { mapGetters } from "vuex";
import router from "@/router";

export default {
  name: "Parcerias",
  components: {
    HeaderPage
  },
  data: function() {
    return {
      users: []
    };
  },
  computed: {
    ...mapGetters(["getUserLevelByArea"]),
    ...mapGetters("user", ["getUsers"])
  },
  methods: {
    goBack() {
      router.go(-1);
    },
    fetchUsers() {
      this.$store.dispatch(`user/${FETCH_USERS}`).then(
        () => {
          this.users = this.getUsers;
          this.users.sort(this.compareArea);
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },
    compareArea(u1, u2) {
      if (u1.level.area > u2.level.area) return -1;
      if (u1.level.area < u2.level.area) return 1;
      else return 0;
    }
  },
  created() {
    this.fetchUsers();
  }
};
</script>
