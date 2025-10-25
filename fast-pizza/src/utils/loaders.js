import { getMenu, getOrder } from "../services/apiRestaurant";

export async function menuLoader() {
  const menu = await getMenu();
  return menu;
}

export async function orderLoader({params}) {
  const order = await getOrder(params.orderId);
  return order;
}
