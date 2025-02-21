/*
interfaces del componente login
 */

export interface FormDataLogin {
  email: string;
  password: string;
}

/*
Interface de AuthContext
 */

export interface userData {
  accessToken: string;
  refreshToken: string;
  uuid: string;
  userId: number;
  isSuperuser: boolean;
  user_photo: string;
}

export interface AuthContextType {
  user: userData | null;
  login: (userData: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  status: string;
}

/*
Interface para la tabla de las citas
 */

export interface InterfaceDataCitas {
  id: number;
  fecha_hora: string;
  paciente: string;
  numero_cita: string;
  tipo_cita_nombre: string;
  medico_nombre: string;
}

/*
Interfaces para la creacion de citas
 */

export interface DataCreateDatig {
  fecha_hora: string;
  paciente: string;
  tipo_cita: string;
  medico: string;
}

export interface DataDoctorApi {
  nombre_medico: string;
}

export interface DataTipoCita {
  nombre_cita: string;
  activo: boolean;
}
