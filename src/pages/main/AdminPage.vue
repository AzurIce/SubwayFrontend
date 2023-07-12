<script setup>
import SnackBar from '@/components/SnackBar.vue'
import { onMounted, ref } from 'vue'

import {getUsers, deleteUser} from '@/lib/axios/admin'

const users = ref([])

async function updateData() {
    const res = await getUsers()
    console.log(res)
    users.value = res.data.data
}

onMounted(async () => {
    updateData()
})

function onDeleteUser(id) {
    console.log(`delete: ${id}`)
    deleteUser(id).then((res) => {
        console.log(res)
        msg.value = "删除成功"
    }).catch((err) => {
        msg.value = `删除失败：${err}`
    })
}

function onEditUser(id) {
    console.log(`edit: ${id}`)
}
const msg = ref('')
</script>

<template>
    <SnackBar v-model="msg"/>
    <v-table>
    <thead>
      <tr>
        <th class="text-left">
          Id
        </th>
        <th class="text-left">
          Name
        </th>
        <th class="text-left">
          Permission
        </th>
        <th class="text-left">
          Mail
        </th>
        <th class="text-left">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="user in users"
        :key="user.id"
      >
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.permission }}</td>
        <td>{{ user.mail }}</td>
        <td>
            <v-btn @click="onEditUser(user.id)">修改</v-btn>
            <v-btn @click="onDeleteUser(user.id)">删除</v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
    admin
</template>