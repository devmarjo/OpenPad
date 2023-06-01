<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-grey">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="cursor-pointer" @click="$r.push({ path: '/' })">
          openPad {{ $route.params.fullPath }}
        </q-toolbar-title>
        <div>by Marjo</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      dark
    >
      <q-list dark separator>
        <q-item-label
          header
        >
          Versões
        </q-item-label>
        <q-item clickable v-ripple v-for="item in versions.$state.list" :key="'versionID'+item.id" @click="$r.push({ path: `/${versions.$state.key}/${item.version}` })">
          <div class="column">
            <div>Versão {{ item.version }}</div>
            <span class="text-caption">{{ new Date(item.date).toLocaleDateString() }}</span>
          </div>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view :key="$route.fullPath" />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useVersionsStore } from 'src/stores/versions';
import { useRouter, useRoute } from 'vue-router';
const leftDrawerOpen = ref(false)
const versions = useVersionsStore()
const $r = useRouter()
const $route = useRoute()
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
