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
          Trở lại
        </CButton>
        <CButton
          type="submit"
          size="sm"
          color="primary"
          class="btn btn-custom-size"
          @click="updateWarr()"
        >
          <i class="cil-check-circle" v-if="checkUpdate == 1"></i>
          Tạo phiếu bảo hành
        </CButton>
      </CCol>
      <br />
      <br />

      <CCol md="12" lg="12">
        <CCard>
          <CCardHeader>
            <CIcon name="cil-justify-center" />
            <strong> Thông tin hóa đơn bảo hành </strong>
          </CCardHeader>
          <CCardBody height="auto">
            <CListGroup>
              <CListGroupItem>
                <span class="Title-font-size">Mã hóa đơn : </span>
                <span>{{ getData.id }}</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Tên khách hàng : </span>
                <span>{{ getData.name }}</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Điện thoại : </span>
                <span>{{ getData.phone }}</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Địa chỉ : </span>
                <span >{{ (getData.address) }}</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Số lần bảo hành : </span>
                <span>{{ getData.countWarranty }}</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Mã số máy bảo hành : </span>
                <span>{{ getData.productId }}</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Mã seri : </span>
                <span>{{ getData.productSeri }}</span>
              </CListGroupItem>
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol md="12" v-if="getData.warrantyInvoiceVOS.length">
        <table class="table" style="background: white">
          <tbody>
            <thead>
              <tr>
                <th scope="col" colspan="2">Phiếu bảo hành</th>
              </tr>
            </thead>
            <tr v-for="(item, index2) in getData.productColors" :key="index2">
              <td style="width: 35%">{{item.color.colorName}}</td>
              <td>{{item.quantity}}</td>
            </tr>      
          </tbody>
        </table>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "BaoHanhDetail",
  props: {
    item: Number
  },
  data() {
    return {
      getData: "",
      selected: [], // Must be an array reference!
      show: true,
      horizontal: { label: "col-3", input: "col-9" },
      selectedOption: "some value",
      checkUpdate: 0,
      formCollapsed: true,
      productProperties: []
    };
  },
  created() {
    this.getDetailWarry();
    console.log(this.item)
  },
  methods: {
    createNewValue(){
      let item = {
        propertyName: "",
        propertyValue: ""
      }
      this.productProperties.push(item);
    },
    deleteValue(index){
      this.productProperties.splice(index, 1);
    },
    backList(){
      this.$router.push("/warranty/warrantylist")
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    validator(val) {
      return val ? val.length >= 4 : false;
    },
    getDetailWarry() {
      axios
        .get(this.$store.state.MainLink + "admin/warranty/get/" + this.item,
        {
          headers: {
            Authorization: this.$store.state.userToken,
          },
        })
        .then((response) => {
          this.getData = response.data.object;
          console.log(this.getData);
          this.productProperties = response.data.object.productDetails
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateWarr(){
      this.checkUpdate = 1
    },
    cancelUpdate(){
      this.checkUpdate = 0
    }
  },
};
</script>

<style scoped>
.Title-font-size {
  font-weight: 600;
}
.btn-custom-size {
  width: 170px;
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
