<template>
  <div>
    <CRow>
      <CCol md="12">
        <CButton
          type="reset"
          size="sm"
          color="danger"
          class="btn btn-custom-size"
          @click="CancelCreate()"
        >
          <i class="cil-x"></i>
          Huỷ
        </CButton>
        <CButton
          type="submit"
          size="sm"
          color="primary"
          class="btn btn-custom-size"
          @click="createOrder()"
          v-if="showResult == 0"
        >
          <i class="cil-plus" v-if="checkDone == 0"></i>
          <span v-else-if="checkDone == 1" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Lưu sản phẩm
        </CButton>
      </CCol>
      <br />
      <br />



      <div v-if="showResult == 0">
      <CCol md="12" lg="12">
        <CCard>
          <CCardHeader>
            <CIcon name="cil-justify-center" />
            <strong> Thông tin khách hàng </strong>
          </CCardHeader>
          <CCardBody height="auto">
            <CListGroup>
              <CListGroupItem>
                <div style="width: 15%; float: left; font-weight: 600">
                  Họ và tên
                </div>

                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Nhập họ tên khách hàng"
                  style="width: 70%"
                  v-model="orderCustomer.fullname"
                />
              </CListGroupItem>
              <CListGroupItem>
                <div style="width: 15%; float: left; font-weight: 600">
                  Email
                </div>
                <input
                  type="email"
                  class="input-custom-border-none"
                  placeholder="exam@exam.exam"
                  style="width: 70%"
                  v-model="orderCustomer.email"
                />
              </CListGroupItem>
              <CListGroupItem>
                <div style="width: 15%; float: left; font-weight: 600">
                  Điện thoại
                </div>

                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="09xxxxxxxx"
                  style="width: 70%"
                  v-model="orderCustomer.phone"
              /></CListGroupItem>
              <CListGroupItem>
                <div style="width: 15%; float: left; font-weight: 600">
                  Địa chỉ
                </div>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Địa chỉ cụ thể"
                  style="width: 70%"
                  v-model="orderCustomer.address"
              /></CListGroupItem>
              <CListGroupItem>
                <div style="width: 15%; float: left; font-weight: 600">
                  Sản phẩm
                </div>
                <table class="table" v-if="orderProduct.length > 0">
                <thead>
                  <tr>
                    <th>Mã sản phẩm</th>
                    <th>Mã màu</th>
                    <th scope="col">Giá tiền</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Khuyến mại</th>
                    <th scope="col">Thành tiền</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in orderProduct" :key="index">
                    <td>{{item.productId}}</td>
                    <td>{{item.colorId}}</td>
                    <td>{{formatPrice(item.price)}} đ</td>
                    <td>{{item.quantity}}</td>
                    <td style="color: red">- {{formatPrice(item.discount)}} đ</td>
                    <td>{{formatPrice(item.price*item.quantity - item.discount*item.quantity)}} đ</td>
                    <td>
                      <i
                        class="cil-trash"
                        style="color: red"
                        @click="deleteProduct(index)"
                      ></i>
                    </td>
                  </tr>
                </tbody>
              </table>
                </CListGroupItem>

                <CListGroupItem>
                <div style="width: 15%; float: left; font-weight: 600">
                  Tổng tiền 
                </div>
                <strong style="color: red">{{formatPrice(totalPrice)}}</strong> đ
                </CListGroupItem>
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol md="12" lg="12">
        <CCard>
          <CCardHeader>
            <CIcon name="cil-justify-center" />
            <strong> Danh sách sản phẩm </strong>
          </CCardHeader>
          <CCardBody height="auto">
            <CListGroup>

              <div class="col-md-12 float-left" style="margin-left: 30px">
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
                    <button class="btn btn-outline-success my-2 my-sm-0" @click="searchProduct()">
                      <i class="cil-magnifying-glass"></i>
                    </button>
                  </div>
                </nav>
              </div>
              <table class="table" v-if="getDataProduct.length"> 
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Đơn giá</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in getDataProduct" :key="index">
                    <td>{{item.name}}</td>
                    <td>{{formatPrice(item.price)}} đ</td>
                    <td class="text-center">
                      <i
                        class="cil-check"
                        style="color: green"
                        @click="createOrderProduct(item.id, item.price, item.discount, item.productColors, item.name), darkModal = true"
                      ></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
      </div>


      <CCol md="12" lg="12" v-else>
        <CCard>
          <CCardHeader>
            <CIcon name="cil-justify-center" />
            <strong> Thông tin hóa đơn <strong>{{getDataResult.id}}</strong> </strong>
          </CCardHeader>
          <CCardBody height="auto">
            <CListGroup>
              <CListGroupItem>
                <div style="width: 15%; float: left; font-weight: 600">
                  Họ và tên
                </div>

                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Nhập họ tên khách hàng"
                  style="width: 70%"
                  v-model="resultUser.fullname"
                />
              </CListGroupItem>
              <CListGroupItem>
                <div style="width: 15%; float: left; font-weight: 600">
                  Email
                </div>
                <input
                  type="email"
                  class="input-custom-border-none"
                  placeholder="exam@exam.exam"
                  style="width: 70%"
                  v-model="resultUser.email"
                />
              </CListGroupItem>
              <CListGroupItem>
                <div style="width: 15%; float: left; font-weight: 600">
                  Điện thoại
                </div>

                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="09xxxxxxxx"
                  style="width: 70%"
                  v-model="resultUser.phone"
              /></CListGroupItem>
              <CListGroupItem>
                <div style="width: 15%; float: left; font-weight: 600">
                  Địa chỉ
                </div>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Địa chỉ cụ thể"
                  style="width: 70%"
                  v-model="resultUser.address"
              /></CListGroupItem>
              <CListGroupItem>
                <div style="width: 15%; float: left; font-weight: 600">
                  Trạng thái
                </div>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Địa chỉ cụ thể"
                  style="width: 70%"
                  v-model="getDataResult.status"
              /></CListGroupItem>
              <CListGroupItem>
                <div style="width: 15%; float: left; font-weight: 600">
                  Tổng sản phẩm
                </div>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Địa chỉ cụ thể"
                  style="width: 70%"
                  v-model="resultProduct.length"
              /></CListGroupItem>
              <CListGroupItem>
                <div style="width: 15%; float: left; font-weight: 600">
                  Tổng tiền : 
                </div>
                <span>{{formatPrice(getDataResult.sumprice)}}</span>
              </CListGroupItem>
              <CListGroupItem>
                <div style="width: 15%; float: left; font-weight: 600">
                  Sản phẩm
                </div>
                <table class="table" v-if="resultProduct.length > 0">
                <thead>
                  <tr>
                    <th>Tên sản phẩm</th>
                    <th>Mã màu</th>
                    <th scope="col">Giá tiền</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Khuyến mại</th>
                    <th scope="col">Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in orderProduct" :key="index">
                    <!-- {{item}} -->
                    <td>{{item.productName}}</td>
                    <td>{{item.colorId}}</td>
                    <td>{{formatPrice(item.price)}} đ</td>
                    <td>{{item.quantity}}</td>
                    <td style="color: red">- {{formatPrice(item.discount)}} đ</td>
                    <td>{{formatPrice(item.price*item.quantity - item.discount*item.quantity)}} đ</td>
                  </tr>
                </tbody>
              </table>
                </CListGroupItem>

            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>

    </CRow>

    <CModal
      :show.sync="darkModal"
      :no-close-on-backdrop="true"
      :centered="true"
      title="Modal title 2"
      size="lg">

      <template #header>
        <h6 class="modal-title">Chi tiết sản phẩm</h6>
        <CButtonClose @click="darkModal = false" class="text-white"/>
      </template>
      <div>
        <div>
          <p>Mã sản phẩm: {{detailProduct.productId}}</p>
        </div>
        <div>
          <p>Giá thành: {{formatPrice(detailProduct.price)}} đ</p>
        </div>
        <div>
          <p>Giảm giá:</p> <span style="color:red">- {{formatPrice(detailProduct.discount)}} đ</span>
        </div>
        <div>
          <p>Số lượng: <input type="number" v-model="count" style="max-width: 80px; border: none; border-bottom: 1px solid gray; padding-left: 10px" min="1" oninput="this.value = Math.abs(this.value)"></p>
        </div>
        <div>
          <p>Thành tiền: <span style="color:red">{{formatPrice(sumprice = detailProduct.price*count - detailProduct.discount*count)}} đ</span></p>
        </div>
        <div style="display: flex">
          <p style="width: 100px">Màu sắc: <span style="color: red">*</span></p>
          <div v-for="(item, index) in detailProduct.color" :key="index">
            <button style="width: 35px; height: 35px; margin-right: 1rem; border-radius: 1rem" @click="setColorProduct(item.colorId,item.color.colorName)" :style="{backgroundColor: '#'+item.color.code}"></button>
          </div>
        </div>
        <div>Đang chọn màu: <span>{{colorName}}</span></div>
      </div>
      <template #footer>
        <CButton @click="darkModal = false" color="secondary">Hủy</CButton>
        <CButton @click="darkModal = false, createNew()" color="success" v-if="colorName">Thêm sản phẩm</CButton>
      </template>
    </CModal>

    <CModal
      :show.sync="myModal"
      :no-close-on-backdrop="true"
      :centered="true"
      title="Modal title 2"
      size="sm"
      color="danger">

      <template #header>
        <h6 class="modal-title">Lỗi phát sinh</h6>
        <CButtonClose @click="myModal = false" class="text-white"/>
      </template>
      <div class="text-center">
      <sweetalert-icon icon="error" />
            {{errorMessage}}
      </div>
      
      <template #footer class="text-center; display: none" style="display: none">
        <CButton class="text-center" @click="myModal = false" color="danger">Xác nhận</CButton>
      </template>
    </CModal>

    <CModal
      :show.sync="myModalS"
      :no-close-on-backdrop="true"
      :centered="true"
      title="Modal title 2"
      size="sm"
      color="success">

      <template #header>
        <h6 class="modal-title">Thành công</h6>
        <CButtonClose @click="myModalS = false" class="text-white"/>
      </template>
      <div class="text-center">
      <sweetalert-icon icon="success" />
            Tạo hóa đơn thành công !
      </div>
      
      <template #footer class="text-center; display: none" style="display: none">
        <CButton class="text-center" @click="myModalS = false" color="success">Xác nhận</CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "QuanLySanPhamDetail",

  data() {
    return {
      darkModal: false,
      myModal: false,
      myModalS: false,
      checkDone : 0,
      errorMessage: "",
      selected: [], // Must be an array reference!
      show: true,
      horizontal: { label: "col-3", input: "col-9" },
      selectedOption: "some value",

      orderDetails: [],
      getData: "",
      formCollapsed: true,
      searchString: "",
      getDataProduct: "",
      count: 1,
      orderCustomer: {
        fullname: "",
        email: "",
        phone: "",
        address: "",
      },
      orderProduct: [],
      detailProduct: {

      },
      sumprice: 0,
      totalPrice: 0,
      colorId: "",
      colorName: "", 
      productId: "",
      price: "",
      discount: "",
      color: "",
      getDataResult: "",
      resultUser: "",
      resultProduct: "",
      showResult: 0
      // productName: "",
    };
  },
  created() {
    this.getAllProduct();
  },
  methods: {
    createNew(){
      let item = {
        productId : this.productId,
        price : this.price,
        discount : this.discount,
        colorId : this.colorId,
        quantity : this.count
      }
      this.orderProduct.push(item)
      this.totalPrice = 0
      for (var i = 0; i < this.orderProduct.length; i++) {
        this.totalPrice += (this.orderProduct[i].price*this.orderProduct[i].quantity - this.orderProduct[i].discount*this.orderProduct[i].quantity)
      }
    },
    setColorProduct(colorId, colorName){
      // console.log(colorId, colorName);
      this.colorId = colorId;
      this.colorName = colorName;
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    validator(val) {
      return val ? val.length >= 4 : false;
    },
    CancelCreate() {
      this.$router.push("/bill/quanlyhoadonlist");
    },
    createOrderProduct(id, price, discount, color ) {
      let item = {
        productId : id,
        price : price,
        discount : discount,
        color : color
      }
      this.productId = id;
      this.price = price;
      this.discount = discount;
      // this.color = color;
      this.detailProduct = item
      console.log(this.detailProduct)
    },
    searchProduct(){
      axios
        .get(
          this.$store.state.MainLink + "customer/products?find=" + this.searchString,
          {
            headers: {
                Authorization: this.$store.state.userToken,
            }
          })
        .then((response) => {
          this.getDataProduct = response.data.object;
          console.log(this.getDataProduct)
        })
        .catch((e) => {
          console.log(e);
        });
    },
    createNewValue() {
      let item = {
        productId: 0,
        quantity: 0,
        price: 0,
        discount: 0,
      };
      this.orderDetails.push(item);
      console.log(this.orderDetails);
    },
    deleteProduct(index) {
      //   console.log(index);
      this.orderProduct.splice(index, 1);
    },

    getAllProduct() {
      axios
        .get(this.$store.state.MainLink + "customer/products")
        .then((response) => {
          this.getData = response.data.object;
          //   console.log(response.data.object);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    createOrder(){
      // console.log(this.orderProduct)
      this.checkDone = 1

      let item = {
        sumprice : this.totalPrice,
        customer : this.orderCustomer,
        orderDetails: this.orderProduct
      }

      axios
        .post(
          this.$store.state.MainLink + "customer/orders/new", item,
          {
            headers: {
              Authorization: this.$store.state.userToken,
            },
          }
        )
        .then((response) => {
        // console.log(response)
        this.getDataResult = response.data.object;
        this.resultUser = response.data.object.customer;
        this.resultProduct = response.data.object.orderDetails;
        console.log(this.resultUser)
        console.log(this.resultProduct)
        this.myModalS = true
        this.checkDone = 0
        this.showResult = 1
        })
        .catch((error) =>{
          // console.log(error.response.data.errorMsg);
          this.errorMessage = error.response.data.errorMsg
          this.myModal = true
          this.checkDone = 0
        });
    }
  },
};
</script>

<style scope>
.btn-custom-size {
  width: 130px;
  margin-left: 15px;
  float: right;
}
.input-custom-border-none {
  border: none;
  box-shadow: none;
  box-sizing: border-box;
}
/* .title-td {
  width: 35%;
} */
</style>
