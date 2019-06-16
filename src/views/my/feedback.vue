<template>
    <div class='feedback'>
        <group title="" label-width="7em" class='bottom10'>
            <popup-picker title="请选择反馈类型" :data="list1" v-model="value1"
                @on-change="onChange" 
                >
            </popup-picker>
         </group>
        <group title="" label-width="7em" class='bottom10'>
            <x-textarea :rows='6' v-model='advice' :max="500" placeholder="对我们网站、商品、服务，你还有什么建议吗？你还希望在严选上买到什么？请告诉我们...">
            </x-textarea>
        </group>
        <group title="手机号码" label-width="8em" class='bottom10'>
            <x-input title="" 
            ref='mobild'
            required
            mask="999 9999 9999" 
            v-model="phone" 
            placeholder='方便我们与您联系'
            :max="13" is-type="china-mobile"></x-input>
        </group>
        <x-button type="warn" class='submit' @click.native='submit'>提交</x-button>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import {PopupPicker, Group,XTextarea,XInput,XButton   } from 'vux';
export default {
    name: 'feedback',
    data () {
        return {
            list1: [['商品相关', '物流状况', '客户服务', '优惠活动', '功能异常', '产品建议', '其他']],
            value1:[],
            advice:'',
            phone:'',
        }
    },
    computed: {
        ...mapState([

        ])
    },
    components: {
        PopupPicker,
        Group,
        XTextarea,
        XInput,
        XButton ,
    },
    methods: {
        onChange (val) {
            // console.log('val change', val)
        },
        submit(){
            if(!this.phone || !this.advice || this.value1.length===0){
                !this.phone?this.$vux.toast.show({
                    text: '请输入手机号码',
                    type:'warn'
                }):'';
                !this.advice?this.$vux.toast.show({
                    text: '请输入反馈内容',
                    type:'warn'
                }):'';
                this.value1.length===0?this.$vux.toast.show({
                    text: '请输入反馈类型',
                    type:'warn'
                }):'';
            }else{
                // console.log('this.$refs.mobild.valid',this.$refs.mobild.valid);
                if(!this.$refs.mobild.valid){
                    this.$vux.toast.show({
                        text: '请输入正确的手机号码',
                        type:'warn'
                    })
                }else{
                    //提交
                }
            }
        }
    },
    mounted(){

    },
}
</script>

<style lang='scss'>
.feedback{
    height:100%;
    background:#f4f4f4;
    // padding-top:10px;
    .weui-cells{
        &:before{
            border:none!important;
        }
    }
    .vux-no-group-title{
        margin-top:0!important;
    }
    .vux-cell-box{
        height: 50px!important;
        line-height: 36px!important;
    }
    .bottom10{
        margin-bottom:10px;
    }
    .submit{
        position: fixed;
        bottom: 0px;
        border-radius: 0;
        background: #b4282d;
    }
    .weui-toast{
        width:110px!important;
    }
}
</style>
