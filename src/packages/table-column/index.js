import { isEmpty, isNotEmpty, combine, forEach } from '../../utils/helper';

export default {
  name: 'DataTableColumn',
  props: {
    value: {
      type: [String, Array],
      default: () => ''
    },
    columnProps: {
      type: Object,
      default () {
        return {};
      }
    },
    filterProps: {
      type: Object,
      default: () => {}
    },
    formatter: {
      type: Function,
      default: (row, column, cellValue) => cellValue
    }
  },
  computed: {
    filterType() {
      let filterProps = this.filterProps || {};
      return filterProps.type && ['input', 'text', 'select', 'date', 'datetime'].includes(filterProps.type)
        ? filterProps.type : undefined;
    },
    filterMethod() {
      let props = this.columnProps || {}, filterProps = this.filterProps || {};
      return props.filterMethod || filterProps.filterMethod || undefined;
    }
  },
  data () {
    return {
      innerColumnProps: {},
      innerFilterProps: {}
    };
  },
  watch: {
    columnProps (val) {
      this.setInnerColumnProps(val);
    },
    filterProps (val) {
      this.setInnerFilterProps(val || {});
    },
    value (val) {
      if (isEmpty(this.innerColumnProps.labelClassName)) {
        this.innerColumnProps.labelClassName = isNotEmpty(val) ? 'highlight' : '';
      } else {
        let styles = this.innerColumnProps.labelClassName.split(' ')
          .filter(v => isNotEmpty(v))
          .filter(v => v.indexOf('highlight') === -1);
        if (isNotEmpty(val)) {
          styles.push('highlight');
        }
        this.innerColumnProps.labelClassName = styles.join(' ');
      }
    }
  },
  created () {
    this.setInnerColumnProps(this.columnProps);
    this.setInnerFilterProps(this.filterProps || {});
  },
  methods: {
    setInnerColumnProps(val) {
      let props = val || {}, filterProps = this.filterProps || {};
      props.className = (props.className || '').split(' ');
      if (props.className.indexOf('data-table-column') === -1) {
        props.className.push('data-table-column');
      }
      if (this.filterType && !props.sortable) {
        props.sortable = 'custom';
        props.className.push('no-sortable');
      }
      props.className = props.className.join(' ');
      props.filters = (props.sortable && props.filters) || (props.sortable && this.filterType ? [] : undefined);
      props.filterMethod = this.filterMethod;
      this.innerColumnProps = combine(this.innerColumnProps, props);
    },
    setInnerFilterProps(val) {
      this.innerFilterProps = {
        type: this.filterType,
        data: val.data || [],
        filterMethod: this.filterMethod,
        callbackMethod: val.callbackMethod || undefined,
        placeholder: val.placeholder || '',
        clearable: val.clearable || true,
        width: val.width || '230px',
        icon: val.icon || 'el-icon-search',
        dateFormat: val.dateFormat || 'yyyy-MM-dd',
        dateValueFormat: val.dateValueFormat || 'yyyy-MM-dd',
        dateTimeFormat: val.dateTimeFormat || 'yyyy-MM-dd HH:mm:ss',
        dateTimeValueFormat: val.dateTimeValueFormat || 'yyyy-MM-dd HH:mm:ss',
        defaultTime: val.defaultTime || ['00:00:00', '23:59:59']
      };
    },
    renderHeader(h, props) {
      let { column } = props, value;
      switch (true) {
        case this.filterType === 'input':
        case this.filterType === 'text':
          value = this.renderInput(h, props);
          break;
        case this.filterType === 'select':
          value = this.renderSelect(h, props);
          break;
        case this.filterType === 'date':
          value = this.renderDate(h, props);
          break;
        case this.filterType === 'datetime':
          value = this.renderDate(h, props);
          break;
        default:
          value = column.label;
      }
      return value;
    },
    renderInput (h, { column, $index }) {
      return h(
        'div',
        {
          class: 'el-table__column-filter-popover',
          style: {
            color: column.color
          }
        },
        [
          h(
            'el-popover',
            {
              props: {
                placement: 'bottom',
                width: this.innerFilterProps.width,
                trigger: 'click'
              }
            },
            [
              h('el-input', {
                props: {
                  placeholder: this.innerFilterProps.placeholder,
                  value: this.value,
                  clearable: this.innerFilterProps.clearable
                },
                nativeOn: {
                  keyup: event => {
                    if (event.keyCode === 13) {
                      this.$emit('input', event.target.value);
                      this.innerFilterProps.callbackMethod && this.innerFilterProps.callbackMethod(column, this.innerColumnProps.prop, event.target.value);
                    }
                  }
                },
                on: {
                  input: value => {
                    if (value !== undefined) {
                      this.$emit('input', value);
                    }
                  },
                  blur: event => {
                    let value = event.target.value !== undefined ? event.target.value : this.value;
                    this.$emit('input', value);
                    this.innerFilterProps.callbackMethod && this.innerFilterProps.callbackMethod(column, this.innerColumnProps.prop, value);
                  }
                }
              }),
              h(
                'span',
                {
                  slot: 'reference'
                },
                [
                  column.label,
                  h('i', {
                    class: this.innerFilterProps.icon,
                    style: {
                      marginLeft: '4px'
                    }
                  })
                ]
              )
            ]
          )
        ]
      );
    },
    renderSelect(h, { column, $index }) {
      return h(
        'div',
        {
          class: 'el-table__column-filter-popover',
          style: {
            color: column.color
          }
        },
        [
          h(
            'el-popover',
            {
              props: {
                placement: 'bottom',
                width: this.innerFilterProps.width,
                trigger: 'click'
              }
            },
            [
              h(
                'el-select',
                {
                  props: {
                    placeholder: this.innerFilterProps.placeholder,
                    value: this.value,
                    clearable: this.innerFilterProps.clearable
                  },
                  on: {
                    input: value => {
                      this.$emit('input', value);
                      this.innerFilterProps.callbackMethod && this.innerFilterProps.callbackMethod(column, this.innerColumnProps.prop, value);
                    }
                  }
                },
                [
                  this.innerFilterProps.data.map(item => {
                    return h('el-option', {
                      props: {
                        value: item.value,
                        label: item.label
                      }
                    });
                  })
                ]
              ),
              h(
                'span',
                {
                  slot: 'reference'
                },
                [
                  column.label,
                  h('i', {
                    class: this.innerFilterProps.icon,
                    style: {
                      marginLeft: '4px'
                    }
                  })
                ]
              )
            ]
          )
        ]
      )
    },
    renderDate(h, { column, $index }) {
      return h(
        'div',
        {
          class: 'el-table__column-filter-popover'
        },
        [
          h(
            'el-popover',
            {
              props: {
                placement: 'bottom',
                width: this.innerFilterProps.width,
                trigger: 'click'
              }
            },
            [
              h('el-date-picker', {
                props: {
                  placeholder: this.innerFilterProps.placeholder,
                  value: this.value,
                  type: 'daterange',
                  rangeSeparator: '—',
                  startPlaceholder: 'Start date',
                  endPlaceholder: 'End date',
                  format: this.innerFilterProps.dateFormat,
                  valueFormat: this.innerFilterProps.dateValueFormat,
                  clearable: this.innerFilterProps.clearable
                },
                style: {
                  width: this.innerFilterProps.width
                },
                on: {
                  input: value => {
                    if (value) {
                      this.$emit('input', value);
                      this.innerFilterProps.callbackMethod && this.innerFilterProps.callbackMethod(column, this.innerColumnProps.prop, value);
                    }
                  },
                  change: value => {
                    if (value === null) {
                      this.$emit('input', []);
                      this.innerFilterProps.callbackMethod && this.innerFilterProps.callbackMethod(column, this.innerColumnProps.prop, value);
                    }
                  }
                }
              }),
              h(
                'span',
                {
                  slot: 'reference'
                },
                [
                  column.label,
                  h('i', {
                    class: this.innerFilterProps.icon,
                    style: {
                      marginLeft: '4px'
                    }
                  })
                ]
              )
            ]
          )
        ]
      )
    },
    renderDateTime(h, { column, $index }) {
      return h(
        'div',
        {
          class: 'el-table__column-filter-popover'
        },
        [
          h(
            'el-popover',
            {
              props: {
                placement: 'bottom',
                width: this.innerFilterProps.width,
                trigger: 'click'
              }
            },
            [
              h('el-date-picker', {
                props: {
                  placeholder: this.innerFilterProps.placeholder,
                  value: this.value,
                  type: 'datetimerange',
                  rangeSeparator: '—',
                  startPlaceholder: 'Start date',
                  endPlaceholder: 'End date',
                  format: this.innerFilterProps.dateTimeFormat,
                  valueFormat: this.innerFilterProps.dateTimeValueFormat,
                  defaultTime: this.innerFilterProps.defaultTime,
                  clearable: this.innerFilterProps.clearable
                },
                style: {
                  width: this.innerFilterProps.width
                },
                on: {
                  input: value => {
                    if (value) {
                      this.$emit('input', value);
                      this.innerFilterProps.callbackMethod && this.innerFilterProps.callbackMethod(column, this.innerColumnProps.prop, value);
                    }
                  },
                  change: value => {
                    if (value === null) {
                      this.$emit('input', []);
                      this.innerFilterProps.callbackMethod && this.innerFilterProps.callbackMethod(column, this.innerColumnProps.prop, value);
                    }
                  }
                }
              }),
              h(
                'span',
                {
                  slot: 'reference'
                },
                [
                  column.label,
                  h('i', {
                    class: this.innerFilterProps.icon,
                    style: {
                      marginLeft: '4px'
                    }
                  })
                ]
              )
            ]
          )
        ]
      )
    }
  },
  render (h) {
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
            } else if (column.property && isNotEmpty(row[column.property])) {
              value = typeof self.formatter === 'function'
                ? self.formatter(row, column, row[column.property], column.index) : row[column.property];
            }
            if (isNotEmpty(value)) {
              return h('div', [ value ]);
            }
          },
          header (props) {
            let { column, $index } = props, value;
            if (typeof self.$scopedSlots.header === 'function') {
              value = self.$scopedSlots.header(props);
            } else if (isNotEmpty(self.filterType)) {
              value = self.renderHeader(h, { column, $index });
            } else {
              value = typeof self.innerColumnProps.renderHeader === 'function'
                ? self.innerColumnProps.renderHeader(h, props) : column.label;
            }
            if (isNotEmpty(value)) {
              return h('span', [ value ]);
            }
          }
        }
      },
      [
        isNotEmpty(this.$slots) ? forEach(this.$slots, (_, name) => {
          return h('div', this.$slots[name]);
        }) : undefined,
      ]
    );
  }
};
