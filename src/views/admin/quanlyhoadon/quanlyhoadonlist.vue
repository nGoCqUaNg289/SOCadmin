<template>
  <div>
    <div class="col-12 col-title">
      <div class="col-md-6 float-left margin-left">
        <p class="Text-tile">Danh sách hóa đơn</p>
        <p class="Text-tile-2">Trang chủ ● Hóa đơn</p>
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
    <!-- <nav class="col-12 navbar justify-content-between">
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
    </nav> -->
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Mã hóa đơn</th>
          <th scope="col" class="Title-table">Username</th>
          <th scope="col" class="Title-table td-action">Tổng tiền</th>
          <th class="Title-table">Thời gian thanh toán</th>
          <th class="Title-table">Trạng thái</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in getData"
          :key="item.id"
          @click="DetailProduct(item.id)"
        >
          <th>{{ item.id }}</th>
          <th scope="row" class="td-table-custom">{{ item.username }}</th>
          <td class="td-table status-color-out td-action">
            {{ formatPrice(item.sumprice) }} đ
          </td>
          <td scope="row" class="td-table-custom">
            {{ getDateString(item.dateCreated) }}
          </td>
          <td scope="row" class="td-table td-center" style="text-align:center">
                  <span class="badge rounded-pill bg-primary" v-if="item.status == 'Chờ xác nhận'">{{ item.status }}</span>
                  <span class="badge rounded-pill bg-success" v-else-if="item.status == 'Giao hàng thành công'">{{ item.status }}</span>
                  <span class="badge rounded-pill bg-danger" v-else>{{ item.status }}</span>
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
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    getDateString(date) {
      return `${new Date(date).getFullYear()}-${
        new Date(date).getMonth() + 1
      }-${new Date(date).getDate()} ${new Date(date).getHours()}:${new Date(
        date
      ).getMinutes()}:${new Date(date).getSeconds()}`;
    },
    CreateNewProduct() {
      this.$router.push({
        name: "Thêm mới hóa đơn",
      });
    },
    DetailProduct(id) {
      // console.log(id);
      this.$router.push({
        name: "Thông tin chi tiết hóa đơn",
        params: { item: id },
      });
    },
    getAllProduct() {
      axios
        .get(this.$store.state.MainLink + "customer/orders/getall",
         {
            headers: {
              Authorization: this.$store.state.userToken,
            },
          })
        .then((response) => {
          this.getData = response.data.object;
          console.log(response.data.object);
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
.td-table-custom {
  text-align: center;
}
</style>
