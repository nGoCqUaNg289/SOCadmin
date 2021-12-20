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
          @click="createNewAccount()"
        >
          <i class="cil-plus"></i>
          Tạo tài khoản
        </CButton>
      </CCol>
      <br />
      <br />

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
                  Tài khoản <span style="color: red">*</span>
                </div>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Nhập tên đăng nhập"
                  style="width: 70%"
                  v-model="username"
                />
              </CListGroupItem>
              <CListGroupItem>
                <div style="width: 15%; float: left; font-weight: 600">
                  Họ và tên <span style="color: red">*</span>
                </div>

                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Nhập họ tên khách hàng"
                  style="width: 70%"
                  v-model="fullname"
                />
              </CListGroupItem>
              <CListGroupItem>
                <div style="width: 15%; float: left; font-weight: 600">
                  Email <span style="color: red">*</span>
                </div>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Nhập email khách hàng"
                  style="width: 70%"
                  v-model="email"
                />
              </CListGroupItem>
              <CListGroupItem>
                <div style="width: 15%; float: left; font-weight: 600">
                  Điện thoại <span style="color: red">*</span>
                </div>

                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Số điện thoại"
                  style="width: 70%"
                  v-model="phone"
              /></CListGroupItem>
              <CListGroupItem>
                <div style="width: 15%; float: left; font-weight: 600">
                  Địa chỉ <span style="color: red">*</span>
                </div>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Địa chỉ cụ thể"
                  style="width: 70%"
                  v-model="address"
              /></CListGroupItem>
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <CModal
      :show.sync="myModalFail"
      :no-close-on-backdrop="true"
      :centered="true"
      title="Modal title 2"
      size="sm"
      color="danger">

      <template #header>
        <h6 class="modal-title">{{resultCreate}} !</h6>
        <CButtonClose @click="myModalFail = false" class="text-white"/>
      </template>
      <div class="text-center">
      <sweetalert-icon icon="error" />
            {{resultCreate}}
      </div>
      
      <template #footer class="text-center; display: none" style="display: none">
        <CButton class="text-center" @click="myModalFail = false" color="danger">Xác nhận</CButton>
      </template>
    </CModal>

    <CModal
      :show.sync="myModal"
      :no-close-on-backdrop="true"
      :centered="true"
      title="Modal title 2"
      size="sm"
      color="success">

      <template #header>
        <h6 class="modal-title">{{resultCreate}} !</h6>
        <CButtonClose @click="myModal = false" class="text-white"/>
      </template>
      <div class="text-center">
      <sweetalert-icon icon="error" />
            {{resultCreate}}
      </div>
      
      <template #footer class="text-center; display: none" style="display: none">
        <CButton class="text-center" @click="myModal = false, backList()" color="success">Xác nhận</CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "QuanLyAccountCreate",

  data() {
    return {
      username: "",
      fullname: "",
      email: "",
      address: "",
      phone: "",
      myModalFail: false,
      resultCreate: "",
      myModal: false
    };
  },
  created() {
    // this.getAllProduct();
  },
  methods: {
    validator(val) {
      return val ? val.length >= 4 : false;
    },
    CancelCreate() {
      this.$router.push("/account/quanlyaccount");
    },
    backList() {
      this.$router.push({
            name: "Danh sách tài khoản",
      });
    },
    createNewAccount() {
      let item = {
        username: this.username,
        fullname: this.fullname,
        email: this.email,
        address: this.address,
        phone: this.phone,
      };
      console.log(item)
      axios
        .post(this.$store.state.MainLink + "admin/account/newAccount", item,
          {
            headers: {
              Authorization: this.$store.state.tokenUser,
            },
          })
        .then((response) => {
          console.log(response);
          this.resultCreate = "Tạo tài khoản thành công!"
          this.myModal = true
        })
        .catch((e) => {
          console.log(e.response.data);
          this.resultCreate = e.response.data.errorMsg
          this.myModalFail = true
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
