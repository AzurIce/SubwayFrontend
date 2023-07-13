<script setup>
import SnackBar from '@/components/SnackBar.vue'
import { onMounted, ref } from 'vue'
import BgParticle from '../../components/BgParticle.vue'
import { getOverload } from '@/lib/axios/data'

const stations = ref([])

async function updateData() {
  const res = await getOverload()
  console.log(res)
  stations.value = res.data.data
}

onMounted(async () => {
  updateData()
})

const msg = ref('')
</script>

<template>
  <SnackBar v-model="msg" />
  <BgParticle />
  <div class="tw-h-full tw-overflow-y-auto">
    <h1 class="green tw-text-center">可能的预警信息如下</h1>
    <v-table style="background-color: transparent">
      <thead>
        <tr>
          <th class="text-left">GTFS_Stop_ID</th>
          <th class="text-left">Entries</th>
          <th class="text-left">Exits</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="station in stations" :key="station.GTFS_Stop_ID">
          <td>{{ station.GTFS_Stop_ID }}</td>
          <td>{{ station.Entries }}</td>
          <td>{{ station.Exits }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <div class="admin">Welcome,Super Admin!</div>
</template>
<style scoped>
.admin {
  text-align: center;
  font-size: 30px;
  color: rgb(44, 179, 191);
  font-weight: bold;
}
</style>