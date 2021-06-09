<script>
  export let coalition;
  export let totalSeats;

  function partySeperation(i) {
    if (i + 1 >= coalition.parties.length) {
      return "";
    }

    if (i + 2 === coalition.parties.length) {
      return " und ";
    }
    return ", ";
  }
</script>

{#each coalition.parties as party, i}
  <span
    class="s-font-note s-font-note--strong {party.useClass
      ? party.color.classAttribute
      : ''}"
    style={party.fontStyle}>{party.name}</span
  >{@html partySeperation(i)}
{/each}
komm{coalition.parties.length > 1 ? "en gemeinsam" : "t"} auf {coalition.totalSeats}
Abgeordnete
{#if totalSeats > 0}({coalition.totalPercents}%){/if}.
