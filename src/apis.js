const apis = {
  login: '/Restaurant/Login',
  logout: '/Restaurant/Login/SignOut',
  w_table_list: '/Restaurant/Waiter/TableList',
  w_open_table: '/Restaurant/Waiter/OpenTable',
  w_retreat_table: '/Restaurant/Waiter/RetreatTable',
  w_edit_people_number: '/Restaurant/Waiter/EditPeopleNumber',
  w_table_people_number: '/Restaurant/Waiter/TablePeopleNumber',
  w_edit_table: '/Restaurant/Waiter/EditTable',
  pay: '/Restaurant/Pay',
  print_kitchen: '/Restaurant/Print/Kitchen',
  order_list: '/Restaurant/Waiter/OrderList',
  refund: '/Restaurant/Pay/Refund',
  ReserveList: '/Restaurant/Waiter/ReserveList',
  ReserveEdit: '/Restaurant/Waiter/ReserveEdit',
  FoodList: '/Restaurant/Client/FoodList',
  OrderAdd: '/Restaurant/Client/OrderAdd',
};

if (process.env.NODE_ENV === 'development') {
  Object.keys(apis).forEach((key) => {
    if (!key.includes('upload')) {
      apis[key] = `/api${apis[key]}`;
    }
  });
}

export default apis;
