import DataTableColumn from './components/Column.vue';

const DataTableColumnPlugin = {
  install(Vue, options) {
    Vue.component(DataTableColumn.name, DataTableColumn);
  }
};

export default DataTableColumnPlugin;
export { DataTableColumn };
