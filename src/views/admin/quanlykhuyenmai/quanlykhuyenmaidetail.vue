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
                <span>1</span>
              </CListGroupItem>
              <!-- <CListGroupItem>
                <span class="Title-font-size">Mã sản phẩm : </span>
                <span>{{ getDataG.name }}</span>
              </CListGroupItem> -->
              <CListGroupItem>
                <span class="Title-font-size">Tên khuyến mại : </span>
                <span>sale 8-3</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Thời gian bắt đầu sale: </span>
                <span>2021-4-26 23:41:24</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Thời gian kết thúc sale: </span>
                <span>2021-8-3 23:41:31</span>
              </CListGroupItem>
            </CListGroup>
          </CCardBody>
        </CCard>
<!-- 
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
            @click="addMemberinGroup()"
          >
            <i class="cil-plus"></i>
            Lưu
          </CButton>
        </CCol> -->
      </CCol>

      
      <!-- <CCol md="12">
      <div class="col-12 col-title">
        <div class="col-md-6 float-left margin-left">
          <p class="Text-tile">Danh sách sản phẩm tham gia</p>
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
        <tbody>
          <tr>
            <th>1</th>
            <td>Laptop Asus TUF FX505DY AL133T R5 3550H/8GB/512G SSD/15.6 FHD/WIN10</td>
            <td style="color: blue"  class="text-center">Ngừng kinh doanh</td>
          </tr>
          <tr>
            <th>2</th>
            <td>Lenovo Thinkpad X1 CARBON Gen 7 i7-10510U</td>
            <td style="color: green"  class="text-center">Đang bán</td>
          </tr>
          <tr>
            <th>3</th>
            <td>MacBook Pro 13" 2020 Touch Bar M1 256GB</td>
            <td style="color: green"  class="text-center">Đang bán</td>
          </tr>
          <tr>
            <th>4</th>
            <td>Laptop Microsoft Surface Pro 7 i5 1035G4/8GB/128GB SSD/12.3" Touch/Win10</td>
            <td style="color: green"  class="text-center">Đang bán</td>
          </tr>
          <tr>
            <th>5</th>
            <td>MacBook Pro 16" 2021 M1 Pro 512GB</td>
            <td style="color: green"  class="text-center">Đang bán</td>
          </tr>
        </tbody>
      </table>
      </CCol> -->

      <CCol md="12">
      <div class="col-12 col-title">
        <div class="col-md-6 float-left margin-left">
          <p class="Text-tile">Danh sách sản phẩm tham gia</p>
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
        <tbody>
          <tr>
            <th>1</th>
            <td>Laptop Asus TUF FX505DY AL133T R5 3550H/8GB/512G SSD/15.6 FHD/WIN10</td>
            <td style="color: blue"  class="text-center">Ngừng kinh doanh</td>
            <td>
              <i class="cil-trash" style="color: red; text-align: center;"></i>
            </td>
          </tr>
          <tr>
            <th>2</th>
            <td>Lenovo Thinkpad X1 CARBON Gen 7 i7-10510U</td>
            <td style="color: green"  class="text-center">Đang bán</td>
            <td>
              <i class="cil-trash" style="color: red; text-align: center;"></i>
            </td>
          </tr>
          <tr>
            <th>3</th>
            <td>MacBook Pro 13" 2020 Touch Bar M1 256GB</td>
            <td style="color: green"  class="text-center">Đang bán</td>
            <td>
              <i class="cil-trash" style="color: red; text-align: center;"></i>
            </td>
          </tr>
          <tr>
            <th>4</th>
            <td>Laptop Microsoft Surface Pro 7 i5 1035G4/8GB/128GB SSD/12.3" Touch/Win10</td>
            <td style="color: green"  class="text-center">Đang bán</td>
            <td>
              <i class="cil-trash" style="color: red; text-align: center;"></i>
            </td>
          </tr>
          <tr>
            <th>5</th>
            <td>MacBook Pro 16" 2021 M1 Pro 512GB</td>
            <td style="color: green"  class="text-center">Đang bán</td>
            <td>
              <i class="cil-trash" style="color: red; text-align: center;"></i>
            </td>
          </tr>
          <tr>
            <th colspan="4" class="text-center" style="">
              <i class="cil-plus" style="color: red;"></i>
            </th>
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
  name: "quanlyluongnhanviendetail",
//   props: {
//     idG:"" ,
//   },
  data() {
    return {
      getDataG: "",
      formData: {
        saleId: parseInt(this.$route.params.id),
        discount: "",
        productId:"",
        quantity:""
      },
      getAllMember: "",

      formCollapsed: true,
      getAllUserId: "",
      formAllUserId: {
        userId: "",
        username: "",
      },
      formDataAddUtoG: {
        groupId: this.idG,
        userId: "",
      },
      getUnewtoGr: "",
    };
  },
  created() {
    this.getInfoGr();
    this.getAllMemberinGr();
    this.getAllUserIdnoGroup();
  },
  methods: {
    CancelCreate() {},

    getInfoGr() {
      // console.log(this.idG);
      axios
        .get(
          "http://localhost:8080/security/api/v2/guest/groups/get/" + this.idG
        )
        .then((response) => {
          this.getDataG = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getAllMemberinGr() {
      axios
        .get(
          "http://localhost:8080/security/api/v2/guest/groups/allmember/get/" +
            this.idG
        )
        .then((response) => {
          this.getAllMember = response.data;

          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getAllUserIdnoGroup() {
      axios
        .get("http://localhost:8080/security/api/v2/guest/groups/getuserid")
        .then((response) => {
          this.getAllUserId = response.data;
          // console.log("data allUnoGr: " + response.data);
        })
        .catch((e) => {
          console.log("Lỗi catch: " + e);
        });
    },

    addMemberinGroup() {
      console.log("idGroup: " + this.idG);
      console.log("idUser: " + this.formDataAddUtoG.userId);
      axios
        .post(
          "http://localhost:8080/security/api/v2/guest/groups/addmember",
          this.formDataAddUtoG
        )
        .then((response) => {
          this.getUnewtoGr = response.data;
          console.log(this.getUnewtoGr);
          this.$toasted.success("Thêm thành công", {
            duration: 2000,
          });
          this.getAllMemberinGr();
          this.getAllUserIdnoGroup();
        })
        .catch((e) => {
          console.log("Lỗi catch: " + e);
          this.$toasted.error("Thêm thất bại", {
            duration: 2000,
          });
        });
    },

    RemoveFromGroup(id) {
      axios
        .delete(
          "http://localhost:8080/security/api/v2/guest/groups/removemember/" +
            id
        )
        .then((response) => {
          if (response.status == 200) {
            this.$toasted.success("Xoá thành công", {
              duration: 2000,
            });
            this.getAllMemberinGr();
            this.getAllUserIdnoGroup();
          } else {
            console.log("res-Xoá thất bại: " + response.status);
            this.$toasted.error("Xoá thất bại, id không tồn tại", {
              duration: 2000,
            });
          }
        })
        .catch((e) => {
          console.log("Lỗi catch: " + e);
          this.$toasted.error("Xoá thất bại", {
            duration: 2000,
          });
        });
    },
  },
};
</script>

<style>
.Title-table {
  text-align: center;
}
</style>
