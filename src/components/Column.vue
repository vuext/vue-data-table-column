<script>
import { isEmpty, forEach } from 'lodash';

export default {
  name: 'DataTableColumn',
  props: {
    columnProps: {
      type: Object,
      default () {
        return {};
      }
    },
    formatter: {
      type: Function,
      default: (row, column, cellValue, index) => cellValue
    }
  },
  data () {
    return {
      innerColumnProps: {}
    };
  },
  watch: {
    $props (val) {
      console.log('Props changed!');
    },
    columnProps (val) {
      this.setInnerColumnProps(val);
    }
  },
  created () {
    console.log(this.$props);
    this.setInnerColumnProps(this.columnProps);
  },
  methods: {
    setInnerColumnProps(val) {
      this.innerColumnProps = val || {};
    }
  },
  render(h, data) {
    let self = this;
    return h(
      'el-table-column',
      {
        attrs: { ...this.innerColumnProps },
        scopedSlots: {
          default (props) {
            let { column, row } = props, value;
            if (typeof self.$scopedSlots.default === 'function') {
              value = self.$scopedSlots.default(props);
            } else if (column.property && isEmpty(row[column.property]) === false) {
              value = typeof self.formatter === 'function'
                ? self.formatter(row, column, row[column.property], column.index) : row[column.property];
            }
            if (isEmpty(value) === false) {
              return h('div', [ value ]);
            }
          }
        }
      },
      [
        isEmpty(this.$slots) === false ? forEach(this.$slots, (_, name) => {
          return h('div', this.$slots[name]);
        }) : undefined,
      ]
    );
  }
}
</script>
