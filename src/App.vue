<template>
  <v-app-bar color="#f7f7f7" app extented>
    <v-img
      class="mx-4"
      src="https://media-exp1.licdn.com/dms/image/C560BAQGSI3DTJz8fWw/company-logo_200_200/0?e=1605139200&v=beta&t=v9oIUHAVGR0e36q5ZD4c7hgL9BfbbFmNyE9mBT9cv5s"
      max-height="100"
      max-width="100"
      contain
    ></v-img>
    <v-toolbar-items>
      <v-btn>Ana Sayfa</v-btn>
      <v-btn>Hakkımızda</v-btn>
      <v-btn>Atölyelerimiz</v-btn>
      <v-btn>Blog</v-btn>
      <v-btn>İletişim</v-btn>
      <v-btn rounded color="primary" dark>Gönüllü Ol !</v-btn>
    </v-toolbar-items>

  </v-app-bar>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
