export const APIConstants = {
  hostUrl: __API__,
  shipments: params => `${__API__}/shipments?${params}`,
  shipmentsDetail: id => `${__API__}/shipments/${id}`
};
