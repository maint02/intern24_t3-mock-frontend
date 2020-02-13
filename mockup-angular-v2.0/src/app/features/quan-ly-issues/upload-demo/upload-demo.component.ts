import { Component, OnInit, ViewChild } from '@angular/core';
import { FileService } from '../../../core/service/file.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'smart-upload-demo',
  templateUrl: './upload-demo.component.html',
  styleUrls: ['./upload-demo.component.css']
})
export class UploadDemoComponent implements OnInit {
  imageToShow: any;
  nameFile: any;
  fileList: FileList;
  constructor(
    private fileService: FileService,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit() {}
  onUpload() {
    this.saveFile(this.fileList[0]);
  }
  fileChange(event: any) {
    this.fileList = event.target.files;
    if (this.fileList.length > 0) {
      this.previewImages(this.fileList[0]);
    }
  }
  saveFile(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    this.fileService.uploadFile(formData).subscribe((res: any) => {
      if (res.responseCode === 1) {
        console.log(res.responseCode);
        alert('upload file thành công!');
      } else {
        alert('upload file thất bại!');
      }
    });
  }
  previewImages(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      this.imageToShow = reader.result;
    };
  }
  getFile(name: string) {
    this.fileService.getFileByName(name).subscribe((res: any) => {
      if (res != null) {
        const objectURL = URL.createObjectURL(res);
        this.imageToShow = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      }
    });
  }
  onGetFile(){
    this.getFile(this.nameFile);
  }
}
