<template>
  <q-page class="column flex-center">
    <div class="text-h1 text-center">openPad</div>
    <div class="full-width q-pa-lg">
      <q-input square dense outlined v-model="input" hint="Pequise uma 'Chave' ou uma 'Chave/versao'">
        <template v-slot:before >
          {{ site }}/#/
        </template>
        <template v-slot:after >
          <q-btn  :disable="input.length < 1" outline square icon="arrow_forward_ios" @click="goTo" />
        </template>
      </q-input>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const rr = useRouter()
const input = ref<string>('');
  const goTo = () => {
  rr.push({ path: '/' + input.value })
}
const site = window.location.origin
</script>
