var UD = {};

UD.SERVICE_URI = "ws://localhost:18002?devType=2";
//UD.SERVICE_URI = "ws://192.168.36.5:18002?devType=2";

/* 接口定义 */
UD.METHOD = {
  // 命令清单
  WEB_GET_VERSION: "getVersion",
  WEB_GET_STATUS: "getStatus",
  WEB_READ_TAGS: "readTags",
  WEB_START_READING: "startReading",
  WEB_STOP_READING: "stopReading",
  WEB_SET_CONFIG: "setConfig",
  // 被动接收数据消息
  DATA_TAG: "dataTag",
  DEVICE_ENVENT: "deviceEnvent"
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
    'param': '1',
    'sn': UD.getSn()
  };
  return data;
}


// 手动读取标签
UD.readTags = function(readType) {
  var data = {
    'method': UD.METHOD.WEB_READ_TAGS,
    'param': readType,
    'sn': UD.getSn()
  };
  return data;
}

// 开始盘存
UD.startReading = function() {
  var data = {
    'method': UD.METHOD.WEB_START_READING,
    'param': '',
    'sn': UD.getSn()
  };
  return data;

}


// 结束盘存
UD.stopReading = function () {
  var data = {
    'method': UD.METHOD.WEB_STOP_READING,
    'param': '',
    'sn': UD.getSn()
  };
  return data;
}


// 获取一个命令序号（该值服务端收到后会原样返回，用于标识某次命令的应答）
UD.getSn = function() {
  return (new Date().getTime() % 1000000).toString() + (Math.floor(Math.random() * 100)).toString();
}


//导出设置使得Vue可引入，关键
export {
  UD
}
