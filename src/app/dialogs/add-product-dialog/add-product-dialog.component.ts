import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-product-dialog',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-product-dialog.component.html',
  styleUrl: './add-product-dialog.component.css'
})
export class AddProductDialogComponent {

  public addProductForm: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddProductDialogComponent>) {
    this.addProductForm = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  public save(): void {
    if (this.addProductForm.invalid) {
      alert('Por favor, llena todos los campos');
      return;
    }

    this.dialogRef.close(this.addProductForm.get('name')?.value ?? undefined);
  }

  public close(): void {
    this.dialogRef.close(undefined);
  }
}
