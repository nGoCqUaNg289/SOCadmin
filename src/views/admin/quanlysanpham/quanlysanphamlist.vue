<template>
  <div>
    <div class="col-12 col-title">
      <div class="col-md-6 float-left margin-left">
        <p class="Text-tile">Danh sách sản phẩm</p>
        <p class="Text-tile-2">Trang chủ ● Sản phẩm</p>
      </div>
      <div class="col-md-6 float-right">
        <button
          type="button"
          class="btn btn-primary float-right btn-add"
          @click="CreateNewProduct()"
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
    <table class="table">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col" class="Title-table" colspan="1">Tên sản phẩm</th>
          <!-- <th scope="col" class="Title-table td-action">Tên sản phẩm</th> -->
          <!-- <th scope="col" class="Title-table td-action">Hãng</th> -->
          <th scope="col" class="Title-table td-action" colspan="2">
            Tình trạng sản phẩm
          </th>
          <th class="Title-table"></th>
        </tr>
      </thead>
      <tbody>
        <!-- {{
          getData
        }} -->
        <tr v-for="item in getData" :key="item.id">
          <th>{{ item.id }}</th>
          <th scope="row" class="td-table">{{ item.name }}</th>
          <!-- <td class="td-table">Inspiron 7306</td> -->
          <!-- <td class="td-table td-action">
            <i class="cib-dell"></i>
          </td> -->
          <td class="td-table status-color-out td-action">Hết hàng</td>
          <td class="td-table status-color-in td-action">Còn hàng</td>
          <td class="td-table td-action">
            <button
              type="button"
              class="btn btn-primary btn-size"
              @click="DetailProduct(item.id)"
            >
              <i class="cil-folder-open"></i>
            </button>
            <button type="button" class="btn btn-danger btn-size">
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
    CreateNewProduct() {
      this.$router.push("/quanlysanphamcreate");
    },
    DetailProduct(id) {
      console.log(id);
      this.$router.push({
        name: "Thông tin chi tiết sản phẩm",
        params: { item: id },
      });
    },
    getAllProduct() {
      axios
        .get("https://javamahtest.herokuapp.com/api/customer/products")
        .then((response) => {
          this.getData = response.data.object;
          // console.log(response.data.object);
          for (var item in this.getData) {
            // console.log(item);

            console.log(this.getData[item].productColors);
          }
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
