<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info" class="mb-3">
      <b-navbar-brand href="#">Avro Schema Generator</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
         <!-- <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <router-view></router-view>


      <b-navbar  type="dark" variant="dark" class="mt-3">
          <b-nav-text class="mx-auto" >Copyright © Avro Schema Generator  {{ new Date().getFullYear() }}</b-nav-text>
      </b-navbar>
  </div>
</template>

<script>

export default {
    metaInfo: {
        title: 'Avro Schema Generator',
        meta: [
            { charset: 'utf-8' },
            { name:'keywords', content:'avro schema generator, mysql ddl avro , json, csv' },
            { name:'description',content:'Avro Schema generator, online Avro Schema generator, avro schema json' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }
        ]
    },
  name: 'App',
  components: {
  }

}
</script>

<style>
#app {

}
html,body {
  height: 100%;
}

</style>
