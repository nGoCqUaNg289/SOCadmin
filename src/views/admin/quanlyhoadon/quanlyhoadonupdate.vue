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
          style="width: 200px"
        >
          <i class="cil-check"></i>
          Xác nhận đơn hàng
        </CButton>
      </CCol>
      <br />
      <br />

      <CCol md="12" lg="6">
        <CCard>
          <CCardHeader>
            <CIcon name="cil-justify-center" />
            <strong> Thông tin hóa đơn </strong>
          </CCardHeader>
          <CCardBody height="auto">
            <CListGroup>
              <CListGroupItem>
                <span class="Title-font-size">Mã đơn hàng : </span>
                <span>{{ getData.id }}</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Tổng tiền : </span>
                <span>{{ formatPrice(getData.sumprice) }} đ</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Thời gian mua hàng : </span>
                <span>{{ getDateString(getData.dateCreated) }}</span>
              </CListGroupItem>
              <!-- <CListGroupItem>
                <span class="Title-font-size">username : </span>
                <span>{{ getData.username }} </span>
              </CListGroupItem> -->
              <CListGroupItem>
                <span class="Title-font-size">Trạng thái : </span>
                <span>{{ getData.status }} </span>
              </CListGroupItem>
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol md="12" lg="6">
        <CCard>
          <CCardHeader>
            <CIcon name="cil-justify-center" />
            <strong> Thông tin khách hàng </strong>
          </CCardHeader>
          <CCardBody height="auto">
            <CListGroup>
              <CListGroupItem>
                <span class="Title-font-size">Tên khách hàng : </span>
                <input type="text" v-model="getUser.fullname" style="border: none;">
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Email : </span>
                <input type="text" v-model="getUser.email" style="border: none;">
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Địa chỉ : </span>
                <input type="text" v-model="getUser.address" style="border: none;">
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Điện thoại : </span>
                <input type="text" v-model="getUser.phone" style="border: none;">
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Ghi chú : </span>
                <input type="text" v-model="getUser.note" style="border: none;">
              </CListGroupItem>
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol md="12">
        <CCard>
          <CCardHeader>
            <CIcon name="cil-justify-center" />
            <strong> Thông tin các sản phẩm được mua </strong>
          </CCardHeader>
          <CCardBody height="auto">
            <CListGroup
              v-for="(item, index) in getData.orderDetails"
              :key="index"
            >
              <div style="font-weight: 700; margin: 5px 5px 5px 5px">
                {{ index + 1 }} - {{ item.productName }}
              </div>
              <CListGroupItem>
                <span class="Title-font-size">Giá tiền : </span>
                <span>{{ formatPrice(item.price) }} đ</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Số lượng : </span>
                <input type="number" v-model="item.quantity" style="border: none;">
                <!-- <span>{{ item.quantity }}</span> -->
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Giảm giá : </span>
                <span>{{ item.discount }}%</span>
              </CListGroupItem>
              <br />
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "QuanLyHoaDonUpdate",
  props: {
    item: Number,
  },
  data() {
    return {
      selected: [], // Must be an array reference!
      show: true,
      horizontal: { label: "col-3", input: "col-9" },
      selectedOption: "some value",
      orderDetails: [],
      formCollapsed: true,
      getUser: "",
      getData: ""
    };
  },
  created() {
    this.getAllProduct();
    this.getDetailProduct();
  },
  methods: {
    getDateString(date) {
      return `${new Date(date).getFullYear()}-${
        new Date(date).getMonth() + 1
      }-${new Date(date).getDate()} ${new Date(date).getHours()}:${new Date(
        date
      ).getMinutes()}:${new Date(date).getSeconds()}`;
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
    UpdateProduct() {
      this.$router.push("/quanlysanphamupdate");
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
      this.orderDetails.splice(index, 1);
    },
    getAllProduct() {
      axios
        .get(this.$store.state.MainLink + "customer/products")
        .then((response) => {
          this.getData1 = response.data.object;
          //   console.log(response.data.object);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDetailProduct() {
      console.log(this.item)
      axios
        .get(this.$store.state.MainLink + "admin/orders/" + this.item, {
          headers: {
            Authorization: this.$store.state.userToken,
          },
        })
        .then((response) => {
          console.log(response)
          this.getData = response.data.object;
          this.getUser = this.getData.customer;
          console.log(this.getUser);
        })
        .catch((e) => {
          console.log(e);
        });
    },
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
.title-td {
  width: 35%;
}
</style>
