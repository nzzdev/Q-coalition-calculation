<script>
  export let totalPercents;
  export let totalSeats;
  export let hasSeatsData;
  export let isFirstRow;
</script>

{#if hasSeatsData}
  <div class="q-coalition-calculation-barchart-label-container">
    <div
      class="q-coalition-calculation-barchart-label s-font-note-s s-font-note--tabularnums s-font-note-s-strong"
      style="left: {totalPercents}%;"
    >
      {totalSeats}{isFirstRow ? " Abgeordnete" : ""}
    </div>
  </div>
{/if}

<style>
  .q-coalition-calculation-barchart-label-container {
    position: relative;
    width: 100%;
    height: 19px;
  }

  .q-coalition-calculation-barchart-label {
    position: absolute;
    width: 100px;
    text-align: center;
    margin-left: -50px;
    font-weight: bold;
  }
  .q-coalition-calculation-barchart-label:after {
    position: absolute;
    content: "";
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 4px 3px 0 3px;
    border-color: currentColor transparent transparent transparent;
    left: 50%;
    margin-left: -3px;
    top: 15px;
  }
</style>
