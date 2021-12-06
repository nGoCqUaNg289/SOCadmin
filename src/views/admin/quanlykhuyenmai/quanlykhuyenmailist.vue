<template>
  <div>
    <div class="col-12 col-title">
      <div class="col-md-6 float-left margin-left">
        <p class="Text-tile">Danh sách sale</p>
        <p class="Text-tile-2">Trang chủ ● Sản phẩm</p>
      </div>
    </div>
    <nav class="col-12 navbar justify-content-between">
      <a class="navbar-brand"></a>
      <form class="form-inline">
        <input
          @change="searchProduct()"
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          style="box-shadow: none"
          v-model="searchString"
        />
      </form>
    </nav>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a
          class="nav-link active"
          aria-current="page"
          v-if="onButton == 0"
          @click="getAllSale()"
          >Tất cả khuyến mại</a
        >
        <a class="nav-link" v-else @click="getAllSale()">Tất cả khuyến mại</a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link active"
          aria-current="page"
          v-if="onButton == 1"
          @click="getSaleNow()"
          >Chương trình đang diễn ra</a
        >
        <a class="nav-link" v-else @click="getSaleNow()"
          >Chương trình đang diễn ra</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link active"
          aria-current="page"
          v-if="onButton == 2"
          @click="getAboutSale()"
          >Chương trình sắp diễn ra</a
        >
        <a class="nav-link" v-else @click="getAboutSale()"
          >Chương trình sắp diễn ra</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link active"
          aria-current="page"
          v-if="onButton == 3"
          @click="getSaleEnd()"
          >Chương trình đã kết thúc</a
        >
        <a class="nav-link" v-else @click="getSaleEnd()"
          >Chương trình đã kết thúc</a
        >
      </li>
    </ul>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col" class="Title-table">Tên sale</th>
          <th
            scope="col"
            class="Title-table td-action"
            style="text-align: center"
          >
            Thời gian bắt đầu sale
          </th>
          <th scope="col" class="Title-table td-action">Thời gian kết thúc</th>
          <th scope="col" class="Title-table td-action">Trạng thái</th>
          <th class="Title-table"></th>
        </tr>
      </thead>
      <tbody v-if="getData != ''">
        <tr v-for="item in pageOfItems" :key="item.id">
          <th>{{ item.id }}</th>
          <th scope="row" class="td-table">{{ item.name }}</th>
          <td scope="row" class="td-table">
            {{ getDateString(item.startTime) }}
          </td>
          <td scope="row" class="td-table">
            {{ getDateString(item.endTime) }}
          </td>
          <td scope="row" class="td-table">{{ item.status }}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr colspan="5" class="">
          Không có chương trình nào!
        </tr>
      </tbody>
    </table>
    <!-- <div class="card-body"></div> -->
    <div class="card-footer pb-0 pt-3" style="text-align: center">
      <jw-pagination
        :maxPages="15"
        :items="getData"
        @changePage="onChangePage"
      ></jw-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "QuanLySanPhamList",
  data() {
    return {
      pageOfItems: [],
      getData: "",
      formData: {
        name: "",
        startTime: "",
        endTime: "",
        status: "",
      },
      searchString: "",
      onButton: 0,
    };
  },
  created() {
    this.getAllSale();
  },
  methods: {
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
    searchProduct() {
      axios
        .get(this.$store.state.MainLink + "admin/products?find=")
        .then((response) => {
          this.getData = response.data.object;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    UpdateProduct() {
      this.$router.push("/admin/quanlysanphamcreatedetail");
    },
    DetailSale(id) {
      this.$router.push({
        name: "Thông tin chi tiết sản phẩm",
        params: { item: id },
      });
    },
    deleteProduct(item) {
      console.log(this.$store.state.tokenUser);
      axios
        .delete(
          this.$store.state.MainLink + "admin/products/delete/" + item.id,
          {
            headers: {
              Authorization: this.$store.state.tokenUser,
            },
          }
        )

        .then((response) => {
          if (response.data.object) {
            alert("Delete thành công.");
          } else {
            alert("Delete thất bại.");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getAllSale() {
      this.onButton = 0;
      axios
        .get(this.$store.state.MainLink + "admin/sale/get", {
          headers: {
            Authorization: this.$store.state.userToken,
          },
        })
        .then((response) => {
          this.getData = response.data.object;
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getSaleNow() {
      this.onButton = 1;
      axios
        .get(this.$store.state.MainLink + "admin/sale/getSaleNow", {
          headers: {
            Authorization: this.$store.state.userToken,
          },
        })
        .then((response) => {
          this.getData = response.data.object;
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getAboutSale() {
      this.onButton = 2;
      axios
        .get(this.$store.state.MainLink + "admin/sale/getSaleAboutStart", {
          headers: {
            Authorization: this.$store.state.userToken,
          },
        })
        .then((response) => {
          this.getData = response.data.object;
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getSaleEnd() {
      this.onButton = 3;
      axios
        .get(this.$store.state.MainLink + "admin/sale/getSellEnd", {
          headers: {
            Authorization: this.$store.state.userToken,
          },
        })
        .then((response) => {
          this.getData = response.data.object;
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDateString(date) {
      return `${new Date(date).getFullYear()}-${
        new Date(date).getMonth() + 1
      }-${new Date(date).getDate()} ${new Date(date).getHours()}:${new Date(
        date
      ).getMinutes()}:${new Date(date).getSeconds()}`;
    },
  },
};
</script>

<style>
.Title-table {
  text-align: center;
}
</style>
