export interface PerfilResponseI{
  usuario: {
    id: number;
    username: string;
    password: string;
    email: string;
    roles: [];
    createdOn: string;
    descripcion: string;
    foto: string;
  };
}
