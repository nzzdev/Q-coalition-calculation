<script>
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";
  import BarChart from "./BarChart/BarChart.svelte";
  import BarChartDescription from "./BarChart/BarChartDescription.svelte";

  export let item;
  export let displayOptions;
  export let contentWidth;

  const augmentedPossibleCoalitions = resovleAugmentedPossibleCoalitions(
    item.totalSeats,
    item.possibleCoalitions,
    item.parties
  );

  function resovleAugmentedPossibleCoalitions(
    totalSeats,
    possibleCoalitions,
    parties
  ) {
    // augment coaltion's party references with full data and calculate its seat total
    return possibleCoalitions
      .map((coalition) => {
        let totalCoalitionPercents = 0;
        let totalCoalitionSeats = 0;
        let coalitionParties = coalition.parties
          .map((party) => {
            if (party === null) {
              return undefined;
            }

            // augment coalition party with full party data using the party name as reference
            let augmentedParty = parties.find((p) => p.id === party.id);
            if (augmentedParty === undefined) {
              return undefined;
            }

            // additionally augment the party with properties to render its name and bar chart markup
            augmentedParty.useClass =
              augmentedParty.color.classAttribute !== undefined &&
              augmentedParty.color.classAttribute !== "";
            augmentedParty.fontStyle = "";
            const partyPercents = totalSeats
              ? ((augmentedParty.seats / totalSeats) * 100).toFixed(2)
              : 0;
            totalCoalitionSeats += augmentedParty.seats || 0;
            augmentedParty.barStyle = `width: ${partyPercents}%;`;
            if (augmentedParty.useClass) {
              augmentedParty.barStyle += "background-color: currentColor";
            } else {
              augmentedParty.fontStyle = `color: ${augmentedParty.color.colorCode}`;
              augmentedParty.barStyle += `background-color: ${augmentedParty.color.colorCode}`;
            }
            return augmentedParty;
          })
          .filter((p) => p !== undefined);

        totalCoalitionPercents = Math.round(
          (totalCoalitionSeats * 100) / totalSeats
        );

        if (coalitionParties.length > 0) {
          return {
            name: coalition.name,
            parties: coalitionParties,
            totalPercents: totalCoalitionPercents,
            totalSeats: totalCoalitionSeats,
          };
        } else {
          return undefined;
        }
      })
      .filter((c) => c !== undefined);
  }

  function getRowBottomSpace(width, length, index) {
    if (index >= length - 1) {
      return "";
    }

    if (width > 272) {
      return "margin-bottom: 30px;";
    }
    return "margin-bottom: 50px;";
  }
</script>

<div class="s-q-item q-coalition-calculation">
  <Header {item} hideTitle={displayOptions.hideTitle} />
  {#each augmentedPossibleCoalitions as coalition, i}
    <div
      class="q-coalition-calculation-row"
      style={getRowBottomSpace(
        contentWidth,
        augmentedPossibleCoalitions.length,
        i
      )}
    >
      <div>
        {#if coalition.name}
          <span class="s-font-note s-font-note--strong">{coalition.name}</span>
        {/if}
        <span class="s-font-note">{coalition.totalPercents}%</span>
      </div>
      <div class="q-coalition-calculation-barchart-row">
        <div
          class="q-coalition-calculation-barchart-row__column q-coalition-calculation-barchart-row__container s-color-gray-3"
          style={i === 0 ? "" : "margin-bottom: 8px;"}
        >
          <div class="q-coalition-calculation-barchart-row__middle__line" />
          <BarChart parties={coalition.parties} />
          {#if i === 0}
            <div
              class="s-font-note-s s-color-gray-9 q-coalition-calculation-barchart-row__middle__text"
            >
              50%
            </div>
          {/if}
        </div>
        <div
          class="q-coalition-calculation-barchart-row__column q-coalition-calculation-barchart-row__description-container s-font-note s-color-gray-7"
        >
          <BarChartDescription {coalition} coalitionName={coalition.name} />
        </div>
      </div>
    </div>
  {/each}
  <Footer {item} />
</div>

<style>
  .q-coalition-calculation-row:not(:last) {
    margin-bottom: 50px;
  }
  .q-coalition-calculation-barchart-row__middle__line {
    position: absolute;
    z-index: 2;
    left: 50%;
    margin-left: -0.5px;
    top: -8px;
    width: 1px;
    height: 42px;
    background-color: #05032d;
  }

  .q-coalition-calculation-barchart-row__middle__text {
    display: flex;
    justify-content: center;
    margin-top: 6px;
    margin-bottom: -8px;
  }
  .q-coalition-calculation-barchart-row {
    display: flex;
    flex-flow: row wrap;
    justify-content: stretch;
    margin-right: -15px;
  }

  .q-coalition-calculation-barchart-row__column {
    position: relative;
    flex: 1 0 265px;
    margin-right: 15px;
  }

  .q-coalition-calculation-barchart-row__container {
    margin-top: 8px;
    flex-grow: 2;
  }

  .q-coalition-calculation-barchart-row__description-container {
    padding-top: 8px;
    margin-right: 15px;
  }
</style>
