import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  standalone: true,
  imports: [ToastModule, ButtonModule],
  providers: [MessageService],
})
export class HomepageComponent {
  constructor(private messageService: MessageService) {}

  onShowToast(): void {
    this.messageService.add({ severity: 'success', summary: 'Homepage is in the air!!!', detail: '', life: 5000 });
  }
}
