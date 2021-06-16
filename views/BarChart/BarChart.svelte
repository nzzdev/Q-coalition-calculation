<script>
    export let parties;
  </script>

<div class="q-coalition-calculation-barchart">
    {#each parties as party}
    <div
      class="{party.useClass
        ? party.color.classAttribute
        : ''} q-coalition-calculation-barchart-bar__row"
      style={party.barStyle}
    />
    {/each}
</div>

<style>
.q-coalition-calculation-barchart {
  position: relative;
  display: flex;
  height: 27px;
  background: #cecfd6;
}

.q-coalition-calculation-barchart-bar__row {
  height: 100%;
  flex-shrink: 0;
  flex-grow: 0;
  border-right: 0.5px solid #fff;
  border-left: 0.5px solid #fff;
}
</style>
