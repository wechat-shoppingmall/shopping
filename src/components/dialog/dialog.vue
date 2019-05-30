<template>
  <div class='yydialog'>
    <el-dialog
        ref='dialog'
        :title="dialogConfig.title"
        :visible.sync="dialogConfig.visible"
        width="700px"
        append-to-body
        @opened='opened'
        >
        <slot name='bodyArea' ></slot>
        
    </el-dialog>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
export default {
  name: '',
  data () {
    return {
        // centerDialogVisible: false
    }
  },
  props:['dialogConfig',],
  computed: {
     ...mapState([

    ])
  },
  methods: {
    opened(){
      this.$nextTick(()=>{
        // console.log('this.$refs',this.$refs);
        if(this.$refs['dialog'].$children[1] && this.$refs['dialog'].$children[1].clearValidate){
          this.$refs['dialog'].$children[1].clearValidate();
        }
      })
      
    }
  },
  mounted(){
  },
}
</script>

<style lang='scss' >
  .yydialog .el-form-item__label{
    font-size:16px!important;
    font-family:SourceHanSansCN-Medium!important;
    font-weight:500!important;
    color:rgba(53,60,69,1)!important;
  }
  .tips{
    font-size:12px;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color:rgba(208,47,47,1);
    line-height:20px;
  }
  .btnArea{
    text-align: center;
  }
  .el-form--label-top .el-form-item__label{
      line-height: 30px!important;
      padding: 0px!important;
  }
  .itemBox .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:200px!important;
  }
  .itemBox6 .el-form-item__content{
      display: inline-block!important;
      margin-left: 20px;
  }
  .itemBox3>.el-form-item input{
    width:620px!important;
  }
  .itemBox5 .el-input--small .el-input__inner{
    padding-right: 0!important;
    width:200px!important;
    border-radius:0!important;
  }
  .input200 input{
    width:200px!important;
  }
  .innerDialog .el-dialog__body{
      padding: 0!important;
      .JMap .container{
          height: 400px!important;
      }
  }
  .div2 .el-row{
    padding: 10px;
  }
</style>
