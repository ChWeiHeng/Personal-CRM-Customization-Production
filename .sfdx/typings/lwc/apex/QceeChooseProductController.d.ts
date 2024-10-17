declare module "@salesforce/apex/QceeChooseProductController.doInit" {
  export default function doInit(): Promise<any>;
}
declare module "@salesforce/apex/QceeChooseProductController.queryDataByProductParam" {
  export default function queryDataByProductParam(param: {searchParam: any, priceBookParam: any, productTypeParam: any, productModelParam: any}): Promise<any>;
}
declare module "@salesforce/apex/QceeChooseProductController.queryDataByAccessoryParam" {
  export default function queryDataByAccessoryParam(param: {searchParam: any, priceBookParam: any, accessoryTypeValueParam: any, accessoryModelValueParam: any}): Promise<any>;
}
declare module "@salesforce/apex/QceeChooseProductController.queryDataByProductId" {
  export default function queryDataByProductId(param: {productId: any}): Promise<any>;
}
declare module "@salesforce/apex/QceeChooseProductController.queryPriceByPriceEntry" {
  export default function queryPriceByPriceEntry(param: {productId: any}): Promise<any>;
}
