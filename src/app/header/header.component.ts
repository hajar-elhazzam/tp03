import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { MarketplaceItemType } from '../types/marketplace.type';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  cartItems: { item: MarketplaceItemType, quantity: number }[] = [];
  cartItemsSub!: Subscription;
  isSidebarOpen= false;
  constructor(
    public cartService: CartService,
  ) {}

  toggleSidebar() {
    
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  updateQuantity(cartItems: number, newQuantity: number): void {
    console.log('updateQuan');
    if (newQuantity >= 0) {
      this.cartService.updateQuantity(cartItems, newQuantity);
    }
  }

 
  removeProduct(productId: number): void {
    this.cartService.removeProduct(productId);
  }
  ngOnInit(): void {
    this.cartItemsSub = this.cartService.getCartItems().subscribe(cartItems => {
      this.cartItems = cartItems;
    });
  }

  ngOnDestroy(): void {
    this.cartItemsSub.unsubscribe();
  }
}

