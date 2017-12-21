/* eslint-disable*/

export default function b (list) {
  if (LODOP.webskt.readyState == 1) {
      subprint(list);
  }
  else {
      setTimeout(b, 10);
  }
}
  //厨打
function subprint(list) {
  var pr = {
      index: window.CLODOP.Printers["default"],
      O: window.CLODOP.Printers.list[window.CLODOP.Printers["default"]],
      list: window.CLODOP.Printers.list
  };
  for (var i = 0; i < list.length; i++) {
      var item = list[i];
      var PrintName = item.printer;

      var PaperWidth = "";
      for (var k = 0; k < pr.list.length; k++) {
          if (pr.list[k].name == PrintName) {
              PaperWidth = pr.list[k].PaperWidth;
          }
      }

      PaperWidth = PaperWidth == "" ? pr.O.PaperWidth : PaperWidth;
      var str = ''; var rowcount = 4;
      str += ' <div style="max-width: 300px;margin: 0 auto;">' +
          '<p ><span style="  font-weight: 600; display: inline-block; width: 50%;font-size: 18px;">桌位：' +item.rtn_tablename + '</span>' +
          '<span style="  font-weight: 600; display: inline-block; width: 50%;font-size: 18px;">餐次：' +  item.ros_many + '</span></p >' +
          '<div style="  border-bottom: 2px dashed #000;width: 98%; height: 0px;">' +
          '</div>' +
          ' <table style=" margin: 5px 0; width: 100%;  text-align: left; font-size: 20px;">'+
      '<tbody>'
      for (var j = 0; j < item.items.length; j++) {

          var rowitem = item.items[j];
          str += '<tr><td style="width: 70%;">' +
              rowitem.ros_foodname
              + ' </td> <td style="width: 30%;">' +
                  rowitem.ros_foodnum
              + ' </td>  </tr>';
          rowcount += Math.ceil(rowitem.ros_foodname.length / 15);
      }

      str += '</tbody></table><div style="  border-bottom: 2px dashed #000;width: 98%; height: 0px;"></div><p style="font-size: 14px"> 出单时间 : ' +
          item.printdata
              + ' </p> <div style="  border-bottom: 2px dashed #000;width: 98%; height: 0px;"></div> </div >'
      rowcount += 1;

      console.log(str);
      LODOP.PRINT_INITA("0mm", "0mm", "", "", "吉米呷呷餐厅厨房打印");
      console.log(PrintName);
      LODOP.SET_PRINTER_INDEXA(PrintName);

      LODOP.SET_PRINT_PAGESIZE(3, PaperWidth,0, 'temp01');
      //LODOP.SET_PRINT_STYLEA(0, "ItemType", 4);

      //LODOP.SET_PRINT_STYLE("FontSize", 24);
      LODOP.ADD_PRINT_HTM(0, 0, "100%", "100%", str);

      LODOP.PRINT();
      console.log(1);
  }

}
