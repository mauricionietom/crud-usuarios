import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  usuario: {id: string, nombre: string, apellido: string};
  usuarios;
  constructor(private fireStore: AngularFirestore){}
  agregarPersona(formPersona: NgForm){
    const datos = formPersona.value;
    this.fireStore.collection('Usuarios').add({...datos});
  }
  editarPersona(formPersona: NgForm){
    const data = formPersona.value;
    this.fireStore.collection('Usuarios').doc(this.usuario.id).set({...data})
  }
  buscarPersona(form: NgForm){
    const data = form.value;
    this.fireStore.collection('Usuarios', ref => ref.where('nombre','==',data.nombre)).snapshotChanges().subscribe(
      (datosObjeto) => {
        if(datosObjeto){
          this.usuario = {
          id: datosObjeto[0].payload.doc.id,
          ...datosObjeto[0].payload.doc.data()
          }
        }
      }
    );
  }
  eliminarPersona(){
    this.fireStore.collection('Usuarios').doc(this.usuario.id).delete();
    alert('Borrado');
  }
  ngOnInit() {
    this.fireStore.collection('Usuarios').valueChanges().subscribe(
      (res) => {
        this.usuarios=res;
      }
    );
  }
}
