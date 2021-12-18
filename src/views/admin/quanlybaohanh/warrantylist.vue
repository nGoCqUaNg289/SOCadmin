<template>
  <div>
    <div class="col-12 col-title">
      <div class="col-md-6 float-left margin-left">
        <p class="Text-tile">Danh sách bảo hành</p>
        <p class="Text-tile-2">Trang chủ ● Đơn bảo hành</p>
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
      <div class="form-inline">
        <input
          class="form-control mr-sm-2"
          type="text"
          placeholder="Tìm kiếm sản phẩm ..."
          aria-label="Search"
          style="box-shadow: none"
          v-model="searchString"
        />
        <!-- {{searchString}} -->
        <button class="btn btn-outline-success my-2 my-sm-0" @click="searchProduct(searchString)">
          <i class="cil-magnifying-glass"></i>
        </button>
      </div>
    </nav>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col" class="text-center">STT</th>
          <th scope="col" class="Title-table" colspan="1">Tên khách hàng</th>
          <th scope="col" class="Title-table td-action" colspan="">
            Ngày tạo đơn
          </th>
          <!-- <th class="Title-table"></th> -->
        </tr>
      </thead>
      <tbody>
        <!-- <div class="spinner-grow" role="status" >
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div> -->
        <th colspan="4" v-if="pageOfItems == ''">
          <div class="text-center">
            <div class="spinner-grow" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>  
        </th>

        <th colspan="4" v-else-if="pageOfItems == 1">
          <div class="text-center">
            Không có đơn bảo hành !
          </div>  
        </th>

        <tr v-for="item in pageOfItems" :key="item.id" v-else class="text-center">
          <th>{{ item.id }}</th>
          <td scope="row"  @click="DetailProduct(item.id)">{{ item.name }}</td>
          <td :style="{ color: Status(item) }">
            <!-- <span class="badge rounded-pill bg-light"></span> -->
            {{ item.expiredDate }}
          </td>
          <!-- <td class="td-table td-action">
            <CButton  @click="darkModal = true, setId(item.id), setTitle()" class="mr-1" v-if="item.status != 'Không kinh doanh' && item.status != 'Ngừng kinh doanh'">
              <i class="cil-reload"></i>
              </CButton>
            <CButton  @click="darkModal = true, setId(item.id), setTitle1()" class="mr-1" v-if="item.status == 'Không kinh doanh' || item.status == 'Ngừng kinh doanh'">
               <i class="cil-trash" style="color: red; text-align: center;"></i>
              </CButton>
          </td> -->
        </tr>
      </tbody>
    </table>
    <!-- <div class="card-body"></div> -->
    <div class="pb-0 pt-3 text-center">
      <jw-pagination
        :labels="customLabels"
        :maxPages="15"
        :items="getData"
        @changePage="onChangePage"
      ></jw-pagination>
    </div>
    <CModal
      :show.sync="darkModal"
      :no-close-on-backdrop="true"
      :centered="true"
      title="Modal title 2"
      size="lg"
      color="danger"
    >
      Bạn có chắc muốn {{setTitleModal}} sản phẩm này ?
      <template #header>
        <h6 class="modal-title">Xác nhận</h6>
        <CButtonClose @click="darkModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="darkModal = false" color="secondary">Hủy</CButton>
        <CButton @click="darkModal = false, deleteProduct()" color="danger" v-if="setTitleModal == 'xóa'">{{AcctionButton}}</CButton>
        <CButton @click="darkModal = false, dontSell()" color="danger" v-else-if="setTitleModal == 'ngừng kinh doanh'">{{AcctionButton}}</CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
import axios from "axios";
const customLabels = {
    first: '<<',
    last: '>>',
    previous: '<',
    next: '>'
};


export default {
  name: "QuanLyBaoHanhList",
  data() {
    return {
      customLabels,
      darkModal: false,
      setIdProduct: "",
      pageOfItems: [],
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
      searchString: "",
      setTitleModal: "",
      AcctionButton: "",
    };
  },
  created() {
    this.getAllProduct();
  },
  methods: {
    setTitle(){
      this.setTitleModal = "ngừng kinh doanh"
      this.AcctionButton = this.setTitleModal.charAt(0).toUpperCase() +   this.setTitleModal.slice(1);
    },
    setTitle1(){
      this.setTitleModal = "xóa"
      this.AcctionButton = this.setTitleModal.charAt(0).toUpperCase() +   this.setTitleModal.slice(1);
    },
    setId(id){
      this.setIdProduct = id
    },
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
    searchProduct() {
      axios
        .get(
          this.$store.state.MainLink + "admin/products?find=" +this.searchString
        )
        .then((response) => {
          this.getData = response.data.object;
          console.log(this.getData)
        })
        .catch((e) => {
          console.log(e);
        });
    },
    CreateNewProduct() {
      this.$router.push("/admin/quanlysanphamcreate");
    },
    UpdateProduct() {
      this.$router.push("/admin/quanlysanphamcreatedetail");
    },
    DetailProduct(id) {
      this.$router.push({
        name: "Chi tiết đơn bảo hành",
        params: { item: id },
      });
    },
    deleteProduct() {
      axios
        .delete(
          this.$store.state.MainLink + "admin/products/delete/" + this.setIdProduct,
          {
            headers: {
              Authorization: this.$store.state.userToken,
            },
          }
        )
        .then(() => {
          this.getAllProduct();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    dontSell(){
      axios
        .delete(
          this.$store.state.MainLink + "admin/products/dontSell/" + this.setIdProduct,
          {
            headers: {
              Authorization: this.$store.state.userToken,
            },
          }
        )
        .then(() => {
          this.getAllProduct();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    Status(products) {
      switch (products.status) {
        case "Đang bán":
          return "green";
        case "Không kinh doanh":
          return " gray";
        case "Hàng sắp về":
          return "black";
        case "Chưa có":
          return " orange";
        case "Hết hàng":
          return " red";
        case "Ngừng kinh doanh":
          return " blue";
      }
    },
    getAllProduct() {
      axios
        .get(this.$store.state.MainLink + "admin/warranty/get",
          {
            headers: {
              Authorization: this.$store.state.userToken,
            },
          }
        )
        .then((response) => {
          // console.log(response.data.object.length);
          if(response.data.object.length == 0){
              this.callFunction()
          }else{
              this.getData = response.data.object;
              console.log(response.data.object)
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    callFunction: function () {
      var v = this;
      setTimeout(function () {
        v.pageOfItems = 1
      }, 3000);
    },
  },
};
</script>

<style>
.Title-table {
  text-align: center;
}
</style>
