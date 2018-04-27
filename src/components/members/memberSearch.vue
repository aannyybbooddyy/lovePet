<template>
    <div>
      <el-input placeholder="请输入内容" v-model="search.select" class="input-with-select">
        <el-select style="width:130px" v-model="search.name" slot="prepend" placeholder="请选择">
          <el-option label="电话号码" value="memberPhone"></el-option>
          <el-option label="昵称" value="memberAcount"></el-option>
          <el-option label="会员卡号" value="memberCard"></el-option>
          <el-option label="真实姓名" value="memberName"></el-option>
        </el-select>
        <el-button slot="append" @click="searchMembers" icon="el-icon-search"></el-button>
      </el-input>
    <div>
      <el-table
    :data="list2"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="memberPhone"
      label="电话号码"
      width="150">
    </el-table-column>
    <el-table-column
      prop="memberAcount"
      label="昵称"
      width="120">
    </el-table-column>
    <el-table-column
      prop="memberCard"
      label="会员卡号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="memberPoint"
      label="积分"
      width="80">
    </el-table-column>
    <el-table-column
      prop="memberName"
      label="真实姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="memberAdd"
      label="送货地址">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button
        type="text"
         @click="updata(scope.row)"
        size="small">修改</el-button>
        <el-button
        type="text"
        @click="del(scope.row)"
        size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="block" style="width:800px;margin:auto">
    <el-pagination
      @size-change="handleSizeChange2"
      @current-change="handleCurrentChange2"
      :current-page="curpage2"
      :page-sizes="[10,20,30,40]"
      :page-size="rows2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total2">
    </el-pagination>
  </div>
  </div>
  </div>
</template>
<script>
import {mapState,mapMutations,mapGetters,mapActions} from "vuex"
export default {
  name:"memberSearch",
    watch:{
    rows2:function(){
      this.searchMembers()
    },
    page2:function(){
      this.searchMembers()
    }
  },
    computed:{
     ...mapState("MemberStore",["list2","page2","rows2","curpage2","eachpage2","total2","maxpage2","search"]),
  },
    methods:{
    ...mapMutations("MemberStore",["del","updata","handleSizeChange2","handleCurrentChange2"]),
    ...mapActions("MemberStore",["searchMembers"])
  }
}
</script>