<template>
  <div class="app-wrapper">
    <el-table
      :data="tableData"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="flow_no" label="No." sortable="custom"></el-table-column>
      <el-table-column prop="content" label="Content" sortable="custom"></el-table-column>
      <el-table-column prop="create_time" label="Time" sortable="custom"></el-table-column>
      <data-table-column
        :column-props="{ prop: 'state', label: 'State', sortable: 'custom' }"
      ></data-table-column>
      <data-table-column
        v-model="filterText"
        :column-props="{ prop: 'flow_type', label: 'Type', sortable: true }"
        :filter-props="{ type: 'text' }"
      ></data-table-column>
      <data-table-column :column-props="{ prop: 'building_group', label: 'Building group', sortable: 'custom' }"></data-table-column>
      <el-table-column prop="building" label="building" sortable="custom"></el-table-column>
      <el-table-column prop="room_no" label="no" sortable="custom"></el-table-column>
      <el-table-column prop="cellphone" label="tel" sortable="custom"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      filterText: ''
    };
  },
  created () {
    for (let i = 0; i < 100; i++) {
      this.tableData = this.tableData.concat([{
        'building': '5',
        'building_group': 'North',
        'cellphone': '13400000000',
        'content': i % 2 === 1 ? 'Water flood' : 'Wind flood',
        'create_time': i % 2 === 1 ? '2018-10-01 22:25' : '2018-10-02 21:20',
        'flow_no': `FW20160101000${i}`,
        'flow_type': i % 2 === 1 ? 'Repair' : 'Help',
        'flow_type_code': i % 2 === 1 ? 'repair' : 'help',
        'id': '111111',
        'room_id': '00501',
        'room_no': '501',
        'state': 'Created',
        'state_code': 'created'
      }])
    }
  }
};
</script>
