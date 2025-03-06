
export interface UsuarioModel{
   
    id_usuario: number;
    usuario: string;
    password?: string;
    nombre: string;
    ap_paterno: string;
    ap_materno: string;
    dni: string;
    estado: boolean | null;
    perfil: string;
    archivo_sede?: string | undefined | null
}