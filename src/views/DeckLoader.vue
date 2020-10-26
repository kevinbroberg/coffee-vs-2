<template>
  <div id="deckLoader">
    <label class="load-input">
        Read Text File
        <input type="file" @change="loadTextFromFile">
    </label>
    <br>
    <!-- TODO how tf am i supposed to style this for mobile? -->
    <textarea v-model="text" @load="text = $event" rows=20 cols=100></textarea>
    
  </div>
</template>

<script>
export default {
  name: "DeckLoader",
  data() {
      return {
          text: "",
      }
  },
  methods: {
    loadTextFromFile(ev) {
      const file = ev.target.files[0];
      const reader = new FileReader();

      reader.onload = e => this.$emit("load", e.target.result);
      reader.readAsText(file);
    }
  }
};
</script>

<style>
.load-input {
  position: relative;
  overflow: hidden;
  display: inline-block;

  /* Fancy button style 😎 */
  border: 2px solid black;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
}
.load-input input {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0;
}
</style>