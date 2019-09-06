import DataTableColumn from './packages/table-column';
import './styles/index.css';

const DataTableColumnPlugin = {
  install(Vue, options) {
    Vue.component(DataTableColumn.name, DataTableColumn);
  }
};

export default DataTableColumnPlugin;
export { DataTableColumn };
