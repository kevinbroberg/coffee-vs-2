<template>
    <header class="header">
        <h1>Build.UVS</h1>
        <div id="nav">
            <router-link to="/">Home</router-link>|
            <router-link to="/deck">Deck</router-link>|
            <router-link to="/about">About</router-link>|
            <!-- <router-link to="/ultra">Classic Ultra Search</router-link>| -->
            <router-link to="/loader">Deck Input</router-link>
        </div>
    </header>
</template>

<script>
export default {
    name: "Header"
}
</script>

<style scoped>

  .header {
    background: #333;
    color: #fff;
    text-align: center;
    padding: 10px;
  }

  .header a {
    color: #fff;
    padding-right: 5px;
    padding-left: 5px;
    text-decoration: none;
  }
</style>