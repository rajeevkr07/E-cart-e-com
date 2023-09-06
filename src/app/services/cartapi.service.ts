import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartapiService {
  cartDataList:any =[];
  productlist= new BehaviorSubject<any>([]);

  constructor(private http:HttpClient) { }
  getProductData(){
    return this.productlist.asObservable();
  }
  //set product data
  setProduct(product:any){
    this.cartDataList.push(...product);
    this.cartDataList.next(product)
  }
  //add to cart
  addToCart(product:any){
    this.cartDataList.push(product);
    this.productlist.next(this.cartDataList);
    this.getTotalAmount();
    console.log(this.cartDataList)
  }
  // Get total amount
  getTotalAmount() : number{
    let grandTotal =0;
    this.cartDataList.map((a:any)=>{
      grandTotal +=a.total;
    })
    return grandTotal;
  }
  //reomve cart one by one
  removeCartdata(product:any){
    this.cartDataList.map((a:any,index:any)=>{
      if(product.id == a.id){
        this.cartDataList.splice(index,1)
      }
    })
    this.productlist.next(this.cartDataList)
  }
  //remove All cart
  removeAllCart(){
    this.cartDataList=[]
    this.productlist.next(this.cartDataList)
  }

}
