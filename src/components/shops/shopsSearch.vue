<template>
<div>
   <el-popover
  ref="popover4"
  placement="right"
  width="800"
  trigger="click">
      <el-form  ref="" label-width="100px"  style="width: 650px" class="demo-ruleForm">
  <el-form-item label="门店名称" prop="shopName">
    <el-input ></el-input>
  </el-form-item>
    <el-form-item label="营业执照号" prop="shopLicenceNum">
    <el-input ></el-input>
  </el-form-item>
    <el-form-item label="营业地址" prop="shopAdd">
    <el-input ></el-input>
  </el-form-item>
    <el-form-item label="法人" prop="shopCorporate">
    <el-input ></el-input>
  </el-form-item>
    <el-form-item label="联系电话" prop="shopTel">
    <el-input ></el-input>
  </el-form-item>
  <el-form-item label="特色" prop="shopFeature">
  </el-form-item>
  <el-form-item>
    <el-button type="primary" >立即申请</el-button>
    <el-button >重置</el-button>
  </el-form-item>
</el-form>
</el-popover>

<el-button v-popover:popover4>编译修改</el-button>
</div>
</template>
<script>
export default {
    data() {
      return {
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      };
    }
  };

</script>