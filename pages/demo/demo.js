import {API_CREATE}from'../../config/api.js'
const app = getApp()

Page({
  data: {
    entity:{
      title:'',
      content:'',
      status:'publish',
      false:true,
      loading:false,
      show:''
    },
    images:[{
      id: 1,
      path: 'https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/whfpf%3D72%2C72%2C0/sign=31308be09edda144da5c3ff2d48ae790/3b87e950352ac65c2ddf4980f2f2b21192138a6e.jpg'
    }, {
      id: 2,
      path: 'https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/whfpf%3D72%2C72%2C0/sign=c07e328600087bf47db904a994ee601e/a08b87d6277f9e2fdae310c51d30e924b999f32d.jpg'
    }, {
      id: 3,
      path: 'https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/whfpf%3D72%2C72%2C0/sign=26002fda9582d158bbd70af1e6372eea/9825bc315c6034a8a9d611b5c2134954092376ca.jpg'
    }, {
      id: 4,
      path: 'https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/whfpf%3D72%2C72%2C0/sign=011cd03ea18b87d65017f85f61351f0a/728da9773912b31b0251af268618367adab4e184.jpg'
    }, {
      id: 5,
      path: 'https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/whfpf%3D72%2C72%2C0/sign=54b0bf6f7bcf3bc7e8559eacb73d8d93/a71ea8d3fd1f4134a4b3461c2e1f95cad0c85ecf.jpg'
    }
    ]
  },
  onLoad () {
  },
  onChangeStatus(e){
    this.setData({
      ['entity.status']:e.detail.value?'publish':''
    });
  },
  onInputTitle(e){
    this.setData({
      ['entity.title']:e.detail.value
    });
  },
  onInputContent(e){
    this.setData({
      ['entity.content']:e.detail.value
    });
  },
  onTapSubmitButton(e){
    this.setData({
      loading:true
    });
    wx.request({
      // 将api地址模块化，有利于以后的维护
      url:API_CREATE,
      method:'POST',
      data:{
        ...this.data.entity
      },
      success:(response)=>{
        this.setData({
          entity:{
            title:'',
            content:'',
            status:'publish'
          },
          loading:false
        });
        wx.navigateTo({
          url: `/pages/posts/show?id=${response.data.data.id}`,
        })
      }
    })
  },
  onChooseImage(e){
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: (response)=>{
        // console.log(response);
        const path=response.tempFiles[0].path;//tempFiles需要保存的临时路径
        const images=[{
          id:Math.ceil(Math.random()*100),
          path:path
        },...this.data.images];
        this.setData({
          images,
          length:images.length
        })
      }
    
    })
  },
  bingLongTap(e){
    // var imgs= this.data.images;
    // var index = e.currentTarget.dataset.index;
    // imgs.splice(index, 1);
    this.setData({
      // images: imgs,
      show:1
    });
  },
  modify(e) {
    var imgs = this.data.images;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      images: imgs
    });
  },
  click_blank(e){
    this.setData({
      show:''
    })
  }
})
