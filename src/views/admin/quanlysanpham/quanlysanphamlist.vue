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
          <th scope="col">STT</th>
          <th scope="col" class="Title-table" colspan="1">Tên sản phẩm</th>
          <th scope="col" class="Title-table td-action" colspan="2">
            Tình trạng sản phẩm
          </th>
          <th class="Title-table"></th>
        </tr>
      </thead>
      <tbody>
        <th colspan="4" v-if="pageOfItems == ''">
          <div class="text-center">
            <div class="spinner-grow" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>  
        </th>

        <tr v-for="item in pageOfItems" :key="item.id">
          <th>{{ item.id }}</th>
          <td scope="row" class="td-table"  @click="DetailProduct(item.id)">{{ item.name }}</td>
          <td :style="{ color: Status(item) }">
            <!-- <span class="badge rounded-pill bg-light"></span> -->
            {{ item.status }}
          </td>
          <td class="td-table td-action">
            <CButton  @click="darkModal = true, setId(item.id), setTitle2()" data-toggle="tooltip" title="Thay đổi trạng thái" class="mr-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
              </svg>
              </CButton>
            <CButton  @click="darkModal = true, setId(item.id), setTitle()" data-toggle="tooltip" title="Ngừng kinh doanh" class="mr-1" v-if="item.status != 'Không kinh doanh' && item.status != 'Ngừng kinh doanh' && item.status != 'Hết hàng'">
              <i class="cil-reload"></i>
              </CButton>
            <CButton  @click="darkModal = true, setId(item.id), setTitle1()" data-toggle="tooltip" title="Xóa sản phẩm" class="mr-1" v-if="item.status == 'Không kinh doanh' || item.status == 'Ngừng kinh doanh'">
               <i class="cil-trash" style="color: red; text-align: center;"></i>
              </CButton>
          </td>
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
      color="danger">
      Bạn có chắc muốn {{setTitleModal}} sản phẩm này ?
      <br>
      <select class="form-select" v-model="productStatus" v-if="setTitleModal == 'Thay đổi trạng thái'">
        <option value="productReady" selected>Đang bán</option>
        <option value="storageEmpty">Hết hàng</option>
        <option value="comingsoon">Hàng sắp về</option>
        <option value="dontSell">Ngừng kinh doanh</option>
      </select>
      <template #header>
        <h6 class="modal-title">Xác nhận</h6>
        <CButtonClose @click="darkModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="darkModal = false" color="secondary">Hủy</CButton>
        <CButton @click="darkModal = false, deleteProduct()" color="danger" v-if="setTitleModal == 'xóa'">Xóa sản phẩm</CButton>
        <CButton @click="darkModal = false, dontSell()" color="danger" v-else-if="setTitleModal == 'ngừng kinh doanh'">Ngừng kinh doanh</CButton>
        <CButton @click="darkModal = false, changestatus()" color="danger" v-else-if="setTitleModal == 'Thay đổi trạng thái'">Thay đổi trạng thái</CButton>
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
  name: "QuanLySanPhamList",
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
      productStatus:"productReady"
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
    setTitle2(){
      this.setTitleModal = "Thay đổi trạng thái"
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
          this.$store.state.MainLink + "admin/products?find=" +this.searchString,
          {
          headers: {
              Authorization: this.$store.state.userToken,
          }
        }
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
        name: "Thông tin chi tiết sản phẩm",
        params: { item: id },
      });
    },
    deleteProduct() {
      axios
        .put(
          this.$store.state.MainLink + "admin/products/delete/" + this.setIdProduct, {},
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
    changestatus(){
      axios.put(this.$store.state.MainLink + `admin/products/${this.productStatus}/${this.setIdProduct}`,{}, {
            headers: {
              Authorization: this.$store.state.userToken,
            },
          })
        .then(() => {
          this.getAllProduct();
          // console.log("123")
        })
        .catch((e) => {
          console.log(e);
        });
    },
    dontSell(){
      axios
        .put(
          this.$store.state.MainLink + "admin/products/dontSell/" + this.setIdProduct, {},
          {
            headers: {
              Authorization: this.$store.state.userToken,
            },
          }
        )
        .then(() => {
          this.getAllProduct();
          // console.log("123")
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
        .get(this.$store.state.MainLink + "admin/products",
        {
            headers: {
              Authorization: this.$store.state.userToken,
            },
        })
        .then((response) => {
          this.getData = response.data.object;
          console.log(response)
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
