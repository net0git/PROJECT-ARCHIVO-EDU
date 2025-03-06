export interface UsuarioLoginResponse {
    success: boolean;
    id_usuario: number; // Según lo que devuelva la API.
    usuario: string;
    nombre: string;
    perfil: string; // Asumiendo que el rol es un string.
    ap_paterno: string;
    ap_materno: string;
    dni: string;
    estado: boolean|null;
    archivo_sede: string;
}
