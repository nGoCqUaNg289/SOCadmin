 <template>
  <div>
    <div class="col-12 col-title">
      <div class="col-md-6 float-left margin-left">
        <p class="Text-tile">Danh sách tài khoản</p>
        <p class="Text-tile-2">Trang chủ ● Tài khoản</p>
      </div>
      <div class="col-md-6 float-right">
        <button
          type="button"
          class="btn btn-primary float-right btn-add"
          @click="CreateNewAccount()"
        >
          <i class="cil-plus"></i>
          Tạo mới
        </button>
        <!-- <CButton
          type="submit"
          size="sm"
          color="primary"
          class="btn btn-custom-size"
          @click="CreateNewAccount()"
        >
          <i class="cil-plus"></i>
          Thêm mới
        </CButton> -->
      </div>
    </div>
    <nav class="col-12 navbar justify-content-between">
      <a class="navbar-brand"></a>
      <form class="form-inline">
        <input
          @change="searchProduct()"
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          style="box-shadow: none"
          v-model="searchString"
        />
      </form>
    </nav>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <!-- <th scope="col" class="Title-table">Tên sale</th> -->
          <th scope="col" class="Title-table td-action" style="text-align:center" >
            Tài khoản
          </th>
          <!-- <th scope="col" class="Title-table td-action" >
            password
          </th> -->
          <th scope="col" class="Title-table td-action" >
           Tên người dùng
          </th>
          <th scope="col" class="Title-table td-action" >
           Email
          </th>
          <th scope="col" class="Title-table td-action" >
           Điện thoại
          </th>
          <th scope="col" class="Title-table td-action" >
           Địa chỉ
          </th>
          <th scope="col" class="Title-table td-action" colspan="2">
           Tình trạng tài khoản
          </th>
          <!-- <th class="Title-table"></th> -->
          
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in pageOfItems" :key="item.id">
          <th @click="detailAccount(item.id)">{{ item.id }}</th>
          <td scope="row" class="td-table" @click="detailAccount(item.id)">{{ item.username }}</td>
          <!-- <td scope="row" class="td-table">{{ item.password }}</td> -->
          <td scope="row" class="td-table" @click="detailAccount(item.id)">{{ item.fullname }}</td>
          <td scope="row" class="td-table" @click="detailAccount(item.id)">{{ item.email }}</td>
          <td scope="row" class="td-table" @click="detailAccount(item.id)">{{ item.phone }}</td>
          <td scope="row" class="td-table" @click="detailAccount(item.id)">{{ item.address }}</td>
          <td scope="row" class="td-table td-center" style="text-align:center">
                  <span class="badge rounded-pill bg-success" v-if="item.userStatus = true">{{ item.userStatus }}</span>
                  <span class="badge rounded-pill bg-danger" v-else>{{ item.userStatus }}</span>
          </td>
          <td scope="row" class="td-table td-center" style="text-align:center">
            <CButton  @click="darkModal = true, setId(item.id), setTitle()" class="mr-1" v-if="item.userStatus == true && item.roles[0] != 'Director'">
              <i class="cil-trash" style="color: red; text-align: center;"></i>
              </CButton>
            <CButton  @click="darkModal = true, setId(item.id), setTitle1()" class="mr-1" v-else-if="item.roles[0] != 'Director'">
               <i class="cil-reload"></i>
              </CButton>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pb-0 pt-3" style="text-align: center">
      <jw-pagination
        :labels="customLabels"
        :maxPages="15"
        :items="getData"
        @changePage="onChangePage"
      ></jw-pagination>
    </div>
    <CModal
      :show.sync="darkModal"
      :no-close-on-backdrop="true"
      :centered="true"
      title="Modal title 2"
      size="lg"
      color="danger"
    >
      Bạn có chắc muốn {{setTitleModal}} tài khoản này ?
      <template #header>
        <h6 class="modal-title">Xác nhận</h6>
        <CButtonClose @click="darkModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="darkModal = false" color="secondary">Hủy</CButton>
        <CButton @click="darkModal = false, deleteAccount()" color="danger" v-if="setTitleModal == 'xóa'">Xóa tài khoản</CButton>
      </template>
    </CModal>


    <CModal
      :show.sync="myModalFail"
      :no-close-on-backdrop="true"
      :centered="true"
      title="Modal title 2"
      size="sm"
      color="danger">

      <template #header>
        <h6 class="modal-title">Lỗi phát sinh</h6>
        <CButtonClose @click="myModalFail = false" class="text-white"/>
      </template>
      <div class="text-center">
      <sweetalert-icon icon="error" />
            {{errorMessage}}
      </div>
      
      <template #footer class="text-center; display: none" style="display: none">
        <CButton class="text-center" @click="myModalFail = false" color="danger">Xác nhận</CButton>
      </template>
    </CModal>

    <CModal
      :show.sync="myModalSuccess"
      :no-close-on-backdrop="true"
      :centered="true"
      title="Modal title 2"
      size="sm"
      color="success">

      <template #header>
        <h6 class="modal-title">Thành công</h6>
        <CButtonClose @click="myModalSuccess = false" class="text-white"/>
      </template>
      <div class="text-center">
      <sweetalert-icon icon="success" />
            {{errorMessage}}
      </div>
      
      <template #footer class="text-center; display: none" style="display: none">
        <CButton class="text-center" @click="myModalSuccess = false" color="success">Xác nhận</CButton>
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
      customLabels,
      darkModal: false,
      myModalFail: false,
      myModalSuccess: false,
      errorMessage: "",
      pageOfItems: [],
      getData: "",
      formData: {
        username: "",
        password: "",
        fullname: "",
        email: "",
        phone: "",
        address: "",
        userStatus: "",
      },
      searchString: "",
      setIdAccount: "",
      setTitleModal: ""
    };
  },
  created() {
    this.getAllAccount();

  },
  methods: {
    setId(id){
      this.setIdAccount = id
    },
    setTitle(){
      this.setTitleModal = "xóa"
    },
    setTitle1(){
      this.setTitleModal = "khôi phục"
    },
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
    searchProduct() {
      axios
        .get(
          this.$store.state.MainLink + "admin/products?find="
        )
        .then((response) => {
          this.getData = response.data.object;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    SaleEnd() {
      this.$router.push("/sale/quanlysaleEnd");
    },
    SaleNow() {
      this.$router.push("/sale/quanlysaleEnd");
    },
    UpdateProduct() {
      this.$router.push("/admin/quanlysanphamcreatedetail");
    },
    detailAccount(id) {
      this.$router.push({
        name: "Thông tin chi tiết tài khoản",
        params: { item: id },
      });
    },
    deleteAccount() {
      console.log(this.$store.state.userToken);
      axios
        .put(
          this.$store.state.MainLink + "admin/account/lockAccount?id=" + this.setIdAccount,{},
          {
            headers: {
              Authorization: this.$store.state.userToken,
            },
          }
        )
        .then(() => {
          this.errorMessage = "Vô hiệu hóa tài khoản thành công!"
          this.myModalSuccess = true;
          this.getAllAccount()
        })
        .catch((e) => {
          console.log(e.response.data);
           this.errorMessage = "Vô hiệu hóa tài khoản thất bại!"
          this.myModalFail = true;
        });
    },
  
    CreateNewAccount(){
      this.$router.push("/account/quanlyaccountcreate")
    },
    getAllAccount() {
      axios
        .get( "http://150.95.105.29:8800/api/customer/account/findAll?active=true",
         {
            headers: {
              Authorization: this.$store.state.userToken,
            },
          })
        .then((response) => {
          this.getData = response.data.object;
          console.log(response.data.object)
        })
        .catch((e) => {
          console.log(e);
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
