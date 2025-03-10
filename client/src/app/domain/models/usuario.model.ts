
export interface UsuarioModel{
   
    id_usuario: number;
    usuario: string;
    password?: string;
    estado: boolean ;
    archivo_sede: string;
    nombre: string;
    ap_paterno: string;
    ap_materno: string;
    dni: string;
    perfil?: string | null;
}