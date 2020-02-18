const commonFn = {
  //导出为excel表格的方法
  exportExcel(n,k) {
    console.log(n,k)
    var headerArr = []
    var bodyArr = []
    for(let i=0;i<n.length;i++){
      headerArr.push(n[i].label)
      bodyArr.push(n[i].prop)
    }
    // console.log(headerArr,bodyArr)

    require.ensure([], () => {
      const {export_json_to_excel} = require('../excel/Export2Excel');
      const tHeader = headerArr;
      // 上面数组tHeader设置Excel的表格第一行的标题
      const filterVal = bodyArr;
      // 上面数组filterVal是tableData里对象的属性的集合
      const list = k;  //k代表的是表格tableData数据中的对应字段下的相关信息，把这些信息存到list
      const data = this.formatJson(filterVal, list);
      export_json_to_excel(tHeader, data, '列表excel');
    })
  },

  formatJson(filterVal, jsonData) {
    return jsonData.map(v => filterVal.map(j => v[j]))
  },

  //confirm弹框
  myConfirm(n){
    var r = confirm(n)
   if(r){
      // alert('你选择了'+n)
   }else {
      // alert('你取消了'+n)
   }
  }


}

export default commonFn
