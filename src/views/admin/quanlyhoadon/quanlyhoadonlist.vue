<template>
  <div>
    <div class="col-12 col-title">
      <div class="col-md-6 float-left margin-left">
        <p class="Text-tile">Danh sách hóa đơn</p>
        <p class="Text-tile-2">Trang chủ ● Hóa đơn</p>
      </div>
      <div class="col-md-6 float-right" style="margin-top: 10px;">
        <CButton type="submit" 
                    size="sm" color="primary" 
                    class="btn btn-custom-size"
                    @click="CreateNewProduct()"
                    style="float: right; width: 200px"
                    >
                    <i class="cil-plus"></i>
                    Tạo hóa đơn
            </CButton>
      </div>
    </div>
    <nav class="col-12 navbar justify-content-between">
      <a class="navbar-brand">
        <select class="form-select" aria-label="Default select example" v-model="searchStatus" @change="searchOrder(getData)">
          <option value="" selected>Tất cả hóa đơn</option>
          <option value="Chờ xác nhận">Chờ xác nhận</option>
          <option value="Đã xác nhận">Đã xác nhận</option>
          <option value="Đang giao hàng">Đang giao hàng</option>
          <option value="Giao hàng thành công">Giao hàng thành công</option>
          <option value="Đã hủy">Đã hủy</option>
          <option value="Yêu cầu hủy">Yêu cầu hủy</option>
          <option value="Đơn hàng lỗi">Đơn hàng lỗi</option>
          <option value="Đã nhận hàng hoàn về">Đã nhận hàng hoàn về</option>
          <!-- <option value="3">Yêu cầu hủy</option> -->
        </select>
      </a>
      <div class="form-inline">
        <input
          class="form-control mr-sm-2"
          type="text"
          placeholder="Tìm kiếm hóa đơn theo số điện thoại ..."
          aria-label="Search"
          style="box-shadow: none;width: 350px;"
          v-model="searchString"
        />
        <button class="btn btn-outline-success my-2 my-sm-0" @click="searchOrder(getData)">
          <i class="cil-magnifying-glass"></i>
        </button>
      </div>
    </nav>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Mã hóa đơn</th>
          <th scope="col" class="Title-table">Username</th>
          <th scope="col" class="Title-table">Số điện thoại</th>
          <th scope="col" class="Title-table td-action">Tổng tiền</th>
          <th class="Title-table">Thời gian đặt hàng</th>
          <th class="Title-table">Trạng thái</th>
          <th>

          </th>
        </tr>
      </thead>
      <tbody>
        <th colspan="6" v-if="pageOfItems == ''">
          <div class="text-center">
            <div class="spinner-grow" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>  
        </th>
        <tr v-for="item in pageOfItems" :key="item.id" v-else>
          <th>{{ item.id }}</th>
          <th scope="row" class="td-table-custom" @click="detailOrder(item.id)">{{ item.username }}</th>
          <td class="td-table">
            {{ item.customer.phone}}
          </td>
          <td class="td-table status-color-out td-action">
            {{ formatPrice(item.sumprice) }} đ
          </td>
          <td scope="row" class="td-table-custom">
            {{ getDateString(item.dateCreated) }}
          </td>
          <td scope="row" class="td-table td-center" style="text-align:center">
                  <span class="badge rounded-pill bg-secondary" v-if="item.status == 'Chờ xác nhận'">{{ item.status }}</span>
                  <span class="badge rounded-pill bg-success" v-else-if="item.status == 'Giao hàng thành công' || item.status == 'Đã nhận lại hàng hoàn về'">{{ item.status }}</span>
                  <span class="badge rounded-pill bg-info" v-else-if="item.status == 'Đang giao hàng'">{{ item.status }}</span>
                  <span class="badge rounded-pill bg-warning" v-else-if="item.status == 'Đang hoàn hàng'">{{ item.status }}</span>
                  <span class="badge rounded-pill bg-primary" v-else-if="item.status == 'Đã xác nhận'">{{ item.status }}</span>
                  <span class="badge rounded-pill bg-danger" v-else>{{ item.status }}</span>
          </td>
          <th class="text-center">
              <CButton class="mr-1" v-if="item.status == 'Chờ xác nhận'" data-toggle="tooltip" title="Xác nhận đơn hàng" @click="primaryModal = true,setId(item.id)">
               <i class="cil-check-circle" style="color: green; text-align: center;"></i>
              </CButton>
              <CButton class="mr-1" v-if="item.status == 'Yêu cầu trả hàng'" data-toggle="tooltip" title="Chập nhận trả hàng" @click="returnOrderUser = true,setId(item.id)">
               <i class="cil-check-circle" style="color: green; text-align: center;"></i>
              </CButton>
              <CButton class="mr-1" v-if="item.status == 'Đã xác nhận'" data-toggle="tooltip" title="Giao hàng" @click="successModal = true,setId(item.id)">
               <i class="cil-car-alt" style="color: green; text-align: center;"></i>
              </CButton>
              <CButton class="mr-1" v-if="item.status == 'Đang giao hàng'" data-toggle="tooltip" title="Giao hàng thành công" @click="infoModal = true,setId(item.id)">
               <i class="cil-check" style="color: green; text-align: center;"></i>
              </CButton>
              <CButton class="mr-1" v-if="item.status == 'Đang giao hàng'" data-toggle="tooltip" title="Gửi đơn hàng quay lại" @click="returnProduct = true,setId(item.id)">
               <i class="cil-chevron-left" style="color: red; text-align: center;"></i>
              </CButton>
              <CButton class="mr-1" v-if="item.status == 'Đã xác nhận' || item.status == 'Chờ xác nhận' || item.status == 'Đang giao hàng'" data-toggle="tooltip" title="Cập nhật ghi chú" @click="warningModal = true,setId(item.id)">
               <i class="cil-reload" style="color: blue; text-align: center;"></i>
              </CButton>
              <CButton @click="darkModal = true,setId(item.id)" class="mr-1" v-if="item.status == 'Đã xác nhận' || item.status == 'Chờ xác nhận'" data-toggle="tooltip" title="Hủy đơn">
               <i class="cil-x-circle" style="color: red; text-align: center;"></i>
              </CButton>
              <CButton @click="darkModal = true,setId(item.id)" class="mr-1" v-if="item.status == 'Đang hoàn hàng' || item.status == 'Yêu cầu hủy'" data-toggle="tooltip" title="Chấp nhận yêu cầu">
               <i class="cil-check" style="color: green; text-align: center;"></i>
              </CButton>
              <CButton @click="cancelReturn = true,setId(item.id)" class="mr-1" v-if="item.status == 'Đang hoàn hàng' || item.status == 'Yêu cầu hủy'" data-toggle="tooltip" title="Từ chối yêu cầu">
               <i class="cil-x-circle" style="color: red; text-align: center;"></i>
              </CButton>
              <CButton @click="darkModal = true,setId(item.id)" class="mr-1" v-if="item.status == 'Yêu cầu trả hàng'" data-toggle="tooltip" title="Từ chối trả hàng">
               <i class="cil-x-circle" style="color: red; text-align: center;"></i>
              </CButton>
          </th>
        </tr>
      </tbody>
    </table>
    <div class="pb-0 pt-3 text-center">
      <jw-pagination
        :labels="customLabels"
        :maxPages="15"
        :items="checkData"
        @changePage="onChangePage"
      ></jw-pagination>
    </div>

    <CModal
      :show.sync="darkModal"
      :no-close-on-backdrop="true"
      :centered="true"
      title="Hủy đơn"
      size="lg"
      color="danger"
    >
      <CTextarea
                label="Lý do hủy đơn"
                placeholder="Nội dung ..."
                horizontal
                rows="4"
                v-model="note"
      />
      
      <template #header>
        <h6 class="modal-title">Xác nhận</h6>
        <CButtonClose @click="darkModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="darkModal = false" color="secondary">Hủy</CButton>
        <CButton @click="darkModal = false, cancelOrder()" color="danger">Hủy đơn hàng</CButton>
        <!-- <CButton @click="darkModal = false, dontSell()" color="danger" v-else-if="setTitleModal == 'ngừng kinh doanh'">{{AcctionButton}}</CButton> -->
      </template>
    </CModal>

    <CModal
      :show.sync="primaryModal"
      :no-close-on-backdrop="true"
      :centered="true"
      title="Xác nhận đơn hàng"
      size="lg"
      color="primary">
      <CTextarea
                label="Ghi chú"
                placeholder="Nội dung ..."
                horizontal
                rows="4"
                v-model="note"/>
      <template #header>
        <h6 class="modal-title">Xác nhận</h6>
        <CButtonClose @click="primaryModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="primaryModal = false" color="secondary">Hủy</CButton>
        <CButton @click="primaryModal = false, confirmOrder()" color="primary">Xác nhận đơn hàng</CButton>
      </template>
    </CModal>

    <CModal
      :show.sync="successModal"
      :no-close-on-backdrop="true"
      :centered="true"
      title="Xác nhận đơn hàng"
      size="lg"
      color="success">
      <CTextarea
                label="Ghi chú"
                placeholder="Nội dung ..."
                horizontal
                rows="4"
                v-model="note"/>
      <template #header>
        <h6 class="modal-title">Xác nhận</h6>
        <CButtonClose @click="successModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="successModal = false" color="secondary">Hủy</CButton>
        <CButton @click="successModal = false, confirmTranport()" color="success">Xác nhận chuyển đơn</CButton>
      </template>
    </CModal>

    <CModal
      :show.sync="infoModal"
      :no-close-on-backdrop="true"
      :centered="true"
      title="Xác nhận đơn hàng"
      size="lg"
      color="info">
      <CTextarea
                label="Ghi chú"
                placeholder="Nội dung ..."
                horizontal
                rows="4"
                v-model="note"/>
      <template #header>
        <h6 class="modal-title">Xác nhận</h6>
        <CButtonClose @click="infoModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="infoModal = false" color="secondary">Hủy</CButton>
        <CButton @click="infoModal = false, confirmDeli()" color="info" style="color: white">Giao hàng thành công</CButton>
      </template>
    </CModal>

    <CModal
      :show.sync="warningModal"
      :no-close-on-backdrop="true"
      :centered="true"
      title="Xác nhận đơn hàng"
      size="lg"
      color="warning">
      <CTextarea
                label="Ghi chú"
                placeholder="Nội dung ..."
                horizontal
                rows="4"
                v-model="note"/>
      <template #header>
        <h6 class="modal-title">Ghi chú đơn hàng</h6>
        <CButtonClose @click="warningModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="warningModal = false" color="secondary">Hủy</CButton>
        <CButton @click="warningModal = false, updateNote()" color="warning" style="color: white">Lưu ghi chú</CButton>
      </template>
    </CModal>

    <CModal
      :show.sync="returnOrderUser"
      :no-close-on-backdrop="true"
      :centered="true"
      title="Xác nhận đơn hàng"
      size="lg"
      color="danger">
      <CTextarea
                label="Ghi chú"
                placeholder="Nội dung ..."
                horizontal
                rows="4"
                v-model="note"/>
      <template #header>
        <h6 class="modal-title">Xác nhận hoàn đơn</h6>
        <CButtonClose @click="returnOrderUser = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="returnOrderUser = false" color="secondary">Hủy</CButton>
        <CButton @click="returnOrderUser = false, confirmReturn()" color="danger" style="color: white">Chấp nhận hoàn đơn</CButton>
      </template>
    </CModal>

    <CModal
      :show.sync="returnProduct"
      :no-close-on-backdrop="true"
      :centered="true"
      title="Xác nhận hoàn hàng"
      size="lg"
      color="danger">
      <CTextarea
                label="Ghi chú"
                placeholder="Nội dung ..."
                horizontal
                rows="4"
                v-model="note"/>
      <template #header>
        <h6 class="modal-title">Xác nhận hoàn đơn</h6>
        <CButtonClose @click="returnProduct = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="returnProduct = false" color="secondary">Hủy</CButton>
        <CButton @click="returnProduct = false, confirmProduct()" color="danger" style="color: white">Xác nhận hoàn đơn</CButton>
      </template>
    </CModal>

    <CModal
      :show.sync="cancelReturn"
      :no-close-on-backdrop="true"
      :centered="true"
      title="Xác nhận hoàn hàng"
      size="lg"
      color="danger">
      <CTextarea
                label="Ghi chú"
                placeholder="Nội dung ..."
                horizontal
                rows="4"
                v-model="note"/>
      <template #header>
        <h6 class="modal-title">Xác nhận từ chối</h6>
        <CButtonClose @click="cancelReturn = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="cancelReturn = false" color="secondary">Hủy</CButton>
        <CButton @click="cancelReturn = false, cancelReturnOrder()" color="danger" style="color: white">Từ chối đơn hàng</CButton>
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
      pageOfItems: [],
      successModal: false,
      darkModal : false,
      primaryModal: false,
      infoModal: false,
      warningModal: false,
      returnOrderUser: false,
      returnProduct: false,
      cancelReturn: false,
      setIdOrder: "",
      searchString: "",
      getData: "",
      note: "",
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
      searchStatus: "",
      checkData: []
    };
  },
  created() {
    this.getAllProduct();
  },
  methods: {
    searchOrder(list){
      // console.log(this.searchString)
      // console.log(this.searchStatus)
      // console.log(list)
      if(list.length > 0){
        this.checkData = list.filter(data => {
            if(this.searchString == "" && this.searchStatus == ""){
              return true;
            }else{
              if(this.searchString != "" && this.searchStatus != ""){
                return data.status == this.searchStatus && data.customer.phone.indexOf(this.searchString) >= 0
              }else{
                if(this.searchString != ""){
                  return data.customer.phone.indexOf(this.searchString) >= 0
                }else{
                  return data.status == this.searchStatus
                }
              }
            }
          })
      }else{
        this.checkData = []
      }
     
      
    },
    setId(id){
      this.setIdOrder = id
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
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
    detailOrder(id) {
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
          this.searchOrder(response.data.object)
          // console.log(response.data.object);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    confirmOrder(){
      let item = {
        note : this.note
      }
      axios
        .post(this.$store.state.MainLink + "admin/orders/confimOrder?id=" + this.setIdOrder, 
          item,
         {
            headers: {
              Authorization: this.$store.state.userToken,
            },
          })
        .then((response) => {
          this.getAllProduct()
          this.note = ""
          console.log(response)
        })
        .catch((e) => {
          console.log(e);
        });
    },
    cancelOrder(){
      let item = {
        note : this.note
      }
      axios
        .post(this.$store.state.MainLink + "admin/orders/cancerOrder?id=" + this.setIdOrder, item,
         {
            headers: {
              Authorization: this.$store.state.userToken,
            },
          })
        .then(() => {
          this.getAllProduct()
          this.note = ""
        })
        .catch((e) => {
          console.log(e);
        });
    },
    confirmTranport(){
      let item = {
        note : this.note
      }
      axios
        .post(this.$store.state.MainLink + "admin/orders/confimTransport?id=" + this.setIdOrder, 
          item,
         {
            headers: {
              Authorization: this.$store.state.userToken,
            },
          })
        .then((response) => {
          this.getAllProduct()
          this.note = ""
          console.log(response)
        })
        .catch((e) => {
          console.log(e);
        });
    },
    confirmDeli(){
      let item = {
        note : this.note
      }
      axios
        .post(this.$store.state.MainLink + "admin/orders/confimSell?id=" + this.setIdOrder, 
          item,
         {
            headers: {
              Authorization: this.$store.state.userToken,
            },
          })
        .then((response) => {
          this.getAllProduct()
          this.note = ""
          console.log(response)
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateNote(){
      let item = {
        note : this.note
      }
      axios
        .post(this.$store.state.MainLink + "admin/orders/updateNote?id=" + this.setIdOrder, 
          item,
         {
            headers: {
              Authorization: this.$store.state.userToken,
            },
          })
        .then((response) => {
          this.getAllProduct()
          this.note = ""
          console.log(response)
        })
        .catch((e) => {
          console.log(e);
        });
    },
    confirmReturn(){
      let item = {
        note : this.note
      }
      axios
        .post(this.$store.state.MainLink + "admin/orders/comfimReturns?id=" + this.setIdOrder, item,
         {
            headers: {
              Authorization: this.$store.state.userToken,
            },
          })
        .then(() => {
          this.getAllProduct()
          this.note = ""
        })
        .catch((e) => {
          console.log(e);
        });
    },
    confirmProduct(){
      let item = {
        note : this.note
      }
      axios
        .post(this.$store.state.MainLink + "admin/orders/requestReturns?id=" + this.setIdOrder, item,
         {
            headers: {
              Authorization: this.$store.state.userToken,
            },
          })
        .then(() => {
          this.getAllProduct()
          this.note = ""
        })
        .catch((e) => {
          console.log(e);
        });
    },
    cancelReturnOrder(){
      let item = {
        note : this.note
      }
      axios
        .post(this.$store.state.MainLink + "admin/orders/unCancerOrder?id=" + this.setIdOrder, item,
         {
            headers: {
              Authorization: this.$store.state.userToken,
            },
          })
        .then(() => {
          this.getAllProduct()
          this.note = ""
        })
        .catch((e) => {
          console.log(e);
        });
    } 
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
