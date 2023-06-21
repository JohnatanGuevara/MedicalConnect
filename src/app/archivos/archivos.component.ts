import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { UploadMetadata } from '@angular/fire/storage';

import { finalize } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { Paciente } from 'src/app/models/models';
import { PacienteDataService } from 'src/app/paciente-data.service';
import { ActivatedRoute } from '@angular/router';
import { PacientesService } from 'src/app/services/pacientes.service';

interface ImageInfo {
  name: string;
  url: string;
  uploadDate: string;
  pacienteId: string | null;
}

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./ARCHIVOS.css', './nicepage.css']
})
export class ArchivosComponent implements OnInit {
  paciente: Paciente | null = null;
  images: ImageInfo[] = [];
  isLoading: boolean = false;
  isLoadingGet: boolean = false;
  imagesLab: ImageInfo[] = [];
  

  constructor(private storage: AngularFireStorage, private datePipe: DatePipe, private pacienteDataService: PacienteDataService, private pacientesService: PacientesService) {}

  ngOnInit() {
    this.paciente = this.pacienteDataService.getPaciente();
    console.log(this.paciente?.id)
    this.getImages();
    this.getImagesLab();
  }

  uploadImage($event: any) {
    this.isLoading = true;
    const file = $event.target.files[0];
    const filePath = `images/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    const metadata: UploadMetadata = {
      customMetadata: {
        pacienteId: this.paciente?.id || ''
      }
    };
  
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.updateMetadata(metadata).subscribe(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            console.log('File uploaded successfully:', url, metadata);
            
            const image: ImageInfo = {
              name: file.name,
              url: url,
              uploadDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd')!,
              pacienteId: this.paciente?.id || null
            };
            this.images.push(image);
            this.isLoading = false;
          });
        });
      })
    ).subscribe();
    
  }

  getImages() {
    this.isLoadingGet = true;
    const imagesRef = this.storage.ref('images');

    imagesRef.listAll().subscribe((response) => {
      const imagePromises = response.items.map(async (item) => {
        const url = await item.getDownloadURL();
        const metadata = await item.getMetadata();
        const customMetadata = metadata.customMetadata || {};
      const pacienteId = customMetadata['pacienteId'] || null;
      console.log('URL:', url, 'pacienteID', pacienteId);
        return {
          name: item.name,
          url,
          uploadDate: metadata.timeCreated,
          pacienteId
        } as ImageInfo;
      });

      Promise.all(imagePromises).then((images) => {
        console.log('All Images:', images);
        const filteredImages = images.filter((image) => image.pacienteId === this.paciente?.id);
        console.log('Filtered Images:', filteredImages); // Verifica las imágenes filtradas

          this.images = filteredImages.sort((a, b) => {
          const timeA = new Date(a.uploadDate).getTime();
          const timeB = new Date(b.uploadDate).getTime();
         return timeB - timeA;
          });

           console.log('Assigned Images:', this.images);
           this.isLoadingGet = false;
      });
    });
  }
  
  uploadImageLab($event: any) {
    this.isLoading = true;
    const file = $event.target.files[0];
    const filePath = `Laboratorios/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    const metadata: UploadMetadata = {
      customMetadata: {
        pacienteId: this.paciente?.id || ''
      }
    };
  
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.updateMetadata(metadata).subscribe(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            console.log('File uploaded successfully:', url, metadata);
            
            const image: ImageInfo = {
              name: file.name,
              url: url,
              uploadDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd')!,
              pacienteId: this.paciente?.id || null
            };
            this.imagesLab.push(image);
            this.isLoading = false;
          });
        });
      })
    ).subscribe();
    
  }
  getImagesLab() {
    this.isLoadingGet = true;
    const imagesRef = this.storage.ref('Laboratorios');
  
    imagesRef.listAll().subscribe((response) => {
      const imagePromises = response.items.map(async (item) => {
        const url = await item.getDownloadURL();
        const metadata = await item.getMetadata();
        const customMetadata = metadata.customMetadata || {};
        const pacienteId = customMetadata['pacienteId'] || null;
        console.log('URL:', url, 'pacienteID', pacienteId);
        return {
          name: item.name,
          url,
          uploadDate: metadata.timeCreated,
          pacienteId
        } as ImageInfo;
      });
  
      Promise.all(imagePromises).then((imagesLab) => {
        console.log('All Lab Images:', imagesLab);
        const filteredImages = imagesLab.filter((image) => image.pacienteId === this.paciente?.id);
        console.log('Filtered Lab Images:', filteredImages); // Verifica las imágenes filtradas
  
        this.imagesLab = filteredImages.sort((a, b) => {
          const timeA = new Date(a.uploadDate).getTime();
          const timeB = new Date(b.uploadDate).getTime();
          return timeB - timeA;
        });
  
        console.log('Assigned Lab Images:', this.imagesLab);
        this.isLoadingGet = false;
      });
    });
  }
}