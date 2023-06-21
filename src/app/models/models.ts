export interface User{

    nombres: string;
    apellidos: string;
    correo: string;
    cedula: string;
    password: string;
    perfil: string;
    uid: string;
    CM: string;
    telefono: string;
    MPPS:string;
    RIF: string;
    Univ: string;
    Merito: string;
}
   

export interface UserLogin{

    correo: string;
    password: string;
}

export interface Paciente{
    nombres: string;
    apellidos: string;
    cedula: string;
    motivo: string;
    seguro: string;
    sexo: string;
    fecha: Date;
    userId: string;
    id: string;
    antecedenteM: string;
    antecedenteQ: string;
    antecedentesF: string;
    habitosP: string;
    medicamentos: string;
    edad: string;
    domicilio: string;
    nombreseguro: string;
    telefonoP: string;
    telefonoO: string;
    antecedentesPadre: string;
    antecedentesMadre: string;
    antecedentesAbuelo: string;
    antecedentesHermana: string;
    antecedentesHijo: string;
    peso: string;
    talla: string;
    mmHg: string;
    AA: boolean;
    evaluacion: string;
    HTA: boolean;
    DM: boolean;
    ASMA: boolean;
    COVID: boolean;
    ONCOLOGICO: boolean;
    NIEGAAM: boolean;
    DESCRIPCIONAM: string;
    TABACO: boolean;
    OH: boolean;
    ILICITAS: boolean;
    MEDICAMENTOS: boolean;
    MADRE: string;
    PADRE: string;
    ABUELOS: string;
    HERMANOS: string;
    ENFERMEDADACT: string;
    TA: string;
    FC: string;
    FR: string;
    SATO2: string;
    ON: boolean;
    MS: boolean;
    IMC: string;
    EXAMENF: string;
    IMPRESIONDIAG: string;
    DESCRIPCION: string;
    PLAN: string;
    RECIPE: string;
    INDICACIONES: string;
    PARACLINICOS: string;
    RECIPENEW: string;
    INDICACIONESNEW: string;
    
    
}
export interface HistPaciente {
    motivo: string;
    antecedenteM: string;
    antecedenteQ: string;
    antecedentesF: string;
    habitosP: string;
    medicamentos: string;
    userId: string;

}

export interface Event {
    id: string;
    title: string;
    start: string;
    end: string;
    allDay: boolean;
    userId: string;
  }

  interface CustomEvent extends Event {
    userId: string;
    
  
  }