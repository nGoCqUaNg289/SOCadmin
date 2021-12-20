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
          <i class="cil-arrow-left"></i>
          Trở về
        </CButton>
        <CButton
          type="submit"
          size="sm"
          color="primary"
          class="btn btn-custom-size"
          @click="createNewAccount()">
          <i class="cil-check-circle"></i>
          Lưu
        </CButton>
      </CCol>
      <br />
      <br />

    </CRow>
  </div>
</template>

<script>
import axios from "axios";


export default {
  name: "BaoHanhCreate",
  data() {
    return {
      darkModal: false,
      dangerModal: false,
      myModal: false,
      getData: "",
      searchString: "",
      getDataProduct: "",
      idOrder: "",
      productId: "",
      discount: "",
      quantity: "",
      errorMessage: "",
    };
  },
  created() {
    // console.log(this.item)
    // this.getDetailSale()
    // this.testEx();
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    checkSale(productId){
      return  this.getData.productSaleVO.filter((product) => product.productId == productId).length > 0
    },
    createNew(){
      let item = {
        productId: this.productId,
        saleId: this.idOrder,
        discount: this.discount,
        quantity: this.quantity
      }
      let checkUrl = this.$store.state.MainLink + "admin/sale/updateProductSale"
      if(!this.checkSale(item.productId)){
        checkUrl = this.$store.state.MainLink + "admin/sale/newProductSale"
      }
      axios
        .post(
          checkUrl,
          item,{
            headers: {
              Authorization: this.$store.state.userToken,
            },
          }
        )
        .then(() => {
        this.searchProduct();
        this.getDetailSale();
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            this.myModal = true,
            this.errorMessage = error.response.data.errorMsg
          }
        })
    },
    deleteSaleProduct(){
      let item = {
        productId: this.productId,
        saleId: this.idOrder
      }
      axios
        .post(
          this.$store.state.MainLink + "admin/sale/stopProductSale",
          item,{
            headers: {
              Authorization: this.$store.state.userToken,
            },
          }
        )
        .then(() => {
        this.searchProduct();
        this.getDetailSale();
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            this.myModal = true,
            this.errorMessage = error.response.data.errorMsg
          }
        })
    },
    setProductId(id, idOrder){
      this.productId = id
      this.idOrder = idOrder
    },
    CancelCreate() {
      this.$router.push("/sale/quanlysale");
    },
    getDetailSale(){
      axios
        .get( this.$store.state.MainLink + "admin/sale/get/" + this.item,
         {
            headers: {
              Authorization: this.$store.state.userToken,
            },
          })
        .then((response) => {
          this.getData = response.data.object;
          console.log(this.getData)
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDateString(date) {
      return `${new Date(date).getFullYear()}-${
        new Date(date).getMonth() + 1
      }-${new Date(date).getDate()} ${new Date(date).getHours()}:${new Date(
        date
      ).getMinutes()}:${new Date(date).getSeconds()}`;
    },
    searchProduct() {
      console.log(this.searchString)
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
  },
};
</script>

<style>
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
