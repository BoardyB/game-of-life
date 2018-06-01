import {AfterViewInit, Component, EventEmitter, OnInit, Output} from "@angular/core";
import {FileItem, FileUploader} from "ng2-file-upload";
import {ResponseMessage} from "../response/response-message";
import {Pattern} from "../../pattern/pattern";

@Component({
  selector: 'gol-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements AfterViewInit, OnInit {
  @Output() fileUploaded: EventEmitter<any> = new EventEmitter<any>();
  uploader: FileUploader = new FileUploader({ url: '/api/pattern/upload', autoUpload: true });
  hasBaseDropZoneOver = false;

  constructor() {
  }

  ngOnInit(): void {
    this.uploader.onSuccessItem = (item: FileItem, response: string) => {
      const parsedResponse = ResponseMessage.deserialize(JSON.parse(response), Pattern);
      this.fileUploaded.emit(parsedResponse.responseBody);
    };
  }

  ngAfterViewInit() {
    this.uploader.onAfterAddingFile = (item => {
      item.withCredentials = false;
    });
  }

  public fileOverDropZone(e: boolean): void {
    this.hasBaseDropZoneOver = e;
  }

  resetElement(event: any): void {
    event.target.value = '';
  }

  public getLastElementOfQueue(): FileItem {
    return this.uploader.queue[this.uploader.queue.length - 1];
  }

  public remove(): void {
    this.uploader.clearQueue();
  }

}
