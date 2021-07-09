<!-- ********** Para edição do terreno pelo administrador ********** -->
<template>
  <b-col cols="4">
    <b-card
      :title="terreno.name"
      :img-src="terreno.urlPhoto"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem"
      class="mb-5"
    >
      <b-card-text>
        <kbd>{{ terreno.cultura }}</kbd
        >&nbsp;
        <kbd style="background-color: red">área {{ terreno.area }}</kbd>
      </b-card-text>
      <b-card-text>{{ terreno.descricao }}</b-card-text>

      <router-link
        :to="{ name: 'terreno', params: { terrenoId: terreno._id } }"
        tag="b-button"
        variant="outline-success"
        align="center"
        class="mr-2"
      >
        <i class="fas fa-search"></i> ver terreno
      </router-link>
      <b-button variant="info" :href="terreno.urlPhoto" target="_blank">
        <i class="fab fa-facebook"></i> Partilhar
      </b-button>
    </b-card>
  </b-col>
</template>

<script>
export default {
  name: "Terreno",
  props: ["terreno"]
};
</script>
