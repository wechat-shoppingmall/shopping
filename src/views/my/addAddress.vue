<template>
    <div class='addAddress'>
        <div class='abox'>
            <group title="">
                <x-input required placeholder="姓名"></x-input>
                <x-input required placeholder="手机号码" keyboard="number" is-type="china-mobile"></x-input>
                <x-address v-model="area" :list="addressData" 
                    placeholder="请选择地址" 
                    title=''
                    inline-desc=""
                    :show.sync="showAddress">
                </x-address>
                <x-input required placeholder="详细地址,如街道,楼盘号等"></x-input>
            </group>
            <div class="check"><check-icon :value.sync="isDefault">设为默认地址</check-icon></div>
        </div>
        <div class="btns">
            <x-button  class='btn fl bl' @click.native='$router.go(-1)'>取消</x-button>
            <x-button type="warn" class='btn fl br' @click.native='addAddress'>保存</x-button>
        </div>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import { XButton, XAddress,XInput,Group,CheckIcon,ChinaAddressV4Data   } from 'vux';
export default {
  name: 'addAddress',
  data () {
    return {
        isDefault:true,
        addressData: ChinaAddressV4Data,
        showAddress: false,
        area:[],
    }
  },
  computed: {
     ...mapState([

    ])
  },
  components: {
      XButton,
      XAddress,
      XInput,
      Group,
      CheckIcon ,
  },
  methods: {
      addAddress(){

      },
      
  },
  mounted(){

  },
}
</script>

<style lang='scss'>
.addAddress{
    height:100%;
    background-color: #f4f4f4;
    .area{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 10px;
        background: #fff;
    }
    .abox{
        &:not(:last-child){
            border-bottom: 1px solid #dcd9d9;
        }
    }
    .btns{
        position: fixed;
        bottom: 0;
        width:100%;
        display: flex;
        align-items: baseline;
        .btn{
            border-radius: 0;
            width:50%;
        }
        button{
            float:left;
        }
        .bl{
            background-color: #e6af58;
        }
        .br{
            background: #b4282d;
        }
    }
    .weui-cell{
        height:48px!important;
    }
    .weui-cells{
        margin-top:0!important;
    }
    .vux-popup-picker-select{
        text-align: left!important;
    }
    .check{
        height: 48px;
        line-height: 48px;
        text-align: center;
        background: #fafafa;
    }
    .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before {
        color: #b4282d!important;
    }
}
</style>
