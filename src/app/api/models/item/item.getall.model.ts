import { PaginationMetaData } from "../common/pagination.data.model";
import { ItemModel } from "./item.model";

export interface ItemGetAllModel {
    items: ItemModel[];
    paginationMetaData: PaginationMetaData;
  }