import { Component, OnInit } from '@angular/core';
import { FileService} from '../../../core/service/file.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'smart-upload-demo',
  templateUrl: './upload-demo.component.html',
  styleUrls: ['./upload-demo.component.css']
})
export class UploadDemoComponent implements OnInit {
  imageToShow: any;
  constructor(
    private fileService: FileService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
  }
  onSubmit() {}
  fileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      console.log(fileList[0]);
      this.saveFile(fileList[0]);
  }
}
    saveFile(file: File) {
       const formData: FormData = new FormData();
       formData.append('file', file, file.name);
       console.log(formData);
       this.fileService.uploadAndGetFile(formData).subscribe((res: any) => {
        const objectURL = URL.createObjectURL(res);
        this.imageToShow = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        console.log(this.imageToShow);
        // const reader = new FileReader();
        // reader.addEventListener('load', () => {
        // this.imageToShow = reader.result;
        // }, false);
        // if (res) {
        // reader.readAsDataURL(res);
        //         }
        //         console.log(this.imageToShow);
          });
    }

}
