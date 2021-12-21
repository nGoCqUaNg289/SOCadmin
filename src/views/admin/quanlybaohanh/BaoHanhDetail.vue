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
          v-if="checkUpdate == 0"
        >
          Tạo phiếu bảo hành
        </CButton>
        <CButton
          type="submit"
          size="sm"
          color="primary"
          class="btn btn-custom-size"
          @click="createWarry()"
          v-else-if="checkUpdate == 1"
        >
          <i class="cil-check-circle"></i>
          Tạo phiếu bảo hành
        </CButton>
        <CButton
          type="submit"
          size="sm"
          color="primary"
          class="btn btn-custom-size"
          @click="printWarrantyCard(getData.id)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-printer"
            viewBox="0 0 16 16"
          >
            <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
            <path
              d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z"
            />
          </svg>
          In phiếu
        </CButton>
      </CCol>
      <br />
      <br />

      <CCol md="12" lg="12" v-if="checkCreate == 0">
        <CCard>
          <CCardHeader>
            <CIcon name="cil-justify-center" />
            <strong> Thông tin hóa đơn bảo hành </strong>
          </CCardHeader>
          <CCardBody height="auto">
            <CListGroup>
              <CListGroupItem>
                <span class="Title-font-size size-title">Mã hóa đơn : </span>
                <span>{{ getData.id }}</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size size-title"
                  >Tên khách hàng :
                </span>
                <span>{{ getData.name }}</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size size-title">Điện thoại : </span>
                <span>{{ getData.phone }}</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size size-title">Địa chỉ : </span>
                <span>{{ getData.address }}</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size size-title"
                  >Số lần bảo hành :
                </span>
                <span>{{ getData.countWarranty }}</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size size-title"
                  >Mã số máy bảo hành :
                </span>
                <span>{{ getData.productId }}</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size size-title">Mã seri : </span>
                <span>{{ getData.productSeri }}</span>
              </CListGroupItem>
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol
        md="12"
        lg="12"
        v-if="checkCreate == 0 && getData.warrantyInvoiceVOS.length != 0"
      >
        <CCard>
          <CCardHeader>
            <CIcon name="cil-justify-center" />
            <strong> Hóa đơn bảo hành sản phẩm </strong>
          </CCardHeader>
          <CCardBody height="auto">
            <CListGroup>
              <CListGroupItem>
                <table
                  class="table"
                  style="border-top: none"
                  v-for="(item, index) in getData.warrantyInvoiceVOS"
                  :key="index"
                >
                  <thead style="border-top: none">
                    <tr>
                      <th scope="col" style="border-top: none; max-width: 40%">
                        # {{ index + 1 }} - Ngày tiếp nhận :
                        <i>{{ item.expiredDate }}</i>
                      </th>
                      <th scope="col" style="border-top: none">
                        Được tạo bởi: <i>{{ item.createBy }}</i>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td scope="row">Tên khách hàng</td>
                      <td>{{ item.name }}</td>
                    </tr>
                    <tr>
                      <td scope="row">Số điện thoại</td>
                      <td>{{ item.phone }}</td>
                    </tr>
                    <tr>
                      <td scope="row">Địa chỉ</td>
                      <td>{{ item.address }}</td>
                    </tr>
                    <tr>
                      <td scope="row">Mã sản phẩm</td>
                      <td>{{ item.productId }}</td>
                    </tr>
                    <tr>
                      <td scope="row">Số seri sản phẩm</td>
                      <td>{{ item.productSeri }}</td>
                    </tr>
                    <tr>
                      <td scope="row">Giá dịch vụ</td>
                      <td>{{ formatPrice(item.price) }} đ</td>
                    </tr>
                    <tr>
                      <td scope="row">Tình trạng tiếp nhận</td>
                      <td>{{ item.productState }}</td>
                    </tr>
                    <tr>
                      <td scope="row">Loại hình dịch vụ</td>
                      <td>{{ item.type }}</td>
                    </tr>
                    <tr>
                      <td scope="row">Đơn vị tiếp nhận bảo hành</td>
                      <td>{{ item.warrantyUnit }}</td>
                    </tr>
                  </tbody>
                </table>
              </CListGroupItem>
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol md="12" lg="12" v-else-if="checkCreate == 1">
        <CCard>
          <CCardHeader>
            <CIcon name="cil-justify-center" />
            <strong> Thông tin phiếu bảo hành </strong>
          </CCardHeader>
          <CCardBody height="auto">
            <CListGroup>
              <CListGroupItem>
                <div class="size-title">Mã hóa đơn:</div>
                <p>{{ getData.id }}</p>
              </CListGroupItem>
              <CListGroupItem>
                <div class="size-title">Họ và tên:</div>

                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Nhập họ tên khách hàng"
                  style="width: 70%"
                  v-model="formData.name"
                />
                <div v-if="checkName">
                  <i style="color: red; margin-left: 25%">{{ checkName }}</i>
                </div>
              </CListGroupItem>
              <CListGroupItem>
                <div class="size-title">Phí bảo hành:</div>

                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Số tiền thỏa thuận"
                  style="width: 70%"
                  v-model="formData.price"
                />
                <div v-if="checkPrice">
                  <i style="color: red; margin-left: 25%">{{ checkPrice }}</i>
                </div>
              </CListGroupItem>
              <CListGroupItem>
                <div class="size-title">Số điện thoại:</div>

                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="09xxxxxxxx"
                  style="width: 70%"
                  v-model="formData.phone"
                />
                <div v-if="checkPhone">
                  <i style="color: red; margin-left: 25%">{{ checkPhone }}</i>
                </div>
              </CListGroupItem>
              <CListGroupItem>
                <div class="size-title">Địa chỉ:</div>

                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Phú Đô, Mỹ Đình, Nam Từ Liêm, Hà Nội"
                  style="width: 70%"
                  v-model="formData.address"
                />
                <div v-if="checkAddress">
                  <i style="color: red; margin-left: 25%">{{ checkAddress }}</i>
                </div>
              </CListGroupItem>
              <CListGroupItem>
                <div class="size-title">Đơn vị bảo hành:</div>

                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Đơn vị tiếp nhận bảo hành của hãng"
                  style="width: 70%"
                  v-model="formData.warrantyUnit"
                />
                <div v-if="checkWarry">
                  <i style="color: red; margin-left: 25%">{{ checkWarry }}</i>
                </div>
              </CListGroupItem>
              <CListGroupItem>
                <div class="size-title">Tình trạng sản phẩm:</div>

                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Tình trạng khi nhận máy"
                  style="width: 70%"
                  v-model="formData.productState"
                />
              </CListGroupItem>
              <CListGroupItem>
                <div class="size-title">Loại dịch vụ:</div>

                <select
                  class="form-select"
                  aria-label="Default select example"
                  style="width: 70%"
                  v-model="formData.type"
                >
                  <option selected disabled>-- Loại dịch vụ --</option>
                  <option value="Sửa bảo hành">Sửa bảo hành</option>
                  <option value="Sửa dịch vụ">Sửa dịch vụ</option>
                </select>
              </CListGroupItem>
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

    <CModal
      :show.sync="myModal"
      :no-close-on-backdrop="true"
      :centered="true"
      title="Modal title 2"
      size="sm"
      color="success"
    >
      <template #header>
        <h6 class="modal-title">Thành công!</h6>
        <CButtonClose @click="myModal = false" class="text-white" />
      </template>
      <div class="text-center">
        <sweetalert-icon icon="success" />
        {{ resultCreate }}
      </div>

      <template
        #footer
        class="text-center; display: none"
        style="display: none"
      >
        <CButton
          class="text-center"
          @click="(myModal = false), backList()"
          color="success"
          >Xác nhận</CButton
        >
      </template>
    </CModal>

    <CModal
      :show.sync="myModalFail"
      :no-close-on-backdrop="true"
      :centered="true"
      title="Modal title 2"
      size="sm"
      color="danger"
    >
      <template #header>
        <h6 class="modal-title">{{ resultCreate }} !</h6>
        <CButtonClose @click="myModalFail = false" class="text-white" />
      </template>
      <div class="text-center">
        <sweetalert-icon icon="error" />
        {{ resultCreate }}
      </div>

      <template
        #footer
        class="text-center; display: none"
        style="display: none"
      >
        <CButton class="text-center" @click="myModalFail = false" color="danger"
          >Xác nhận</CButton
        >
      </template>
    </CModal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "BaoHanhDetail",
  props: {
    item: Number,
  },
  data() {
    return {
      getData: "",
      myModal: false,
      myModalFail: false,
      resultCreate: "",
      selected: [], // Must be an array reference!
      show: true,
      horizontal: { label: "col-3", input: "col-9" },
      selectedOption: "some value",
      checkUpdate: 0,
      formCollapsed: true,
      productProperties: [],
      checkCreate: 0,
      formData: {
        warrantyId: "",
        price: "",
        name: "",
        phone: "",
        address: "",
        warrantyUnit: "",
        productState: "",
        type: "",
      },
      checkName: "",
      checkPhone: "",
      checkPrice: "",
      checkAddress: "",
      checkWarry: "",
    };
  },
  created() {
    this.getDetailWarry();
    // console.log(this.item)
  },
  methods: {
    printWarrantyCard(id) {
        axios({
          url: "http://150.95.105.29:8800/api/admin/print/warranty/" + id,
          method: "GET",
          responseType: "blob",
        }).then((res) => {
          var FILE = window.URL.createObjectURL(new Blob([res.data]));

          var docUrl = document.createElement("a");
          docUrl.href = FILE;
          docUrl.setAttribute("download", "warranty " + id + ".pdf");
          //  document.body.appendChild(docUrl);
          docUrl.click();
        });},
    createNewValue() {
      let item = {
        propertyName: "",
        propertyValue: "",
      };
      this.productProperties.push(item);
    },
    deleteValue(index) {
      this.productProperties.splice(index, 1);
    },
    backList() {
      this.$router.push("/warranty/warrantylist");
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
        .get(this.$store.state.MainLink + "admin/warranty/get/" + this.item, {
          headers: {
            Authorization: this.$store.state.userToken,
          },
        })
        .then((response) => {
          this.getData = response.data.object;
          console.log(this.getData);
          this.productProperties = response.data.object.productDetails;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateWarr() {
      this.checkUpdate = 1;
      this.checkCreate = 1;
      // console.log(this.getData.id)
    },
    createWarry() {
      this.formData.warrantyId = this.getData.id;
      console.log(this.formData);
      axios
        .post(this.$store.state.MainLink + "admin/invoice/new", this.formData, {
          headers: {
            Authorization: this.$store.state.userToken,
          },
        })
        .then(() => {
          // this.getData = response.data.object;
          // console.log(response.data.object);
          this.resultCreate = "Tạo hóa đơn bảo hành thành công!";
          this.myModal = true;
          // this.productProperties = response.data.object.productDetails
        })
        .catch((e) => {
          // console.log(Object.values(e.response.data.validateDetails).join(", "));
          // console.log(e.response.data)
          this.resultCreate = e.response.data.errorMsg;
          (this.checkName = e.response.data.validateDetails.name),
            (this.checkPhone = e.response.data.validateDetails.phone),
            (this.checkPrice = e.response.data.validateDetails.price),
            (this.checkAddress = e.response.data.validateDetails.address),
            (this.checkWarry = e.response.data.validateDetails.warrantyUnit);

          // this.myModalFail = true
        });
    },
    cancelUpdate() {
      this.checkUpdate = 0;
    },
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
.size-title {
  width: 25%;
  float: left;
  font-weight: 600;
}
</style>
