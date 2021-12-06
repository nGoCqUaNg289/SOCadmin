<template>
  <div>
    <CRow>
      <!-- <CCol md="12" lg="6">
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
              <CListGroupItem>
                <span class="Title-font-size">username : </span>
                <span>{{ getData.username }} </span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Trạng thái : </span>
                <span>{{ getData.status }} </span>
              </CListGroupItem>
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol> -->
      <CCol md="12" lg="12">
        <CCard>
          <CCardHeader>
            <CIcon name="cil-justify-center" />
            <strong> Thông tin người dùng </strong>
          </CCardHeader>
          <CCardBody height="auto">
            <CListGroup>
              <CListGroupItem>
                <span class="Title-font-size">Tên đăng nhập : </span>
                <span>{{ getData.username }}</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Tên khách hàng : </span>
                <span>{{ getData.fullname }}</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Email : </span>
                <span>{{ getData.email }}</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Địa chỉ : </span>
                <span>{{ getData.address }}</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Điện thoại : </span>
                <span>{{ getData.phone }}</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Vai trò : </span>
                <span>
                    <!-- {{item}} -->
                    {{getData.roles.join(", ")}}
                </span>
              </CListGroupItem>
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
      <!-- <CCol md="12">
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
      </CCol> -->
    </CRow>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "QuanLyTaiKhoanDetail",
  props: {
    item: Number,
  },
  data() {
    return {
      getData: "",
      getUser: {},
      selected: [], // Must be an array reference!
      show: true,

      formCollapsed: true,
    };
  },
  mounted() {
    this.getDetailAccount();
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
      this.$router.push("/account/quanlyaccount");
    },
    UpdateProduct() {
      this.$router.push("/account/quanlyaccount");
    },
    getDetailAccount() {
      console.log(this.item);
      axios
        .get(
          this.$store.state.MainLink + "admin/account/find?id=" + this.item,
          {
            headers: {
              Authorization: this.$store.state.userToken,
            },
          }
        )
        .then((response) => {
          this.getData = response.data.object;
          console.log(this.getData);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style scoped>
.Title-font-size {
  font-weight: 600;
}
</style>
