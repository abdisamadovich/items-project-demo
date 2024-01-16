import { PaginationData } from "../common/pagination.data";
import { Item } from "./item";

export class ItemGetAll{
    items: Item[]=[];
    paginationMetaData: PaginationData=new PaginationData();
  }