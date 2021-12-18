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
          <i class="cil-sync"></i>
          Cập nhật
        </CButton>
      </CCol>
      <br />
      <br />
      <CCol md="12" lg="12">
        <CCard>
          <CCardHeader>
            <CIcon name="cil-justify-center" />
            <strong> Thông tin chi tiết sale </strong>
          </CCardHeader>
          <CCardBody height="auto">
            <CListGroup>
              <CListGroupItem>
                <span class="Title-font-size">Mã khuyến mại : </span>
                <span>{{getData.id}}</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Tên khuyến mại : </span>
                <span>{{getData.name}}</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Thời gian bắt đầu sale: </span>
                <span>{{getDateString(getData.startTime)}}</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Thời gian kết thúc sale: </span>
                <span>{{getDateString(getData.endTime)}}</span>
              </CListGroupItem>
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
      <!-- <CCol md="12" lg="6">
        <CCard>
          <CCardHeader>
            <CIcon name="cil-justify-center" />
            <strong> Danh sách sản phẩm tham gia khuyến mại </strong>
          </CCardHeader>
          <CCardBody height="auto">
            <CListGroup v-if="productSale.length == 0">
              <CListGroupItem class="text-center">
                <span class="Title-font-size text-center">Không có sản phẩm ! </span>
              </CListGroupItem>
            </CListGroup>

            <CListGroup v-else>
              <CListGroupItem>
                <span class="Title-font-size">Mã khuyến mại : </span>
                <span>{{getData.id}}</span>
              </CListGroupItem>
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol> -->

      <CCol md="12">
      <div class="col-12 col-title">
        <div class="col-md-6 float-left margin-left" style="margin-top: 10px">
          <p class="Text-tile">Thêm sản phẩm tham gia khuyến mại</p>
        </div>
        <div class="col-md-6 float-left margin-right" style="margin-left: 30px">
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

        
      </div>

      <table class="table">
        <thead>
          <tr>
            <th scope="col" colspan="1">STT</th>
            <th scope="col" class="Title-table" colspan="">Tên sản phẩm</th>
            <th scope="col" class="Title-table" colspan="">Tình trạng</th>
            <th class="Title-table"></th>
          </tr>
        </thead>
        <tbody v-if="getDataProduct.length == 0">
          <tr class="text-center">
            <th  colspan="4">Không có dữ liệu!</th>
          </tr>
        </tbody>
        <tbody v-else>
          <tr v-for="(item, index) in getDataProduct" :key="index">
            <th>{{index + 1}}</th>
            <td>{{item.name}}</td>
            <td v-if="item.discount == 0" style="color: red;">Chưa tham gia</td>
            <td v-else style="color: green;">Đã tham gia</td>
            <td>
              <i v-if="item.discount == 0" class="cil-check-circle" style="color: green; text-align: center;" @click="darkModal = true, setProductId(item.id,getData.id)"></i>
              <i v-else class="cil-x-circle" style="color: red; text-align: center;" @click="dangerModal = true, setProductId(item.id,getData.id)"></i>
            </td>
          </tr>
        </tbody>
      </table>
      </CCol>

    </CRow>

    <CModal
      :show.sync="darkModal"
      :no-close-on-backdrop="true"
      :centered="true"
      title="Modal title 2"
      size="lg"
      color="success">

      <CInput label="Mã hóa đơn" v-model="getData.id" disabled horizontal/>
      <br>
      <CInput label="Mã sản phẩm" v-model="productId"  disabled horizontal/>
      <br>
      <CInput label="Giảm giá *" type="number" placeholder="Giảm giá trừ thẳng" v-model="discount" horizontal/>
      <br>
      <CInput label="Số lượng *" type="number" placeholder="Số lượng sản phẩm giảm giá" v-model="quantity" horizontal/>

      <template #header>
        <h6 class="modal-title">Xác nhận</h6>
        <CButtonClose @click="darkModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="darkModal = false" color="secondary">Hủy</CButton>
        <CButton @click="darkModal = false, createNew()" color="success">Thêm khuyến mại sản phẩm</CButton>
      </template>
    </CModal>

    <CModal
      :show.sync="dangerModal"
      :no-close-on-backdrop="true"
      :centered="true"
      title="Modal title 2"
      size="lg"
      color="danger">

      <CInput label="Mã hóa đơn" v-model="getData.id" disabled horizontal/>
      <br>
      <CInput label="Mã sản phẩm" v-model="productId"  disabled horizontal/>
      <br>
      <CInput label="Giảm giá *" type="number" placeholder="Giảm giá trừ thẳng" v-model="discount" horizontal/>
      <br>
      <CInput label="Số lượng *" type="number" placeholder="Số lượng sản phẩm giảm giá" v-model="quantity" horizontal/>

      <template #header>
        <h6 class="modal-title">Xác nhận</h6>
        <CButtonClose @click="dangerModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="dangerModal = false" color="secondary">Hủy</CButton>
        <CButton @click="dangerModal = false, createNew()" color="dangerModal">Xóa khuyến mại sản phẩm</CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "quanlyluongnhanviendetail",
  props: {
    item: Number ,
  },
  data() {
    return {
      darkModal: false,
      dangerModal: false,
      getData: "",
      searchString: "",
      getDataProduct: "",
      idOrder: "",
      productId: "",
      discount: "",
      quantity: "",
    };
  },
  created() {
    // console.log(this.item)
    this.getDetailSale()
  },
  methods: {
    createNew(){
      let item = {
        productId: this.productId,
        saleId: this.idOrder,
        discount: this.discount,
        quantity: this.quantity
      }
      axios
        .post(
          this.$store.state.MainLink + "admin/sale/newProductSale",
          item,{
            headers: {
              Authorization: this.$store.state.userToken,
            },
          }
        )
        .then(() => {
        // console.log(response)
        // this.getIdProduct = response.data.object.id;
        // console.log(this.getIdProduct)
        // this.showDetail = 1
        this.searchProduct();
        })
        .catch(function(error) {
          alert(error);
        });
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
          this.$store.state.MainLink + "admin/products?find=" + this.searchString,
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
