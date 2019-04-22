<template>
  <div>
    <el-container>
      <el-header>
        <el-form :inline="true" :model="serch" class="demo-form-inline">
          <el-form-item label="账号">
            <el-input v-model="serch.account" placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="serch.userName" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="serch.phone" placeholder="联系电话"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSerchSubmit">查询</el-button>
            <el-button type="text" size="small" @click="onSerchReset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main>
        <el-table :data="userLists" stripe border style="width: 100%" max-height="250">
          <el-table-column prop="account" label="账号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="userName" label="姓名" show-overflow-tooltip></el-table-column>
          <el-table-column prop="phone" label="联系电话" show-overflow-tooltip></el-table-column>
          <el-table-column prop="idCard" label="身份证号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="sex" label="性别" show-overflow-tooltip></el-table-column>
          <el-table-column prop="eMail" label="邮编" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small">编辑</el-button>
              <el-button type="text" size="small">修改角色</el-button>
              <el-button type="text" size="small">修改部门</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userLists: [],
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
    }
  }
};
</script>


<style>
</style>

