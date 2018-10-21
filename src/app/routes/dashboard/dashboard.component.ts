import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  s1 = null;
  s2 = null;

  constructor(
    private http: _HttpClient,
    private _e: ElectronService,
    private msg: NzMessageService
  ) { }

  ngOnInit() {
    // 监听主进程
    this._e.ipcRenderer.on('message', (event, message) => {
      alert(message);
    });
    this._e.ipcRenderer.on('isUpdateNow', (event, message) => {
      this.s1 = '下载完成';
      alert('下载完成');
      this._e.ipcRenderer.send('isUpdateNow');
    });
    this._e.ipcRenderer.on('downloadProgress', (event, message) => {
      this.s2 = message;
    });
    // 更新请求
    this._e.ipcRenderer.send('update');
  }
}
