<template>
  <div class="app-wrapper">
    <h3>Data-Table-Column Example</h3>
    <el-table :data="filterData">
      <el-table-column type="selection" width="55"></el-table-column>
      <data-table-column
        v-model="filters.department"
        :column-props="{ prop: 'department', label: 'Department', onFilterChange: onFilterChange }"
        :filter-props="{ type: 'select', data: listData.department, callbackMethod: onFiltered }"
      ></data-table-column>
      <data-table-column
        v-model="filters.product"
        :column-props="{ prop: 'product', label: 'Product' }"
        :filter-props="{ type: 'text' }"
      ></data-table-column>
      <data-table-column
        v-model="filters.productName"
        :column-props="{ prop: 'productName', label: 'Name', sortable: true }"
        :filter-props="{ type: 'text' }"
      ></data-table-column>
      <data-table-column
        v-model="filters.productAdjective"
        :column-props="{ prop: 'productAdjective', label: 'Adjective' }"
        :filter-props="{ type: 'select', data: listData.productAdjective }"
      ></data-table-column>
      <data-table-column
        v-model="filters.productMaterial"
        :column-props="{ prop: 'productMaterial', label: 'Material' }"
        :filter-props="{ type: 'select', data: listData.productMaterial }"
      ></data-table-column>
      <data-table-column
        v-model="filters.color"
        :column-props="{ prop: 'color', label: 'Color', sortable: true }"
        :filter-props="{ type: 'select', data: listData.color }"
      ></data-table-column>
      <data-table-column
        v-model="filters.price"
        :column-props="{ prop: 'price', label: 'Price', sortable: true }"
        :filter-props="{ type: 'text' }"
      ></data-table-column>
      <data-table-column
        v-model="filters.timestamp"
        :column-props="{ prop: 'timestamp', label: 'Timestamp' }"
        :filter-props="{ type: 'date' }"
      ></data-table-column>
    </el-table>
  </div>
</template>

<script>
import { forEach, isEmpty, isObject, uniq, random, padStart } from 'lodash';

export default {
  data () {
    return {
      dictionaries: {
        department: ['Computers', 'Baby', 'Beauty', 'Industrial', 'Books', 'Movies', 'Garden', 'Electronics', 'Toys',
          'Games', 'Tools', 'Music', 'Kids', 'Clothing', 'Health', 'Automotive', 'Sports', 'Home', 'Grocery', 'Jewelery',
          'Outdoors', 'Shoes'],
        product: ['Shirt', 'Pants', 'Gloves', 'Sausages', 'Chips', 'Chair', 'Computer', 'Fish', 'Cheese', 'Bike',
          'Bacon', 'Pizza', 'Tuna', 'Car', 'Towels', 'Table', 'Soap', 'Keyboard', 'Chicken', 'Salad', 'Shoes', 'Ball',
          'Hat', 'Mouse'],
        productName: ['Refined Concrete Computer', 'Handmade Plastic Sausages', 'Fantastic Fresh Soap',
          'Unbranded Rubber Mouse', 'Ergonomic Cotton Shoes', 'Licensed Granite Chicken', 'Fantastic Granite Fish',
          'Small Soft Shoes', 'Generic Steel Towels', 'Small Fresh Hat', 'Incredible Metal Table',
          'Generic Steel Car', 'Small Metal Sausages', 'Practical Steel Keyboard', 'Gorgeous Rubber Mouse',
          'Intelligent Metal Ball', 'Unbranded Concrete Towels', 'Sleek Frozen Car', 'Licensed Concrete Ball',
          'Tasty Rubber Ball', 'Handcrafted Steel Shirt', 'Ergonomic Wooden Chicken', 'Licensed Rubber Pants',
          'Incredible Concrete Chips', 'Small Fresh Gloves', 'Rustic Cotton Tuna', 'Handmade Metal Gloves',
          'Rustic Cotton Cheese', 'Gorgeous Wooden Bacon', 'Intelligent Granite Bike'],
        productAdjective: ['Handmade', 'Awesome', 'Practical', 'Ergonomic', 'Intelligent', 'Incredible', 'Tasty',
          'Rustic', 'Fantastic', 'Refined', 'Sleek', 'Unbranded', 'Gorgeous', 'Generic', 'Small', 'Licensed',
          'Handcrafted'],
        productMaterial: ['Cotton', 'Steel', 'Plastic', 'Concrete', 'Rubber', 'Fresh', 'Wooden', 'Granite', 'Soft',
          'Frozen', 'Metal'],
        color: ['turquoise', 'yellow', 'blue', 'maroon', 'plum', 'silver', 'orange', 'white', 'green', 'pink', 'plum',
          'blue', 'red', 'salmon', 'purple', 'gold', 'lime', 'teal', 'azure', 'cyan', 'magenta', 'tan', 'turquoise',
          'orchid', 'black', 'ivory', 'violet', 'fuchsia', 'olive', 'indigo']
      },
      tableData: [],
      filterData: [],
      listData: {
        department: [],
        productAdjective: [],
        productMaterial: [],
        color: []
      },
      filters: {
        department: '',
        product: '',
        productName: '',
        productAdjective: '',
        productMaterial: '',
        color: '',
        price: '',
        timestamp: ''
      }
    };
  },
  watch: {
    filters: {
      handler (filter) {
        this.filterData = this.tableData.filter(data => {
          let found = true;
          forEach(filter, (v, k) => {
            let val = isObject(v) ? v.value : v;
            if (data[k] !== undefined && isEmpty(val) === false) {
              found = found && data[k].toLowerCase().includes(val.toLowerCase());
            }
          });
          return found;
        });
      },
      deep: true
    }
  },
  created () {
    for (let i = 0; i < 100; i++) {
      let data = {};
      forEach(this.dictionaries, (v, k) => {
        data[k] = v[random(0, v.length - 1)];
      });
      data['price'] = random(10, 1000).toString() + '.' + padStart(random(0, 99).toString(), 2, '0');
      let dt = new Date(Date.now() - (random(0, 86400) * 1000));
      data['timestamp'] = dt.getFullYear() + "-" + padStart((dt.getMonth() + 1).toString(), 2, '0') + "-" +
        padStart(dt.getDate().toString(), 2, '0') + " " + padStart(dt.getHours().toString(), 2, '0') + ":" +
        padStart(dt.getMinutes().toString(), 2, '0') + ":" + padStart(dt.getSeconds().toString(), 2, '0');
      this.tableData = this.tableData.concat([data]);
    }
    this.filterData = this.tableData;
    forEach(this.listData, (_, k) => {
      forEach(this.dictionaries[k].sort(), v => {
        this.listData[k] = this.listData[k].concat([{ label: v, value: v }]);
      });
    });

  },
  methods: {
    onFiltered (value, row, column) {
    },
    onFilterChange (value, row, column) {
    }
  }
};
</script>
