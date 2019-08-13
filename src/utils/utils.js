let t = this;
class Util {
    getMap() {
        let cityName;
        return new Promise((resolve, reject) => {
            AMap.plugin('AMap.Geolocation', function () {
                let geolocation = new AMap.Geolocation({
                    enableHighAccuracy: true,//是否使用高精度定位，默认:true
                    timeout: 10000,          //超过10秒后停止定位，默认：5s
                });
                geolocation.getCurrentPosition(function (status, result) {
                    if (status === 'complete') {
                        cityName = result.addressComponent.province;
                        localStorage.setItem('cityName', cityName);
                        resolve({code: 200, 'cityName': cityName});
                    } else {
                        resolve({code: onError(result), 'cityName': ''});
                    }
                });
                //定位数据获取失败响应
                function onError(error) {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            return 500;
                            alert("您拒绝对获取地理位置的请求");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            return 300;
                            alert("位置信息是不可用的");
                            break;
                        case error.TIMEOUT:
                            return 300;
                            alert("请求您的地理位置超时");
                            break;
                        case error.UNKNOWN_ERROR:
                            return 300;
                            alert("未知错误");
                            break;
                    }
                }
            });
        });
    }

    removeLocal() {
        localStorage.removeItem('RefreshCart');
    }
}
export default Util;

