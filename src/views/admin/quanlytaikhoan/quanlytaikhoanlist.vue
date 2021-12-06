<template>
  <div>
    <div class="col-12 col-title">
      <div class="col-md-6 float-left margin-left">
        <p class="Text-tile">Danh sách tài khoản</p>
        <p class="Text-tile-2">Trang chủ ● tài khoản</p>
      </div>
      <div class="col-md-6 float-right">
        <button
            type="button"
            class="btn btn-primary float-right btn-add"
            @click="CreateNewAccount()"
        >
          <i class="cil-plus"></i>
          Thêm mới
        </button>
      </div>
    </div>
    <nav class="col-12 navbar justify-content-between">
      <a class="navbar-brand"></a>
      <form class="form-inline">
        <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            style="box-shadow: none"
        />
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
          <i class="cil-magnifying-glass"></i>
        </button>
      </form>
    </nav>
    <table class="table table-hover">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Tên đăng nhập</th>
        <th scope="col">Tên người dùng</th>
        <th scope="col">Email</th>
        <th scope="col">Trạng thái</th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in getData" :key="index" @click="detailAccount(item.id)">
        <th scope="row">{{ index + 1 }}</th>
        <td>{{ item.username }}</td>
        <td>{{ item.fullname }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.userStatus }}</td>
        <td class="td-table td-action">
          <button
              type="button"
              class="btn btn-danger btn-size"
              @click="deleteAccount(item.id)"
          >
            <i class="cil-trash"></i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "QuanLySanPhamList",
  data() {
    return {
      getData: "",
      formData: {
        name: "",
        price: "",
        status: "",
        orderDetails: "",
        blogs: "",
        productCategories: "",
        sales: "",
        productColors: [],
        cartDetails: "",
        productDetails: [],
      },
    };
  },
  created() {
    this.getAllProduct();
  },
  methods: {
    CreateNewAccount() {
      this.$router.push({
        name: "Tạo mới tài khoản",
      });
    },
    detailAccount(id) {
      console.log(id);
      this.$router.push({
        name: "Chi tiết tài khoản",
        params: { item: id },
      });
    },
    deleteAccount(item){
      console.log(item)
    },
    getAllProduct() {
      axios
          .get(this.$store.state.MainLink + "customer/account/findAll", {
            headers: {
              // Authorization: this.$store.state.userToken,
              Authorization: localStorage.usertoken,
            },
          })
          .then((response) => {
            this.getData = response.data.object;
            console.log(this.getData)
            // console.log(response.data.object);
            // for (var item in this.getData) {
            //   console.log(this.getData[item].productColors);
            // }
          })
          .catch((e) => {
            console.log(e);
          });
    },
  },
};
</script>

<style>
.Title-table {
  text-align: center;
}
</style>
