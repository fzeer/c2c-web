var UD = {};

UD.SERVICE_URI = "ws://localhost:18001?devType=1";

/* 接口定义 */
UD.METHOD = {
  // 命令清单,WEB->服务端
  WEB_GET_VERSION: "getVersion",
  WEB_GET_STATUS: "getStatus",
  WEB_SET_CONFIG: "setConfig",
  WEB_BLE_SCAN: "bleScan",
  WEB_BLE_CONNECT: "bleConnect",
  WEB_SET_POWER: "setPower",
  WEB_BLE_DISCONNECT: "bleDisconnect",
  // 被动接收数据消息
  DATA_TAG: "dataTag",
  DATA_EMP: "dataEmp",
  BLE_LIST: "bleList",
  DEVICE_ENVENT: "deviceEnvent",
  BUTTON_ENVENT: "buttonEnvent",
}

/* 接口定义 */
UD.DEVICE_ENVENT_TYPE = {
  // 命令清单,WEB->服务端
  INVENTORY_START: "0",
  INVENTORY_PAUSE: "1",
  DISCONNECT: "2",
  READING_EMP_CARD: "3",
}


// 获取系统版本信息
UD.getVersion = function() {
  var data = {
    'method': UD.METHOD.WEB_GET_VERSION,
    'param': '',
    'sn': UD.getSn()
  };
  return data;
}

// 获取当前状态
UD.getStatus = function() {
  var data = {
    'method': UD.METHOD.WEB_GET_STATUS,
    'param': '',
    'sn': UD.getSn()
  };
  return data;
}

// 搜索蓝牙
UD.getBleList = function() {
  // 搜索3秒
  var data = {
    'method': UD.METHOD.WEB_BLE_SCAN,
    'param': '3',
    'sn': UD.getSn()
  };
  return data;
}

// 连接指定蓝牙
UD.bleConnect = function(deviceId) {
  var data = {
    'method': UD.METHOD.WEB_BLE_CONNECT,
    'param': deviceId,
    'sn': UD.getSn()
  };
  return data;

}

// 开始读标签
UD.setPower = function(power) {
  var data = {
    'method': UD.METHOD.WEB_SET_POWER,
    'param': power,
    'sn': UD.getSn()
  };
  return data;

}


// 断开蓝牙
UD.bleDisconnect = function() {
  var data = {
    'method': UD.METHOD.WEB_BLE_DISCONNECT,
    'param': '',
    'sn': UD.getSn()
  };
  return data;

}

// 获取一个命令序号（该值服务端收到后会原样返回，用于标识某次命令的应答）
UD.getSn = function() {
  return (new Date().getTime() % 1000000).toString() + (Math.floor(Math.random() * 100)).toString();
}

// 设置保存
UD.setConfig = function(param) {
  var data = {
    'method': UD.METHOD.WEB_SET_CONFIG,
    'param': param,
    'sn': UD.getSn()
  };
  return data;
}

//导出设置使得Vue可引入，关键
export {
  UD
}
