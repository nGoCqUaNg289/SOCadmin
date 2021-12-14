<template>
  <div>
    <div class="col-12 col-title">
      <div class="col-md-6 float-left margin-left">
        <p class="Text-tile">Danh sách Blog</p>
        <p class="Text-tile-2">Trang chủ ● Blog</p>
      </div>
      <div class="col-md-6 float-right" style="margin-top: 10px;">
        <!-- <button
          type="button"
          class="btn btn-primary float-right btn-add"
          @click="CreateNewProduct()"
        >
          <i class="cil-plus"></i>
          Thêm mới
        </button> -->
        <CButton type="submit" 
                    size="sm" color="primary" 
                    class="btn btn-custom-size"
                    @click="CreateNewProduct()"
                    style="float: right"
                    >
                    <i class="cil-plus"></i>
                    Tạo tài khoản
            </CButton>
      </div>
    </div>
    <table class="table table-hover">
      <thead>
        <tr class="text-center">
          <th scope="col">#</th>
          <th scope="col">Tên Blog</th>
          <th scope="col">Thời gian tạo</th>
          <th scope="col">Trạng thái</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in pageOfItems" :key="index">
          <th scope="row">{{ index+ 1 }}</th>
          <td @click="detailBlog(item.id)">{{ item.title }}</td>
          <td @click="detailBlog(item.id)">{{ item.timeCreated }}</td>
          <td scope="row" class="td-table td-center" style="text-align:center">
                  <span class="badge rounded-pill bg-success" v-if="item.status == true">{{ item.status }}</span>
                  <span class="badge rounded-pill bg-danger" v-else-if="item.status == false">{{ item.status }}</span>
          </td>
          <td>
            <CButton  @click="darkModal = true" class="mr-1" v-if="item.status == true">
              <i class="cil-trash" style="color: red; text-align: center;" @click="setId(item.id,1)"></i>
            </CButton>
            <CButton  @click="darkModal = true" class="mr-1" v-else-if="item.status == false">
              <i class="cil-reload" @click="setId(item.id,2)"></i>
            </CButton>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <CAlert :show.sync="success" color="success">Success Alert</CAlert>
    <CAlert :show.sync="danger" color="danger">Danger Alert</CAlert> -->
    <div class="pb-0 pt-3 text-center">
      <jw-pagination
        :maxPages="15"
        :items="getData"
        :labels="customLabels"
        @changePage="onChangePage"
      ></jw-pagination>
    </div>
    <CModal
      :show.sync="darkModal"
      :no-close-on-backdrop="true"
      :centered="true"
      title="Xác nhận"
      size="lg"
    >
      Bạn có chắc muốn {{setTilte}} bài viết này ?
      <template #header>
        <h6 class="modal-title">Xác nhận</h6>
        <CButtonClose @click="darkModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="darkModal = false" color="secondary">Hủy</CButton>
        <CButton @click="darkModal = false, deleteBlog()" color="danger" v-if="setTilte == 'xóa'">Xóa bài viết</CButton>
        <CButton @click="darkModal = false, deleteBlog()" color="success" v-else>Khôi phục</CButton>
      </template>
    </CModal>
    <CModal
      title="Modal title"
      :show.sync="myModal"
      size="xl"
    >
     {{errorBlog}}
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
      pageOfItems: [],
      customLabels,
      setTilte: "",
      myModal: false,
      darkModal: false,
      errorBlog: "",
      getData: "",
      formData: {
        name: "",
        price: "",
        status: "",
        orderDetails: "",
        blogs: "",
        productCategories: "",
        sales: "",
        productColors: [],
        cartDetails: "",
        productDetails: [],
        setIdBlog: "",
      },
    };
  },
  created() {
    this.getAlBlog();
  },
  methods: {
    setId(id,index){
      console.log(index)
      if(index == 1){
        this.setTilte = "xóa"
      }else{
        this.setTilte = "khôi phục"
      }
      this.setIdBlog = id
    },
    CreateNewProduct() {
      this.$router.push({
        name: "Thêm mới Blog",
      });
    },
    detailBlog(id) {
      console.log(id);
      this.$router.push({
        name: "Thông tin chi tiết Blog",
        params: { item: id },
      });
    },
     onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
    getAlBlog() {
      axios
        .get(this.$store.state.MainLink + "admin/blog", {
          headers: {
            Authorization: this.$store.state.userToken,
          },
        })
        .then((response) => {
          this.getData = response.data.object;
          // console.log(this.getData)
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteBlog(){
      console.log(this.setIdBlog)
      axios
        .delete(this.$store.state.MainLink + "admin/blog/delete/" + this.setIdBlog, {
          headers: {
            Authorization: this.$store.state.userToken,
          },
        })
        .then(() => {
          this.getAlBlog()
          this.myModal = true
          this.errorBlog = "Đã xóa blog"
        })
        .catch((e) => {
          this.myModal = true
          this.errorBlog = "Lỗi ! Vui lòng thử lại."
          console.log(e);
        });
    }
  },
};
</script>

<style>
.Title-table {
  text-align: center;
}
</style>
