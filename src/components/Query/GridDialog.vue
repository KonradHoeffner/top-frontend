<template>
  <q-dialog ref="dialogRef" persistent full-width full-height @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <ag-grid-vue
          :row-data="rowData"
          :column-defs="colDefs"
          :default-col-def="defaultColDef"
          :column-types="columnTypes"
          style="width: 100%; height: 90vh"
          class="ag-theme-quartz"
        >
        </ag-grid-vue>
      </q-card-section>
      <q-separator />
      <!--
        ...content
        ... use q-card-section for it?
      -->
      <!-- buttons example -->
      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
/* eslint-disable @typescript-eslint/no-unsafe-assignment*/
/* eslint-disable @typescript-eslint/no-unsafe-argument*/
/* eslint-disable @typescript-eslint/no-unsafe-member-access*/
import { useDialogPluginComponent } from 'quasar'
import 'ag-grid-community/styles/ag-grid.css' // Core CSS
import 'ag-grid-community/styles/ag-theme-quartz.css' // Theme
import { AgGridVue } from 'ag-grid-vue3' // Vue Grid Logic
import { ref } from 'vue'
import Papa from 'papaparse'

const props = defineProps({
  csv: String
  // ...your custom props
})

// this commit causes the build error
//const colDef = (fieldName: string) => 5;

/*
function colDef(fieldName: string) {
  const def = { field: fieldName }
  if (fieldName == 'Id') {
    def.type = 'idColumn'
  }
  if (fieldName.includes('(DATE)')) {
    def.type = 'dateColumn'
  }
  return def
}
*/
const parseResult = Papa.parse(props.csv, { header: true, delimiter: ';' })
const rows = parseResult.data
const keys = Object.keys(rows[0])
const fields = keys.map((key) => ({ field: key }))
//console.log(fields)
const colDefs = ref(fields)
//const colDefs = ref([{ field: 'make' }, { field: 'model' }, { field: 'price' }, { field: 'electric' }])

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const rowData = ref(rows)

const defaultColDef = {
  editable: false,
  sortable: true,
  filter: 'agNumberColumnFilter'
}
const columnTypes = {
  idColumn: { filter: 'agTextColumnFilter' },
  dateColumn: {
    filter: 'agDateColumnFilter',
    cellDataType: 'dateString'
  }
}

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

// this is part of our example (so not required)
function onOKClick() {
  // on OK, it is REQUIRED to
  // call onDialogOK (with optional payload)
  onDialogOK()
  // or with payload: onDialogOK({ ... })
  // ...and it will also hide the dialog automatically
}
</script>
