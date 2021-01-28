import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../shared/services/product.service';
import { AngularFireStorage } from "@angular/fire/storage";
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  productForm: FormGroup;
  imagePreview: string;
  downloadURL: Observable<string>;
  fb;
  constructor(private productService: ProductService, private storage: AngularFireStorage) {}

  ngOnInit(): void {
    this.productForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(255),
      ]),
      description: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      imageUrl: new FormControl(null, [Validators.required]),
      status: new FormControl('available', [Validators.required]),
    });
  }

  onUpdate() {
    var n = Date.now();
    const filePath = `Products/${n}`;
    const fileRef = this.storage.ref(filePath);
    let data = this.productForm.value;
    const task = this.storage.upload(`Products/${n}`, this.productForm.value['imageUrl']);
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(url => {
          if (url) {
            this.productForm.patchValue({
              imageUrl: url,
            });
            this.productForm.get('imageUrl').updateValueAndValidity();
          }
          let data = this.productForm.value;
          this.productService.createProduct(data).then(
            res => {
              this.productForm.reset();
              this.imagePreview = ''
              console.log("created");
              
            }
          )
        });
      })
    ).subscribe();

  }
  onImageUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    this.productForm.patchValue({
      imageUrl: file,
    });
    this.productForm.get('imageUrl').updateValueAndValidity();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
