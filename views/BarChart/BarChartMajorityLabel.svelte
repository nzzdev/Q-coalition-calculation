<script>
  export let totalSeats;
  export let hasSeatsData;
  export let isFirstRow;

  const majority = resolveMajority(totalSeats);

  function resolveMajority(totalSeats) {
    return Math.floor(totalSeats / 2 + 1);
  }
</script>

<div
  class="s-font-note-s s-font-note--tabularnums s-color-gray-5 q-coalition-calculation-majority-label"
>
  {#if isFirstRow}
    Mehrheit{hasSeatsData ? ": " : ""}
  {/if}
  {#if hasSeatsData}
    {majority}
  {/if}
</div>

<style>
  .q-coalition-calculation-majority-label {
    text-align: left;
    border-left: 1px solid currentColor;
    margin-left: 50%;
    padding: 3px 0 0 3px;
    font-size: 12px;
    line-height: 1;
  }
</style>
