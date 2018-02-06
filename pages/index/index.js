//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    doubleColorBall: {},
    markers: [{
      // iconPath: "../resource/doubleColorBall.png",
      id: 0,
      // latitude: 23.099994,
      // longitude: 113.324520,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        // longitude: 113.3245211,
        // latitude: 23.10229
      }, {
        // longitude: 113.324520,
        // latitude: 23.21229
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '../resource/image/location-control.png',
      position: {
        left: 10,
        top: 450 - 50,
        width: 35,
        height: 35
      },
      clickable: true
    }]
  },
  //双色球点击事件处理函数
  bindDoubleColorBallViewTap: function () {
    wx.navigateTo({
      url: '../lottery/doubleColorBall/doubleColorBall'
    })
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })

    };
    // 开始处理地图定位！
    wx.getLocation({
      type: 'gcj02', //返回可以用于 wx.openLocation 的经纬度
      success: (res) => {
        console.log(res);
        let latitude = res.latitude;
        let longitude = res.longitude;
        let marker = this.createMarker(res);
        this.setData({
          centerX: longitude,
          centerY: latitude
        })
      }
    });
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  regionchange(e) {
    console.log('regionchange' + e.type)
  },
  markertap(e) {
    console.log('markertap' + e.markerId)
  },
  controltap(e) {
    // 调用wx接口查询当前位置信息
    wx.getLocation({
      type: 'gcj02', //返回可以用于 wx.openLocation 的经纬度
      success: (res) => {
        console.log(res)
        let latitude = res.latitude;
        let longitude = res.longitude;
        let marker = this.createMarker({ latitude: 35, longitude: 114 });
        this.setData({
          centerX: longitude,
          centerY: latitude,
          markers: marker
        })
      }
    });

  },

  getSchoolMarkers(res) {
    let marker = this.createMarker({ centerX, centerY });
    markers.push(marker)
    return markers;
  },
  createMarker(point) {
    let latitude = point.latitude;
    let longitude = point.longitude;
    let marker = {
      iconPath: "../resource/image/location.png",
      id: point.id || 0,
      name: point.name || '',
      latitude: latitude,
      longitude: longitude,
      width: 25,
      height: 48
    };
    return marker;
  }
});
