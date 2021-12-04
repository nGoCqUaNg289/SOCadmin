 <template>
  <div>
    <div class="col-12 col-title">
      <div class="col-md-6 float-left margin-left">
        <p class="Text-tile">Danh sách account</p>
        <p class="Text-tile-2">Trang chủ ● Sản phẩm</p>
      </div>
      <div class="col-md-6 float-right">
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
    <table class="table">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <!-- <th scope="col" class="Title-table">Tên sale</th> -->
          <th scope="col" class="Title-table td-action" style="text-align:center" >
            user name
          </th>
          <th scope="col" class="Title-table td-action" >
            password
          </th>
          <th scope="col" class="Title-table td-action" >
           fullname
          </th>
          <th scope="col" class="Title-table td-action" >
           email
          </th>
          <th scope="col" class="Title-table td-action" >
           phone
          </th>
          <th scope="col" class="Title-table td-action" >
           address
          </th>
          <th scope="col" class="Title-table td-action" >
           userStatus
          </th>
          <!-- <th class="Title-table"></th> -->
          
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in pageOfItems" :key="item.id">
          <th>{{ item.id }}</th>
          <td scope="row" class="td-table">{{ item.username }}</td>
          <td scope="row" class="td-table">{{ item.password }}</td>
          <td scope="row" class="td-table">{{ item.fullname }}</td>
          <td scope="row" class="td-table">{{ item.email }}</td>
          <td scope="row" class="td-table">{{ item.phone }}</td>
          <td scope="row" class="td-table">{{ item.address }}</td>
          <td scope="row" class="td-table">{{ item.userStatus }}</td>
          <td class="td-table td-action">
            <button
              type="button"
              class="btn btn-primary btn-size"
              @click="DetailProduct(item.id)"
            >
              <i class="cil-folder-open"></i>
            </button>
            <button
              type="button"
              class="btn btn-danger btn-size"
              @click="deleteAccount(item)"
            >
              <i class="cil-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="card-body"></div>
    <div class="card-footer pb-0 pt-3" style="text-align: center">
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
