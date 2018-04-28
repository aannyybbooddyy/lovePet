<template>
    <div>
      <el-input placeholder="请输入内容" v-model="search.select" class="input-with-select">
        <el-select style="width:130px" v-model="search.name" slot="prepend" placeholder="请选择">
          <el-option label="品种" value="petVarieties"></el-option>
          <el-option label="体型" value="petShape"></el-option>
          <el-option label="性别" value="petGender"></el-option>
          <el-option label="是否疫苗" value="petQuarantine"></el-option>
        </el-select>
        <el-button slot="append" @click="searchPet" icon="el-icon-search"></el-button>
      </el-input>
    <div>
      <el-table
    :data="list2"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="petVarieties"
      label="品种"
      width="150">
    </el-table-column>
    <el-table-column
      prop="petHair"
      label="毛长"
      width="120">
    </el-table-column>
    <el-table-column
      prop="petShape"
      label="体型"
      width="150">
    </el-table-column>
    <el-table-column
      prop="petColor"
      label="毛色"
      width="80">
    </el-table-column>
    <el-table-column
      prop="petPrice"
      label="价格"
      width="120">
    </el-table-column>
    <el-table-column
      prop="petGender"
      label="性别">
    </el-table-column>
    <el-table-column
      prop="petQuarantine"
      label="是否疫苗">
    </el-table-column>
    <el-table-column
      prop="petAge"
      label="年龄">
    </el-table-column>
    <el-table-column
      prop="petCharacter"
      label="性格">
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
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
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
  name:"petSearch",
  watch:{
    rows2:function(){
      this.searchpet()
    },
    page2:function(){
      this.searchpet()
    }
  },
  computed:{//计算属性
    ...mapState("PetStore",["list2","page2","rows2","curpage2","eachpage2","total2","maxpage2","search"]),
  },
  methods:{
    ...mapMutations("PetStore",["del","updata","handleSizeChange","handleCurrentChange"]),
    ...mapActions("PetStore",["searchPet"]),
  }
}
</script>