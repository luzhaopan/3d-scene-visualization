import Mock from 'mockjs'

const timeout = 1000

const info1 =  Mock.mock({
  "iot": {
      "name": "接入IOT设备",
      "number|0-10000": 0,
      "unit": "台"
  },
  "test": {
      "name": "今日核酸采集量",
      "number|0-8000": 0,
      "unit": "人"
  },
  "power": {
      "name": "城市电力能耗",
      "number|1-50": 0,
      "unit": "兆瓦时"
  },
  "event": {
      "name": "未处理治安事件",
      "number|0-800": 0,
      "unit": "起"
  }
})

const info2 =  Mock.mock({
  "iot": {
      "name": "接入IOT设备",
      "number|0-6000": 0,
      "unit": "台"
  },
  "test": {
      "name": "今日核酸采集量",
      "number|0-6000": 0,
      "unit": "人"
  },
  "power": {
      "name": "城市电力能耗",
      "number|1-60": 0,
      "unit": "兆瓦时"
  },
  "event": {
      "name": "未处理治安事件",
      "number|0-400": 0,
      "unit": "起"
  }
})

const info = [info1, info2]

const getInfo = () => {
  const index = Math.random() > 0.5 ? 1 : 0
  return info[index]
}

const list = [
  {
      "name": "火警",
      "type": "出现事故，需紧急处理",
      "position": {
          "x": 94,
          "y": 27
      }
  },
  {
    "name": "治安",
    "type": "重大事故，需派人支援",
    "position": {
        "x": 5,
        "y": 18
    }
},
  {
      "name": "火警",
      "type": "存在隐患,需派人排除隐患",
      "position": {
          "x": 63,
          "y": 50
      }
  },
  {
      "name": "电力",
      "type": "存在隐患,需派人排除隐患",
      "position": {
          "x": 95,
          "y": 45
      }
  },
  {
      "name": "电力",
      "type": "重大事故，需派人支援",
      "position": {
          "x": 100,
          "y": 35
      }
  },
  {
      "name": "治安",
      "type": "存在隐患,需派人排除隐患",
      "position": {
          "x": 86,
          "y": 21
      }
  },
  {
    "name": "电力",
    "type": "重大事故，需派人支援",
    "position": {
        "x": 100,
        "y": 35
    }
},
]
const getList = () => {
  return list.slice(0, Math.floor(Math.random() * 7))
}

export default [
  {
    url: '/project/info',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: 200,
        data: getInfo()
      }
    }
  },
  {
    url: '/project/list',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: 200,
        data: getList()
      }
    }
  }
]
