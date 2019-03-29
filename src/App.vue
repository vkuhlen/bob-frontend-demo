<template>
  <div id="app">
    <div id="nav">
        <router-link to="/">Home</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #444444;
  width: 90%;
  max-width: 500px;
  margin: auto;
}

#app a {
    color: #444444;
}

#nav {
  padding: 10px;
}

#nav a {
  font-weight: bold;
}

#nav a.router-link-exact-active {
  display: none;
}
</style>
