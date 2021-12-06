 <template>
  <div>
    <div class="col-12 col-title">
      <div class="col-md-6 float-left margin-left">
        <p class="Text-tile">Danh sách account</p>
        <p class="Text-tile-2">Trang chủ ● Sản phẩm</p>
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
          <th scope="col" class="Title-table td-action" >
           Tình trạng tài khoản
          </th>
          <!-- <th class="Title-table"></th> -->
          
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in pageOfItems" :key="item.id">
          <th>{{ item.id }}</th>
          <td scope="row" class="td-table">{{ item.username }}</td>
          <!-- <td scope="row" class="td-table">{{ item.password }}</td> -->
          <td scope="row" class="td-table">{{ item.fullname }}</td>
          <td scope="row" class="td-table">{{ item.email }}</td>
          <td scope="row" class="td-table">{{ item.phone }}</td>
          <td scope="row" class="td-table">{{ item.address }}</td>
          <td scope="row" class="td-table td-center" style="text-align:center">
                  <span class="badge rounded-pill bg-success" v-if="item.status = true">{{ item.status }}</span>
                  <span class="badge rounded-pill bg-danger" v-else>{{ item.status }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pb-0 pt-3" style="text-align: center">
      <jw-pagination
        :maxPages="15"
        :items="getData"
        @changePage="onChangePage"
      ></jw-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "QuanLySanPhamList",
  data() {
    return {
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
    };
  },
  created() {
    this.getAllAccount();

  },
  methods: {
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
    DetailSale(id) {
      this.$router.push({
        name: "Thông tin chi tiết sản phẩm",
        params: { item: id },
      });
    },
    deleteAccount(item) {
      console.log(this.$store.state.tokenUser);
      axios
        .put(
          this.$store.state.MainLink + "customer/account/update/" + item.id,
          {
            headers: {
              Authorization: this.$store.state.tokenUser,
            },
          }
        )

        .then((response) => {
          if (response.data.object) {
            alert("Delete thành công.");
          } else {
            alert("Delete thất bại.");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  
    CreateNewAccount(){
      this.$router.push("/account/quanlyaccountcreate")
    },
    getAllAccount() {
      axios
        .get( this.$store.state.MainLink + "customer/account/findAll",
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
  },
};
</script>

<style>
.Title-table {
  text-align: center;
}
</style>
