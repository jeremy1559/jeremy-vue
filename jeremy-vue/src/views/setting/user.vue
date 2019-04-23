<template>
  <div class="root">
    <el-container style="height: 100%;">
      <el-header class="top">
        <el-form :inline="true" :model="serch" class="demo-form-inline">
          <el-form-item label="账号">
            <el-input size="mini" v-model="serch.account" placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input size="mini" v-model="serch.userName" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input size="mini" v-model="serch.phone" placeholder="联系电话"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="onSerchSubmit">查询</el-button>
            <el-button type="text" size="small" @click="onSerchReset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main class="main">
        <el-table
          :data="userLists"
          stripe
          border
          height="100%"
          style="width: 100%"
          :header-cell-style="{background:'#eef1f6',color:'#606266',textAlign:'center'}"
          :cell-style="{padding:'1.5px',textAlign:'center'}"
        >
          <el-table-column prop="account" label="账号" show-overflow-tooltip width="200"></el-table-column>
          <el-table-column prop="userName" label="姓名" show-overflow-tooltip width="200"></el-table-column>
          <el-table-column prop="phone" label="联系电话" show-overflow-tooltip width="200"></el-table-column>
          <el-table-column prop="idCard" label="身份证号" show-overflow-tooltip width="200"></el-table-column>
          <el-table-column prop="sex" label="性别" :formatter="formatterSex" show-overflow-tooltip width="200"></el-table-column>
          <el-table-column prop="eMail" label="邮编" show-overflow-tooltip width="200"></el-table-column>
          <el-table-column prop="roles" label="角色" :formatter="formatterRoles" show-overflow-tooltip width="300"></el-table-column>
          <el-table-column prop="companys" label="隶属部门" :formatter="formatterCompanys" show-overflow-tooltip width="300"></el-table-column>

          <el-table-column label="操作" fixed="right" width="300">
            <template slot-scope="scope">
              <el-button type="text" size="small">编辑</el-button>
              <el-button type="text" size="small">删除</el-button>
              <el-button type="text" size="small">修改角色</el-button>
              <el-button type="text" size="small">修改部门</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <div class="footer">
        <el-pagination
          class="rightFloat"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[20, 50, 100, 200]"
          :page-size="20"
          layout="total, sizes, prev, pager, next, jumper"
          :total="userListCount"
        ></el-pagination>
      </div>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userLists: [],
      userListCount: 0,
      serch: {
        account: "",
        userName: "",
        phone: ""
      },
      page: 1,
      limit: 20
    };
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    //获取用户列表
    getUserList() {
      this.$axios
        .post("/api/authorization/getUserList", {
          account: this.serch.account,
          userName: this.serch.userName,
          phone: this.serch.phone,
          limit: this.limit,
          page: this.page
        })
        .then(response => {
          this.userLists = response.data.data;
          this.userListCount = response.data.count;
        });
    },
    //条件检索查询
    onSerchSubmit() {
      this.getUserList();
    },
    //条件检索重置
    onSerchReset() {
      this.serch = {};
      this.getUserList();
    },
    //每页条数修改时间
    handleSizeChange(val) {
      this.limit = val;
      this.getUserList();
    },
    //页数修改事件
    handleCurrentChange(val) {
      this.page = val;
      this.getUserList();
    },
    //性别格式化
    formatterSex(row, column) {
      if (row.sex == "1") {
        return "男";
      }
      if (row.sex == "2") {
        return "女";
      }
    },
    //角色格式化
    formatterRoles(row, column){
      let roles='';
      for(let i in row.roles){
        roles+=row.roles[i].roleName+' , ';
      }
      return roles.substr(0,roles.length-3);
    },
    //隶属公司格式化
     formatterCompanys(row, column){
     let companys='';
      for(let i in row.companys){
        companys+=row.companys[i].companyName+' , ';
      }
      return companys.substr(0,companys.length-3);;
    }
  }
};
</script>


<style>
</style>

