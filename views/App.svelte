<script>
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";
  import BarChart from "./BarChart/BarChart.svelte";
  import BarChartLabel from "./BarChart/BarChartLabel.svelte";
  import BarChartMajorityLabel from "./BarChart/BarChartMajorityLabel.svelte";
  import BarChartDescription from "./BarChart/BarChartDescription.svelte";

  export let item;
  export let displayOptions;

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
        let coalitionParties = coalition
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
</script>

<div class="s-q-item q-coalition-calculation">
  <Header {item} hideTitle={displayOptions.hideTitle} />
  {#each augmentedPossibleCoalitions as coalition, i}
    <div class="q-coalition-calculation-row">
      <div
        class="q-coalition-calculation-column q-coalition-calculation-barchart-container s-color-gray-3"
      >
        <BarChartLabel
          totalPercents={coalition.totalPercents}
          totalSeats={coalition.totalSeats}
          hasSeatsData={item.totalSeats && coalition.totalSeats > 0}
          isFirstRow={i === 0}
        />
        <BarChart parties={coalition.parties} />
        <BarChartMajorityLabel
          totalSeats={item.totalSeats}
          coalitionSeats={coalition.totalSeats}
          hasSeatsData={item.totalSeats && coalition.totalSeats > 0}
          isFirstRow={i === 0}
        />
      </div>
      <div
        class="q-coalition-calculation-column q-coalition-calculation-description-container s-font-note s-color-gray-7"
      >
        <BarChartDescription {coalition} totalSeats={item.totalSeats} />
      </div>
    </div>
  {/each}
  <Footer {item} />
</div>

<style>
  .q-coalition-calculation-row {
    display: flex;
    flex-flow: row wrap;
    justify-content: stretch;
    margin-right: -15px;
    padding: 15px 0;
  }

  .q-coalition-calculation-column {
    flex: 1 0 265px;
    margin-right: 15px;
    margin-bottom: 5px;
  }

  .q-coalition-calculation-description-container {
    align-self: center;
    margin-right: 15px;
  }
</style>
