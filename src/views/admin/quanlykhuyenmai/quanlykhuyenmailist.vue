<template>
  <div>
    <div class="col-12 col-title">
      <div class="col-md-6 float-left margin-left">
        <p class="Text-tile">Danh sách khuyến mại</p>
        <p class="Text-tile-2">Trang chủ ● Khuyến mại</p>
      </div>
      <div class="col-md-6 float-right">
        <button
          type="button"
          class="btn btn-primary float-right btn-add"
          @click="create()"
        >
          <i class="cil-plus"></i>
          Thêm mới
        </button>
      </div>
    </div>
    <nav class="col-12 navbar justify-content-between">
    </nav>
    
      <CCardBody>
        <CNav justified variant="tabs">
          <CNavItem active><p @click="getAllSale()" style="margin-bottom: 0">Tất cả</p></CNavItem>
          <CNavItem><p @click="getSaleNow()" style="margin-bottom: 0">Đang diễn ra</p></CNavItem>
          <CNavItem><p @click="getAboutSale()" style="margin-bottom: 0">Sắp diễn ra</p></CNavItem>
          <CNavItem><p @click="getSaleEnd()" style="margin-bottom: 0">Đã kết thúc</p></CNavItem>
        </CNav>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col" class="Title-table">Tên sale</th>
              <th scope="col" class="Title-table td-action" style="text-align:center" >
                Thời gian bắt đầu sale
              </th>
              <th scope="col" class="Title-table td-action" >
                Thời gian kết thúc
              </th>
              <th scope="col" class="Title-table td-action" >
                Trạng thái
              </th>
              <th class="Title-table"></th>
            </tr>
          </thead>
          <tbody>
            <tr  v-for="item in pageOfItems" :key="item.id">
              <th>{{ item.id }}</th>
              <th scope="row" class="td-table" @click="detailSale(item.id)">{{ item.name }}</th>
              <td scope="row" class="td-table" style="text-align:center">{{ getDateString(item.startTime) }}</td>
              <td scope="row" class="td-table" style="text-align:center">{{ getDateString(item.endTime) }}</td>
              <td scope="row" class="td-table td-center" style="text-align:center">
                  <span class="badge rounded-pill bg-primary" v-if="item.status == 'đang sale'">{{ item.status }}</span>
                  <span class="badge rounded-pill bg-danger" v-else-if="item.status == 'Đã dừng'">{{ item.status }}</span>
                  <span class="badge rounded-pill bg-success" v-else>{{ item.status }}</span>
              </td>
              <td>
              <CButton v-if="item.status != 'Đã dừng'" @click="setItemId(item.id),darkModal = true">
               <!-- <i class="cil-dash" style="color: red; text-align: center;"></i> -->
               <b-icon icon="dash-circle" style="color: red; text-align: center;"></b-icon>
              </CButton>
              </td>
            </tr>
          </tbody>
        </table>
         <div class="pb-0 pt-3 text-center">
      <jw-pagination
        :labels="customLabels"
        :maxPages="15"
        :items="getData"
        @changePage="onChangePage"
      ></jw-pagination>
    </div>
      </CCardBody>
        <CModal
          :show.sync="darkModal"
          :no-close-on-backdrop="true"
          :centered="true"
          title="Modal title 2"
          size="lg"
          color="danger">
          Bạn có chắc muốn dừng khuyến mại này ?
          <template #header>
            <h6 class="modal-title">Xác nhận</h6>
            <CButtonClose @click="darkModal = false" class="text-white"/>
          </template>
          <template #footer>
            <CButton @click="darkModal = false" color="secondary">Hủy</CButton>
            <CButton @click="darkModal = false, stopSale()" color="danger">Dừng chương trình</CButton>
          </template>
        </CModal>
  </div>
</template>

<script>
import axios from "axios";
const customLabels = {
    first: '<<',
    last: '>>',
    previous: '<',
    next: '>'
};

export default {
  name: "QuanLySanPhamList",
  data() {
    return {
      darkModal: false,
      customLabels,
      pageOfItems: [],
      getData: "",
      formData: {
        name: "",
        startTime: "",
        endTime: "",
        status: "",
      },
      searchString: "",
      ItemId: "",
    };
  },
  created() {
    this.getAllSale();  

  },
  methods: {
    stopSale(){
      axios
        .put(
            this.$store.state.MainLink + "admin/sale/stopSale?id=" + this.ItemId, {},
            {
              headers: {
                Authorization: this.$store.state.userToken,
              },
            })
          .then(() => {
            this.getAllSale();
          })
          .catch((e) => {
            console.log(e);
          });
    },
    setItemId(id){
      this.ItemId = id
    },
     onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
     create() {
      this.$router.push("/sale/quanlysaleCreate");
    },
    detailSale(id) {
      this.$router.push({
        name: "Sale detail",
        params: { item: id },
      });
    },
    getAllSale() {
      axios
        .get( this.$store.state.MainLink + "admin/sale/get",
         {
            headers: {
              Authorization: this.$store.state.userToken,
            },
          })
        .then((response) => {
          this.getData = response.data.object;
          console.log(response)
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getSaleNow() {
      axios
        .get(this.$store.state.MainLink + "admin/sale/getSaleNow", {
          headers: {
            Authorization: this.$store.state.userToken,
          },
        })
        .then((response) => {
          this.getData = response.data.object;
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getAboutSale() {
      axios
        .get(this.$store.state.MainLink + "admin/sale/getSaleAboutStart", {
          headers: {
            Authorization: this.$store.state.userToken,
          },
        })
        .then((response) => {
          this.getData = response.data.object;
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getSaleEnd() {
      axios
        .get(this.$store.state.MainLink + "admin/sale/getSellEnd", {
          headers: {
            Authorization: this.$store.state.userToken,
          },
        })
        .then((response) => {
          this.getData = response.data.object;
          console.log(response);
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
  },

};
</script>

<style>
.Title-table {
  text-align: center;
}
</style>
