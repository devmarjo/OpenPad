<template>
  <div class="">
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <div class="column q-gutter-sm">
        <q-btn unelevated fab icon="refresh" color="purple" @click="refresh()" />
        <q-btn unelevated fab icon="save" color="green" :disable="!flagSave" @click="saveWork" />
      </div>
    </q-page-sticky>
    <q-editor
      style="max-height: calc(100vh-50px);"
      @update:model-value="flagSave = true"
      v-model="qeditor"
      :dense="$q.screen.lt.md"
      :toolbar="[
        [
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            list: 'only-icons',
            options: ['left', 'center', 'right', 'justify']
          },
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            options: ['left', 'center', 'right', 'justify']
          }
        ],
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        ['token', 'hr', 'link', 'custom_btn'],
        ['print', 'fullscreen'],
        [
          {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: [
              'p',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'code'
            ]
          },
          {
            label: $q.lang.editor.fontSize,
            icon: $q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'size-1',
              'size-2',
              'size-3',
              'size-4',
              'size-5',
              'size-6',
              'size-7'
            ]
          },
          {
            label: $q.lang.editor.defaultFont,
            icon: $q.iconSet.editor.font,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'default_font',
              'arial',
              'arial_black',
              'comic_sans',
              'courier_new',
              'impact',
              'lucida_grande',
              'times_new_roman',
              'verdana'
            ]
          },
          'removeFormat'
        ],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

        ['undo', 'redo'],
        ['viewsource']
      ]"
      :definitions="{
        save: {
          tip: 'Save your work',
          icon: 'save',
          label: 'Save',
          handler: saveWork
        }
      }"
      :fonts="{
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana'
      }"
    />
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { api } from 'boot/axios'
import { useQuasar } from 'quasar';
import { useVersionsStore } from 'stores/versions'
const $q = useQuasar()
const r = useRoute()
const versions = useVersionsStore()
const key = String(r.params.key)
versions.updateList(key)
const qeditor = ref<string>('')
const flagSave = ref<boolean>(false)
const get = () => {
  $q.loading.show()
  let url = '/'
  if(r.params.key && r.params.version) url += `${r.params.key}/${r.params.version}`
  else url += `${r.params.key}`
  api.get(url).then( res => {
      console.log(res.data)
      qeditor.value = res.data.notepad
      flagSave.value = false
    } 
  ).finally(() => $q.loading.hide())
}
const set = () => {
  $q.loading.show()
  let url = '/' + r.params.key
  api.post(url, { notepad: qeditor.value }).then( res => {
      flagSave.value = false
      $q.notify({
        message: `Nova versão foi ${res.data.version} criada`,
        type: 'positive'
      })
    } 
  ).finally(() => {
    versions.updateList(key)
    $q.loading.hide()
  })
}
const refresh = () => {
  if (flagSave.value) {
    $q.dialog({
      title: 'Atenção',
      message: 'Edição não será salva, deseja continuar ?',
      cancel: true
    }).onOk(() => {
      get()
    }).onCancel(() => {
      // console.log('Cancel')
    }).onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    })
  }
}
const saveWork = () => {
  set()
}
get()
</script>

