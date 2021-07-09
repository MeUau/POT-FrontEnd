// Final
<template>
  <section class="page-section">
    <b-container fluid>
      <HeaderPage title="Gestão do Pot" />

      <b-row>
        <b-col cols="3"></b-col>
        <b-col cols="6">
          <b-card-group deck class="mt-3">
            <AdminOptionBox
              routeName="listUsers"
              iconName="users"
              title="Utilizadores"
            />
            <AdminOptionBox
              routeName="manageTerrenos"
              iconName="handshake"
              title="Parcerias"
            />
            <AdminOptionBox
              routeName="perfilAdmin"
              iconName="sign-out-alt"
              title="administrador"
            />
          </b-card-group>
          <b-card-group deck class="mt-3">
            <AdminOptionBox
              routeName="listClausulas"
              iconName="check-square"
              title="clausulas"
            />
            <AdminOptionBox
              routeName="manageContratos"
              iconName="file-alt"
              title="Contratos"
            />
            <AdminOptionBox
              routeName="manageTerrenos"
              iconName="map"
              title="Terrenos"
            />
          </b-card-group>
        </b-col>
        <b-col cols="3"></b-col>
      </b-row>
    </b-container>
  </section>
</template>
<script>
import HeaderPage from "@/components/HeaderPage.vue";
import AdminOptionBox from "@/components/AdminOptionBox.vue";

export default {
  components: {
    HeaderPage,
    AdminOptionBox
  }
};
</script>
