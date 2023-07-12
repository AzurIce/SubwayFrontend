<script setup>
import SnackBar from '@/components/SnackBar.vue'
import { onMounted, ref } from 'vue'
import BgParticle from '../../components/BgParticle.vue';
import {getUsers, deleteUser, updateUserInfo } from '@/lib/axios/admin'
const updateDialog = ref(false)
const users = ref([])
const selectName = ref('')
const selectPremissopn = ref('')
const selectMail = ref('')
const selectID = ref('')

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
        updateData()
    }).catch((err) => {
        msg.value = `删除失败：${err}`
    })
}

function openUpdateDialog(id,name,mail,permission) {
    updateDialog.value = true
    selectName.value = name
    selectID.value = id
    selectPremissopn.value = permission
    selectMail.value = mail
} 

function onEditUser() {
    console.log(`edit: ${selectName.value} ${selectPremissopn.value} ${selectMail.value}`)
    updateUserInfo(selectID.value,selectName.value,selectPremissopn.value,selectMail.value).then((res) => {
        console.log(res)
        msg.value = "修改成功"
    }).catch((err) => {
        msg.value = `修改失败：${err}`
    })
    updateData()
    updateDialog.value = false
}
const msg = ref('')
</script>

<template>
      <v-dialog v-model="updateDialog" width="auto">
      <v-card>
        <v-card-text style="width: 400px;">
          <v-text-field label="Name" v-model="selectName"></v-text-field>
          <v-text-field label="Mail" v-model="selectMail"></v-text-field>
          <v-text-field label="Premission" v-model="selectPremissopn"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="onEditUser()">UpDate</v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn color="primary" block @click="updateDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <SnackBar v-model="msg"/>
     <BgParticle/>
    <v-table style="background-color: transparent;">
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
            <v-btn @click="openUpdateDialog(user.id,user.name,user.mail,user.permission)">修改</v-btn>
            <v-btn @click="onDeleteUser(user.id)">删除</v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
  <div class="admin">
    Welcome,Super Admin!
  </div>
</template>
<style scoped>
.admin {
  text-align: center;
  font-size: 30px;
  color: rgb(44, 179, 191);
  font-weight: bold;
}
</style>