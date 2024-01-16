import { PaginationData } from "../Common/pagination.data";
import { Item } from "./item";

export class ItemGetAll{
    items: Item[]=[];
    paginationMetaData: PaginationData=new PaginationData();
  }