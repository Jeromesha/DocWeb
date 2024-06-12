import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileDownloadService {

  constructor() { }

  public downloadBase64File(base64String: string, fileName: string): void {
    const linkSource = `data:application/octet-stream;base64,${base64String}`;
    const downloadLink = document.createElement("a");
    const fileType = fileName.split('.').pop(); // get file type from file name

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }
}
