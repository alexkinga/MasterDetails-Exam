import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {combineLatest, map, Observable, Subject} from 'rxjs';
import {ProductModel} from '../../models/product.model';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  styleUrls: ['./product-list.component.scss'],
  templateUrl: './product-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  readonly products$: Observable<ProductModel[]> = this._productService.getAll();
  private _selectedProductIdSubject: Subject<ProductModel> = new Subject<ProductModel>();
  public selectedProductId$: Observable<ProductModel> = this._selectedProductIdSubject.asObservable();

  public sameCatProd: Observable<ProductModel[]> = combineLatest([
    this.products$,
    this.selectedProductId$
  ]).pipe(
    map(([products, selectedProducts]: [ProductModel[], ProductModel]) => (
      products.filter(product => product.category === selectedProducts.category)
    ))
  )

  constructor(private _productService: ProductService) {
  }
  selectProduct(product: ProductModel):void{
    this._selectedProductIdSubject.next(product);
  }
}
