import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SubnavabarComponent } from '../../components/subnavabar/subnavabar.component';
import { FormsModule } from '@angular/forms'; // Importar FormsModule en Standalone
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-principal',
  imports: [NavbarComponent, SubnavabarComponent, FormsModule, CommonModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {
  selectedValue: string = 'codigo';

  dataHistorialVehicular: any;

  onSelectionChange(value: string) {
    this.selectedValue = value;
  }


}
