<template>

  <div :class="{'show':show}" >
    <div class="dept" @click="goto">
      <svg-icon :icon-class="deptLevel == 2 ? 'school': deptLevel == 1 ? 'dept' : 'tree'" />
      {{this.deptName}}
    </div>
    <!-- 添加或修改产品类型对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="0px">
        <!--机构数据 -->
        <el-form-item label="">
          <treeselect
          v-model="form.deptId"
          :options="deptOptions"
          :show-count="true"
          :searchable="true"
          placeholder="请选择门店"
          @select="handleDeptSelectChange"
          :clearable="false"/>
        </el-form-item>

      </el-form>
     <!-- <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div> -->
    </el-dialog>
  </div>


</template>

<script>
import store from '@/store'
import { mapGetters, mapMutations } from 'vuex'
import { checkPermi, checkRole } from "@/utils/permission";
import { getDept,listDeptExcludeChild } from "@/api/system/dept";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: 'DeptSelect',
  data() {
    return {
      show: true,
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      form: {deptId : undefined},
      // 表单校验
      rules: {
        deptId: [
          { required: true, message: "门店不能为空", trigger: "blur" }
        ],
      }
    }
  },
  components: { Treeselect },
  computed: {
    ...mapGetters([
      'deptId',
      'deptName',
      'deptLevel',
      'deptOptions'
    ]),
  },
  watch: {
    deptId(val){
      this.form.deptId = val;
    },
  },
  mounted() {

  },
  created() {
  },
  methods: {
    ...mapMutations({
      setDept: 'SET_DEPT',
    }),
    goto() {
      if(!checkRole(['admin','common','agent'])) {
        console.log("普通用户")
        return;
      }
      getDept(this.deptId).then(response => {
        this.reset();
        this.form = response.data;
        this.open = true;
        this.title = "";
      });
    },

    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置

    reset() {
      this.form = {
        deptId: undefined,
        parentId: undefined,
        deptName: undefined,
        orderNum: undefined,
        leader: undefined,
        phone: undefined,
        email: undefined,
        level: undefined,
        status: "0"
      };
      this.resetForm("form");
    },
    handleDeptSelectChange(item, indext) {
      //console.log(JSON.stringify(item))
      this.open = false;
      this.setDept({'deptId': item.id, 'deptName': item.label, 'level': item.level});
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.open = false;
          //var deptId = this.form.deptId;
          //this.setDept({'deptId': deptId, 'deptName': deptName, 'level': level});
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
 .dept:hover{
    color: royalblue;
  }
</style>
