<template>
  <div v-if="ready">
    <div v-if="error">
      <h2>Error: {{ error }}</h2>
    </div>
    <div v-if="loading">
      <h2>Loading data...</h2>
    </div>
    <h1>
      WM 2022: Der Spielplan - Spiele, Termine, Uhrzeit – Gruppenphase bis
      Finale
    </h1>
    <div class="header">
      <h4>
        Der Spielplan für die WM 2022 im Überblick, inklusive aller Termine,
        Spielorte und Anstoßzeiten. Das Turnier findet vom 20. November bis 18.
        Dezember in Katar statt. Österreich hat die Qualifikation nicht
        geschafft.
      </h4>
      <h3>WM 2022: Der Spielplan kompakt:</h3>
      <ul>
        <li>
          Die Anstoßzeiten der WM-Gruppenspiele sind 11:00 Uhr, 14:00 Uhr, 16:00
          Uhr, 17:00 Uhr und 20:00 Uhr (MEZ)
        </li>
        <li>K.o. Phase: Anstoßzeiten jeweils 16:00 Uhr und 20:00 Uhr (MEZ).</li>
        <li>
          Der Zeitunterschied zwischen Katar und Österreich während der WM sind
          2 Stunden. Ortszeit ist also 2 Stunden früher als bei uns.
        </li>
        <li>
          WM-Finale: Das Endspiel findet am 18.12.2022 im Lusail Stadion (80.000
          Zuschauern) statt.
        </li>
      </ul>
    </div>
    <hr />
    <h2>Teilnehmende Länder:</h2>

    <div v-for="(item, index) in data.flags" :key="index">

    {{item.country}}
    <img :src="item.link">

    </div>
    
    <hr/>

    <div v-for="(item, index) in data.groups" :key="index">
    <h4>Gruppe {{item.group}}:</h4>
    <table>
      <thead>
        <tr>
          <th>Teilnehmer</th>
          <th>Zeitpunkt</th>
          <th>Ergebniss</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(member, index1) in item.members" :key="index1">
          <td>{{member.teams[0].team1}} - {{member.teams[1].team2}}</td>
          <td>{{member.date}} {{member.time}}</td>
          <td v-if="currentDate() > member.date"> Ergebniss: {{member.teams[2].goals_team1}}:{{member.teams[3].goals_team2}}</td>
          <td v-else>Noch nicht tattgefunden</td>
        </tr>
      </tbody>
    </div>
  </div>
</template>

<script>
import { useFetch } from '../composables/UseFetch.js';
import { ref } from 'vue';
//import { onMounted } from "vue";

export default {
  component: {},
  async setup() {
    const { error, loading, data, ready } = await useFetch(
      'https://raw.githubusercontent.com/htlWels/WM/main/spielplan.json',
      {
        'content-type': 'application/json',
      }
    );

    //console.log('loading: ' + ready.value);

    function currentDate() {
      let cD = new Date().toLocaleDateString();
      let res = cD.replace(/\//g, '.');
      return res;
    }

    return {
      data,
      error,
      loading,
      ready,
      currentDate,
    };
  },
};
</script>

<style scoped>

h1 {
  text-align: center;
}
table {
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  width: 75%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  margin-left: auto;
  margin-right: auto;
}
thead tr {
  background-color: #009879;
  color: #ffffff;
  text-align: left;
}
th tr {
  padding: 12px 15px;
  width: 25%;
}
tbody tr {
  border-bottom: 1px solid #dddddd;
}
tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}
tbody tr.active-row {
  font-weight: bold;
  color: #009879;
}

</style>
