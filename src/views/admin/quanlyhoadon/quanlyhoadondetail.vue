<template>
  <div>
    <CRow>
      <CCol md="12">
        <CButton
          type="reset"
          size="sm"
          color="danger"
          class="btn btn-custom-size"
          @click="backList()"
        >
          <i class="cil-arrow-left"></i>
          Quay lại
        </CButton>
        <CButton
          type="submit"
          size="sm"
          color="primary"
          class="btn btn-custom-size"
          @click="updateOrder(getData.id)"
          v-if="getData.status == 'Chờ xác nhận' || getData.status == 'Đã xác nhận'"
        >
          Cập nhật
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
                <span>{{ getUser.fullname }}</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Email : </span>
                <span>{{ getUser.email }}</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Địa chỉ : </span>
                <span>{{ getUser.address }}</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Điện thoại : </span>
                <span>{{ getUser.phone }}</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Ghi chú : </span>
                <span>{{ getUser.note }}</span>
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
              <div style="font-weight: 700; margin: 5px 5px 5px 5px; float: left">
                {{ index + 1 }} - {{ item.productName }}
                <CButton
                  v-if="getData.status == 'Đã xác nhận' && item.statusWarranty == false"
                  style="float: right"
                  type="submit"
                  size="sm"
                  color="primary"
                  class="btn btn-custom-size"
                  @click="setWarry(item.orderId, item.productId, item.colorId),darkModal = true">
                  <i class="cil-check-circle"></i>
                  Tạo bảo hành
                </CButton>
                <i style="float: right; color: red" v-else-if="item.statusWarranty == true">
                  Đã tạo hóa đơn bảo hành
                </i>
              </div>
              
              <CListGroupItem>
                <span class="Title-font-size">Giá tiền : </span>
                <span>{{ formatPrice(item.price) }} đ</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Số lượng : </span>
                <span>{{ item.quantity }}</span>
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
    <CModal
          :show.sync="darkModal"
          :no-close-on-backdrop="true"
          :centered="true"
          title="Modal title 2"
          size="lg"
          color="success">
          <div>
            <p><span>Mã hóa đơn:</span>  <span>{{orderWarry.orderId}}</span></p> 
            <p><span>Mã sản phẩm:</span> <span>{{orderWarry.productId}}</span></p>
            <div>
              <!-- <p>Mã seri sản phẩm</p> -->
              <CInput
                label="Mã seri sản phẩm"
                placeholder="seri"
                horizontal
                v-model="orderWarry.productSeri"
              />
            </div>
            <!-- <div style="margin-top: 10px"> -->
              <!-- <p>Ngày hết hạn</p> -->
              <!-- <CInput
                label="Ngày hết hạn"
                type="date"
                horizontal
                v-model="orderWarry.expiredDate"
              />
            </div> -->
            <br>
            <i style="color: red">Vui lòng kiểm tra lại trước khi tạo hóa đơn bảo hành! Hóa đơn bảo hành sẽ không thế cập nhật sau khi tạo!</i>
          </div>
          <template #header>
            <h6 class="modal-title">Xác nhận</h6>
            <CButtonClose @click="darkModal = false" class="text-white"/>
          </template>
          <template #footer>
            <CButton @click="darkModal = false" color="secondary">Hủy</CButton>
            <CButton @click="darkModal = false, createwarranty()" color="success">Tạo hóa đơn bảo hành</CButton>
          </template>
        </CModal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "QuanLyHoaDonDetail",
  props: {
    item: Number,
  },
  data() {
    return {
      getData: "",
      checkWarry: 0,
      getUser: {},
      selected: [], // Must be an array reference!
      formCollapsed: true,
      darkModal: false,
      orderWarry: {
        orderId: "",
        productId: "",
        colorId: "",
        productSeri : ""//,
        //expiredDate: ""
      }
    };
  },
  created() {
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
    backList() {
      this.$router.push("/bill/quanlyhoadonlist");
    },
    updateOrder(id) {
      this.$router.push(
        {
        name: "Chỉnh sửa nội dung hóa đơn",
        params: { item: id },
        }
      );
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
          // console.log(this.getData)
          // console.log(this.getUser);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    setWarry(orderId, productId, colorId){
      // console.log(orderId, productId, colorId)
      this.orderWarry.orderId = orderId;
      this.orderWarry.productId = productId;
      this.orderWarry.colorId = colorId;
      console.log(this.orderWarry)
    },
    createwarranty(){
      //this.orderWarry.expiredDate = this.orderWarry.expiredDate + "T00:00:00.0000"
      console.log(this.orderWarry)
      axios
        .post("http://150.95.105.29:8800/api/admin/warranty/new",
          this.orderWarry,
          {
            headers: {
              Authorization: this.$store.state.userToken,
            },
          }
        )
        .then(() => {
          // this.checkWarry = 1
          this.getDetailProduct();
          console.log("Thêm mới thành công!");
        })
        .catch(function (error) {
          console.log("Thêm mới thất bại!");
          alert(error);
        });
    }
  },
};
</script>

<style scoped>
.Title-font-size {
  font-weight: 600;
}
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
