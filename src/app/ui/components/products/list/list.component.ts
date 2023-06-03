import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseUrl } from 'src/app/contracts/base-url';
import { ListProduct } from 'src/app/contracts/list-products';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private filseService: FileService
  ) {}
  currentPageNo: number;
  products: ListProduct[];
  productCount: number;
  totalPageCount: number;
  pageSize: number = 18;
  pageList: number[] = [];

  baseUrl: BaseUrl;

  async ngOnInit() {
    this.baseUrl = await this.filseService.getBaseStorageUrl();
    this.activatedRoute.params.subscribe(async (params) => {
      this.currentPageNo = parseInt(params['pageNo'] ?? 1);

      const data: { totalCount: number; products: ListProduct[] } =
        await this.productService.read(
          this.currentPageNo - 1,
          this.pageSize,
          () => {},
          (errormessage) => {}
        );
      this.products = data.products;

      this.products = this.products.map<ListProduct>((p) => {
    
        const listProduct: ListProduct = {
          id: p.id,
          sale: p.sale,
          createdDate: p.createdDate,
          updatedDate: p.updatedDate,
          name: p.name,
          price: p.price,
          quantity: p.quantity,
          imagePath:`../../../../../assets/${p.productImageFiles.length
            ? p.productImageFiles.find((x) => x.showcase).path
            : ''}` ,
          productImageFiles: p.productImageFiles,
        };
        return listProduct;
      });

      this.productCount = data.totalCount;
      this.totalPageCount = Math.ceil(this.productCount / this.pageSize);

      this.pageList = [];

      if (this.currentPageNo - 3 <= 0)
        for (let i = 1; i <= 7; i++) this.pageList.push(i);
      else if (this.currentPageNo + 3 >= this.totalPageCount)
        for (let i = this.totalPageCount - 6; i <= this.totalPageCount; i++)
          this.pageList.push(i);
      else
        for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3; i++)
          this.pageList.push(i);
    });
  }
}
