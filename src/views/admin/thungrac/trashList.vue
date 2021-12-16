<template>
  <div>
    <div class="col-12 col-title">
      <div class="col-md-6 float-left margin-left">
        <p class="Text-tile">Danh sách các sản phẩm đã xóa</p>
        <p class="Text-tile-2">Trang chủ ● Thông tin</p>
      </div>
    </div>

    <table class="table table-hover">
      <thead>
        <tr style="vertical-align: middle;">
          <th scope="col">STT</th>
          <th scope="col" class="Title-table" colspan="1" style="text-align: center;">Tên</th>
          <th scope="col" class="Title-table td-action" style="text-align: center;" colspan="1">
            Tình trạng
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

        <th colspan="4" v-else-if="pageOfItems == 1">
          <div class="text-center">
            Không có dữ liệu bị xóa !
          </div>  
        </th>

        <tr v-for="item in pageOfItems" :key="item.id">
          <th>{{ item.id }}</th>
          <td scope="row" class="td-table"  @click="DetailProduct(item.id)">{{ item.name }}</td>
          <td :style="{ color: Status(item) }" class="text-center">
            {{ item.status }}
          </td>
          <td class="td-table td-action">
            <CButton  @click="darkModal = true, setId(item.id), setTitle()" data-toggle="tooltip" title="Ngừng kinh doanh" class="mr-1" v-if="item.status != 'Không kinh doanh' && item.status != 'Ngừng kinh doanh' && item.status != 'Hết hàng'">
              <i class="cil-reload"></i>
              </CButton>
            <CButton  @click="darkModal = true, setId(item.id), setTitle1()" data-toggle="tooltip" title="Xóa sản phẩm" class="mr-1" v-if="item.status == 'Không kinh doanh' || item.status == 'Ngừng kinh doanh'">
               <i class="cil-trash" style="color: red; text-align: center;"></i>
              </CButton>
          </td>
        </tr>

        <!-- <tr v-for="item in pageOfItems" :key="item.id" v-else>
          <th>{{ item.id }}</th>
          <td scope="row" class="td-table text-center"  @click="DetailProduct(item.id)" >{{ item.name }}</td>
          <td :style="{ color: Status(item) }" class="text-center">
            {{ item.status }}
          </td>
          <td class="td-table td-action text-center" >
            <CButton  @click="darkModal = true, setId(item.id), setTitle()" class="mr-1" v-if="item.status != 'Không kinh doanh' && item.status != 'Ngừng kinh doanh'">
              <i class="cil-reload"></i>
              </CButton>
            <CButton  @click="darkModal = true, setId(item.id), setTitle1()" class="mr-1" v-if="item.status == 'Không kinh doanh' || item.status == 'Ngừng kinh doanh'">
               <i class="cil-trash" style="color: red; text-align: center;"></i>
              </CButton>
          </td>
        </tr> -->
      </tbody>
    </table>
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
  name: "ProductList",
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
          this.$store.state.MainLink + "admin/products?find="
        )
        .then((response) => {
          this.getData = response.data.object;
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
      console.log(id)
      this.$router.push({
        name: "Chi tiết danh mục bị xóa bỏ",
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
        case "Đã xóa":
          return " red";
      }
    },
    getAllProduct() {
      axios
        .get(this.$store.state.MainLink + "admin/products/getListDelete",
          {
            headers: {
              Authorization: this.$store.state.userToken,
            },
          })
        .then((response) => {
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
