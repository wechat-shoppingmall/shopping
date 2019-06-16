<template>
    <div class='addressT'>
        <div v-for='(x,i) in list ' :key='i' class='abox'>
            <div class="area">
                <div class="left">{{x.name}}
                    <div class='defaultAddredd' v-if='x.default'>默认</div>
                </div>
                <div class="center">
                    <div class="ctop">{{x.phone}}</div>
                    <div class="cdown">{{x.address}}</div>
                </div>
                <div class="right">
                    <i class="iconfont icon-delete" @click='deleteItem(i)'></i>
                </div>
            </div>
        </div>
        <x-button type="warn" class='btn' @click.native='addAddress'>添加</x-button>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import { XButton, } from 'vux';
export default {
  name: 'addressT',
  data () {
    return {
        list:[
            {
                name:'刘德华',
                phone:'18817251180',
                address:'北京市东城区紫荆城中南海',
                default:true,
            },
            {
                name:'刘德华',
                phone:'18817251180',
                address:'北京市东城区紫荆城中南海',
                default:false,
            },
        ]
    }
  },
  computed: {
     ...mapState([

    ])
  },
  components: {
      XButton
  },
  methods: {
      addAddress(){
          this.$router.push({path:'/addAddress'});
      },
      deleteItem(i){
          this.$vux.confirm.show({
            // 组件除show外的属性
            content:'确定要删除地址？',
            onCancel : () => {
                console.log('取消') //当前 vm
            },
            onConfirm : () => {
                this.list.splice(i,1);
            }
        })
      }
  },
  mounted(){

  },
}
</script>

<style lang='scss'>
.addressT{
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
    .btn{
        position: fixed;
        bottom: 0;
        border-radius: 0;
        background: #b4282d;
    }
    .defaultAddredd{
        width: 31px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        font-size: 12px;
        color: #b4282d;
        border: 1px solid #b4282d;
        margin-top: 5px;

    }
}
</style>
