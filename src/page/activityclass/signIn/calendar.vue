<template>
  <div>
    <div class="calendar calendar1">
      <table>
        <caption>
          <a class="widget-prevMonth" @click="prevMonth" href="javascript:;">&lt;</a>
          <span class="widget-title">{{day['year']}}年{{day['month']}}月</span>
          <a class="widget-nextMonth" href="javascript:;" @click="nextMonth">&gt;</a>
          <a class="widget-back" href="javascript:;">今天</a> </caption>
        <thead>
          <tr>
            <th>日</th>
            <th>一</th>
            <th>二</th>
            <th>三</th>
            <th>四</th>
            <th>五</th>
            <th>六</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in renderArr">
            <td class="" :class="{'active':items.active,'widget-today':items.sign.length,'widget-disabled':items.status}" @click="onSelect(index,indexs)" v-for="(items,indexs) in item"> <span>{{items.day}}</span> </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      today: null, //当天
      data: [], //日期数据
      day: {}, //日历状态  年月
      range: [],
      options: {
        isRange: false, //是否选择范围
        limitRange: [], //有效选择区域的范围
        highlightRange: ['20180808', '20180809'], //指定日期范围高亮
        highlightList: ['20180608','20180708','20180808', '20180809']
      }
    }
  },
  mounted() {
    this.initData();
  },
  props: ['alertText', 'btntxt', 'alertTitle', 'alertType', 'boxalert'],
  computed: {
    renderArr() {
      var data = this.data;
      var arr = [];
      var index = -1;
      for (var i = 0; i < data.length; i++) {
        if (i % 7 == 6 && i < data.length) {
          index++;
          arr[index] = data.slice(index * 7, i + 1);
        }
      }
      return arr;
    }
  },
  methods: {
    //初始化数据
    initData() {
      this.today = this.getDateObj(); //获取当天数据 详细
      this.day = {
        'year': this.today['year'],
        'month': this.today['month']
      };
      this.getData();
    },
    /**
     * 事件
     */
    //点击某个日期
    onSelect(index,indexs){
      var item=this.renderArr[index][indexs]
      console.log(item.year+'年'+item.month+'月'+item.day+'日')
    },
    prevMonth(){
      this.day['month']--;
      this.getData(this.day);
    },
    nextMonth(){
      this.day['month']++;
      this.getData(this.day);
    },
    //获取日期数据
    getDateObj: function(year, month, day) {
      var date = arguments.length && year ? new Date(year, month - 1, day) : new Date();
      var obj = {
        'year': date.getFullYear(),
        'month': date.getMonth() + 1,
        'day': date.getDate(),
        'week': date.getDay()
      };
      obj['code'] = '' + obj['year'] + (obj['month'] > 9 ? obj['month'] : '0' + obj['month']) + (obj['day'] > 9 ? obj['day'] : '0' + obj['day']);
      return obj;
    },
    //获取当月天数
    getMonthDays: function(obj) {
      var day = new Date(obj.year, obj.month, 0);
      return day.getDate();
    },
    getData: function(obj) {
      var self = this;
      if (typeof obj == 'undefined') {
        obj = self.today;
      }
      self.day = self.getDateObj(obj['year'], obj['month'], 1); //得到当月第一天的数据
      var days = self.getMonthDays(self.day); //得到当月的天数
      var data = []; //日历信息数据

      var obj = {};
      //上月日期
      for (var i = self.day['week']; i > 0; i--) {
        obj = self.getDateObj(self.day['year'], self.day['month'], self.day['day'] - i);
        var info = self.getDateInfo(obj);
        if (!self.options.limitRange.length) {
          info['status'] = 'disabled';
        }
        data.push(info);
      }
      //当月日期
      for (var i = 0; i < days; i++) {
        obj = {
          'year': self.day['year'],
          'month': self.day['month'],
          'day': self.day['day'] + i,
          'week': (self.day['week'] + i) % 7
        };
        obj['code'] = '' + obj['year'] + (obj['month'] > 9 ? obj['month'] : '0' + obj['month']) + (obj['day'] > 9 ? obj['day'] : '0' + obj['day']);
        var info = self.getDateInfo(obj);
        data.push(info);
      }
      //下月日期
      var last = obj;
      for (var i = 1; last['week'] + i < 7; i++) {
        obj = self.getDateObj(last['year'], last['month'], last['day'] + i);
        var info = self.getDateInfo(obj);
        if (!self.options.limitRange.length) {
          info['status'] = 'disabled';
        }
        data.push(info);
      }
      this.data = data;
      //console.log(data)
    },

    //获取某天日期信息
    getDateInfo: function(obj) {
      var self = this;
      //限制范围
      if (self.options.limitRange.length) {
        obj['status'] = 'disabled';
        for (var i = 0; i < self.options.limitRange.length; i++) {
          var start = self.options.limitRange[i][0]; //得到起始日期
          var end = self.options.limitRange[i][1]; //得到结束日期
          if (start == 'today') { //起始日期等于今天
            start = self.today['code'];
          }
          if (end == 'today') {
            end = self.today['code'];
          }
          if (start > end) {
            start = [end, end = start][0];
          }
          if (obj['code'] >= start && obj['code'] <= end) {
            obj['status'] = '';
            break;
          }
        }
      }
      obj['sign'] = [];
      if (self.options.highlightRange.length) {
        for (var i = 0; i < self.options.highlightRange.length; i++) {
          var start = self.options.highlightRange[i][0];
          var end = self.options.highlightRange[i][1];
          if (start == 'today') {
            start = self.today['code'];
          }
          if (end == 'today') {
            end = self.today['code'];
          }
          if (start > end) {
            start = [end, end = start][0];
          }
          if (obj['code'] >= start && obj['code'] <= end) {
            obj['sign'].push('highlight');
            break;
          }
        }
      }
      //如果有高亮数据
      if (self.options.highlightList.length) {
        for (var i = 0; i < self.options.highlightList.length; i++) {
          if (obj['code'] == self.options.highlightList[i]) {
            obj['active'] = 'active';
            break;
          }
        }
      }


      if (obj['code'] == self.today['code']) {
        obj['sign'].push('today');
      }


      return obj;
    },



  }
}

</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  border-spacing: 0;
  text-align: center;
}
.calendar td, .calendar th {
    height: 30px;
    line-height: 30px;
    text-align: center;
}
.calendar .widget-disabled span {
    color: #999;
}

.calendar td span {
    display: block;
    width: 30px;
    margin: 0 auto;
    cursor: pointer;
}
.calendar .widget-disabled span {
    color: #999;
}

.active span {
  background: #39c;
  color: #fff;
  border-radius: 30px;
}

.widget-today span{
  background: #8eafe6;
  border-radius: 30px;
}

</style>
