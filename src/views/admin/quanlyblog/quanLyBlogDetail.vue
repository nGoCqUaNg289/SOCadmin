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
          v-if="checkUpdate == 0"
        >
          <i class="cil-arrow-left"></i>
          Trở lại
        </CButton>
        <CButton
          type="reset"
          size="sm"
          color="danger"
          class="btn btn-custom-size"
          @click="cancelUpdate()"
          v-else-if="checkUpdate == 1"
        >
          <!-- <i class="cil-x"></i> -->
          Huỷ
        </CButton>
        <CButton
          type="submit"
          size="sm"
          color="primary"
          class="btn btn-custom-size"
          @click="updateBlog()"
          v-if="checkUpdate == 0"
        >
          <!-- <i class="cil-plus"></i> -->
          Cập nhật
        </CButton>
        <CButton
          type="submit"
          size="sm"
          color="primary"
          class="btn btn-custom-size"
          @click="updateProduct()"
          v-else-if="checkUpdate == 1"
        >
          <i class="cil-sync"></i>
          Cập nhật
        </CButton>
      </CCol>
      <br />
      <br />

      <CCol md="12" lg="12" v-if="checkUpdate == 0">
        <CCard>
          <CCardHeader>
            <CIcon name="cil-justify-center" />
            <strong>Chi tiết Blog</strong>
          </CCardHeader>
          <CCardBody>
              <CListGroup>
                <div v-for="(item, index) in getBlogDetail" :key="index" class="text-center">
                <h3 v-if="item.type == 'content'" style="text-align: justify">{{item.content}}</h3>
                <p v-else-if="item.type == 'text'" style="text-align: justify">{{item.content}}</p>
                <img v-else-if="item.type == 'photo'" :src="item.content"  width="auto" height="300" style="text-align: center;">
                </div>
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol md="12" lg="12" v-else-if="checkUpdate == 1">
        <CCard>
          <CCardHeader>
            <CIcon name="cil-justify-center" />
            <strong>Chi tiết Blog</strong>
          </CCardHeader>
          <CCardBody>
               <table class="table">
                  <thead>
                      <th>
                        <i class="cil-plus" @click="createDetailBlog()"></i>
                      </th>
                      <th style="text-align: center;">Thể loại</th>
                      <th style="text-align: center;">Nội dung</th>
                      
                      <th></th>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in getBlogDetail" :key="index">
                      <th>
                          {{index + 1}}
                      </th>
                      <td>
                        <select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="item.type" style="border: none;border-bottom: 1px dashed;box-shadow: none;">
                            <option disabled>Chọn thể loại</option>
                            <option value="text">Nội dung</option>
                            <option value="photo">Ảnh</option>
                            <option value="content">Tiêu đề</option>
                        </select>
                      </td>
                      <td>
                          <textarea rows="3" type="text" v-model="item.content" style="width: 100%;border: none;border-bottom: 1px dashed;"/>
                      </td>
                      <td>
                          <i class="cil-trash" style="color: red; text-align: center;" @click="deleteRow(index)"></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "QuanLyBlogDetail",
  props: {
    item: Number
  },
  data() {
    return {
      getData: "",
      getBlogDetail: "",
    //   selected: [],
    //   show: true,
    //   horizontal: { label: "col-3", input: "col-9" },
    //   selectedOption: "some value",
      checkUpdate: 0,
      formCollapsed: true,
      productProperties: []
    };
  },
  created() {
    this.getDetailBlog();
  },
  methods: {
      getDetailBlog(){
          console.log(this.item)
        axios
        .get(this.$store.state.MainLink + "admin/blog/" + this.item,
        {
          headers: {
              Authorization: this.$store.state.userToken,
          }
        })
        .then((response) => {
          this.getData = response.data.object;
          this.getBlogDetail = response.data.object.blogDetails;
          // console.log(this.getBlogDetail);
          console.log(this.getData)
        })
        .catch((e) => {
          console.log(e);
        });
      },
      updateBlog(){
          this.checkUpdate = 1
      }, 
      cancelUpdate(){
          this.checkUpdate = 0
      },
      backList(){
          this.$router.push("/blog/quanlyblog")
      }
  },
};
</script>

<style scoped>
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
